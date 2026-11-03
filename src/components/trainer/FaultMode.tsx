"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitTrainerFault } from "@/app/trenazer/actions";
import type { FaultScenario, MaybeLocked, Unlocked } from "@/content/trainer";
import { hashString, seededRandom, shuffleChanged } from "./util";
import { XpToast } from "@/components/XpToast";
import {
  AccessTag,
  IconCheck,
  IconCross,
  IconWarning,
  LockedNotice,
  SectionLabel,
  SourceLine,
  WeaponTag,
  useCountdown,
  useWeapon,
  useXpToast,
} from "./shared";

const FATAL_NOTE = "U zkoušky by to vedlo k hodnocení „neprospěl“ (§ 19 odst. 2 NV č. 238/2025 Sb.).";

export function FaultMode({ faults, paid, seed }: { faults: MaybeLocked<FaultScenario>[]; paid: boolean; seed: number }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = faults.find((f) => f.id === activeId) ?? null;
  const topRef = useRef<HTMLDivElement>(null);

  function open(id: string | null) {
    setActiveId(id);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function openNext() {
    const list = faults.filter((f) => !f.locked);
    const i = list.findIndex((f) => f.id === activeId);
    open(list[i + 1]?.id ?? null);
  }

  return (
    <div ref={topRef} className="scroll-mt-20 space-y-4">
      {active ? (
        <>
          <button type="button" onClick={() => open(null)} className="min-h-11 text-sm font-medium text-stone-600 hover:underline">
            ← Všechny situace
          </button>
          {active.locked ? (
            <LockedNotice title={active.title} weapon={active.weapon} />
          ) : (
            <FaultRunner key={active.id} scenario={active} seed={seed} onNext={openNext} onBack={() => open(null)} />
          )}
        </>
      ) : (
        <>
          <p className="text-stone-600">
            Závady se u zkoušky simulují se školními náboji. Projděte rozhodnutí krok za krokem – u selhače vás trenažér nepustí dál, dokud neuplyne 10 sekund.
          </p>
          <ul className="space-y-2">
            {faults.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => open(f.id)}
                  className="flex min-h-14 w-full items-center gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-stone-200 transition hover:bg-stone-50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{f.title}</span>
                    <WeaponName id={f.weapon} className="mt-0.5 block text-sm text-stone-500" />
                  </span>
                  {!paid && <AccessTag locked={f.locked} free={f.free} />}
                  <span aria-hidden="true" className="text-stone-400">›</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function FaultRunner({
  scenario,
  seed,
  onNext,
  onBack,
}: {
  scenario: Unlocked<FaultScenario>;
  seed: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [firstChoices, setFirstChoices] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [tried, setTried] = useState<string[]>([]);
  const [finished, setFinished] = useState<null | { correctSteps: number; total: number; perfect: boolean; xp: number | null }>(null);
  const [toast, showToast] = useXpToast();
  const [, startTransition] = useTransition();
  const feedbackRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);

  const step = scenario.steps[stepIndex];
  // Pořadí možností je zamíchané, ale stejné na serveru i v prohlížeči.
  const options = useMemo(() => shuffleChanged(step.options, seededRandom(seed ^ hashString(step.id))), [step, seed]);
  const chosenOption = step.options.find((o) => o.id === chosen) ?? null;
  const answeredCorrectly = !!chosenOption?.correct;
  const waitSeconds = step.waitSecondsAfter ?? 0;
  const waiting = answeredCorrectly && waitSeconds > 0;
  const { leftMs, done: waitDone } = useCountdown(waiting, waitSeconds);
  const canContinue = answeredCorrectly && (!waiting || waitDone);
  const isLast = stepIndex === scenario.steps.length - 1;

  useEffect(() => {
    if (!chosen) return;
    // Po správné odpovědi musí být vidět odpočet a tlačítko Pokračovat, jinak stačí vysvětlení.
    if (answeredCorrectly) actionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    else feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chosen, answeredCorrectly]);
  useEffect(() => {
    if (finished) summaryRef.current?.focus();
  }, [finished]);

  function choose(optionId: string) {
    if (answeredCorrectly) return;
    setChosen(optionId);
    setTried((t) => (t.includes(optionId) ? t : [...t, optionId]));
    setFirstChoices((fc) => (fc.length > stepIndex ? fc : [...fc, optionId]));
  }

  function next() {
    if (!canContinue) return;
    if (!isLast) {
      setStepIndex((i) => i + 1);
      setChosen(null);
      setTried([]);
      return;
    }
    const firstCorrect = scenario.steps.filter((s, i) => s.options.find((o) => o.id === firstChoices[i])?.correct).length;
    setFinished({ correctSteps: firstCorrect, total: scenario.steps.length, perfect: firstCorrect === scenario.steps.length, xp: null });
    startTransition(async () => {
      try {
        const res = await submitTrainerFault(scenario.id, firstChoices);
        setFinished({ correctSteps: res.correctSteps, total: res.total, perfect: res.perfect, xp: res.xp });
        showToast(res);
      } catch {
        // Body se nepřipsaly (např. vypršelo přihlášení) – výsledek trenažéru tím netrpí.
      }
    });
  }

  function restart() {
    setStepIndex(0);
    setFirstChoices([]);
    setChosen(null);
    setTried([]);
    setFinished(null);
  }

  if (finished) {
    return (
      <section className="space-y-4" aria-labelledby="fault-summary">
        <div className={`rounded-2xl p-4 ${finished.perfect ? "bg-brand-50" : "bg-red-50"}`}>
          <h2 id="fault-summary" ref={summaryRef} tabIndex={-1} className="text-lg font-bold outline-none">
            {finished.perfect ? "Napoprvé bez chyby" : `Napoprvé správně ${finished.correctSteps} z ${finished.total} kroků`}
          </h2>
          <p className="mt-1 text-sm text-stone-700">
            {scenario.title} · <WeaponName id={scenario.weapon} />
            {finished.xp ? <span className="font-semibold"> · +{finished.xp} XP</span> : null}
          </p>
        </div>
        <div className="card">
          <SectionLabel>Postup v kostce</SectionLabel>
          <p className="mt-2 font-medium">{scenario.summary}</p>
          <SourceLine refs={scenario.sources} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="btn-secondary min-h-11" onClick={restart}>Projít znovu</button>
          <button type="button" className="btn-primary min-h-11" onClick={onNext}>Další situace</button>
        </div>
        <button type="button" className="min-h-11 w-full text-sm font-medium text-stone-600 hover:underline" onClick={onBack}>
          Zpět na seznam
        </button>
        <XpToast {...toast} />
      </section>
    );
  }

  return (
    <section className="space-y-4" aria-labelledby="fault-title">
      <div className="card space-y-2">
        <div className="flex items-center justify-between gap-2">
          <WeaponTag weapon={scenario.weapon} />
          <span className="font-mono text-xs text-stone-500">Krok {stepIndex + 1} z {scenario.steps.length}</span>
        </div>
        <h2 id="fault-title" className="text-xl font-bold">{scenario.title}</h2>
        <p className="text-stone-700">{scenario.situation}</p>
        <div className="flex gap-1" aria-hidden="true">
          {scenario.steps.map((s, i) => (
            <span key={s.id} className={`h-1.5 flex-1 rounded-full ${i < stepIndex ? "bg-brand-500" : i === stepIndex ? "bg-stone-400" : "bg-stone-200"}`} />
          ))}
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-lg font-semibold">{step.prompt}</legend>
        {options.map((o, i) => {
          const isChosen = o.id === chosen;
          const wasTried = tried.includes(o.id);
          let cls = "bg-white ring-stone-300 hover:bg-stone-50";
          if (isChosen && o.correct) cls = "bg-brand-50 ring-brand-500";
          else if (isChosen) cls = "bg-red-50 ring-red-400";
          else if (wasTried) cls = "bg-white ring-stone-200 opacity-60";
          else if (answeredCorrectly) cls = "bg-white ring-stone-200 opacity-60";
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => choose(o.id)}
              disabled={answeredCorrectly || wasTried}
              aria-pressed={isChosen}
              className={`flex min-h-11 w-full items-start gap-3 rounded-xl p-3 text-left ring-1 transition disabled:cursor-default ${cls}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-mono text-xs font-bold" aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{o.text}</span>
              {wasTried && !o.correct && <IconCross className="mt-0.5 h-4 w-4 text-red-600" />}
              {isChosen && o.correct && <IconCheck className="mt-0.5 h-4 w-4 text-brand-700" />}
            </button>
          );
        })}
      </fieldset>

      <div ref={feedbackRef} aria-live="polite" className="scroll-mb-4">
        {chosenOption && (
          <div className={`rounded-xl p-4 ${chosenOption.correct ? "bg-brand-50" : "bg-red-50"}`}>
            <p className="flex items-center gap-1.5 font-bold">
              {chosenOption.correct ? <IconCheck className="text-brand-700" /> : <IconCross className="text-red-600" />}
              {chosenOption.correct ? "Správně" : "Takhle ne"}
            </p>
            <p className="mt-1 text-sm text-stone-800">{chosenOption.explanation}</p>
            {chosenOption.fatal && (
              <p className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-red-700">
                <IconWarning className="mt-0.5 h-4 w-4" />
                {FATAL_NOTE}
              </p>
            )}
            <SourceLine refs={chosenOption.sources} />
            {!chosenOption.correct && <p className="mt-2 text-sm font-medium">Vyberte jinou možnost.</p>}
          </div>
        )}
      </div>

      <div ref={actionRef} className="scroll-mb-4 space-y-4">
        {waiting && <WaitPanel seconds={waitSeconds} leftMs={leftMs} done={waitDone} text={step.waitText ?? ""} />}
        {answeredCorrectly && (
          <button type="button" className="btn-primary min-h-11 w-full" disabled={!canContinue} onClick={next}>
            {!canContinue ? `Vyčkejte – ještě ${Math.ceil(leftMs / 1000)} s` : isLast ? "Dokončit" : "Pokračovat"}
          </button>
        )}
      </div>
    </section>
  );
}

function WeaponName({ id, className }: { id: FaultScenario["weapon"]; className?: string }) {
  return <span className={className}>{useWeapon(id).title}</span>;
}

function WaitPanel({ seconds, leftMs, done, text }: { seconds: number; leftMs: number; done: boolean; text: string }) {
  const total = seconds * 1000;
  const shown = Math.ceil(leftMs / 1000);
  return (
    <div className="card space-y-3 text-center" role="group" aria-label="Odpočet čekání po selhači">
      <p className="text-sm text-stone-700">{text}</p>
      <div role="timer" aria-live="off" className="font-mono text-5xl font-bold tabular-nums">
        {shown}
        <span className="ml-1 text-xl font-semibold text-stone-500">s</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-500 transition-[width] duration-100 ease-linear" style={{ width: `${((total - leftMs) / total) * 100}%` }} />
      </div>
      <p className="sr-only" aria-live="polite">{done ? `Uplynulo ${seconds} sekund. Můžete pokračovat.` : ""}</p>
      {done && <p className="text-sm font-semibold text-brand-700">Uplynulo {seconds} sekund – můžete pokračovat.</p>}
    </div>
  );
}
