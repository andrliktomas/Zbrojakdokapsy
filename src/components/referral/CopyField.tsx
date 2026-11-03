"use client";

import { useId, useRef, useState } from "react";

async function copyText(text: string, fallback?: HTMLInputElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Starší prohlížeče / nezabezpečený kontext: označit text, ať ho jde zkopírovat ručně.
    fallback?.select();
    return false;
  }
}

/** Pole jen pro čtení s tlačítkem "Kopírovat" (odkaz pro doporučení, odkaz do skupiny). */
export function CopyField({ label, value, hint }: { label: string; value: string; hint?: string }) {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <div className="flex gap-2">
        <input
          ref={ref}
          id={id}
          readOnly
          value={value}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="input min-w-0 flex-1 font-mono text-sm"
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          type="button"
          className="btn-secondary shrink-0"
          onClick={async () => {
            setState((await copyText(value, ref.current)) ? "copied" : "manual");
            setTimeout(() => setState("idle"), 2500);
          }}
        >
          {state === "copied" ? "Zkopírováno" : "Kopírovat"}
        </button>
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-stone-500">{hint}</p>}
      <p aria-live="polite" className="sr-only">
        {state === "copied" ? "Zkopírováno do schránky" : state === "manual" ? "Text je označený, zkopírujte ho ručně" : ""}
      </p>
    </div>
  );
}

/** Tlačítko, které zkopíruje delší text (např. seznam volných kódů). */
export function CopyButton({ text, label, className = "btn-secondary" }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={async () => {
          if (await copyText(text)) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }
        }}
      >
        {copied ? "Zkopírováno" : label}
      </button>
      <span aria-live="polite" className="sr-only">{copied ? "Zkopírováno do schránky" : ""}</span>
    </>
  );
}
