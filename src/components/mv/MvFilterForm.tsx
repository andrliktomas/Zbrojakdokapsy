import Link from "next/link";
import { TOPICS } from "@/content";
import { MV_SECTIONS, mvSection, mvTopicTitle } from "@/content/mv";

type Props = {
  action: string;
  section?: string;
  topic?: string;
  query?: string;
  /** Pole pro hledání v textu (procházení). */
  withSearch?: boolean;
  /** Skryté pole, které se má při změně výběru zachovat (např. rezim=chybne). */
  keep?: Record<string, string | undefined>;
  submitLabel: string;
};

/**
 * Filtr přes GET formulář – funguje i bez JavaScriptu a výsledek jde sdílet odkazem.
 * Volba oddílu a okruhu je sbalená, aby na telefonu nezabírala místo před otázkami.
 */
export function MvFilterForm({ action, section, topic, query, withSearch, keep, submitLabel }: Props) {
  const active = Boolean(section || topic || query);
  const summary = [
    section ? `${section}. ${mvSection(section)?.title}` : "všechny oddíly",
    topic ? mvTopicTitle(topic) : "všechny okruhy",
  ].join(" · ");
  return (
    <form action={action} method="get" className="card space-y-3 p-4">
      {Object.entries(keep ?? {}).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      {withSearch && (
        <div>
          <label className="label" htmlFor="mv-hledat">Hledat v textu otázek a odpovědí</label>
          <div className="flex gap-2">
            <input id="mv-hledat" name="hledat" type="search" defaultValue={query} placeholder="např. krajní nouze" className="input" />
            <button className="btn-primary shrink-0">Hledat</button>
          </div>
        </div>
      )}
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-lg text-sm">
          <span>
            <span className="font-semibold">Oddíl a okruh:</span> <span className="text-stone-600">{summary}</span>
          </span>
          <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-stone-500 transition group-open:rotate-180">
            <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="mv-oddil">Oddíl souboru MV</label>
            <select id="mv-oddil" name="oddil" defaultValue={section ?? ""} className="input">
              <option value="">Všechny oddíly</option>
              {MV_SECTIONS.map((s) => (
                <option key={s.key} value={s.key}>{s.key}. {s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="mv-okruh">Okruh aplikace</label>
            <select id="mv-okruh" name="okruh" defaultValue={topic ?? ""} className="input">
              <option value="">Všechny okruhy</option>
              {TOPICS.map((t) => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <button className="btn-primary flex-1 sm:flex-none">{submitLabel}</button>
            {active && <Link href={action} className="btn-secondary">Zrušit výběr</Link>}
          </div>
        </div>
      </details>
    </form>
  );
}
