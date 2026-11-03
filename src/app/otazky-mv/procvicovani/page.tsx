import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { pickPracticeQuestions } from "@/lib/gamification";
import { MV_FREE_NUMS, MV_FREE_SAMPLE_SIZE, MV_QUESTIONS, filterMv, mvByNum, mvSection, mvTopicSlugs, toPublicMv } from "@/content/mv";
import { MvPractice } from "@/components/mv/MvPractice";
import { MvFilterForm } from "@/components/mv/MvFilterForm";
import { MvLocked } from "@/components/mv/MvLocked";
import { getMvLastResults, param, type SearchParams } from "../lib";

export const metadata: Metadata = { title: "Procvičování otázek MV – Zbroják do kapsy" };
export const dynamic = "force-dynamic";

const SET_SIZE = 10;

export default async function MvPracticePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  const sp = await searchParams;
  const paid = await hasAccess(user.id);

  const sectionParam = param(sp.oddil);
  const topicParam = param(sp.okruh);
  const section = sectionParam && mvSection(sectionParam) ? sectionParam : undefined;
  const topic = topicParam && mvTopicSlugs.includes(topicParam) ? topicParam : undefined;
  const wrongOnly = param(sp.rezim) === "chybne";

  const last = await getMvLastResults(user.id);
  const base = paid ? MV_QUESTIONS : MV_QUESTIONS.filter((q) => MV_FREE_NUMS.has(q.num));
  let pool = filterMv({ section, topic }, base);
  if (wrongOnly) pool = pool.filter((q) => last.get(q.num) === false);

  const lastById = new Map(pool.map((q) => [String(q.num), last.get(q.num)]).filter((e): e is [string, boolean] => e[1] !== undefined));
  const picked = pickPracticeQuestions(pool.map((q) => String(q.num)), lastById, SET_SIZE).map((n) => toPublicMv(mvByNum(Number(n))!));

  const hrefFor = (wrong: boolean) => {
    const u = new URLSearchParams();
    if (section) u.set("oddil", section);
    if (topic) u.set("okruh", topic);
    if (wrong) u.set("rezim", "chybne");
    const s = u.toString();
    return `/otazky-mv/procvicovani${s ? `?${s}` : ""}`;
  };
  const wrongHref = hrefFor(true);

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Procvičování otázek MV{wrongOnly && " – jen chybné"}</h1>
        <p className="text-stone-600">
          Sady po {SET_SIZE} otázkách, přednost mají nové a chybované. Po každé odpovědi hned uvidíte správné řešení.
        </p>
      </header>

      <nav aria-label="Režim procvičování" className="grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1 text-sm ring-1 ring-stone-200 sm:inline-grid">
        {[
          { wrong: false, label: "Všechny otázky" },
          { wrong: true, label: "Jen chybné" },
        ].map((m) => (
          <Link
            key={m.label}
            href={hrefFor(m.wrong)}
            aria-current={m.wrong === wrongOnly ? "page" : undefined}
            className={`flex min-h-11 items-center justify-center rounded-lg px-4 font-semibold ${
              m.wrong === wrongOnly ? "bg-white shadow-sm" : "text-stone-600 hover:bg-white/60"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      <MvFilterForm
        action="/otazky-mv/procvicovani"
        section={section}
        topic={topic}
        keep={{ rezim: wrongOnly ? "chybne" : undefined }}
        submitLabel="Nová sada"
      />

      {!paid && (
        <p className="rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-700 ring-1 ring-stone-200">
          Bez balíčku procvičujete ukázku – prvních {MV_FREE_SAMPLE_SIZE} otázek souboru.{" "}
          <Link href="/cenik" className="font-semibold text-brand-700 underline underline-offset-2">Odemknout všech {MV_QUESTIONS.length} otázek</Link>
        </p>
      )}

      {picked.length ? (
        <MvPractice key={`${section}-${topic}-${wrongOnly}-${picked.map((p) => p.num).join()}`} questions={picked} wrongOnlyHref={wrongHref} />
      ) : wrongOnly ? (
        <section className="card text-center">
          <h2 className="text-lg font-bold">Žádné chybné otázky</h2>
          <p className="mt-1 text-stone-600">V tomto výběru nemáte žádnou otázku, kterou byste naposledy zodpověděli chybně.</p>
          <Link href="/otazky-mv/procvicovani" className="btn-primary mt-4">Procvičovat náhodně</Link>
        </section>
      ) : (
        <div className="card text-center text-stone-600">Pro tento výběr nejsou k dispozici žádné otázky.</div>
      )}

      {!paid && (
        <MvLocked title="Procvičujte celý soubor" loggedIn>
          <p>S balíčkem procvičujete všech {MV_QUESTIONS.length} otázek podle oddílů a okruhů a skládáte testy nanečisto.</p>
        </MvLocked>
      )}
    </div>
  );
}
