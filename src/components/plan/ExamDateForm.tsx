"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { saveExamPlan, type ExamPlanState } from "@/app/actions/plan";
import type { PermitType } from "@/lib/plan";

const OPTIONS: { value: PermitType; title: string; hint: string }[] = [
  { value: "obecne", title: "Obecné zbrojní oprávnění", hint: "Hranice 26 z 30 bodů" },
  { value: "rozsirene", title: "Rozšířené zbrojní oprávnění", hint: "Hranice 28 z 30 bodů" },
];

type Props = {
  examDate: string | null;
  permit: PermitType;
  today: string;
  maxDate: string;
  /** Bez platného termínu je formulář vidět vždy (není co skrývat za tlačítko). */
  alwaysOpen: boolean;
};

export function ExamDateForm({ examDate, permit, today, maxDate, alwaysOpen }: Props) {
  const [state, action, pending] = useActionState<ExamPlanState, FormData>(saveExamPlan, undefined);
  const [open, setOpen] = useState(false);
  const id = useId();
  const dateRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const focusAfter = useRef<"date" | "toggle" | null>(null);
  const showForm = alwaysOpen || open;
  const error = state?.status === "error" ? state.error : null;

  useEffect(() => {
    if (state?.status === "saved") {
      setOpen(false);
      focusAfter.current = "toggle";
    }
  }, [state]);

  useEffect(() => {
    if (focusAfter.current === "date") dateRef.current?.focus();
    if (focusAfter.current === "toggle") toggleRef.current?.focus();
    focusAfter.current = null;
  }, [showForm]);

  return (
    <div className={showForm ? "w-full basis-full" : "w-full sm:w-auto"}>
      {!showForm && (
        <button
          ref={toggleRef}
          type="button"
          className="btn-secondary min-h-11 w-full sm:w-auto"
          aria-expanded={false}
          aria-controls={`${id}-form`}
          onClick={() => {
            focusAfter.current = "date";
            setOpen(true);
          }}
        >
          Změnit termín
        </button>
      )}

      {showForm && (
        <form id={`${id}-form`} action={action} className="space-y-4" aria-label="Termín zkoušky a typ oprávnění">
          <div>
            <label className="label" htmlFor={`${id}-date`}>Datum zkoušky</label>
            <input
              ref={dateRef}
              className="input min-h-11 font-mono sm:max-w-xs"
              type="date"
              id={`${id}-date`}
              name="examDate"
              required
              min={today}
              max={maxDate}
              defaultValue={examDate && examDate >= today ? examDate : ""}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : `${id}-date-hint`}
            />
            <p id={`${id}-date-hint`} className="mt-1 text-xs text-stone-500">Den, kdy skládáte zkoušku – dnes nebo později.</p>
          </div>

          <fieldset>
            <legend className="label">Typ zbrojního oprávnění</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-stone-300 transition has-checked:bg-brand-50 has-checked:ring-2 has-checked:ring-brand-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
                >
                  <input
                    type="radio"
                    name="targetPermit"
                    value={o.value}
                    defaultChecked={permit === o.value}
                    required
                    className="mt-1 h-5 w-5 shrink-0 accent-brand-600"
                  />
                  <span>
                    <span className="block font-semibold">{o.title}</span>
                    <span className="block text-sm text-stone-600">{o.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && (
            <p id={`${id}-error`} role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button className="btn-primary min-h-11" disabled={pending}>
              {pending ? "Ukládám…" : examDate ? "Uložit změny" : "Uložit termín"}
            </button>
            {!alwaysOpen && (
              <button type="button" className="btn-secondary min-h-11" onClick={() => { focusAfter.current = "toggle"; setOpen(false); }}>
                Zavřít
              </button>
            )}
            {examDate && (
              <button
                name="intent"
                value="clear"
                formNoValidate
                disabled={pending}
                className="btn min-h-11 text-red-700 hover:bg-red-50 sm:ml-auto"
              >
                Smazat termín
              </button>
            )}
          </div>
        </form>
      )}

      <p role="status" className="sr-only">
        {state?.status === "saved" ? "Termín zkoušky je uložený, plán se přizpůsobil." : state?.status === "cleared" ? "Termín zkoušky je smazaný." : ""}
      </p>
    </div>
  );
}
