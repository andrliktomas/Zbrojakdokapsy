// Generování a zpracování kódů (aktivační kódy, kódy skupin, kódy doporučení).
// Čistá logika bez databáze – testy v groups.test.ts a referral.test.ts.

import { randomInt } from "node:crypto";

/** Bez snadno zaměnitelných znaků (0/O, 1/I/L). 31 znaků ≈ 4,95 bitu na znak. */
export const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** Aktivační kód: 12 znaků ≈ 59 bitů – nedá se uhodnout ani bez omezení pokusů. */
export const ACTIVATION_CODE_LENGTH = 12;
/** Kód skupiny v odkazu pro studenty: 8 znaků ≈ 40 bitů (+ omezení pokusů). */
export const JOIN_CODE_LENGTH = 8;
/** Kód doporučení je veřejný (sdílí se), délka slouží jen k unikátnosti. */
export const REFERRAL_CODE_LENGTH = 8;

/**
 * Kryptograficky náhodný kód. `rand(max)` vrací celé číslo z [0, max) –
 * výchozí `crypto.randomInt` je rovnoměrné (bez modulo zkreslení).
 */
export function randomCode(length: number, rand: (max: number) => number = randomInt): string {
  let out = "";
  for (let i = 0; i < length; i++) out += CODE_ALPHABET[rand(CODE_ALPHABET.length)];
  return out;
}

/** Vygeneruje `count` navzájem různých kódů. */
export function randomCodes(count: number, length = ACTIVATION_CODE_LENGTH, rand?: (max: number) => number): string[] {
  const set = new Set<string>();
  while (set.size < count) set.add(randomCode(length, rand));
  return [...set];
}

export function codeEntropyBits(length: number) {
  return length * Math.log2(CODE_ALPHABET.length);
}

/** Normalizace uživatelského vstupu: velká písmena, bez mezer, pomlček a teček. */
export function normalizeCode(input: string): string {
  return input.toUpperCase().replace(/[\s\-–._]/g, "");
}

/** Má kód správnou délku a jen povolené znaky? (Rychlé odmítnutí před dotazem do DB.) */
export function isWellFormedCode(code: string, length: number): boolean {
  if (code.length !== length) return false;
  for (const ch of code) if (!CODE_ALPHABET.includes(ch)) return false;
  return true;
}

/** Zobrazení po skupinách: "ABCD-EFGH-JKMN". */
export function formatCode(code: string, groupSize = 4): string {
  const parts: string[] = [];
  for (let i = 0; i < code.length; i += groupSize) parts.push(code.slice(i, i + groupSize));
  return parts.join("-");
}

// --- Omezení počtu pokusů (rate limiting) ---

export const REDEEM_LIMITS = {
  /** Neúspěšné pokusy jednoho účtu. */
  user: { max: 5, windowMs: 15 * 60_000 },
  /** Neúspěšné pokusy z jedné IP adresy (více účtů). */
  ip: { max: 20, windowMs: 60 * 60_000 },
} as const;

/**
 * Posuvné okno: pokud je v posledních `windowMs` aspoň `max` neúspěšných pokusů,
 * je další pokus zablokován do doby, než nejstarší z nich z okna vypadne.
 */
export function rateLimitStatus(failures: Date[], now: Date, limit: { max: number; windowMs: number }) {
  const recent = failures
    .map((d) => d.getTime())
    .filter((t) => now.getTime() - t < limit.windowMs)
    .sort((a, b) => a - b);
  if (recent.length < limit.max) return { limited: false as const, retryAfterSec: 0 };
  const unblockAt = recent[recent.length - limit.max] + limit.windowMs;
  return { limited: true as const, retryAfterSec: Math.max(1, Math.ceil((unblockAt - now.getTime()) / 1000)) };
}
