import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { FREE_TOPICS, QUESTIONS, TOPICS, questionById } from "@/content";
import { accessibleTopics, toPublic } from "@/lib/content-access";
import { computeTopicStats } from "@/lib/progress";
import { pickPracticeQuestions } from "@/lib/gamification";
import { Practice } from "@/components/Practice";
import { Paywall } from "@/components/ui";

export const dynamic = "force-dynamic";
const SET_SIZE = 10;

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ okruh?: string; rezim?: string }> }) {
  const user = await requireUser();
  const { okruh, rezim } = await searchParams;
  const paid = await hasAccess(user.id);
  if (okruh && !paid && !FREE_TOPICS.has(okruh)) return <Paywall />;

  let topics = okruh ? [okruh] : accessibleTopics(paid);
  if (rezim === "slabiny") {
    const { stats } = await computeTopicStats(user.id);
    const weakest = stats.filter((s) => topics.includes(s.topic.slug)).sort((a, b) => a.mastery - b.mastery).slice(0, 2);
    topics = weakest.map((s) => s.topic.slug);
  }

  const pool = QUESTIONS.filter((q) => topics.includes(q.topic)).map((q) => q.id);
  const attempts = await db.questionAttempt.findMany({
    where: { userId: user.id, questionId: { in: pool } },
    orderBy: { createdAt: "asc" },
    select: { questionId: true, correct: true },
  });
  const last = new Map(attempts.map((a) => [a.questionId, a.correct]));
  const picked = pickPracticeQuestions(pool, last, SET_SIZE).map((id) => toPublic(questionById.get(id)!));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="mr-auto text-2xl font-bold">Procvičování {rezim === "slabiny" && "– slabá místa"}</h1>
        <Link href="/procvicovani" className={`rounded-full px-3 py-1 text-sm ${!okruh && !rezim ? "bg-brand-600 text-white" : "bg-stone-200"}`}>Náhodně ze všeho</Link>
        <Link href="/procvicovani?rezim=slabiny" className={`rounded-full px-3 py-1 text-sm ${rezim === "slabiny" ? "bg-brand-600 text-white" : "bg-stone-200"}`}>⚠ Slabá místa</Link>
        {TOPICS.map((t) => (
          <Link key={t.slug} href={`/procvicovani?okruh=${t.slug}`} className={`rounded-full px-3 py-1 text-sm ${okruh === t.slug ? "bg-brand-600 text-white" : "bg-stone-200"}`}>
            {t.icon} {t.title}{!paid && !FREE_TOPICS.has(t.slug) ? " 🔒" : ""}
          </Link>
        ))}
      </div>
      <Practice key={`${okruh}-${rezim}-${picked.map((p) => p.id).join()}`} questions={picked} />
    </div>
  );
}
