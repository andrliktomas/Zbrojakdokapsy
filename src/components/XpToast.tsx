"use client";

import { useEffect, useRef } from "react";
import type { AchievementDef } from "@/lib/gamification";
import { XP_EVENT } from "./HeaderStats";

/**
 * Krátké oznámení o získaných XP a odznacích. Kontejner je vždy v DOM, aby čtečky oznámily změnu.
 * Zároveň dá vědět hlavičce (XP_EVENT), ať si XP přičte bez znovunačtení stránky.
 */
export function XpToast({ xp, unlocked }: { xp: number; unlocked: AchievementDef[] }) {
  // Každá odpověď přináší nové pole `unlocked` – podle jeho identity poznáme novou odměnu
  // (a v StrictMode nezapočteme stejné XP dvakrát).
  const announced = useRef<AchievementDef[] | null>(null);
  useEffect(() => {
    if (xp > 0 && announced.current !== unlocked) {
      announced.current = unlocked;
      window.dispatchEvent(new CustomEvent(XP_EVENT, { detail: xp }));
    }
  }, [xp, unlocked]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-30 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6"
    >
      {xp > 0 && (
        <div className="flex items-center gap-2 rounded-md bg-ink px-4 py-3 font-mono text-base font-semibold text-paper [word-spacing:-0.3em] shadow-[0_6px_20px_rgba(21,24,29,0.25)] motion-safe:animate-[xp-pop_220ms_ease-out]">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal" />+{xp} XP
        </div>
      )}
      {unlocked.map((a) => (
        <div
          key={a.code}
          className="flex max-w-xs items-center gap-2.5 rounded-md bg-signal px-4 py-3 font-bold text-ink shadow-[0_6px_20px_rgba(21,24,29,0.25)] motion-safe:animate-[xp-pop_220ms_ease-out]"
        >
          <span aria-hidden="true" className="text-xl">{a.icon}</span>
          <span>
            <span className="block font-mono text-[11px] font-semibold tracking-[0.12em] uppercase">Nový odznak</span>
            {a.title}
          </span>
        </div>
      ))}
    </div>
  );
}
