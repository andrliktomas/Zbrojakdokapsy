"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { submitTest } from "@/app/actions/learning";
import type { PublicQuestion } from "./Practice";
import { PERMIT_LABEL, type PermitType } from "@/content/exam";

type Result = Awaited<ReturnType<typeof submitTest>>;

type Props = { questions: PublicQuestion[]; permitType: PermitType; timeLimitMin: number; passScore: number };

export function MockTest({ questions, permitType, timeLimitMin, passScore }: Props) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMin * 60);
  const [result, setResult] = useState<Result | null>(null);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);

  const finish = useCallback(() => {
    if (result || pending) return;
    startTransition(async () => {
      const payload = Object.fromEntries(questions.map((q) => [q.id, answers[q.id] ?? -1]));
      const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
      setResult(await submitTest({ answers: payload, durationSec, permitType }));
    });
  }, [answers, pending, permitType, questions, result]);

  useEffect(() => {
    if (!started || result) return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [started, result]);

  useEffect(() => {
    if (started && secondsLeft === 0) finish();
  }, [secondsLeft, started, finish]);

  if (!started) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <div className="text-5xl">📝</div>
        <h1 className="mt-2 text-2xl font-bold">Test nanečisto</h1>
        <div className="mt-4 inline-flex rounded-xl bg-stone-100 p-1 text-sm">
          {(["obecne", "rozsirene"] as const).map((t) => (
            <Link key={t} href={`/test?typ=${t}`} className={`rounded-lg px-3 py-1.5 ${t === permitType ? "bg-white font-semibold shadow" : "text-stone-600"}`}>
              {t === "obecne" ? "Obecné ZO" : "Rozšířené ZO"}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-stone-600">
          {questions.length} otázek ve skladbě skutečné zkoušky (právo, nauka o zbraních, bezpečné zacházení, zdravověda),
          časový limit {timeLimitMin} minut. Pro {PERMIT_LABEL[permitType]} potřebujete alespoň {passScore} správných odpovědí.
        </p>
        <button className="btn-primary mt-4" onClick={() => { startedAt.current = Date.now(); setStarted(true); }}>Spustit test</button>
      </div>
    );
  }

  if (result) {
    const byId = new Map(result.results.map((r) => [r.id, r]));
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className={`card text-center ${result.passed ? "bg-brand-50" : "bg-red-50"}`}>
          <div className="text-5xl">{result.passed ? "✅" : "❌"}</div>
          <h1 className="mt-2 text-2xl font-bold">{result.passed ? "Prospěl/a byste!" : "Tentokrát by to nevyšlo"}</h1>
          <p className="mt-1 text-lg">{result.score} / {result.total} správně · +{result.xp} XP</p>
          {result.unlocked.map((a) => <p key={a.code} className="mt-1 font-semibold">{a.icon} Nový odznak: {a.title}</p>)}
          <div className="mt-4 flex justify-center gap-2">
            <button className="btn-primary" onClick={() => window.location.reload()}>Nový test</button>
            <Link className="btn-secondary" href="/prehled">Přehled</Link>
          </div>
        </div>
        <h2 className="text-lg font-bold">Rozbor odpovědí</h2>
        {questions.map((q, i) => {
          const r = byId.get(q.id)!;
          return (
            <div key={q.id} className={`card ring-2 ${r.correct ? "ring-brand-200" : "ring-red-200"}`}>
              <p className="font-semibold">{i + 1}. {q.question}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {q.options.map((o, j) => (
                  <li key={j} className={j === r.correctIndex ? "font-semibold text-brand-700" : j === r.chosen ? "text-red-600 line-through" : "text-stone-600"}>
                    {String.fromCharCode(97 + j)}) {o}
                  </li>
                ))}
              </ul>
              {r.chosen === -1 && <p className="mt-1 text-xs text-red-600">Nezodpovězeno</p>}
            </div>
          );
        })}
      </div>
    );
  }

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="card flex items-center justify-between py-3">
        <span className="text-sm">Zodpovězeno {answered}/{questions.length}</span>
        <span className={`font-mono text-lg font-bold ${secondsLeft < 120 ? "text-red-600" : ""}`}>⏱ {mm}:{ss}</span>
        <button className="btn-primary py-1.5" disabled={pending} onClick={() => {
          if (answered < questions.length && !confirm(`Nezodpověděli jste ${questions.length - answered} otázek. Opravdu odevzdat?`)) return;
          finish();
        }}>Odevzdat</button>
      </div>
      <div className="flex flex-wrap gap-1">
        {questions.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setCurrent(i)}
            className={`h-8 w-8 rounded-lg text-xs font-semibold ${i === current ? "bg-brand-600 text-white" : answers[x.id] !== undefined ? "bg-brand-100 text-brand-800" : "bg-stone-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="card">
        <p className="text-sm text-stone-500">Otázka {current + 1}</p>
        <h2 className="mt-1 text-lg font-semibold">{q.question}</h2>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <label key={i} className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 ring-1 ${answers[q.id] === i ? "bg-brand-50 ring-brand-500" : "ring-stone-200 hover:bg-stone-50"}`}>
              <input type="radio" name={q.id} className="mt-1" checked={answers[q.id] === i} onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="btn-secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>← Předchozí</button>
          <button className="btn-secondary" disabled={current === questions.length - 1} onClick={() => setCurrent((c) => c + 1)}>Další →</button>
        </div>
      </div>
    </div>
  );
}
