"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ExplainErrorCode, ExplainResponse } from "@/lib/ai-explain";

export const AI_NOTE = "Vysvětlení generuje AI – ověřte v citovaném předpisu.";

const CLIENT_TIMEOUT_MS = 70_000;
const NETWORK_MESSAGE = "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; text: string; remaining: number | null }
  | { status: "error"; code: ExplainErrorCode | "network"; message: string; retryable: boolean };

type Props = {
  questionId: string;
  /** Index zvolené (špatné) možnosti; -1 = otázka zůstala bez odpovědi. */
  chosenIndex: number;
  className?: string;
};

/**
 * Tlačítko „Proč je to špatně?“ – po kliknutí si od serveru vyžádá AI vysvětlení chyby.
 * Komponentu vkládejte s `key={questionId}`, aby se stav při přechodu na další otázku vynuloval.
 */
export function ExplainButton({ questionId, chosenIndex, className = "" }: Props) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [open, setOpen] = useState(true);
  const regionId = useId();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function load() {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const timer = setTimeout(() => ctrl.abort("timeout"), CLIENT_TIMEOUT_MS);
    setState({ status: "loading" });
    setOpen(true);
    try {
      const res = await fetch("/api/vysvetleni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, chosenIndex }),
        signal: ctrl.signal,
      });
      const data = (await res.json()) as ExplainResponse;
      if (data.ok) setState({ status: "done", text: data.text, remaining: data.remaining });
      else setState({ status: "error", code: data.code, message: data.message, retryable: data.retryable });
    } catch {
      // Zrušeno odmontováním nebo novým požadavkem → nic nehlásit.
      if (ctrl.signal.aborted && ctrl.signal.reason !== "timeout") return;
      setState({ status: "error", code: "network", message: NETWORK_MESSAGE, retryable: true });
    } finally {
      clearTimeout(timer);
    }
  }

  const loading = state.status === "loading";
  const blocked = state.status === "error" && !state.retryable;
  const expanded = state.status === "done" && open;

  function onClick() {
    if (loading || blocked) return;
    if (state.status === "done") setOpen((o) => !o);
    else void load();
  }

  const idleLabel = chosenIndex === -1 ? "Vysvětlit správnou odpověď" : "Proč je to špatně?";
  const label = loading
    ? "Připravuji vysvětlení…"
    : state.status === "done"
      ? open ? "Skrýt vysvětlení" : "Zobrazit vysvětlení"
      : state.status === "error" && state.retryable
        ? "Zkusit znovu"
        : idleLabel;

  return (
    <div className={`mt-3 ${className}`}>
      <button
        type="button"
        onClick={onClick}
        aria-controls={regionId}
        aria-expanded={state.status === "done" ? expanded : undefined}
        aria-disabled={loading || blocked || undefined}
        className="btn-secondary w-full text-sm sm:w-auto aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
      >
        {loading ? <Spinner /> : <Sparkle />}
        {label}
      </button>

      <div id={regionId} aria-live="polite">
        {loading && (
          <div className="card mt-3 p-4">
            <span className="sr-only">Připravuji vysvětlení…</span>
            <div className="animate-pulse space-y-2" aria-hidden="true">
              <div className="h-3 w-1/3 rounded bg-stone-200" />
              <div className="h-3 w-full rounded bg-stone-200" />
              <div className="h-3 w-11/12 rounded bg-stone-200" />
              <div className="h-3 w-4/5 rounded bg-stone-200" />
            </div>
          </div>
        )}

        {state.status === "done" && open && (
          <div className="card mt-3 p-4 text-left">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Sparkle className="h-4 w-4 text-accent-500" />
              AI vysvětlení
            </p>
            <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-stone-800">
              {state.text.split(/\n{2,}/).map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>
            <p className="mt-3 border-t border-stone-200 pt-2 text-xs text-stone-500">
              {AI_NOTE}
              {state.remaining !== null && state.remaining <= 5 && (
                <> Zbývající AI vysvětlení na dnešek: {state.remaining}.</>
              )}
            </p>
          </div>
        )}

        {state.status === "error" && (
          <div className="mt-3 rounded-xl bg-white p-3 text-left text-sm text-stone-700 ring-1 ring-stone-200">
            <p>{state.message}</p>
            {state.code === "upsell" && (
              <Link href="/cenik" className="btn-secondary mt-3 text-sm">
                Zobrazit balíčky
              </Link>
            )}
            {state.code === "login_required" && (
              <Link href="/prihlaseni" className="btn-secondary mt-3 text-sm">
                Přihlásit se
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Sparkle({ className = "h-4 w-4 text-accent-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M10 1.5l1.9 5.2 5.2 1.9-5.2 1.9L10 15.7l-1.9-5.2-5.2-1.9 5.2-1.9L10 1.5zM16 13l.8 2.2L19 16l-2.2.8L16 19l-.8-2.2L13 16l2.2-.8L16 13z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin text-stone-500">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
