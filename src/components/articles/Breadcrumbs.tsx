import Link from "next/link";
import { typo } from "./typo";

export type Crumb = { name: string; path: string };

/** Viditelná drobečková navigace; poslední položka je aktuální stránka. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Drobečková navigace" className="font-mono text-xs text-stone-500">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-stone-700">
                  {typo(it.name)}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="underline-offset-2 hover:text-stone-900 hover:underline">
                    {it.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
