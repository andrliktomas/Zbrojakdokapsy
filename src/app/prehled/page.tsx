import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getAccessEnd } from "@/lib/access";
import { getDashboard } from "@/lib/progress";
import { ProgressBar, Stat, pct } from "@/components/ui";
import { EXAM } from "@/content";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ vitej?: string }> }) {
  const user = await requireUser();
  const [d, accessEnd, sp] = await Promise.all([getDashboard(user.id), getAccessEnd(user.id), searchParams]);
  const maxDay = Math.max(1, ...d.last7.map((x) => x.count));
  const readiness = d.overall;

  return (
    <div className="space-y-6">
      {sp.vitej && (
        <div className="card bg-brand-50 ring-brand-200">
          <h2 className="font-bold">Vítejte, {user.name}! 👋</h2>
          <p className="text-stone-700">Začněte výkladem prvního okruhu, nebo si rovnou vyzkoušejte pár otázek. Ukázkové okruhy jsou zdarma.</p>
        </div>
      )}
      {!accessEnd && (
        <div className="card flex flex-wrap items-center justify-between gap-3 bg-amber-50 ring-amber-200">
          <p>Máte přístup jen k ukázkovým okruhům. Odemkněte celou přípravu včetně testů nanečisto.</p>
          <Link href="/cenik" className="btn-accent">Odemknout vše</Link>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="card md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-stone-500">Level {d.level.level}</div>
              <div className="text-xl font-bold">{d.level.title}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-brand-700">{d.user.xp} XP</div>
              <div className="text-xs text-stone-500">do dalšího levelu {d.level.needed - d.level.current} XP</div>
            </div>
          </div>
          <ProgressBar value={d.level.progress} className="mt-3" />
        </div>
        <Stat label="Série" value={`🔥 ${d.streak} ${d.streak === 1 ? "den" : d.streak >= 2 && d.streak <= 4 ? "dny" : "dní"}`} hint={`Nejlepší: ${d.user.bestStreak}`} />
        <Stat label="Připravenost ke zkoušce" value={pct(readiness)} hint={readiness >= 0.8 ? "Výborně, jste připraveni!" : "Cíl: všechny okruhy nad 80 %"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Zvládnutí okruhů</h2>
            <span className="text-xs text-stone-500">otázka je zvládnutá po 2 správných odpovědích v řadě</span>
          </div>
          <ul className="space-y-3">
            {d.stats.map((s) => (
              <li key={s.topic.slug}>
                <div className="flex items-center justify-between text-sm">
                  <Link href={`/okruhy/${s.topic.slug}`} className="font-medium hover:underline">
                    {s.topic.icon} {s.topic.title}
                  </Link>
                  <span className="flex items-center gap-2">
                    {s.trend.delta !== null && s.trend.recentCount >= 5 && Math.abs(s.trend.delta) >= 0.1 && (
                      <span className={s.trend.delta > 0 ? "text-brand-600" : "text-red-600"}>
                        {s.trend.delta > 0 ? "▲" : "▼"} {Math.round(Math.abs(s.trend.delta) * 100)} %
                      </span>
                    )}
                    <b>{pct(s.mastery)}</b>
                  </span>
                </div>
                <ProgressBar value={s.mastery} className="mt-1" />
                <div className="mt-0.5 text-xs text-stone-500">
                  {s.questions.mastered}/{s.questions.total} otázek · kartičky {s.cardsSeen}/{s.cardsTotal} · úspěšnost {pct(s.accuracy)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h2 className="mb-2 font-bold">Na čem zapracovat</h2>
            {d.weak.length === 0 ? (
              <p className="text-sm text-stone-600">Všechny okruhy máte nad 80 %. Zkuste test nanečisto!</p>
            ) : (
              <ul className="space-y-2">
                {d.weak.map((s) => (
                  <li key={s.topic.slug} className="flex items-center justify-between gap-2 text-sm">
                    <span>{s.topic.icon} {s.topic.title}</span>
                    <Link href={`/procvicovani?okruh=${s.topic.slug}`} className="shrink-0 font-semibold text-brand-700">Procvičit →</Link>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/procvicovani?rezim=slabiny" className="btn-primary mt-3 w-full">Procvičit slabá místa</Link>
          </div>

          {(d.improving.length > 0 || d.declining.length > 0) && (
            <div className="card text-sm">
              <h2 className="mb-2 font-bold">Vývoj za poslední týden</h2>
              {d.improving.map((s) => <p key={s.topic.slug} className="text-brand-700">▲ Zlepšujete se: {s.topic.title}</p>)}
              {d.declining.map((s) => <p key={s.topic.slug} className="text-red-600">▼ Pozor, zhoršení: {s.topic.title}</p>)}
            </div>
          )}

          <div className="card">
            <h2 className="mb-2 font-bold">Dnes</h2>
            <p className="text-sm">Kartiček k opakování: <b>{d.dueCards}</b></p>
            <Link href="/karticky" className="btn-secondary mt-2 w-full">Opakovat kartičky</Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card">
          <h2 className="mb-3 font-bold">Aktivita – posledních 7 dní</h2>
          <div className="flex h-28 gap-2">
            {d.last7.map((x) => (
              <div key={x.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-1 flex-col justify-end">
                  <div className="flex w-full flex-col justify-end overflow-hidden rounded-t bg-brand-200" style={{ height: `${(x.count / maxDay) * 100}%` }} title={`${x.count} odpovědí, ${x.correct} správně`}>
                    <div className="w-full bg-brand-500" style={{ height: x.count ? `${(x.correct / x.count) * 100}%` : 0 }} />
                  </div>
                </div>
                <span className="text-[10px] text-stone-500">{new Date(x.day).toLocaleDateString("cs-CZ", { weekday: "short" })}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-500">Tmavě = správné odpovědi. Celkem odpovědí: {d.totalAnswers}</p>
        </div>

        <div className="card">
          <h2 className="mb-2 font-bold">Testy nanečisto</h2>
          {d.tests.length === 0 ? (
            <p className="text-sm text-stone-600">Zatím žádný. Test má {EXAM.questionCount} otázek a {EXAM.timeLimitMin} minut.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {d.tests.map((t) => (
                <li key={t.id} className="flex justify-between">
                  <span>{t.createdAt.toLocaleDateString("cs-CZ")}</span>
                  <span className={t.passed ? "font-semibold text-brand-700" : "text-red-600"}>
                    {t.permitType === "rozsirene" ? "rozš. " : ""}{t.score}/{t.total} {t.passed ? "✔" : "✘"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/test" className="btn-secondary mt-3 w-full">Spustit test</Link>
        </div>

        <div className="card">
          <h2 className="mb-2 font-bold">Odznaky</h2>
          <div className="grid grid-cols-4 gap-2">
            {d.achievements.map((a) => (
              <div
                key={a.code}
                title={`${a.title} – ${a.description}`}
                className={`grid aspect-square place-items-center rounded-xl text-2xl ${a.unlockedAt ? "bg-accent-400/30" : "bg-stone-100 opacity-40 grayscale"}`}
              >
                {a.icon}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-500">
            Získáno {d.achievements.filter((a) => a.unlockedAt).length} z {d.achievements.length}
          </p>
        </div>
      </div>
    </div>
  );
}
