// Čisté pomocné funkce trenažéru bez obsahu – smí je importovat klientské komponenty.
// Obsah (src/content/trainer.ts) se do prohlížeče posílá jen přes trainerView(), aby se zamčené
// scénáře nedostaly do veřejného JS balíčku. Odtud se z něj proto importují jen typy.

import type { SourceRef } from "@/content/trainer";

/** [576, 577, 578, 580] → "576–578, 580" */
export function compressNumbers(nums: number[]) {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const parts: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    parts.push(j - i >= 2 ? `${sorted[i]}–${sorted[j]}` : j > i ? `${sorted[i]}, ${sorted[j]}` : `${sorted[i]}`);
    i = j;
  }
  return parts.join(", ");
}

export function formatSources(refs: SourceRef[]) {
  const nvRefs = [...new Set(refs.flatMap((r) => ("nv" in r ? [r.nv] : [])))];
  const mvNums = refs.flatMap((r) => ("mv" in r ? r.mv : []));
  const parts: string[] = [];
  if (nvRefs.length) parts.push(`NV č. 238/2025 Sb., ${nvRefs.join("; ")}`);
  if (mvNums.length) parts.push(`soubor otázek MV, ot. č. ${compressNumbers(mvNums)}`);
  return parts.join(" · ");
}

/** Deterministický generátor (mulberry32) – stejné semínko dá na serveru i v prohlížeči stejné pořadí. */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash řetězce pro odvození semínka (FNV-1a). */
export function hashString(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Zamíchá prvky (Fisher–Yates); u dvou a více prvků nikdy nevrátí původní pořadí. */
export function shuffleChanged<T>(items: T[], rnd: () => number): T[] {
  if (items.length < 2) return [...items];
  for (let attempt = 0; attempt < 20; attempt++) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (a.some((x, i) => x !== items[i])) return a;
  }
  // Pojistka: posun o jedno místo.
  return [...items.slice(1), items[0]];
}
