"use server";

import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { recordActivity } from "@/lib/progress";
import {
  faultById,
  faultXp,
  gradeFault,
  gradeOrder,
  gradeViolation,
  isFreeItem,
  orderXp,
  procedureById,
  violationById,
  violationXp,
  type WeaponId,
} from "@/content/trainer";

// Trenažér nemá vlastní tabulku: výsledek se vyhodnotí na serveru z dat (src/content/trainer.ts)
// a body se připíšou přes existující recordActivity – tedy i série dní a odznaky.
// Do QuestionAttempt se nic nezapisuje, aby se nezkreslily statistiky okruhů a počty odpovědí.

const id = z.string().min(1).max(120);

async function assertTrainerAccess(userId: string, item: { weapon: WeaponId }) {
  if (isFreeItem(item)) return;
  if (!(await hasAccess(userId))) throw new Error("Tato část trenažéru vyžaduje aktivní balíček.");
}

export async function submitTrainerOrder(procedureId: string, orderedStepIds: string[]) {
  const user = await requireUser();
  const pid = id.parse(procedureId);
  const ordered = z.array(id).max(20).parse(orderedStepIds);
  const procedure = procedureById.get(pid);
  if (!procedure) throw new Error("Postup neexistuje");
  await assertTrainerAccess(user.id, procedure);
  const grade = gradeOrder(procedure, ordered);
  if (!grade.valid) throw new Error("Neplatné pořadí kroků");
  const xp = orderXp(grade);
  const unlocked = await recordActivity(user.id, xp);
  return { correctCount: grade.correctCount, total: grade.total, perfect: grade.perfect, xp, unlocked };
}

export async function submitTrainerFault(scenarioId: string, firstChoices: string[]) {
  const user = await requireUser();
  const sid = id.parse(scenarioId);
  const choices = z.array(id).max(20).parse(firstChoices);
  const scenario = faultById.get(sid);
  if (!scenario) throw new Error("Scénář neexistuje");
  await assertTrainerAccess(user.id, scenario);
  const grade = gradeFault(scenario, choices);
  if (!grade.valid) throw new Error("Neplatné odpovědi");
  const xp = faultXp(grade);
  const unlocked = await recordActivity(user.id, xp);
  return { correctSteps: grade.correctSteps, total: grade.total, perfect: grade.perfect, xp, unlocked };
}

export async function submitTrainerViolation(scenarioId: string, actionId: string) {
  const user = await requireUser();
  const scenario = violationById.get(id.parse(scenarioId));
  if (!scenario) throw new Error("Situace neexistuje");
  await assertTrainerAccess(user.id, scenario);
  const grade = gradeViolation(scenario, id.parse(actionId));
  if (!grade.valid) throw new Error("Neplatná odpověď");
  const xp = violationXp(grade);
  const unlocked = await recordActivity(user.id, xp);
  return { correct: grade.correct, xp, unlocked };
}
