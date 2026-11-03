"use client";

import { useState } from "react";
import type { TrainerMode, TrainerView } from "@/content/trainer";
import { OrderMode } from "./OrderMode";
import { FaultMode } from "./FaultMode";
import { ViolationMode } from "./ViolationMode";
import { WeaponsContext } from "./shared";

const MODES: { id: TrainerMode; label: string; hint: string }[] = [
  { id: "poradi", label: "Seřaď kroky", hint: "Kontrola zbraně krok za krokem" },
  { id: "zavady", label: "Závady", hint: "Selhač, slabá rána, zádržka" },
  { id: "chyby", label: "Co je špatně?", hint: "Za co se neprojde" },
];

export function Trainer({ view, paid, seed, initialMode }: { view: TrainerView; paid: boolean; seed: number; initialMode: TrainerMode }) {
  const [mode, setMode] = useState<TrainerMode>(initialMode);

  function switchMode(next: TrainerMode) {
    setMode(next);
    // Adresa odpovídá režimu, aby šel sdílet odkaz a fungovalo obnovení stránky.
    const url = new URL(window.location.href);
    url.searchParams.set("rezim", next);
    window.history.replaceState(null, "", url);
  }

  const current = MODES.find((m) => m.id === mode)!;

  return (
    <WeaponsContext.Provider value={view.weapons}>
      <div className="space-y-5">
        <nav aria-label="Režim trenažéru" className="grid grid-cols-3 gap-1 rounded-2xl bg-stone-200/70 p-1">
          {MODES.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => switchMode(m.id)}
                className={`min-h-11 rounded-xl px-1 text-sm font-semibold leading-tight transition ${
                  active ? "bg-white text-stone-900 shadow-sm ring-1 ring-stone-300" : "text-stone-600 hover:bg-white/60"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </nav>
        <p className="-mt-2 text-center font-mono text-xs uppercase tracking-wider text-stone-500">{current.hint}</p>

        {mode === "poradi" && <OrderMode procedures={view.procedures} paid={paid} seed={seed} />}
        {mode === "zavady" && <FaultMode faults={view.faults} paid={paid} seed={seed} />}
        {mode === "chyby" && <ViolationMode violations={view.violations} paid={paid} seed={seed} />}
      </div>
    </WeaponsContext.Provider>
  );
}
