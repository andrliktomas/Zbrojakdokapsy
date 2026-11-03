// Registr schematických obrázků: ID obrázku → kresba. Metadata (názvy součástí, čísla,
// pozice odkazů) jsou v catalog.ts, aby je mohly používat i testy bez Reactu.

import { useId, type ComponentType } from "react";
import type { FigureRef } from "../../content/types";
import { figureMeta, type FigureId, type FigurePart } from "./catalog";
import { ACCENT, INK, PAPER, Patterns, type DrawingProps } from "./primitives";
import { BrokovyNaboj, DnaNabojnic, KulovyNaboj } from "./ammo";
import { Pistole, PistoleRozlozena } from "./pistol";
import { Revolver } from "./revolver";
import { Brokovnice, KozliceDvojka, KulovniceStred } from "./longguns";

export { FIGURE_CATALOG, FIGURE_IDS, isFigureId, type FigureId } from "./catalog";

const Brenneke = (p: DrawingProps) => <BrokovyNaboj {...p} load="brenneke" />;

export const FIGURE_DRAWINGS: Record<FigureId, ComponentType<DrawingProps>> = {
  "kulovy-naboj": KulovyNaboj,
  "brokovy-naboj": BrokovyNaboj,
  "brokovy-naboj-brenneke": Brenneke,
  "dna-nabojnic": DnaNabojnic,
  pistole: Pistole,
  "pistole-rozlozena": PistoleRozlozena,
  revolver: Revolver,
  "kozlice-dvojka": KozliceDvojka,
  brokovnice: Brokovnice,
  "kulovnice-stred": KulovniceStred,
};

const MARK_R = 20;

function Leader({ part, active, arrow }: { part: FigurePart; active: boolean; arrow: boolean }) {
  const [ax, ay] = part.at;
  const [mx, my] = part.pos;
  const dx = ax - mx;
  const dy = ay - my;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const color = active ? ACCENT : INK;
  if (arrow) {
    // jen krátká grafitová šipka na zvýrazněnou část (bez čísla, aby neprozradila odpověď)
    const tipX = ax - ux * 3;
    const tipY = ay - uy * 3;
    const len2 = Math.min(len, 78);
    const startX = ax - ux * len2;
    const startY = ay - uy * len2;
    const bx = tipX - ux * 17;
    const by = tipY - uy * 17;
    const head = `M${tipX} ${tipY} L${bx - uy * 9} ${by + ux * 9} L${bx + uy * 9} ${by - ux * 9} Z`;
    return (
      <g>
        <line x1={startX} y1={startY} x2={bx} y2={by} stroke="#fff" strokeWidth="9" strokeLinecap="round" />
        <path d={head} fill="#fff" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
        <line x1={startX} y1={startY} x2={bx} y2={by} stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
        <path d={head} fill={INK} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    );
  }
  const sx = mx + ux * MARK_R;
  const sy = my + uy * MARK_R;
  return (
    <g>
      <line x1={sx} y1={sy} x2={ax} y2={ay} stroke="#fff" strokeWidth="5" strokeOpacity="0.85" strokeLinecap="round" />
      <line x1={sx} y1={sy} x2={ax} y2={ay} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx={ax} cy={ay} r="3.8" fill={color} stroke="#fff" strokeWidth="1.6" />
      <circle cx={mx} cy={my} r={MARK_R} fill={active ? ACCENT : "#fff"} stroke={color} strokeWidth="2.2" />
      <text
        x={mx}
        y={my}
        dy="0.35em"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={active ? "#fff" : "currentColor"}
        stroke="none"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {part.n}
      </text>
    </g>
  );
}

type Mode = "lesson" | "question";

