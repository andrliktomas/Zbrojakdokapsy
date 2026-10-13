"use client";

import { useState, useTransition } from "react";
import { markLessonRead } from "@/app/actions/learning";

export function LessonReadButton({ lessonId, initiallyRead }: { lessonId: string; initiallyRead: boolean }) {
  const [read, setRead] = useState(initiallyRead);
  const [xp, setXp] = useState(0);
  const [pending, startTransition] = useTransition();
  if (read) return <p className="text-sm font-semibold text-brand-700">✔ Přečteno{xp ? ` · +${xp} XP` : ""}</p>;
  return (
    <button
      className="btn-secondary"
      disabled={pending}
      onClick={() => startTransition(async () => { const r = await markLessonRead(lessonId); setXp(r.xp); setRead(true); })}
    >
      Označit jako přečtené (+20 XP)
    </button>
  );
}
