"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { answerQuestion } from "@/app/actions/learning";
import type { AchievementDef } from "@/lib/gamification";
import { XpToast } from "./XpToast";

export type PublicQuestion = { id: string; topic: string; topicTitle: string; question: string; options: string[] };

type Feedback = { correct: boolean; correctIndex: number; explanation: string; source?: string };

export function Practice({ questions }: { questions: PublicQuestion[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState<{ xp: number; unlocked: AchievementDef[] }>({ xp: 0, unlocked: [] });
  const [pending, startTransition] = useTransition();

  if (!questions.length) {
    return <div className="card text-center text-stone-600">Pro tento výběr zatím nejsou k dispozici žádné otázky.</div>;
  }

  const done = index >= questions.length;
  if (done) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <div className="text-5xl">{score / questions.length >= 0.8 ? "🎯" : "💪"}</div>
        <h2 className="mt-2 text-2xl font-bold">Sada dokončena: {score}/{questions.length}</h2>
        <p className="mt-1 text-stone-600">Otázky, ve kterých jste chybovali, se vám budou zobrazovat častěji.</p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="btn-primary"
            onClick={() => {
              setIndex(0); setScore(0); setChosen(null); setFeedback(null);
              router.refresh();
            }}
          >
            Další sada
          </button>
          <Link href="/prehled" className="btn-secondary">Zpět na přehled</Link>
        </div>
      </div>
    );
  }

  const q = questions[index];

  function choose(i: number) {
    if (feedback || pending) return;
    setChosen(i);
    startTransition(async () => {
      const res = await answerQuestion(q.id, i);
      setFeedback(res);
      if (res.correct) setScore((s) => s + 1);
      setToast({ xp: res.xp, unlocked: res.unlocked });
      setTimeout(() => setToast({ xp: 0, unlocked: [] }), 2500);
    });
  }

  function next() {
    setIndex((i) => i + 1);
    setChosen(null);
    setFeedback(null);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
        <span>Otázka {index + 1} z {questions.length} · {q.topicTitle}</span>
        <span>Správně: {score}</span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-stone-200">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">{q.question}</h2>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            let cls = "ring-stone-200 hover:bg-stone-50";
            if (feedback) {
              if (i === feedback.correctIndex) cls = "bg-brand-50 ring-brand-500";
              else if (i === chosen) cls = "bg-red-50 ring-red-400";
              else cls = "ring-stone-200 opacity-60";
            } else if (i === chosen) cls = "ring-brand-500";
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={!!feedback || pending}
                className={`flex w-full items-start gap-3 rounded-xl p-3 text-left ring-1 transition ${cls}`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 text-xs font-bold">{String.fromCharCode(97 + i)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
        {feedback && (
          <div className={`mt-4 rounded-xl p-4 ${feedback.correct ? "bg-brand-50" : "bg-red-50"}`}>
            <div className="font-bold">{feedback.correct ? "✔ Správně!" : "✘ Špatně"}</div>
            <p className="mt-1 text-sm text-stone-700">{feedback.explanation}</p>
            {feedback.source && <p className="mt-1 text-xs text-stone-500">Zdroj: {feedback.source}</p>}
          </div>
        )}
        {feedback && (
          <button onClick={next} className="btn-primary mt-4 w-full">
            {index + 1 < questions.length ? "Další otázka →" : "Vyhodnotit sadu"}
          </button>
        )}
      </div>
      <XpToast {...toast} />
    </div>
  );
}
