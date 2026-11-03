import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { PRACTICAL_OVERVIEW, trainerView, type TrainerMode } from "@/content/trainer";
import { Trainer } from "@/components/trainer/Trainer";
import { SourceLine } from "@/components/trainer/shared";

export const metadata: Metadata = {
  title: "Trenažér praktické části – Zbroják do kapsy",
  description: "Nacvičte si kontrolu zbraně, řešení závad a chyby, za které se u praktické části zkoušky neprojde.",
};

export const dynamic = "force-dynamic";

const MODES: TrainerMode[] = ["poradi", "zavady", "chyby"];

export default async function TrainerPage({ searchParams }: { searchParams: Promise<{ rezim?: string }> }) {
  const user = await requireUser();
  const paid = await hasAccess(user.id);
  const { rezim } = await searchParams;
  const initialMode = MODES.includes(rezim as TrainerMode) ? (rezim as TrainerMode) : "poradi";
  // Semínko pro zamíchání kroků – stejné pro vykreslení na serveru i v prohlížeči.
  const seed = Math.floor(Math.random() * 2 ** 31);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-wider text-stone-500">Praktická část zkoušky</p>
        <h1 className="text-2xl font-extrabold sm:text-3xl">Trenažér manipulace se zbraní</h1>
        <p className="text-stone-600">
          Postupy, které předvedete komisaři: kontrola zbraně, závady a přerušení střelby. Každý krok je podle přílohy č. 2 nařízení vlády č. 238/2025 Sb.
        </p>
      </header>

      {!paid && (
        <p className="rounded-xl bg-stone-100 p-3 text-sm text-stone-700">
          Zdarma si vyzkoušíte vše se samonabíjecí pistolí. Revolver a dlouhé zbraně odemknete{" "}
          <Link href="/cenik" className="font-semibold underline">balíčkem</Link>.
        </p>
      )}

      <details className="card group p-0">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-5 py-3 font-semibold [&::-webkit-details-marker]:hidden">
          Jak praktická část probíhá
          <span aria-hidden="true" className="text-stone-400 transition group-open:rotate-90">›</span>
        </summary>
        <ul className="space-y-3 px-5 pb-5 text-sm text-stone-800">
          {PRACTICAL_OVERVIEW.map((n) => (
            <li key={n.text}>
              {n.text}
              <SourceLine refs={n.sources} />
            </li>
          ))}
        </ul>
      </details>

      <Trainer view={trainerView(paid)} paid={paid} seed={seed} initialMode={initialMode} />

      <p className="text-xs text-stone-500">
        Trenažér pomáhá zapamatovat si postupy a jejich pořadí. Samotnou manipulaci si vyzkoušejte se zbraní pod odborným dohledem.
      </p>
    </div>
  );
}
