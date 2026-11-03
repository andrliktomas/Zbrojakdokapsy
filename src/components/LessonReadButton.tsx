"use client";

import { useState, useTransition } from "react";
import { markLessonRead } from "@/app/actions/learning";
import { XP } from "@/lib/gamification";

export function LessonReadButton({ lessonId, initiallyRead }: { lessonId: string; initiallyRead: boolean }) {
  const [read, setRead] = useState(initiallyRead);
  const [xp, setXp] = useState(0);
  const [pending, startTransition] = useTransition();
  if (read) {
    return (
      <p className="flex min-h-11 flex-wrap items-center gap-2 font-bold text-zasah" role="status">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 9.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Přečteno
        {xp > 0 && (
          <span className="xp-chip">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />+{xp} XP
          </span>
        )}
      </p>
    );
  }
  return (
    <button
      className="btn-secondary"
      disabled={pending}
      onClick={() => startTransition(async () => { const r = await markLessonRead(lessonId); setXp(r.xp); setRead(true); })}
    >
      {pending ? "Ukládám…" : "Označit jako přečtené"}
      <span className="rounded-sm bg-ink px-1.5 py-0.5 font-mono text-xs font-semibold text-paper">+{XP.lessonRead} XP</span>
    </button>
  );
}
