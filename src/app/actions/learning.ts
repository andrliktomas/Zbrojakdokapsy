"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { recordActivity } from "@/lib/progress";
import { XP, nextCardState } from "@/lib/gamification";
import { EXAM, FREE_TOPICS, cardById, lessonById, questionById } from "@/content";

async function assertTopicAccess(userId: string, topic: string) {
  if (FREE_TOPICS.has(topic)) return;
  if (!(await hasAccess(userId))) throw new Error("Tento okruh vyžaduje aktivní balíček.");
}

export async function answerQuestion(questionId: string, chosen: number) {
  const user = await requireUser();
  const q = questionById.get(questionId);
  if (!q) throw new Error("Otázka neexistuje");
  await assertTopicAccess(user.id, q.topic);
  const correct = q.correct === chosen;
  await db.questionAttempt.create({
    data: { userId: user.id, questionId, topic: q.topic, correct, mode: "practice" },
  });
  const xp = correct ? XP.correctAnswer : XP.wrongAnswer;
  const unlocked = await recordActivity(user.id, xp);
  return { correct, correctIndex: q.correct, explanation: q.explanation, source: q.source, xp, unlocked };
}

export async function reviewCard(cardId: string, known: boolean) {
  const user = await requireUser();
  const card = cardById.get(cardId);
  if (!card) throw new Error("Kartička neexistuje");
  await assertTopicAccess(user.id, card.topic);
  const existing = await db.cardProgress.findUnique({ where: { userId_cardId: { userId: user.id, cardId } } });
  const next = nextCardState(existing?.box ?? 1, known);
  await db.cardProgress.upsert({
    where: { userId_cardId: { userId: user.id, cardId } },
    create: { userId: user.id, cardId, topic: card.topic, box: next.box, dueAt: next.dueAt, reviews: 1 },
    update: { box: next.box, dueAt: next.dueAt, reviews: { increment: 1 } },
  });
  const xp = known ? XP.cardKnown : XP.cardAgain;
  const unlocked = await recordActivity(user.id, xp);
  return { box: next.box, xp, unlocked };
}

export async function markLessonRead(lessonId: string) {
  const user = await requireUser();
  const lesson = lessonById.get(lessonId);
  if (!lesson) throw new Error("Lekce neexistuje");
  await assertTopicAccess(user.id, lesson.topic);
  const already = await db.lessonRead.findUnique({ where: { userId_lessonId: { userId: user.id, lessonId } } });
  if (already) return { xp: 0, unlocked: [] };
  await db.lessonRead.create({ data: { userId: user.id, lessonId } });
  const unlocked = await recordActivity(user.id, XP.lessonRead);
  return { xp: XP.lessonRead, unlocked };
}

const submitSchema = z.object({
  answers: z.record(z.string(), z.number().int().min(-1)),
  durationSec: z.number().int().min(0),
  permitType: z.enum(["obecne", "rozsirene"]),
});

export async function submitTest(input: z.infer<typeof submitSchema>) {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) throw new Error("Cvičný test vyžaduje aktivní balíček.");
  const { answers, durationSec, permitType } = submitSchema.parse(input);
  const ids = Object.keys(answers).filter((id) => questionById.has(id));
  if (!ids.length || ids.length !== Object.keys(answers).length || ids.length > EXAM.questionCount) {
    throw new Error("Neplatný test");
  }
  const results = ids.map((id) => {
    const q = questionById.get(id)!;
    return { id, topic: q.topic, chosen: answers[id], correctIndex: q.correct, correct: answers[id] === q.correct };
  });
  const score = results.filter((r) => r.correct).length;
  const passed = score >= EXAM.passScore(ids.length, permitType);
  await db.$transaction([
    db.questionAttempt.createMany({
      data: results.map((r) => ({ userId: user.id, questionId: r.id, topic: r.topic, correct: r.correct, mode: "test" })),
    }),
    db.testResult.create({
      data: { userId: user.id, score, total: ids.length, passed, permitType, durationSec: Math.min(durationSec, EXAM.timeLimitMin * 60) },
    }),
  ]);
  const xp = XP.testCompleted + (passed ? XP.testPassed : 0);
  const unlocked = await recordActivity(user.id, xp);
  return { score, total: ids.length, passed, results, xp, unlocked };
}
