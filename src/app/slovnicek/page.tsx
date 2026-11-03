import { requireUser } from "@/lib/auth";
import { GLOSSARY, topicBySlug } from "@/content";
import { PageHeader, plural } from "@/components/ui";

// Písmena s háčkem a „Ch“ jsou v české abecedě samostatná, čárky a kroužek ne.
const FOLD: Record<string, string> = { Á: "A", Ď: "D", É: "E", Ě: "E", Í: "I", Ň: "N", Ó: "O", Ť: "T", Ú: "U", Ů: "U", Ý: "Y" };

function initial(term: string) {
  if (/^ch/i.test(term)) return "Ch";
  const c = term.charAt(0).toLocaleUpperCase("cs");
  return FOLD[c] ?? c;
}

export default async function GlossaryPage() {
  await requireUser();
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "cs"));
  const groups: { letter: string; items: typeof terms }[] = [];
  for (const t of terms) {
    const letter = initial(t.term);
    const last = groups.at(-1);
    if (last?.letter === letter) last.items.push(t);
    else groups.push({ letter, items: [t] });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow={`${terms.length} ${plural(terms.length, "pojem", "pojmy", "pojmů")} od A do Ž`} title="Slovníček pojmů">
        Vysvětlivky klíčových pojmů z výkladu. Přesné znění vždy najdete v uvedeném předpisu.
      </PageHeader>

      <nav aria-label="Písmena" className="-mx-4 border-y border-line bg-white px-3 py-1 sm:mx-0 sm:rounded-md sm:border-x">
        <ul className="flex gap-0.5 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {groups.map((g) => (
            <li key={g.letter} className="shrink-0">
              <a
                href={`#pismeno-${g.letter}`}
                className="grid h-11 min-w-11 place-items-center rounded-md px-2 font-mono text-sm font-semibold hover:bg-ink hover:text-paper focus-visible:outline-offset-[-3px]"
              >
                {g.letter}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g) => (
        <section key={g.letter} id={`pismeno-${g.letter}`} aria-labelledby={`h-${g.letter}`} className="space-y-2">
          <h2 id={`h-${g.letter}`} className="font-mono text-2xl font-semibold">
            {g.letter}
          </h2>
          <dl className="card divide-y divide-line p-0">
            {g.items.map((t) => (
              <div key={t.term} className="px-5 py-4">
                <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[17px] font-extrabold">{t.term}</span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-ocel uppercase">
                    {topicBySlug(t.topic)?.title}
                  </span>
                </dt>
                <dd className="mt-1.5 leading-relaxed text-stone-800">{t.definition}</dd>
                {t.source && <dd className="mt-1.5 font-mono text-xs text-ocel [word-spacing:-0.25em]">{t.source}</dd>}
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
