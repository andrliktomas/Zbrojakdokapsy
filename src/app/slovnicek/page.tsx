import { requireUser } from "@/lib/auth";
import { GLOSSARY, topicBySlug } from "@/content";

export default async function GlossaryPage() {
  await requireUser();
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "cs"));
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Slovníček pojmů</h1>
      <p className="text-stone-600">Vysvětlivky klíčových pojmů z výkladu. Přesné znění vždy najdete v uvedeném předpisu.</p>
      <dl className="card divide-y divide-stone-100">
        {terms.map((t) => (
          <div key={t.term} className="py-3">
            <dt className="font-semibold">{t.term} <span className="ml-2 text-xs font-normal text-stone-400">{topicBySlug(t.topic)?.title}</span></dt>
            <dd className="mt-1 text-stone-700">{t.definition}</dd>
            {t.source && <dd className="mt-0.5 text-xs text-stone-500">{t.source}</dd>}
          </div>
        ))}
      </dl>
    </div>
  );
}
