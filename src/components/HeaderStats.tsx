"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StreakBadge, XpChip } from "./ui";

/** Událost s počtem právě získaných XP (posílá ji XpToast). */
export const XP_EVENT = "zk:xp";

/**
 * Série a XP v hlavičce. Layout se při klientské navigaci znovu nevykresluje,
 * proto si XP získané během procvičování přičítáme sami podle XP_EVENT.
 * `streakIfActive` je série, jakou server spočítá po dnešní aktivitě.
 */
export function HeaderStats({
  xp,
  streak,
  streakIfActive,
  level,
}: {
  xp: number;
  streak: number;
  streakIfActive: number;
  level: number;
}) {
  const [gained, setGained] = useState(0);

  useEffect(() => {
    const onXp = (e: Event) => {
      const amount = (e as CustomEvent<number>).detail;
      if (amount > 0) setGained((g) => g + amount);
    };
    window.addEventListener(XP_EVENT, onXp);
    return () => window.removeEventListener(XP_EVENT, onXp);
  }, []);

  const total = xp + gained;
  return (
    <Link href="/prehled" className="flex min-h-11 items-center gap-1.5 rounded-md px-1" title={`Level ${level} · ${total} XP`}>
      <StreakBadge days={gained > 0 ? Math.max(streak, streakIfActive) : streak} />
      <XpChip key={total} xp={total} className={gained > 0 ? "motion-safe:animate-[xp-pop_220ms_ease-out]" : ""} />
    </Link>
  );
}
