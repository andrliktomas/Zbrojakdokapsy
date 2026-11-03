import type { Metadata } from "next";
import Link from "next/link";
import {
  MV_FREE_NUMS,
  MV_FREE_SAMPLE_SIZE,
  MV_QUESTIONS,
  filterMv,
  mvAnyByNum,
  mvSection,
  mvTopicSlugs,
  mvTopicTitle,
} from "@/content/mv";
import { MvBrowseList, type MvBrowseItem } from "@/components/mv/MvBrowseList";
import { MvFilterForm } from "@/components/mv/MvFilterForm";
import { MvLocked } from "@/components/mv/MvLocked";
import { plural } from "@/components/mv/format";
import { getMvViewer, param, type SearchParams } from "../lib";

export const metadata: Metadata = { title: "Procházet otázky MV – Zbroják do kapsy" };

const PAGE_SIZE = 20;

export default async function MvBrowsePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const { user, paid } = await getMvViewer();

  const sectionParam = param(sp.oddil);
  const topicParam = param(sp.okruh);
  const section = sectionParam && mvSection(sectionParam) ? sectionParam : undefined;
  const topic = topicParam && mvTopicSlugs.includes(topicParam) ? topicParam : undefined;
  const query = param(sp.hledat)?.slice(0, 100);
  const jump = Number(param(sp.od));

  const pool = paid ? MV_QUESTIONS : MV_QUESTIONS.filter((q) => MV_FREE_NUMS.has(q.num));
  let notice: string | null = null;
  let target: number | undefined;
  let filters = { section, topic, query };

  // Skok na číslo otázky: zruší filtry a otevře stránku, na které otázka je.
  if (Number.isInteger(jump) && jump > 0) {
    filters = { section: undefined, topic: undefined, query: undefined };
    const any = mvAnyByNum(jump);
    if (!any) notice = `Otázka č. ${jump} v souboru není. Soubor MV má otázky č. 1–837.`;
    else if (any.image) notice = `Otázka č. ${jump} se odkazuje na fotografii z PDF ministerstva, a proto ji zatím neuvádíme.`;
    else if (!pool.some((q) => q.num === jump)) notice = `Otázka č. ${jump} je v placeném balíčku. Bez balíčku si můžete prohlédnout prvních ${MV_FREE_SAMPLE_SIZE} otázek.`;
    else target = jump;
  }

  const filtered = filterMv(filters, pool);
  const lockedMatches = paid ? 0 : filterMv(filters).length - filtered.length;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requested = Number(param(sp.strana)) || 1;
  const page = target
    ? Math.floor(filtered.findIndex((q) => q.num === target) / PAGE_SIZE) + 1
    : Math.min(Math.max(1, requested), pageCount);
  const items: MvBrowseItem[] = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((q) => ({
    num: q.num,
    section: q.section,
    topicTitle: mvTopicTitle(q.topic),
    q: q.q,
    answers: q.answers,
    correct: q.correct,
  }));

  const pageHref = (p: number) => {
    const u = new URLSearchParams();
    if (filters.section) u.set("oddil", filters.section);
    if (filters.topic) u.set("okruh", filters.topic);
    if (filters.query) u.set("hledat", filters.query);
    if (p > 1) u.set("strana", String(p));
    const s = u.toString();
    return `/otazky-mv/prochazet${s ? `?${s}` : ""}`;
  };
  const first = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const last = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <div className="max-w-3xl space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Procházet otázky MV</h1>
        <p className="text-stone-600">
          {paid
            ? "Filtrujte podle oddílu a okruhu, hledejte v textu nebo skočte na číslo otázky."
            : `Bez balíčku vidíte ukázku – prvních ${MV_FREE_SAMPLE_SIZE} otázek souboru.`}
        </p>
      </header>

      <MvFilterForm action="/otazky-mv/prochazet" section={filters.section} topic={filters.topic} query={filters.query} withSearch submitLabel="Použít výběr" />

      <form action="/otazky-mv/prochazet" method="get" className="flex items-center gap-2">
        <label className="shrink-0 text-sm font-medium text-stone-700" htmlFor="mv-od">Přejít na otázku č.</label>
        <input
          id="mv-od"
          name="od"
          type="number"
          inputMode="numeric"
          min={1}
          max={837}
          required
          defaultValue={target}
          className="input w-24 font-mono"
        />
        <button className="btn-secondary">Přejít</button>
      </form>

      {notice && (
        <p role="status" className="rounded-xl bg-accent-400/20 px-4 py-3 text-sm text-stone-900 ring-1 ring-accent-400/60">{notice}</p>
      )}

      <p className="text-sm text-stone-600" aria-live="polite">
        {filtered.length ? (
          <>
            Zobrazeno <span className="font-mono">{first}–{last}</span> z <span className="font-mono">{filtered.length}</span>{" "}
            {plural(filtered.length, ["otázky", "otázek", "otázek"])}
          </>
        ) : (
          "Filtru neodpovídá žádná dostupná otázka."
        )}
      </p>

      {items.length > 0 && <MvBrowseList key={`${page}-${target ?? ""}`} items={items} highlight={target} />}

      {pageCount > 1 && (
        <nav aria-label="Stránkování" className="flex items-center justify-between gap-2">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="btn-secondary" rel="prev">Předchozí</Link>
          ) : (
            <span />
          )}
          <span className="font-mono text-sm text-stone-600">
            {page} / {pageCount}
          </span>
          {page < pageCount ? (
            <Link href={pageHref(page + 1)} className="btn-secondary" rel="next">Další</Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      {!paid && (
        <MvLocked title="Celý soubor otázek je v balíčku" loggedIn={Boolean(user)}>
          {lockedMatches > 0 ? (
            <p>
              Výběru odpovídá ještě <span className="font-mono">{lockedMatches}</span>{" "}
              {plural(lockedMatches, ["další otázka", "další otázky", "dalších otázek"])}. S balíčkem procházíte všech{" "}
              <span className="font-mono">{MV_QUESTIONS.length}</span> otázek, procvičujete je a skládáte testy nanečisto.
            </p>
          ) : (
            <p>S balíčkem procházíte všech {MV_QUESTIONS.length} otázek, procvičujete je a skládáte testy nanečisto.</p>
          )}
        </MvLocked>
      )}
    </div>
  );
}
