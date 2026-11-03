import Link from "next/link";
import { EXAM, FLASHCARDS, QUESTIONS, TOPICS } from "@/content";
import { PLANS } from "@/lib/plans";
import { typo } from "./typo";

/** Výzva k registraci na konci článku a rozcestníku. Čísla a ceny se berou přímo z obsahu a ceníku aplikace. */
export function ArticleCta({ headingId = "cta" }: { headingId?: string }) {
  const minPrice = Math.min(...PLANS.map((p) => p.priceCzk));
  const skladba = EXAM.groups.map((g) => g.count).join("/");
  const features = [
    `Výklad všech ${TOPICS.length} zkouškových okruhů s odkazy na paragrafy`,
    `${QUESTIONS.length} otázek s vysvětlením a ${FLASHCARDS.length} učebních kartiček`,
    `Test nanečisto: ${EXAM.questionCount} otázek ve skladbě ${skladba}, ${EXAM.timeLimitMin} minut`,
  ];
  return (
    <section aria-labelledby={headingId} className="mt-14 rounded-2xl bg-stone-900 p-6 text-stone-100 sm:p-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent-400">Zbroják do kapsy</p>
      <h2 id={headingId} className="mt-2 text-2xl font-extrabold leading-tight text-white">
        {typo("Připravte se na zkoušku v aplikaci")}
      </h2>
      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.95em] marker:text-accent-400">
        {features.map((f) => (
          <li key={f} className="pl-1">
            {typo(f)}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-stone-300">
        {typo(`Ukázkové okruhy jsou po registraci zdarma. Plný přístup od ${minPrice} Kč, jednorázová platba bez automatického obnovování.`)}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/registrace" className="btn-primary px-6 py-3">
          Vyzkoušet zdarma
        </Link>
        <Link href="/cenik" className="btn-secondary px-6 py-3">
          Ceník
        </Link>
      </div>
    </section>
  );
}
