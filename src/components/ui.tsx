export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  const color = pct >= 80 ? "bg-brand-500" : pct >= 50 ? "bg-accent-400" : "bg-red-400";
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-stone-200 ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="card">
      <div className="text-sm text-stone-500">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint && <div className="mt-1 text-xs text-stone-500">{hint}</div>}
    </div>
  );
}

export const pct = (v: number | null | undefined) => (v === null || v === undefined ? "–" : `${Math.round(v * 100)} %`);

export function Paywall({ message }: { message?: string }) {
  return (
    <div className="card mx-auto max-w-lg text-center">
      <div className="text-4xl">🔒</div>
      <h2 className="mt-2 text-xl font-bold">Tato část je v placeném balíčku</h2>
      <p className="mt-2 text-stone-600">{message ?? "Aktivujte si přístup na 3 týdny až 3 měsíce a odemkněte všechny okruhy, kartičky a cvičné testy."}</p>
      <a href="/cenik" className="btn-primary mt-4">Vybrat balíček</a>
    </div>
  );
}
