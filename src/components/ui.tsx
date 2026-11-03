import Link from "next/link";
import { LogoMark } from "./Logo";

/** České skloňování podle počtu: plural(3, "den", "dny", "dní") → "dny". */
export function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(n);
  if (abs === 1) return one;
  if (abs >= 2 && abs <= 4) return few;
  return many;
}

/** Čísla v českém formátu (mezera jako oddělovač tisíců). */
export const num = (n: number) => n.toLocaleString("cs-CZ");

export const pct = (v: number | null | undefined) => (v === null || v === undefined ? "–" : `${Math.round(v * 100)} %`);

/**
 * Ukazatel průběhu. Výchozí `tone="mastery"`: od 80 % zelená (Zásah), jinak Grafit.
 * `tone="ink"` je vždy Grafit (např. průběh levelu).
 */
export function ProgressBar({
  value,
  className = "",
  tone = "mastery",
  label,
}: {
  value: number;
  className?: string;
  tone?: "mastery" | "ink";
  label?: string;
}) {
  const p = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const color = tone === "mastery" && p >= 80 ? "bg-zasah" : "bg-ink";
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-line ${className}`}
      role="progressbar"
      aria-valuenow={p}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className={`h-full rounded-full ${color} transition-[width] duration-500`} style={{ width: `${p}%` }} />
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="card">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 text-2xl font-black tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-sm text-ocel">{hint}</div>}
    </div>
  );
}

/** Nadpis stránky: mono štítek + nadpis + volitelný úvod. */
export function PageHeader({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-1.5 text-[28px] leading-tight font-black tracking-[-0.02em] sm:text-4xl">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-base leading-relaxed text-stone-700">{children}</div>}
    </header>
  );
}

// ---------- Ikony (stroke = currentColor) ----------

type IconProps = { className?: string; size?: number };

export function LockIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <rect x="2.5" y="7" width="11" height="7.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 7V5a3 3 0 016 0v2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CheckIcon({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path d="M3 9.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrossIcon({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** Malý terč – „zásah“ (správně / hotovo). */
export function HitIcon({ className, size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="11" cy="11" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function FlameIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={(size * 14) / 16} height={size} viewBox="0 0 14 16" aria-hidden="true" className={className}>
      <path d="M7 1C8 4 12 6 12 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z" fill="currentColor" />
    </svg>
  );
}

// ---------- Gamifikace ----------

/** XP odznak: Grafit, mono, oranžová tečka = zásah. */
export function XpChip({ xp, gain = false, className = "" }: { xp: number; gain?: boolean; className?: string }) {
  return (
    <span className={`xp-chip ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-signal" />
      {gain ? "+" : ""}
      {num(xp)} XP
    </span>
  );
}

/** Série dní v řadě. Živá série = oranžový plamen, nulová = šedý. */
export function StreakBadge({ days, className = "" }: { days: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border-2 px-2 py-1 font-mono text-sm leading-none font-semibold whitespace-nowrap ${
        days > 0 ? "border-signal/60 bg-signal-50 text-ink" : "border-line-strong bg-white text-ocel"
      } ${className}`}
      title={`Série: ${days} ${plural(days, "den", "dny", "dní")} v řadě`}
    >
      <FlameIcon size={14} className={days > 0 ? "text-signal" : "text-stone-400"} />
      <span className="sr-only">Série dní v řadě:</span>
      {days}
    </span>
  );
}

// ---------- Paywall ----------

export function Paywall({ message }: { message?: string }) {
  return (
    <div className="card mx-auto max-w-lg p-6 text-center sm:p-8">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-paper">
        <LockIcon size={24} />
      </span>
      <p className="eyebrow mt-4">Placený balíček</p>
      <h2 className="mt-1 text-2xl font-black tracking-tight">Odemkněte celou přípravu</h2>
      <p className="mt-2 text-stone-700">
        {message ?? "Aktivujte si přístup na 3 týdny až 3 měsíce a odemkněte všechny okruhy, kartičky a cvičné testy."}
      </p>
      <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
        <Link href="/cenik" className="btn-accent">Vybrat balíček</Link>
        <Link href="/prehled" className="btn-secondary">Zpět na přehled</Link>
      </div>
    </div>
  );
}

/** Prázdný / dokončený stav s malým terčem. */
export function DoneMark({ className = "" }: { className?: string }) {
  return <LogoMark size={56} detail className={`mx-auto ${className}`} />;
}
