import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { computeTopicStats } from "@/lib/progress";
import { LESSONS, FREE_TOPICS } from "@/content";
import { ProgressBar, pct } from "@/components/ui";

export default async function TopicsPage() {
  const user = await requireUser();
  const [paid, { stats }] = await Promise.all([hasAccess(user.id), computeTopicStats(user.id)]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Výklad podle okruhů</h1>
        <p className="text-stone-600">Každý okruh obsahuje výklad, vysvětlivky pojmů, kartičky a otázky k procvičení.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((s) => {
          const locked = !paid && !FREE_TOPICS.has(s.topic.slug);
          return (
            <Link key={s.topic.slug} href={`/okruhy/${s.topic.slug}`} className="card block transition hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold">{s.topic.icon} {s.topic.title}</h2>
                {locked ? <span title="V placeném balíčku">🔒</span> : FREE_TOPICS.has(s.topic.slug) && !paid ? <span className="rounded-full bg-brand-100 px-2 text-xs font-semibold text-brand-700">zdarma</span> : null}
              </div>
              <p className="mt-1 text-sm text-stone-600">{s.topic.summary}</p>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={s.mastery} />
                <span className="text-sm font-semibold">{pct(s.mastery)}</span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                {LESSONS.filter((l) => l.topic === s.topic.slug).length} lekcí · {s.questions.total} otázek · {s.cardsTotal} kartiček
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
