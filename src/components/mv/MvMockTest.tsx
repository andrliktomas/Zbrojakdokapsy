"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { submitMvTest } from "@/app/otazky-mv/actions";
import type { MvGroupKey, MvPublicQuestion } from "@/content/mv";
import type { PermitType } from "@/content/exam";
import { LETTERS } from "./format";

type Result = Awaited<ReturnType<typeof submitMvTest>>;
type Group = { key: MvGroupKey; title: string; count: number };
type Question = MvPublicQuestion & { group: MvGroupKey };

type Props = {
  questions: Question[];
  groups: Group[];
  permitType: PermitType;
  permitLabel: string;
  timeLimitMin: number;
  passScore: number;
};

export function MvMockTest({ questions, groups, permitType, permitLabel, timeLimitMin, passScore }: Props) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMin * 60);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  const finish = useCallback(() => {
    if (result || pending) return;
    setError(null);
    startTransition(async () => {
      try {
        const payload = Object.fromEntries(questions.map((q) => [String(q.num), answers[q.num] ?? -1]));
        const durationSec = Math.round((Date.now() - startedAt.current) / 1000);
        setResult(await submitMvTest({ answers: payload, durationSec, permitType }));
        window.scrollTo({ top: 0 });
      } catch {
        setError("Test se nepodařilo odevzdat. Zkontrolujte připojení a zkuste to znovu.");
      }
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

  // Upozornění při zavření nebo obnovení stránky během testu.
  useEffect(() => {
    if (!started || result) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [started, result]);

  // Při přechodu na jinou otázku posunout stránku na její začátek a přesunout fokus (čtečky obrazovky).
  useEffect(() => {
    if (!started || result) return;
    const h = headingRef.current;
    if (!h) return;
    const top = h.closest("article")?.getBoundingClientRect().top ?? 0;
    if (top < 120 || top > window.innerHeight * 0.6) h.closest("article")?.scrollIntoView({ block: "start" });
    h.focus({ preventScroll: true });
  }, [current, started, result]);
  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  if (!started) {
    return (
      <section className="card mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Test nanečisto z otázek MV</h1>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1 text-sm" role="group" aria-label="Typ zbrojního oprávnění">
          {(["obecne", "rozsirene"] as const).map((t) => (
            <Link
              key={t}
              href={`/otazky-mv/test?typ=${t}`}
              aria-current={t === permitType ? "true" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-lg px-3 font-semibold ${
                t === permitType ? "bg-white shadow-sm" : "text-stone-600 hover:bg-white/60"
              }`}
            >
              {t === "obecne" ? "Obecné ZO" : "Rozšířené ZO"}
            </Link>
          ))}
        </div>
        <ul className="space-y-2 text-stone-700">
          <li>
            <span className="font-mono font-semibold">{questions.length}</span> otázek ze souboru MV ve skladbě zkoušky:{" "}
            {groups.map((g, i) => (
              <span key={g.key}>
                {i > 0 && ", "}
                <span className="font-mono">{g.count}</span> {g.title.toLowerCase()}
              </span>
            ))}
            .
          </li>
          <li>
            Časový limit <span className="font-mono font-semibold">{timeLimitMin}</span> minut, po jeho uplynutí se test odevzdá sám.
          </li>
          <li>
            Pro {permitLabel} potřebujete alespoň <span className="font-mono font-semibold">{passScore}</span> správných odpovědí.
          </li>
          <li className="text-sm text-stone-600">
            Test sestavuje aplikace náhodně při každém spuštění z veřejného souboru otázek MV. Nejde o test sestavený ministerstvem.
          </li>
        </ul>
        <button
          className="btn-primary w-full"
          onClick={() => {
            startedAt.current = Date.now();
            setStarted(true);
          }}
        >
          Spustit test
        </button>
      </section>
    );
  }

  if (result) {
    const byNum = new Map(result.results.map((r) => [r.num, r]));
    const shown = onlyWrong ? questions.filter((q) => !byNum.get(q.num)?.correct) : questions;
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <section className={`card ${result.passed ? "bg-brand-50 ring-brand-200" : "bg-red-50 ring-red-200"}`} aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-600">Výsledek · {permitLabel}</p>
          <h1 ref={resultRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold outline-none sm:text-3xl">
            {result.passed ? "Prospěl/a byste" : "Tentokrát by to nevyšlo"}
          </h1>
          <p className="mt-2">
            <span className="font-mono text-4xl font-bold">
              {result.score} / {result.total}
            </span>{" "}
            <span className="text-lg">správně</span>
          </p>
          <p className="mt-1 text-sm text-stone-700">
            Potřeba alespoň <span className="font-mono font-semibold">{result.passScore}</span> · získáno{" "}
            <span className="font-mono font-semibold">+{result.xp}</span> XP
          </p>
          {result.unlocked.map((a) => (
            <p key={a.code} className="mt-1 font-semibold">Nový odznak: {a.title}</p>
          ))}
          <table className="mt-4 w-full text-left text-sm">
            <caption className="sr-only">Výsledek podle částí testu</caption>
            <thead className="text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th scope="col" className="py-1 pr-2">Část testu</th>
                <th scope="col" className="py-1 text-right">Správně</th>
              </tr>
            </thead>
            <tbody>
              {result.groups.map((g) => (
                <tr key={g.key} className="border-t border-stone-900/10">
                  <td className="py-2 pr-2">
                    {g.title}
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-900/10" aria-hidden>
                      <div
                        className={`h-full rounded-full ${g.correct === g.total ? "bg-brand-500" : "bg-accent-400"}`}
                        style={{ width: `${g.total ? (g.correct / g.total) * 100 : 0}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2 text-right font-mono font-semibold">
                    {g.correct} / {g.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button className="btn-primary" onClick={() => window.location.reload()}>Nový test</button>
            <Link className="btn-secondary" href="/otazky-mv/procvicovani?rezim=chybne">Procvičit chybné otázky</Link>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Rozbor odpovědí</h2>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" className="h-5 w-5 accent-brand-600" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} />
            Jen chybné a nezodpovězené
          </label>
        </div>
        <ol className="space-y-3">
          {shown.map((q) => {
            const r = byNum.get(q.num)!;
            const i = questions.indexOf(q);
            return (
              <li key={q.num} className={`card ring-2 ${r.correct ? "ring-brand-200" : "ring-red-200"}`}>
                <div className="flex flex-wrap items-center gap-x-3 text-xs text-stone-500">
                  <span className="font-mono font-semibold text-stone-900">{i + 1}.</span>
                  <span className="font-mono">č. MV {q.num}</span>
                  <span>{q.topicTitle}</span>
                  <span className={`ml-auto font-semibold ${r.correct ? "text-brand-700" : "text-red-700"}`}>
                    {r.correct ? "Správně" : r.chosen === -1 ? "Nezodpovězeno" : "Chyba"}
                  </span>
                </div>
                <p className="mt-2 font-semibold leading-snug">{q.q}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {q.answers.map((o, j) => {
                    const isCorrect = j === r.correctIndex;
                    const isChosen = j === r.chosen;
                    return (
                      <li
                        key={j}
                        className={`rounded-lg px-3 py-2 ${isCorrect ? "bg-brand-50 font-semibold text-brand-700" : isChosen ? "bg-red-50 text-red-700" : "text-stone-600"}`}
                      >
                        {LETTERS[j]}) {o}
                        {isCorrect && <span className="block text-xs font-semibold">Správná odpověď</span>}
                        {isChosen && !isCorrect && <span className="block text-xs font-semibold">Vaše odpověď</span>}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const group = groups.find((g) => g.key === q.group);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="card sticky top-16 z-10 flex items-center justify-between gap-3 px-4 py-2">
        <span className="text-sm">
          Zodpovězeno <span className="font-mono">{answered}</span>/<span className="font-mono">{questions.length}</span>
        </span>
        <span
          className={`font-mono text-xl font-bold tabular-nums ${secondsLeft < 120 ? "text-red-600" : ""}`}
          role="timer"
          aria-label={`Zbývá ${Math.floor(secondsLeft / 60)} minut ${secondsLeft % 60} sekund`}
        >
          {mm}:{ss}
        </span>
        <button
          className="btn-primary"
          disabled={pending}
          onClick={() => {
            if (answered < questions.length && !confirm(`Nezodpověděli jste ${questions.length - answered} otázek. Opravdu odevzdat?`)) return;
            finish();
          }}
        >
          {pending ? "Odevzdávám…" : "Odevzdat"}
        </button>
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <article className="card scroll-mt-36">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
          <span className="font-mono text-sm font-bold text-stone-900">
            {current + 1} / {questions.length}
          </span>
          <span>{group?.title}</span>
          <span aria-hidden>·</span>
          <span className="font-mono">č. MV {q.num}</span>
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-lg font-semibold leading-snug outline-none">
          {q.q}
        </h2>
        <fieldset className="mt-4 space-y-2">
          <legend className="sr-only">Vyberte odpověď</legend>
          {q.answers.map((opt, i) => (
            <label
              key={i}
              className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl p-3 ring-1 transition ${
                answers[q.num] === i ? "bg-brand-50 ring-2 ring-brand-500" : "ring-stone-200 hover:bg-stone-50"
              }`}
            >
              <input
                type="radio"
                name={`q-${q.num}`}
                className="mt-1 h-4 w-4 shrink-0 accent-brand-600"
                checked={answers[q.num] === i}
                onChange={() => setAnswers((a) => ({ ...a, [q.num]: i }))}
              />
              <span>
                <span className="font-mono font-semibold">{LETTERS[i]})</span> {opt}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            Předchozí
          </button>
          <button className="btn-secondary" disabled={current === questions.length - 1} onClick={() => setCurrent((c) => c + 1)}>
            Další
          </button>
        </div>
      </article>

      <nav aria-label="Přehled otázek testu" className="space-y-2">
        <h2 className="text-sm font-semibold text-stone-600">Přehled otázek</h2>
        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">
          {questions.map((x, i) => {
            const done = answers[x.num] !== undefined;
            return (
              <button
                key={x.num}
                type="button"
                onClick={() => setCurrent(i)}
                aria-current={i === current ? "step" : undefined}
                aria-label={`Otázka ${i + 1}${done ? ", zodpovězeno" : ""}`}
                className={`h-11 rounded-lg font-mono text-sm font-semibold ${
                  i === current ? "bg-stone-900 text-white" : done ? "bg-brand-100 text-brand-700" : "bg-stone-200 text-stone-700"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
