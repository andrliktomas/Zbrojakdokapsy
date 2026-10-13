"use client";

import type { AchievementDef } from "@/lib/gamification";

export function XpToast({ xp, unlocked }: { xp: number; unlocked: AchievementDef[] }) {
  if (!xp && !unlocked.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 space-y-2">
      {xp > 0 && <div className="rounded-xl bg-brand-700 px-4 py-2 font-bold text-white shadow-lg">+{xp} XP</div>}
      {unlocked.map((a) => (
        <div key={a.code} className="rounded-xl bg-accent-400 px-4 py-2 font-semibold text-stone-900 shadow-lg">
          {a.icon} Nový odznak: {a.title}
        </div>
      ))}
    </div>
  );
}
