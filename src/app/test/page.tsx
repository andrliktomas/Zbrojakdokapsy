import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { EXAM, QUESTIONS, questionById, type PermitType } from "@/content";
import { toPublic } from "@/lib/content-access";
import { shuffle } from "@/lib/gamification";
import { MockTest } from "@/components/MockTest";
import { Paywall } from "@/components/ui";

export const dynamic = "force-dynamic";

/** Sestaví test ve skladbě skutečné zkoušky (EXAM.groups); chybějící doplní náhodně z celé banky. */
function buildTest() {
  const chosen = new Set<string>();
  for (const group of EXAM.groups) {
    const pool = shuffle(QUESTIONS.filter((q) => group.topics.includes(q.topic)));
    pool.slice(0, group.count).forEach((q) => chosen.add(q.id));
  }
  const rest = shuffle(QUESTIONS.filter((q) => !chosen.has(q.id)));
  while (chosen.size < EXAM.questionCount && rest.length) chosen.add(rest.pop()!.id);
  return shuffle([...chosen]).map((id) => toPublic(questionById.get(id)!));
}

export default async function TestPage({ searchParams }: { searchParams: Promise<{ typ?: string }> }) {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) return <Paywall message="Testy nanečisto jsou součástí placeného balíčku." />;
  const { typ } = await searchParams;
  const permitType: PermitType = typ === "rozsirene" ? "rozsirene" : "obecne";
  const questions = buildTest();
  return (
    <MockTest
      key={permitType}
      questions={questions}
      permitType={permitType}
      timeLimitMin={EXAM.timeLimitMin}
      passScore={EXAM.passScore(questions.length, permitType)}
    />
  );
}
