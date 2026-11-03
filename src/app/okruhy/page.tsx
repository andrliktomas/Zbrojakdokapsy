import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { computeTopicStats } from "@/lib/progress";
import { LESSONS, FREE_TOPICS } from "@/content";
import { LockIcon, PageHeader, ProgressBar, pct, plural } from "@/components/ui";

export default async function TopicsPage() {
  const user = await requireUser();
  const [paid, { stats }] = await Promise.all([hasAccess(user.id), computeTopicStats(user.id)]);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={`${stats.length} ${plural(stats.length, "okruh", "okruhy", "okruhů")} podle zkoušky`} title="Výklad podle okruhů">
        Každý okruh obsahuje výklad, vysvětlivky pojmů, kartičky a otázky k procvičení.
      </PageHeader>
      {!paid && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border-l-4 border-signal bg-white px-4 py-3 ring-1 ring-line">
          <span>Okruhy označené <span className="chip-outline text-zasah">Zdarma</span> máte k dispozici hned. Ostatní odemkne balíček.</span>
          <Link href="/cenik" className="link">Ceník</Link>
        </p>
      )}
      <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {stats.map((s, i) => {
          const free = FREE_TOPICS.has(s.topic.slug);
          const locked = !paid && !free;
          const lessons = LESSONS.filter((l) => l.topic === s.topic.slug).length;
          return (
            <li key={s.topic.slug}>
              <Link
                href={`/okruhy/${s.topic.slug}`}
                className="card group flex h-full flex-col gap-3 transition-shadow hover:ring-2 hover:ring-ink"
              >
                <div className="flex items-start gap-3">
                  <span className="pt-1 font-mono text-sm font-semibold text-ocel">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="flex-1 text-lg leading-snug font-extrabold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                    {s.topic.title}
                  </h2>
                  {locked ? (
                    <span className="chip-outline mt-0.5 shrink-0 text-ocel">
                      <LockIcon size={12} />
                      Balíček
                    </span>
                  ) : free && !paid ? (
                    <span className="chip-outline mt-0.5 shrink-0 text-zasah">Zdarma</span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-stone-700">{s.topic.summary}</p>
                <div className="mt-auto flex items-center gap-3 pt-1">
                  <ProgressBar value={s.mastery} label={`Zvládnutí okruhu ${s.topic.title}`} />
                  <span className="num w-12 shrink-0 text-right text-sm">{pct(s.mastery)}</span>
                </div>
                <p className="font-mono text-xs text-ocel [word-spacing:-0.2em]">
                  {lessons} {plural(lessons, "lekce", "lekce", "lekcí")} · {s.questions.total}{" "}
                  {plural(s.questions.total, "otázka", "otázky", "otázek")} · {s.cardsTotal}{" "}
                  {plural(s.cardsTotal, "kartička", "kartičky", "kartiček")}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
