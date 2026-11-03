"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { answerMvQuestion } from "@/app/otazky-mv/actions";
import type { MvPublicQuestion } from "@/content/mv";
import type { AchievementDef } from "@/lib/gamification";
import { XpToast } from "@/components/XpToast";
import { LETTERS } from "./format";

type Feedback = { correct: boolean; correctIndex: number };

export function MvPractice({ questions, wrongOnlyHref }: { questions: MvPublicQuestion[]; wrongOnlyHref: string }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState<{ xp: number; unlocked: AchievementDef[] }>({ xp: 0, unlocked: [] });
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (index > 0) headingRef.current?.focus();
  }, [index]);
  useEffect(() => {
    if (feedback) nextRef.current?.focus();
  }, [feedback]);

  if (!questions.length) {
    return <div className="card text-center text-stone-600">Pro tento výběr nejsou k dispozici žádné otázky.</div>;
  }

  if (index >= questions.length) {
    const ratio = score / questions.length;
    return (
      <section className="card mx-auto max-w-lg text-center" aria-live="polite">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Sada dokončena</p>
        <p className="mt-1 font-mono text-4xl font-bold">
          {score} / {questions.length}
        </p>
        <p className="mt-2 text-stone-600">
          {ratio >= 0.87
            ? "Výborně, tohle by u zkoušky prošlo."
            : "Otázky, ve kterých jste chybovali, najdete v režimu „jen chybné“."}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            className="btn-primary"
            onClick={() => {
              setIndex(0);
              setScore(0);
              setChosen(null);
              setFeedback(null);
              router.refresh();
            }}
          >
            Další sada
          </button>
          <Link href={wrongOnlyHref} className="btn-secondary">Jen chybné otázky</Link>
        </div>
      </section>
    );
  }

  const q = questions[index];

  function choose(i: number) {
    if (feedback || pending) return;
    setChosen(i);
    setError(null);
    startTransition(async () => {
      try {
        const res = await answerMvQuestion(q.num, i);
        setFeedback({ correct: res.correct, correctIndex: res.correctIndex });
        if (res.correct) setScore((s) => s + 1);
        setToast({ xp: res.xp, unlocked: res.unlocked });
        setTimeout(() => setToast({ xp: 0, unlocked: [] }), 2500);
      } catch {
        setChosen(null);
        setError("Odpověď se nepodařilo uložit. Zkuste to prosím znovu.");
      }
    });
  }

  function next() {
    setIndex((i) => i + 1);
    setChosen(null);
    setFeedback(null);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-2 flex items-center justify-between gap-2 text-sm text-stone-600">
        <span>
          Otázka <span className="font-mono">{index + 1}</span> z <span className="font-mono">{questions.length}</span>
        </span>
        <span>
          Správně <span className="font-mono">{score}</span>
        </span>
      </div>
      <div
        className="mb-4 h-1.5 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-label="Postup sadou"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={index}
      >
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <article className="card">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
          <span className="font-mono text-sm font-bold text-stone-900">č. {q.num}</span>
          <span>Oddíl {q.section}</span>
          <span aria-hidden>·</span>
          <span>{q.topicTitle}</span>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-lg font-semibold leading-snug outline-none">
          {q.q}
        </h2>
        <div className="mt-4 space-y-2" role="group" aria-label="Možnosti odpovědi">
          {q.answers.map((opt, i) => {
            let cls = "ring-stone-200 hover:bg-stone-50";
            let note: string | null = null;
            if (feedback) {
              if (i === feedback.correctIndex) {
                cls = "bg-brand-50 ring-2 ring-brand-500";
                note = "Správná odpověď";
              } else if (i === chosen) {
                cls = "bg-red-50 ring-2 ring-red-400";
                note = "Vaše odpověď";
              } else cls = "ring-stone-200 opacity-60";
            } else if (i === chosen) cls = "ring-2 ring-brand-500";
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={!!feedback || pending}
                className={`flex min-h-11 w-full items-start gap-3 rounded-xl p-3 text-left ring-1 transition disabled:cursor-default ${cls}`}
              >
                <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-mono text-xs font-bold">
                  {LETTERS[i]}
                </span>
                <span>
                  <span className="sr-only">{LETTERS[i]}) </span>
                  {opt}
                  {note && <strong className={`mt-1 block text-xs ${i === feedback?.correctIndex ? "text-brand-700" : "text-red-700"}`}>{note}</strong>}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {feedback && (
            <div className={`mt-4 rounded-xl p-4 ${feedback.correct ? "bg-brand-50" : "bg-red-50"}`}>
              <p className="font-bold">
                {feedback.correct ? "Správně." : `Chyba – správná odpověď je ${LETTERS[feedback.correctIndex]}).`}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                Souvislosti vysvětluje okruh{" "}
                <Link href={`/okruhy/${q.topic}`} className="font-semibold text-brand-700 underline underline-offset-2">
                  {q.topicTitle}
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        {feedback && (
          <button ref={nextRef} onClick={next} className="btn-primary mt-4 w-full">
            {index + 1 < questions.length ? "Další otázka" : "Vyhodnotit sadu"}
          </button>
        )}
      </article>
      <XpToast {...toast} />
    </div>
  );
}
