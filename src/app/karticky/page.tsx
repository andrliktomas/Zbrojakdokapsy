import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { FLASHCARDS, FREE_TOPICS, TOPICS, topicBySlug } from "@/content";
import { accessibleTopics } from "@/lib/content-access";
import { FlashcardDeck } from "@/components/FlashcardDeck";
import { LockIcon, PageHeader, Paywall } from "@/components/ui";
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
      <PageHeader eyebrow="Chytré opakování" title="Učební kartičky">
        Co umíte, uvidíte méně často. Co neumíte, vrátí se ještě v této sadě.
      </PageHeader>
      <nav aria-label="Výběr okruhu" className="-mx-4 sm:mx-0">
        <ul className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] sm:flex-wrap sm:overflow-visible sm:px-0">
          <li>
            <Link href="/karticky" aria-current={!okruh ? "page" : undefined} className={!okruh ? "pill-active" : "pill"}>
              Vše
            </Link>
          </li>
          {TOPICS.map((t) => {
            const locked = !paid && !FREE_TOPICS.has(t.slug);
            const active = okruh === t.slug;
            return (
              <li key={t.slug}>
                <Link
                  href={`/karticky?okruh=${t.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`${active ? "pill-active" : "pill"} ${locked ? "text-ocel" : ""}`}
                >
                  {t.title}
                  {locked && (
                    <>
                      <LockIcon size={13} />
                      <span className="sr-only">(v placeném balíčku)</span>
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <FlashcardDeck key={okruh ?? "all"} cards={session} />
    </div>
  );
}
