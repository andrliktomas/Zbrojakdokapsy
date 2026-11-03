"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { SourceRef, Weapon, WeaponId } from "@/content/trainer";
import { formatSources } from "./util";
import type { AchievementDef } from "@/lib/gamification";

// --- Ikony (inline SVG, bez emoji) ---

type IconProps = { className?: string };
const base = "h-5 w-5 shrink-0";

export function IconCheck({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={`${base} ${className}`}>
      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCross({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" className={`${base} ${className}`}>
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}

export function IconLock({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className={`${base} ${className}`}>
      <rect x="4" y="9" width="12" height="8" rx="1.5" />
      <path d="M7 9V6.5a3 3 0 016 0V9" />
    </svg>
  );
}

export function IconUndo({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className={`${base} ${className}`}>
      <path d="M8 5L4 9l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9h7.5a4.5 4.5 0 010 9H9" strokeLinecap="round" />
    </svg>
  );
}

export function IconWarning({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className={`${base} ${className}`}>
      <path d="M10 3l8 14H2L10 3z" strokeLinejoin="round" />
      <path d="M10 8.5v4M10 14.8v.2" strokeLinecap="round" />
    </svg>
  );
}

// --- Zbraně (přicházejí v trainerView ze serveru) ---

export const WeaponsContext = createContext<Weapon[]>([]);

export function useWeapon(id: WeaponId): Weapon {
  const w = useContext(WeaponsContext).find((x) => x.id === id);
  return w ?? { id, title: id, short: id, description: "", sources: [] };
}

// --- Drobné prvky ---

export function SourceLine({ refs, className = "" }: { refs: SourceRef[]; className?: string }) {
  if (!refs.length) return null;
  return <p className={`mt-1.5 font-mono text-[11px] leading-snug text-stone-500 ${className}`}>Zdroj: {formatSources(refs)}</p>;
}

export function WeaponTag({ weapon }: { weapon: WeaponId }) {
  const w = useWeapon(weapon);
  return (
    <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-stone-600">
      {w.short}
    </span>
  );
}

export function AccessTag({ locked, free }: { locked: boolean; free: boolean }) {
  if (locked) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500">
        <IconLock className="h-3.5 w-3.5" /> V balíčku
      </span>
    );
  }
  if (free) return <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">Zdarma</span>;
  return null;
}

export function LockedNotice({ title, weapon }: { title: string; weapon: WeaponId }) {
  const w = useWeapon(weapon);
  return (
    <div className="card space-y-3 text-center">
      <IconLock className="mx-auto h-8 w-8 text-stone-400" />
      <div>
        <p className="text-sm text-stone-500">{w.title}</p>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm text-stone-600">
        Zdarma si vyzkoušíte vše se samonabíjecí pistolí. Ostatní zbraně a situace odemknete balíčkem – stejně jako všechny okruhy a testy.
      </p>
      <Link href="/cenik" className="btn-primary min-h-11 w-full">Vybrat balíček</Link>
    </div>
  );
}

export function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500">
      {children}
    </h3>
  );
}

// --- XP ---

export type XpResult = { xp: number; unlocked: AchievementDef[] };

/** Stav pro XpToast: zobrazí body na 2,5 s, stejně jako procvičování. */
export function useXpToast() {
  const [toast, setToast] = useState<XpResult>({ xp: 0, unlocked: [] });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const show = useCallback((r: XpResult) => {
    setToast({ xp: r.xp, unlocked: r.unlocked });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast({ xp: 0, unlocked: [] }), 2500);
  }, []);
  return [toast, show] as const;
}

// --- Odpočet ---

/** Odpočet v milisekundách; běží, dokud je `active`. Při deaktivaci se vrátí na začátek. */
export function useCountdown(active: boolean, seconds: number) {
  const total = seconds * 1000;
  const [left, setLeft] = useState(total);
  useEffect(() => {
    setLeft(total);
    if (!active) return;
    const start = Date.now();
    const t = setInterval(() => {
      const l = Math.max(0, total - (Date.now() - start));
      setLeft(l);
      if (l === 0) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, [active, total]);
  return { leftMs: left, done: active && left === 0 };
}