function ariaLabel(ref: FigureRef, mode: Mode) {
  const meta = figureMeta(ref.id);
  if (!meta) return "Obrázek";
  const callouts = ref.callouts ?? "all";
  if (mode === "question") {
    // Popis nesmí prozradit odpověď – bez názvů součástí.
    const bits = [ref.caption ?? "Schematický obrázek k otázce"];
    if (callouts === "all") bits.push("součásti jsou označené čísly");
    if (ref.highlight) bits.push("jedna součást je zvýrazněná oranžově");
    return bits.join("; ") + ".";
  }
  const parts = meta.parts.map((p) => `${p.n} – ${p.label}`).join(", ");
  const active = meta.parts.find((p) => p.key === ref.highlight);
  return [meta.title + ".", callouts === "none" ? "" : `Očíslované části: ${parts}.`, active ? `Zvýrazněno: ${active.label}.` : ""]
    .filter(Boolean)
    .join(" ");
}

/** Samotná kresba (SVG) s odkazovými čísly. */
export function FigureSvg({ figure, mode = "lesson", className }: { figure: FigureRef; mode?: Mode; className?: string }) {
  const rawId = useId();
  const meta = figureMeta(figure.id);
  if (!meta) return null;
  const Drawing = FIGURE_DRAWINGS[figure.id as FigureId];
  const uid = `fig${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const callouts = figure.callouts ?? "all";
  const parts = meta.parts.filter((p) => callouts === "all" || (callouts === "highlight" && p.key === figure.highlight));
  return (
    <svg
      viewBox={`0 0 ${meta.width} ${meta.height}`}
      role="img"
      aria-label={ariaLabel(figure, mode)}
      className={className}
      style={{ display: "block", width: "100%", height: "auto", fontFamily: "inherit", color: INK }}
    >
      <title>{mode === "question" ? "Obrázek k otázce" : meta.title}</title>
      <Patterns uid={uid} />
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <Drawing hl={figure.highlight} uid={uid} />
      </g>
      <g>
        {parts.map((p) => (
          <Leader key={p.key} part={p} active={p.key === figure.highlight} arrow={callouts === "highlight"} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Obrázek s rámečkem. Ve výkladu (`mode="lesson"`) přidá legendu s názvy součástí a popisek,
 * u otázek (`mode="question"`) jen čísla – legenda by prozradila odpověď.
 */
export function Figure({ figure, mode = "lesson", className = "" }: { figure: FigureRef; mode?: Mode; className?: string }) {
  const meta = figureMeta(figure.id);
  if (!meta) return null;
  const callouts = figure.callouts ?? "all";
  const showLegend = mode === "lesson" && callouts !== "none";
  const caption = figure.caption ?? (mode === "lesson" ? meta.caption : undefined);
  return (
    <figure className={`overflow-hidden rounded-xl ring-1 ring-stone-200 ${className}`} style={{ background: PAPER, color: INK }}>
      <div className="mx-auto max-w-lg px-1 pt-3 pb-2 sm:px-4">
        <FigureSvg figure={figure} mode={mode} />
      </div>
      {showLegend && (
        <ol className="grid gap-x-6 gap-y-1.5 border-t border-stone-300/60 bg-white/60 px-4 py-3 text-sm sm:grid-cols-2">
          {meta.parts.map((p) => {
            const active = p.key === figure.highlight;
            return (
              <li key={p.key} className="flex items-start gap-2">
                <span className="flex w-6 shrink-0 justify-center">
                  <span
                    className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] leading-none font-bold tabular-nums"
                    style={active ? { background: ACCENT, color: "#fff" } : { background: "#fff", boxShadow: `inset 0 0 0 1.5px ${INK}` }}
                  >
                    {p.n}
                  </span>
                </span>
                <span>
                  <span className={active ? "font-semibold" : "font-medium"} style={active ? { color: ACCENT } : undefined}>
                    {p.label}
                  </span>
                  {p.note && <span className="text-stone-500"> – {p.note}</span>}
                </span>
              </li>
            );
          })}
        </ol>
      )}
      {caption && <figcaption className="border-t border-stone-300/60 px-4 py-2 text-xs text-stone-600">{caption}</figcaption>}
    </figure>
  );
}
