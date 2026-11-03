"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { pragueDay } from "@/lib/gamification";
import { examDateError } from "@/lib/plan";

export type ExamPlanState =
  | { status: "error"; error: string }
  | { status: "saved" | "cleared"; at: number }
  | undefined;

/** Schéma se skládá při každém volání, aby "dnes" odpovídalo okamžiku odeslání (pražský čas). */
function examPlanSchema(today: string) {
  return z.object({
    examDate: z
      .string()
      .trim()
      .superRefine((value, ctx) => {
        const error = examDateError(value, today);
        if (error) ctx.addIssue({ code: "custom", message: error });
      }),
    targetPermit: z.enum(["obecne", "rozsirene"], { message: "Vyberte typ zbrojního oprávnění." }),
  });
}

/** Uloží, změní nebo (intent=clear) smaže termín zkoušky a cílový typ oprávnění. */
export async function saveExamPlan(_: ExamPlanState, formData: FormData): Promise<ExamPlanState> {
  const user = await requireUser();

  if (formData.get("intent") === "clear") {
    await db.user.update({ where: { id: user.id }, data: { examDate: null, targetPermit: null } });
    revalidatePath("/prehled");
    return { status: "cleared", at: Date.now() };
  }

  const parsed = examPlanSchema(pragueDay()).safeParse({
    examDate: String(formData.get("examDate") ?? ""),
    targetPermit: formData.get("targetPermit") ?? undefined,
  });
  if (!parsed.success) return { status: "error", error: parsed.error.issues[0].message };

  await db.user.update({
    where: { id: user.id },
    data: { examDate: parsed.data.examDate, targetPermit: parsed.data.targetPermit },
  });
  revalidatePath("/prehled");
  return { status: "saved", at: Date.now() };
}
