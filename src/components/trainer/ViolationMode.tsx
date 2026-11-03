"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitTrainerViolation } from "@/app/trenazer/actions";
import type { MaybeLocked, Unlocked, ViolationScenario } from "@/content/trainer";
import { hashString, seededRandom, shuffleChanged } from "./util";
import { XpToast } from "@/components/XpToast";
import { IconCheck, IconCross, IconLock, IconWarning, SourceLine, WeaponTag, useXpToast } from "./shared";

export function ViolationMode({ violations, paid, seed }: { violations: MaybeLocked<ViolationScenario>[]; paid: boolean; seed: number }) {
  const open = violations.filter((v): v is Unlocked<ViolationScenario> => !v.locked);
  const lockedCount = violations.length - open.length;
  const [order, setOrder] = useState(() => open.map((v) => v.id));
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [toast, showToast] = useXpToast();
  const [, startTransition] = useTransition();
  const feedbackRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const scenario = open.find((v) => v.id === order[index]);
  const actions = useMemo(
    () => (scenario ? shuffleChanged(scenario.actions, seededRandom(seed ^ hashString(scenario.id))) : []),
    [scenario, seed],
  );

  useEffect(() => {
    if (chosen) feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chosen]);

  function choose(actionId: string) {
    if (!scenario || chosen) return;
    setChosen(actionId);
    const correct = !!scenario.actions.find((a) => a.id === actionId)?.violation;
    if (correct) setScore((s) => s + 1);
    startTransition(async () => {
      try {
        showToast(await submitTrainerViolation(scenario.id, actionId));
      } catch {
        // Body se nepřipsaly – vyhodnocení na obrazovce platí dál.
      }
    });
  }
  function next() {
    setIndex((i) => i + 1);
    setChosen(null);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function restart() {
    setOrder(shuffleChanged(open.map((v) => v.id), Math.random));
    setIndex(0);
    setChosen(null);
    setScore(0);
  }

  const upsell = !paid && lockedCount > 0 && (
    <div className="flex items-start gap-3 rounded-xl bg-stone-100 p-3 text-sm text-stone-700">
      <IconLock className="mt-0.5 h-4 w-4 text-stone-500" />
      <p>
        Dalších {lockedCount} situací s revolverem a dlouhými zbraněmi je v plném balíčku.{" "}
        <Link href="/cenik" className="font-semibold underline">Vybrat balíček</Link>
      </p>
    </div>
  );

  if (!scenario) {
    return (
      <div ref={topRef} className="scroll-mt-20 space-y-4">
        <div className={`rounded-2xl p-4 ${score === open.length ? "bg-brand-50" : "bg-stone-100"}`}>
          <h2 className="text-lg font-bold">Správně {score} z {open.length}</h2>
          <p className="mt-1 text-sm text-stone-700">
            {score === open.length
              ? "Chyby, které u zkoušky znamenají konec, poznáte spolehlivě."
              : "Projděte situace znovu – rozdíl mezi „povoleno“ a „neprospěl“ bývá v detailu."}
          </p>
        </div>
        <button type="button" className="btn-primary min-h-11 w-full" onClick={restart}>Projít znovu</button>
        {upsell}
        <XpToast {...toast} />
      </div>
    );
  }

  const chosenAction = scenario.actions.find((a) => a.id === chosen) ?? null;

  return (
    <div ref={topRef} className="scroll-mt-20 space-y-4">
      <p className="text-stone-600">
        Komisař hodnotí „neprospěl“, když žadatel ohrozí (nebo by v praxi ohrozil) bezpečnost osob nebo nezvládne předepsaný postup. Ostatní jednání v situaci jsou podle předpisu v pořádku.
      </p>
      <section className="card space-y-3" aria-labelledby="violation-title">
        <div className="flex items-center justify-between gap-2">
          <WeaponTag weapon={scenario.weapon} />
          <span className="font-mono text-xs text-stone-500">Situace {index + 1} z {order.length}</span>
        </div>
        <h2 id="violation-title" className="text-xl font-bold">{scenario.title}</h2>
        <p className="text-stone-700">{scenario.situation}</p>
        {!chosen ? (
          <fieldset className="space-y-2">
            <legend className="mb-2 font-semibold">{QUESTION}</legend>
            {actions.map((a, i) => (
              <button
                key={a.id}
                type="button"
                onClick={() => choose(a.id)}
                className="flex min-h-11 w-full items-start gap-3 rounded-xl bg-white p-3 text-left ring-1 ring-stone-300 transition hover:bg-stone-50 active:bg-stone-100"
              >
                <Letter i={i} />
                <span className="flex-1">{a.text}</span>
              </button>
            ))}
          </fieldset>
        ) : (
          <div className="space-y-2">
            <p className="mb-2 font-semibold">{QUESTION}</p>
            <ul className="space-y-2">
              {actions.map((a, i) => {
                const isChosen = a.id === chosen;
                const cls = a.violation ? "bg-red-50 ring-red-400" : isChosen ? "bg-white ring-stone-500" : "bg-white ring-stone-200";
                return (
                  <li key={a.id} className={`flex items-start gap-3 rounded-xl p-3 ring-1 ${cls}`}>
                    <Letter i={i} />
                    <div className="min-w-0 flex-1">
                      <p>{a.text}</p>
                      <p className={`mt-1 text-sm font-semibold ${a.violation ? "text-red-700" : "text-stone-600"}`}>
                        {a.violation ? "Porušení – neprospěl" : "V pořádku"}
                        {isChosen ? " · vaše volba" : ""}
                      </p>
                      <p className="mt-0.5 text-sm text-stone-700">{a.explanation}</p>
                      <SourceLine refs={a.sources} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <div ref={feedbackRef} aria-live="polite" className="scroll-mb-4">
        {chosenAction && (
          <div className="space-y-3">
            <div className={`rounded-xl p-4 ${chosenAction.violation ? "bg-brand-50" : "bg-red-50"}`}>
              <p className="flex items-center gap-1.5 font-bold">
                {chosenAction.violation ? <IconCheck className="text-brand-700" /> : <IconCross className="text-red-600" />}
                {chosenAction.violation ? "Správně – tohle komisař neodpustí" : "Vedle – tohle je v pořádku"}
              </p>
              <p className="mt-2 flex items-start gap-1.5 text-sm text-stone-800">
                <IconWarning className="mt-0.5 h-4 w-4 text-red-600" />
                <span>{scenario.verdict}</span>
              </p>
              <SourceLine refs={scenario.sources} />
            </div>
            <button type="button" className="btn-primary min-h-11 w-full" onClick={next}>
              {index + 1 < order.length ? "Další situace" : "Vyhodnotit"}
            </button>
          </div>
        )}
      </div>
      {index === 0 && !chosen && upsell}
      <XpToast {...toast} />
    </div>
  );
}

const QUESTION = "Které jednání by u zkoušky znamenalo „neprospěl“?";

function Letter({ i }: { i: number }) {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-mono text-xs font-bold" aria-hidden="true">
      {String.fromCharCode(65 + i)}
    </span>
  );
}
