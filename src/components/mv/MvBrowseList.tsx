"use client";

import { useEffect, useState } from "react";
import { LETTERS } from "./format";

export type MvBrowseItem = {
  num: number;
  section: string;
  topicTitle: string;
  q: string;
  answers: string[];
  correct: number;
};

export function MvBrowseList({ items, highlight }: { items: MvBrowseItem[]; highlight?: number }) {
  const [revealAll, setRevealAll] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!highlight) return;
    const el = document.getElementById(`mv-${highlight}`);
    el?.scrollIntoView({ block: "start" });
    el?.focus({ preventScroll: true });
  }, [highlight]);

  function toggle(num: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 ring-1 ring-stone-200">
        <input
          type="checkbox"
          className="h-5 w-5 accent-brand-600"
          checked={revealAll}
          onChange={(e) => {
            setRevealAll(e.target.checked);
            setRevealed(new Set());
          }}
        />
        <span className="font-medium">Zobrazit správné odpovědi u všech otázek</span>
      </label>

      <ol className="space-y-3">
        {items.map((item) => {
          const shown = revealAll || revealed.has(item.num);
          const isTarget = item.num === highlight;
          return (
            <li
              key={item.num}
              id={`mv-${item.num}`}
              tabIndex={isTarget ? -1 : undefined}
              className={`card scroll-mt-24 outline-none ${isTarget ? "ring-2 ring-accent-400" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span className="font-mono text-sm font-bold text-stone-900">č. {item.num}</span>
                <span>Oddíl {item.section}</span>
                <span aria-hidden>·</span>
                <span>{item.topicTitle}</span>
              </div>
              <p className="mt-2 font-semibold leading-snug">{item.q}</p>
              <ul className="mt-3 space-y-2">
                {item.answers.map((a, i) => {
                  const correct = shown && i === item.correct;
                  return (
                    <li
                      key={i}
                      className={`flex gap-3 rounded-xl p-3 text-sm ring-1 ${correct ? "bg-brand-50 ring-brand-500" : "ring-stone-200"}`}
                    >
                      <span
                        aria-hidden
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${
                          correct ? "bg-brand-600 text-white" : "bg-stone-100"
                        }`}
                      >
                        {LETTERS[i]}
                      </span>
                      <span>
                        <span className="sr-only">{LETTERS[i]}) </span>
                        {a}
                        {correct && <strong className="mt-1 block text-xs font-semibold text-brand-700">Správná odpověď</strong>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {!revealAll && (
                <button
                  type="button"
                  onClick={() => toggle(item.num)}
                  aria-pressed={shown}
                  className="btn-secondary mt-3 w-full sm:w-auto"
                >
                  {shown ? "Skrýt správnou odpověď" : "Ukázat správnou odpověď"}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
