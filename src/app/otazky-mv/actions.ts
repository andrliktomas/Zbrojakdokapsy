"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { recordActivity } from "@/lib/progress";
import { XP } from "@/lib/gamification";
import { EXAM } from "@/content";
import { MV_FREE_NUMS, MV_GROUPS, isValidMvTest, mvByNum, mvId, mvPassScore, type MvGroupKey } from "@/content/mv";

/** Režimy v tabulce QuestionAttempt: procvičování otázek MV a test nanečisto z otázek MV. */
const MODE_PRACTICE = "mv";
const MODE_TEST = "mv-test";

export async function answerMvQuestion(num: number, chosen: number) {
  const user = await requireUser();
  const q = Number.isInteger(num) ? mvByNum(num) : undefined;
  if (!q) throw new Error("Otázka neexistuje");
  if (!Number.isInteger(chosen) || chosen < 0 || chosen > 2) throw new Error("Neplatná odpověď");
  if (!MV_FREE_NUMS.has(num) && !(await hasAccess(user.id))) throw new Error("Celý soubor otázek MV je v placeném balíčku.");
  const correct = q.correct === chosen;
  await db.questionAttempt.create({
    data: { userId: user.id, questionId: mvId(num), topic: q.topic, correct, mode: MODE_PRACTICE },
  });
  const xp = correct ? XP.correctAnswer : XP.wrongAnswer;
  const unlocked = await recordActivity(user.id, xp);
  return { correct, correctIndex: q.correct, xp, unlocked };
}

const submitSchema = z.object({
  answers: z.record(z.string().regex(/^\d{1,3}$/), z.number().int().min(-1).max(2)),
  durationSec: z.number().int().min(0),
  permitType: z.enum(["obecne", "rozsirene"]),
});

export async function submitMvTest(input: z.infer<typeof submitSchema>) {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) throw new Error("Test nanečisto vyžaduje aktivní balíček.");
  const { answers, durationSec, permitType } = submitSchema.parse(input);
  const nums = Object.keys(answers).map(Number);
  // Test sestavuje server náhodně; tady jen hlídáme, že odevzdaná sada má skladbu skutečné zkoušky.
  if (!isValidMvTest(nums)) throw new Error("Neplatný test");

  const results = nums.map((num) => {
    const q = mvByNum(num)!;
    const chosen = answers[String(num)];
    return { num, topic: q.topic, group: q.group, chosen, correctIndex: q.correct, correct: chosen === q.correct };
  });
  const score = results.filter((r) => r.correct).length;
  const passScore = mvPassScore(permitType);
  const passed = score >= passScore;
  const groups = MV_GROUPS.map((g) => {
    const inGroup = results.filter((r) => r.group === g.key);
    return { key: g.key as MvGroupKey, title: g.title, correct: inGroup.filter((r) => r.correct).length, total: inGroup.length };
  });

  await db.$transaction([
    // Nezodpovězené otázky se do skóre počítají jako chyba, ale jako pokus o odpověď se neukládají.
    db.questionAttempt.createMany({
      data: results
        .filter((r) => r.chosen !== -1)
        .map((r) => ({ userId: user.id, questionId: mvId(r.num), topic: r.topic, correct: r.correct, mode: MODE_TEST })),
    }),
    db.testResult.create({
      data: { userId: user.id, score, total: nums.length, passed, permitType, durationSec: Math.min(durationSec, EXAM.timeLimitMin * 60) },
    }),
  ]);
  const xp = XP.testCompleted + (passed ? XP.testPassed : 0);
  const unlocked = await recordActivity(user.id, xp);
  return { score, total: nums.length, passScore, passed, results, groups, xp, unlocked };
}
