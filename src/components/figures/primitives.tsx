import type { ReactNode } from "react";

// Společné barvy, vzorky a pomocné funkce pro schematické kresby.

export const INK = "#15181D";
export const PAPER = "#F3F1EC";
export const ACCENT = "#E8590C";

/** Neutrální tóny výplní (plochý technický styl). */
export const TONE = {
  white: "#FFFFFF",
  steelL: "#E4E6E9",
  steel: "#C6CAD0",
  steelD: "#959BA3",
  dark: "#3B4047",
  poly: "#80868E",
  brass: "#DDD3BC",
  lead: "#AEB2B8",
  wood: "#D7C8AB",
  felt: "#E8E1D3",
} as const;

export type DrawingProps = {
  /** Klíč zvýrazněné součásti. */
  hl?: string;
  /** Unikátní předpona pro id vzorků v jednom <svg>. */
  uid: string;
};

/** Výplň součásti: signální oranžová, pokud je zvýrazněná. */
export function tint(hl: string | undefined, key: string | readonly string[], base: string) {
  const keys = typeof key === "string" ? [key] : key;
  return hl !== undefined && keys.includes(hl) ? ACCENT : base;
}

export const url = (uid: string, name: PatternName) => `url(#${uid}-${name})`;

type PatternName = "hatch" | "hatch2" | "powder" | "dots" | "grain" | "fiber";

export function Patterns({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern id={`${uid}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1.1" strokeOpacity="0.55" />
      </pattern>
      <pattern id={`${uid}-hatch2`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="1" strokeOpacity="0.45" />
      </pattern>
      <pattern id={`${uid}-powder`} width="10" height="9" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.3" fill={INK} fillOpacity="0.7" />
        <circle cx="7" cy="4.5" r="1.1" fill={INK} fillOpacity="0.7" />
        <circle cx="3.5" cy="7.2" r="1" fill={INK} fillOpacity="0.7" />
      </pattern>
      <pattern id={`${uid}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.1" fill={INK} fillOpacity="0.4" />
      </pattern>
      <pattern id={`${uid}-grain`} width="40" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
        <path d="M0 4.5 Q10 2.5 20 4.5 T40 4.5" fill="none" stroke={INK} strokeWidth="0.8" strokeOpacity="0.22" />
      </pattern>
      <pattern id={`${uid}-fiber`} width="5" height="8" patternUnits="userSpaceOnUse">
        <line x1="2.5" y1="1" x2="2.5" y2="6" stroke={INK} strokeWidth="0.9" strokeOpacity="0.35" />
      </pattern>
    </defs>
  );
}

/** Plocha s výplní a překryvným vzorkem (šrafování, prach…). */
export function Textured({ d, fill, pattern, uid }: { d: string; fill: string; pattern: PatternName; uid: string }) {
  return (
    <g>
      <path d={d} fill={fill} />
      <path d={d} fill={url(uid, pattern)} stroke="none" />
      <path d={d} fill="none" />
    </g>
  );
}

/** Lomová čára (ukončení zobrazené části) jako hladká vlnovka mezi dvěma body. */
export function breakPath(x1: number, y1: number, x2: number, y2: number, amp = 6) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const nx = -(y2 - y1);
  const ny = x2 - x1;
  const len = Math.hypot(nx, ny) || 1;
  const ox = (nx / len) * amp;
  const oy = (ny / len) * amp;
  const q1x = (x1 + mx) / 2 + ox;
  const q1y = (y1 + my) / 2 + oy;
  const q2x = (mx + x2) / 2 - ox;
  const q2y = (my + y2) / 2 - oy;
  return `Q${q1x.toFixed(1)} ${q1y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)} Q${q2x.toFixed(1)} ${q2y.toFixed(1)} ${x2} ${y2}`;
}

/** Plynulé vytracení kresby doleva – naznačuje, že součást (např. pažba) pokračuje mimo obrázek. */
export function FadeLeft({ uid, name, x0, x1, children }: { uid: string; name: string; x0: number; x1: number; children: ReactNode }) {
  const id = `${uid}-${name}`;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1={x0} y1="0" x2={x1} y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={id} maskUnits="userSpaceOnUse" x="-20" y="-20" width="2000" height="2000">
          <rect x="-20" y="-20" width="2000" height="2000" fill={`url(#${id}-g)`} />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>{children}</g>
    </g>
  );
}
