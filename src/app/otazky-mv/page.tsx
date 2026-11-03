import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS } from "@/content";
import {
  MV_ALL,
  MV_EXCLUDED,
  MV_FREE_SAMPLE_SIZE,
  MV_GROUPS,
  MV_META,
  MV_QUESTIONS,
  MV_TOPIC_GROUP,
  MV_TOPIC_RANGES,
  mvGroup,
  mvSectionCounts,
} from "@/content/mv";
import { MvBadge } from "@/components/mv/MvLocked";
import { numRanges } from "@/components/mv/format";
import { ProgressBar } from "@/components/ui";
import { getMvProgress, getMvViewer } from "./lib";

export const metadata: Metadata = {
  title: "Oficiální otázky MV – Zbroják do kapsy",
  description: `Všech ${MV_ALL.length} otázek oficiálního souboru MV ČR (verze ${MV_META.version}) se správnými odpověďmi – procházení, procvičování a náhodný test nanečisto.`,
};

export default async function MvHubPage() {
  const { user, paid } = await getMvViewer();
  const progress = user ? await getMvProgress(user.id) : null;
  const sections = mvSectionCounts();
  const excludedRanges = numRanges(MV_EXCLUDED.map((q) => q.num));

  const actions = [
    {
      href: "/otazky-mv/prochazet",
      title: "Procházet a hledat",
      text: "Všechny otázky podle oddílu a okruhu, hledání v textu, skok na číslo. Správnou odpověď si odkryjete.",
      badge: paid ? null : `Ukázka ${MV_FREE_SAMPLE_SIZE} otázek zdarma`,
    },
    {
      href: "/otazky-mv/procvicovani",
      title: "Procvičovat",
      text: "Sady po 10 otázkách: náhodně, podle oddílu nebo okruhu, případně jen ty, ve kterých jste chybovali.",
      badge: paid ? null : "Ukázka zdarma po přihlášení",
    },
    {
      href: "/otazky-mv/test",
      title: "Test nanečisto z otázek MV",
      text: `30 náhodných otázek ve skladbě zkoušky (${MV_GROUPS.map((g) => g.count).join(" / ")}), 40 minut, hranice 26 nebo 28 správných.`,
      badge: paid ? null : "V balíčku",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500">Soubor MV · verze {MV_META.version}</p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Oficiální otázky MV</h1>
        <p className="max-w-2xl text-lg text-stone-700">
          Otázky, ze kterých se skládá teoretická část zkoušky odborné způsobilosti, v doslovném znění a se správnými
          odpověďmi. Procházejte je, procvičujte a vyzkoušejte si test nanečisto.
        </p>
      </header>

      <dl className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "otázek v aplikaci", value: MV_QUESTIONS.length },
          { label: "s fotografií vyřazeno", value: MV_EXCLUDED.length },
          { label: "otázek v souboru MV", value: MV_ALL.length },
        ].map((s) => (
          <div key={s.label} className="card p-3 sm:p-5">
            <dt className="text-xs text-stone-500 sm:text-sm">{s.label}</dt>
            <dd className="font-mono text-2xl font-bold sm:text-3xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      {progress && (
        <section className="card" aria-labelledby="mv-pokrok">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="mv-pokrok" className="font-bold">Váš pokrok v otázkách MV</h2>
            <span className="font-mono text-sm text-stone-600">
              {progress.answered} / {progress.total}
            </span>
          </div>
          <ProgressBar value={progress.total ? progress.correct / progress.total : 0} className="mt-3" />
          <p className="mt-2 text-sm text-stone-600">
            Zodpovězeno <span className="font-mono">{progress.answered}</span>, naposledy správně{" "}
            <span className="font-mono">{progress.correct}</span>, naposledy chybně <span className="font-mono">{progress.wrong}</span>.
          </p>
          {progress.wrong > 0 && (
            <Link href="/otazky-mv/procvicovani?rezim=chybne" className="btn-secondary mt-3 w-full sm:w-auto">
              Procvičit chybné otázky
            </Link>
          )}
        </section>
      )}

      <section aria-label="Režimy" className="grid gap-4 md:grid-cols-3">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="card group flex flex-col gap-2 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2">
            <h2 className="text-lg font-bold group-hover:underline">{a.title}</h2>
            <p className="text-sm text-stone-600">{a.text}</p>
            {a.badge && (
              <span className="mt-auto pt-2">
                <MvBadge tone={a.badge === "V balíčku" ? "stone" : "brand"}>{a.badge}</MvBadge>
              </span>
            )}
          </Link>
        ))}
      </section>

      {!user && (
        <p className="text-sm text-stone-600">
          Procvičování a test ukládají váš pokrok, proto vyžadují{" "}
          <Link href="/registrace" className="font-semibold text-brand-700 underline underline-offset-2">účet</Link>.
        </p>
      )}

      <section className="space-y-3" aria-labelledby="mv-oddily">
        <h2 id="mv-oddily" className="text-xl font-bold">Oddíly souboru</h2>
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th scope="col" className="px-4 py-3">Oddíl</th>
                <th scope="col" className="px-4 py-3">Čísla</th>
                <th scope="col" className="px-4 py-3 text-right">V aplikaci</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s) => (
                <tr key={s.key} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/otazky-mv/prochazet?oddil=${s.key}`} className="font-semibold hover:underline">
                      {s.key}. {s.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-stone-600">{s.from}–{s.to}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-mono">
                    {s.included}
                    {s.included !== s.total && <span className="text-stone-500"> / {s.total}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card space-y-2" aria-labelledby="mv-vyrazene">
        <h2 id="mv-vyrazene" className="font-bold">Proč chybí {MV_EXCLUDED.length} otázek</h2>
        <p className="text-sm text-stone-700">
          Otázky č. <span className="font-mono">{excludedRanges}</span> se odkazují na fotografie zbraní a střeliva v PDF
          ministerstva. U fotografií není jasné, komu patří autorská práva, proto je zatím nepřebíráme a otázky bez nich
          nedávají smysl. V testu nanečisto se proto neobjeví. Pojmy, na které se ptají, vysvětluje okruh{" "}
          <Link href="/okruhy/nauka" className="font-semibold text-brand-700 underline underline-offset-2">Nauka o zbraních a střelivu</Link>.
        </p>
      </section>

      <details className="card group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 font-bold">
          Jak otázky řadíme do okruhů aplikace
          <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-stone-500 transition group-open:rotate-180">
            <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <p className="mt-2 text-sm text-stone-600">
          Ministerstvo okruhy nezveřejňuje; otázky řadíme podle čísel. Skupina určuje, do které části testu nanečisto otázka patří
          (zkouška má 17 otázek z právních předpisů, 5 z nauky o zbraních, 5 ze zásad bezpečného zacházení a 3 ze zdravotnického minima).
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th scope="col" className="py-2 pr-3">Okruh</th>
                <th scope="col" className="py-2 pr-3">Čísla otázek</th>
                <th scope="col" className="py-2">Skupina testu</th>
              </tr>
            </thead>
            <tbody>
              {TOPICS.map((t) => (
                <tr key={t.slug} className="border-t border-stone-100 align-top">
                  <td className="py-2 pr-3">
                    <Link href={`/otazky-mv/prochazet?okruh=${t.slug}`} className="font-semibold hover:underline">{t.title}</Link>
                  </td>
                  <td className="py-2 pr-3 font-mono text-stone-600">
                    {MV_TOPIC_RANGES.filter((r) => r.topic === t.slug).map((r) => `${r.from}–${r.to}`).join(", ")}
                  </td>
                  <td className="py-2 text-stone-600">{mvGroup(MV_TOPIC_GROUP[t.slug]).short}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
