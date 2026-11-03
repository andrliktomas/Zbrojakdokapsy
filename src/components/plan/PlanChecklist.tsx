import Link from "next/link";
import type { DailyPlan, PlanItem } from "@/lib/plan";

function StatusIcon({ item }: { item: PlanItem }) {
  if (item.done) {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-white" aria-hidden="true">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 10.5l3.5 3.5 7.5-8" />
        </svg>
      </span>
    );
  }
  if (item.locked) {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-500" aria-hidden="true">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
          <path d="M7 9V6.5a3 3 0 016 0V9" />
        </svg>
      </span>
    );
  }
  return <span className="h-7 w-7 shrink-0 rounded-full ring-2 ring-inset ring-stone-300" aria-hidden="true" />;
}

function ItemMeta({ item }: { item: PlanItem }) {
  if (item.done) return <span className="font-semibold text-brand-700">Hotovo</span>;
  if (item.locked) return <span className="font-semibold text-stone-700">Odemknout</span>;
  if (item.progress > 0) {
    return (
      <span className="font-mono tabular-nums">
        {item.progress}/{item.target}
      </span>
    );
  }
  return (
    <span>
      <span className="font-mono tabular-nums">{item.minutes}</span> min
    </span>
  );
}

export function PlanChecklist({ plan }: { plan: DailyPlan }) {
  const done = plan.items.filter((i) => i.done).length;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-lg font-bold">Dnešní plán</h3>
        {plan.items.length > 0 && (
          <p className="text-sm text-stone-600">
            asi <span className="font-mono tabular-nums">{plan.minutes}</span> min
            {plan.testMinutes > 0 && (
              <>
                {" "}+ test <span className="font-mono tabular-nums">{plan.testMinutes}</span> min
              </>
            )}
            {" · "}
            <span className="font-mono tabular-nums">{done}/{plan.items.length}</span> hotovo
          </p>
        )}
      </div>
      <p className="mt-1 text-sm text-stone-600">{plan.note}</p>

      {plan.items.length > 0 && (
        <ol className="mt-3 space-y-2" aria-label="Úkoly na dnešek">
          {plan.items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`group flex min-h-14 items-center gap-3 rounded-xl p-3 ring-1 transition hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  item.done ? "bg-stone-50 ring-stone-200" : "bg-white ring-stone-300"
                }`}
              >
                <StatusIcon item={item} />
                <span className="min-w-0 flex-1">
                  <span className="sr-only">{item.done ? "Splněno: " : item.locked ? "Zamčeno: " : "Zbývá: "}</span>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={`font-semibold leading-snug ${item.done ? "text-stone-500" : "text-stone-900"}`}>{item.title}</span>
                    <span className="shrink-0 text-sm text-stone-600">
                      <span className="sr-only">, </span>
                      <ItemMeta item={item} />
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-stone-600">{item.detail}</span>
                </span>
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-stone-400 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7.5 4.5L13 10l-5.5 5.5" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
