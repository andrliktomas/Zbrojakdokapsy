import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { EXAM, QUESTIONS } from "@/content";
import { toPublic } from "@/lib/content-access";
import { shuffle } from "@/lib/gamification";
import { MockTest } from "@/components/MockTest";
import { Paywall } from "@/components/ui";

export const dynamic = "force-dynamic";

/** Sestaví test: z každého okruhu poměrný počet otázek podle EXAM.distribution, zbytek náhodně. */
function buildTest() {
  const chosen: string[] = [];
  for (const [topic, count] of Object.entries(EXAM.distribution)) {
    chosen.push(...shuffle(QUESTIONS.filter((q) => q.topic === topic)).slice(0, count).map((q) => q.id));
  }
  const rest = shuffle(QUESTIONS.filter((q) => !chosen.includes(q.id)));
  while (chosen.length < EXAM.questionCount && rest.length) chosen.push(rest.pop()!.id);
  return shuffle(chosen.slice(0, EXAM.questionCount)).map((id) => toPublic(QUESTIONS.find((q) => q.id === id)!));
}

export default async function TestPage() {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) return <Paywall message="Testy nanečisto jsou součástí placeného balíčku." />;
  const questions = buildTest();
  return <MockTest questions={questions} timeLimitMin={EXAM.timeLimitMin} passScore={EXAM.passScore(questions.length)} />;
}
