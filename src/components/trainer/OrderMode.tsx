"use client";

import { useContext, useEffect, useRef, useState, useTransition } from "react";
import { submitTrainerOrder } from "@/app/trenazer/actions";
import type { MaybeLocked, Procedure, Unlocked } from "@/content/trainer";
import { hashString, seededRandom, shuffleChanged } from "./util";
import { XpToast } from "@/components/XpToast";
import { IconCheck, IconCross, IconLock, IconUndo, LockedNotice, SectionLabel, SourceLine, WeaponsContext, useXpToast } from "./shared";

type Position = { stepId: string; expectedId: string; correct: boolean };
type LocalGrade = { positions: Position[]; correctCount: number; total: number; perfect: boolean };

/** Okamžité vyhodnocení v prohlížeči; body a závazné vyhodnocení počítá server (gradeOrder). */
function compareOrder(procedure: Procedure, placed: string[]): LocalGrade {
  const positions = placed.map((stepId, i) => ({ stepId, expectedId: procedure.steps[i].id, correct: stepId === procedure.steps[i].id }));
  const correctCount = positions.filter((p) => p.correct).length;
  return { positions, correctCount, total: procedure.steps.length, perfect: correctCount === procedure.steps.length };
}

export function OrderMode({ procedures, paid, seed }: { procedures: MaybeLocked<Procedure>[]; paid: boolean; seed: number }) {
  const firstOpen = procedures.find((p) => !p.locked) ?? procedures[0];
  const [selectedId, setSelectedId] = useState(firstOpen.id);
  const selected = procedures.find((p) => p.id === selectedId) ?? firstOpen;
  const topRef = useRef<HTMLDivElement>(null);
  const weapons = useContext(WeaponsContext);

  function selectNext() {
    const open = procedures.filter((p) => !p.locked);
    const i = open.findIndex((p) => p.id === selectedId);
    const next = open[(i + 1) % open.length] ?? firstOpen;
    setSelectedId(next.id);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div ref={topRef} className="scroll-mt-20 space-y-4">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-stone-700">Zbraň</legend>
        <div className="grid grid-cols-2 gap-2">
          {weapons.map((w) => {
            const p = procedures.find((x) => x.weapon === w.id);
            if (!p) return null;
            const active = p.id === selected.id;
            return (
              <button
                key={w.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(p.id)}
                className={`flex min-h-14 flex-col items-start justify-center gap-1 rounded-xl px-3 py-2 text-left text-sm ring-1 transition ${
                  active ? "bg-brand-600 text-white ring-brand-600" : "bg-white text-stone-800 ring-stone-300 hover:bg-stone-50"
                }`}
              >
                <span className="font-semibold leading-tight">{w.short}</span>
                {!paid && (
                  <span className={`inline-flex items-center gap-1 text-xs ${active ? "text-white/85" : p.locked ? "text-stone-500" : "font-semibold text-brand-700"}`}>
                    {p.locked ? <><IconLock className="h-3.5 w-3.5" /> V balíčku</> : p.free ? "Zdarma" : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {selected.locked ? (
        <LockedNotice title={selected.title} weapon={selected.weapon} />
      ) : (
        <OrderExercise key={selected.id} procedure={selected} seed={seed} onNext={selectNext} />
      )}
    </div>
  );
}

function OrderExercise({ procedure, seed, onNext }: { procedure: Unlocked<Procedure>; seed: number; onNext: () => void }) {
  const stepById = new Map(procedure.steps.map((s) => [s.id, s]));
  const allIds = procedure.steps.map((s) => s.id);
  // První zamíchání je deterministické (semínko ze serveru), aby se shodovalo vykreslení na serveru a v prohlížeči.
  const [pool, setPool] = useState(() => shuffleChanged(allIds, seededRandom(seed ^ hashString(procedure.id))));
  const [placed, setPlaced] = useState<string[]>([]);
  const [grade, setGrade] = useState<LocalGrade | null>(null);
  const [award, setAward] = useState<{ xp: number } | null>(null);
  const [toast, showToast] = useXpToast();
  const [, startTransition] = useTransition();
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (grade) resultRef.current?.focus();
  }, [grade]);

  function place(id: string) {
    setPool((p) => p.filter((x) => x !== id));
    setPlaced((p) => [...p, id]);
  }
  function unplace(id: string) {
    setPlaced((p) => p.filter((x) => x !== id));
    setPool((p) => [...p, id]);
  }
  function clearPlacement() {
    setPool((p) => [...placed, ...p]);
    setPlaced([]);
  }
  function check() {
    setGrade(compareOrder(procedure, placed));
    startTransition(async () => {
      try {
        const res = await submitTrainerOrder(procedure.id, placed);
        setAward({ xp: res.xp });
        showToast(res);
      } catch {
        setAward({ xp: 0 });
      }
    });
  }
  function retry() {
    setPool(shuffleChanged(allIds, Math.random));
    setPlaced([]);
    setGrade(null);
    setAward(null);
  }

  if (grade) {
    return (
      <section className="space-y-4" aria-labelledby="order-result">
        <div className={`rounded-2xl p-4 ${grade.perfect ? "bg-brand-50" : "bg-red-50"}`}>
          <h3 id="order-result" ref={resultRef} tabIndex={-1} className="text-lg font-bold outline-none">
            {grade.perfect ? "Celý postup máte správně" : `Na správném místě: ${grade.correctCount} z ${grade.total} kroků`}
          </h3>
          <p className="mt-1 text-sm text-stone-700">
            {grade.perfect
              ? "Přesně v tomhle pořadí ho předvedete komisaři."
              : "Projděte si, kam který krok patří, a zkuste to znovu."}
            {award && award.xp > 0 && <span className="font-semibold"> +{award.xp} XP</span>}
          </p>
        </div>

        <ol className="space-y-2">
          {grade.positions.map((pos, i) => {
            const mine = stepById.get(pos.stepId)!;
            const expected = stepById.get(pos.expectedId)!;
            return (
              <li key={pos.stepId} className={`rounded-xl p-3 ring-1 ${pos.correct ? "bg-brand-50 ring-brand-500" : "bg-red-50 ring-red-400"}`}>
                <div className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white font-mono text-sm font-bold ring-1 ring-stone-200">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      {pos.correct ? <IconCheck className="h-4 w-4 text-brand-700" /> : <IconCross className="h-4 w-4 text-red-600" />}
                      {pos.correct ? "Správně" : "Špatně"}
                    </p>
                    <p className={`mt-0.5 ${pos.correct ? "" : "text-stone-500 line-through decoration-red-400"}`}>{mine.text}</p>
                    {!pos.correct && (
                      <p className="mt-1">
                        <span className="text-sm font-semibold">Sem patří: </span>
                        {expected.text}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-stone-700">{expected.why}</p>
                    <SourceLine refs={expected.sources} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="card space-y-3">
          <SectionLabel>Dobré vědět</SectionLabel>
          <ul className="space-y-3 text-sm text-stone-800">
            {procedure.notes.map((n) => (
              <li key={n.text}>
                {n.text}
                <SourceLine refs={n.sources} />
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="btn-secondary min-h-11" onClick={retry}>Zkusit znovu</button>
          <button type="button" className="btn-primary min-h-11" onClick={onNext}>Další zbraň</button>
        </div>
        <XpToast {...toast} />
      </section>
    );
  }

  return (
    <section className="space-y-4" aria-label={procedure.title}>
      <div>
        <h2 className="text-xl font-bold">{procedure.title}</h2>
        <p className="mt-1 text-stone-600">{procedure.intro}</p>
        <p className="mt-1 text-sm text-stone-500">Klepejte na kroky v tom pořadí, v jakém je provedete.</p>
      </div>

      <div className="space-y-2">
        <SectionLabel id="order-placed">Váš postup</SectionLabel>
        {placed.length === 0 ? (
          <p className="rounded-xl border-2 border-dashed border-stone-300 p-4 text-center text-sm text-stone-500">
            Zatím prázdné. Začněte krokem, který uděláte jako první.
          </p>
        ) : (
          <ol className="space-y-2" aria-labelledby="order-placed">
            {placed.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-xl bg-white p-2 pl-3 ring-1 ring-brand-500">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 font-mono text-sm font-bold text-white">{i + 1}</span>
                <span className="min-w-0 flex-1 text-sm leading-snug">{stepById.get(id)!.text}</span>
                <button
                  type="button"
                  onClick={() => unplace(id)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                  aria-label={`Vrátit ${i + 1}. krok mezi nezařazené`}
                >
                  <IconUndo />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {pool.length > 0 && (
        <div className="space-y-2">
          <SectionLabel id="order-pool">Nezařazené kroky ({pool.length})</SectionLabel>
          <ul className="space-y-2" aria-labelledby="order-pool">
            {pool.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => place(id)}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl bg-white p-3 text-left text-sm leading-snug ring-1 ring-stone-300 transition hover:bg-stone-50 active:bg-stone-100"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-dashed border-stone-300 font-mono text-xs text-stone-400" aria-hidden="true">
                    {placed.length + 1}
                  </span>
                  <span>
                    <span className="sr-only">Zařadit jako {placed.length + 1}. krok: </span>
                    {stepById.get(id)!.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <button type="button" className="btn-primary min-h-11 w-full" disabled={pool.length > 0} onClick={check}>
          Zkontrolovat pořadí
        </button>
        {pool.length > 0 && <p className="text-center text-xs text-stone-500">Nejdřív zařaďte všechny kroky.</p>}
        {placed.length > 0 && (
          <button type="button" className="btn-secondary min-h-11 w-full" onClick={clearPlacement}>
            Začít řadit znovu
          </button>
        )}
      </div>
    </section>
  );
}
