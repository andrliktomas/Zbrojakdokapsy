import "server-only";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { MV_QUESTIONS, mvNumFromId } from "@/content/mv";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const param = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

/** Přihlášený uživatel (nebo null) a zda má aktivní balíček. */
export async function getMvViewer() {
  const user = await getCurrentUser();
  const paid = user ? await hasAccess(user.id) : false;
  return { user, paid };
}

/** Výsledek posledního pokusu u každé otázky MV (procvičování i test). */
export async function getMvLastResults(userId: string) {
  const attempts = await db.questionAttempt.findMany({
    where: { userId, questionId: { startsWith: "mv-" } },
    orderBy: { createdAt: "asc" },
    select: { questionId: true, correct: true },
  });
  const last = new Map<number, boolean>();
  for (const a of attempts) {
    const n = mvNumFromId(a.questionId);
    if (n !== null) last.set(n, a.correct);
  }
  return last;
}

export async function getMvProgress(userId: string) {
  const last = await getMvLastResults(userId);
  const included = new Set(MV_QUESTIONS.map((q) => q.num));
  let answered = 0;
  let wrong = 0;
  for (const [n, ok] of last) {
    if (!included.has(n)) continue;
    answered++;
    if (!ok) wrong++;
  }
  return { answered, wrong, correct: answered - wrong, total: MV_QUESTIONS.length };
}
