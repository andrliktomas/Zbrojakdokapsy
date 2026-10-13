import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { EXAM, FLASHCARDS, QUESTIONS, TOPICS } from "@/content";

const FEATURES = [
  { icon: "📖", title: "Srozumitelný výklad", text: "Každý okruh vysvětlený lidsky, s odkazy na konkrétní paragrafy a tipy, na co se ve zkoušce často chytá." },
  { icon: "🃏", title: "Učební kartičky", text: "Chytré opakování (Leitnerův systém) – co umíte, vidíte méně často, co neumíte, častěji." },
  { icon: "🎯", title: "Náhodné otázky", text: "Procvičování s okamžitým vysvětlením. Otázky, ve kterých chybujete, se vrací." },
  { icon: "📝", title: "Test nanečisto", text: `Simulace zkoušky: ${EXAM.questionCount} otázek, ${EXAM.timeLimitMin} minut, stejné vyhodnocení.` },
  { icon: "📊", title: "Přehled pokroku", text: "Zvládnutí okruhů, trend zlepšení a slabá místa – víte přesně, co ještě doučit." },
  { icon: "🏆", title: "Body, levely a odznaky", text: "Sbírejte XP, držte sérii dní v řadě a odemykejte odznaky. Učení, které baví." },
];

export default async function Home() {
  if (await getCurrentUser()) redirect("/prehled");
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 py-8 md:grid-cols-2">
        <div>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">Podle zákona č. 90/2024 Sb. platného od 1. 1. 2026</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">Zbrojní oprávnění bez biflování nazdařbůh</h1>
          <p className="mt-4 text-lg text-stone-600">
            Interaktivní učebnice, která vás provede celou teoretickou přípravou ke zkoušce odborné způsobilosti – výklad, kartičky, náhodné otázky a testy nanečisto. A přesně vám ukáže, kde máte mezery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/registrace" className="btn-primary px-6 py-3 text-lg">Vyzkoušet zdarma</Link>
            <Link href="/cenik" className="btn-secondary px-6 py-3 text-lg">Ceník</Link>
          </div>
        </div>
        <div className="card grid grid-cols-3 gap-4 text-center">
          <div><div className="text-3xl font-extrabold text-brand-700">{TOPICS.length}</div><div className="text-sm text-stone-500">okruhů</div></div>
          <div><div className="text-3xl font-extrabold text-brand-700">{QUESTIONS.length}</div><div className="text-sm text-stone-500">otázek</div></div>
          <div><div className="text-3xl font-extrabold text-brand-700">{FLASHCARDS.length}</div><div className="text-sm text-stone-500">kartiček</div></div>
          <ul className="col-span-3 space-y-2 text-left text-sm">
            {TOPICS.map((t) => <li key={t.slug}>{t.icon} {t.title}</li>)}
          </ul>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-2 font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-stone-600">{f.text}</p>
          </div>
        ))}
      </section>
      <section className="card bg-brand-700 text-center text-white">
        <h2 className="text-2xl font-bold">Přístup na 3 týdny až 3 měsíce</h2>
        <p className="mt-1 text-brand-100">Jednorázová platba, bez automatického obnovování. Ukázkové okruhy zdarma.</p>
        <Link href="/registrace" className="btn-accent mt-4">Založit účet</Link>
      </section>
    </div>
  );
}
