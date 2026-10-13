import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { FLASHCARDS, FREE_TOPICS, TOPICS, topicBySlug } from "@/content";
import { accessibleTopics } from "@/lib/content-access";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { Paywall } from "@/components/ui";
import { shuffle } from "@/lib/gamification";

const SESSION_SIZE = 20;

export default async function CardsPage({ searchParams }: { searchParams: Promise<{ okruh?: string }> }) {
  const user = await requireUser();
  const { okruh } = await searchParams;
  const paid = await hasAccess(user.id);
  if (okruh && !paid && !FREE_TOPICS.has(okruh)) return <Paywall />;

  const topics = okruh ? [okruh] : accessibleTopics(paid);
  const pool = FLASHCARDS.filter((c) => topics.includes(c.topic));
  const progress = new Map(
    (await db.cardProgress.findMany({ where: { userId: user.id, cardId: { in: pool.map((c) => c.id) } } })).map((p) => [p.cardId, p]),
  );
  const now = new Date();
  // Nejdřív kartičky "na řadě" (od nejnižší přihrádky), pak nové.
  const due = pool
    .filter((c) => progress.has(c.id) && progress.get(c.id)!.dueAt <= now)
    .sort((a, b) => progress.get(a.id)!.box - progress.get(b.id)!.box);
  const fresh = shuffle(pool.filter((c) => !progress.has(c.id)));
  const session = [...due, ...fresh].slice(0, SESSION_SIZE).map((c) => ({
    id: c.id, front: c.front, back: c.back, topicTitle: topicBySlug(c.topic)?.title ?? "", box: progress.get(c.id)?.box ?? 1,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="mr-auto text-2xl font-bold">Učební kartičky</h1>
        <Link href="/karticky" className={`rounded-full px-3 py-1 text-sm ${!okruh ? "bg-brand-600 text-white" : "bg-stone-200"}`}>Vše</Link>
        {TOPICS.map((t) => (
          <Link key={t.slug} href={`/karticky?okruh=${t.slug}`} className={`rounded-full px-3 py-1 text-sm ${okruh === t.slug ? "bg-brand-600 text-white" : "bg-stone-200"}`}>
            {t.icon} {t.title}{!paid && !FREE_TOPICS.has(t.slug) ? " 🔒" : ""}
          </Link>
        ))}
      </div>
      <FlashcardDeck key={okruh ?? "all"} cards={session} />
    </div>
  );
}
