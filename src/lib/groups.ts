// Skupiny pro instruktory – čistá logika bez databáze (testy v groups.test.ts).

import { EXAM, type PermitType } from "../content/exam";
import { pragueDay } from "./gamification";

export const GROUP_LIMITS = {
  nameMin: 3,
  nameMax: 80,
  /** Ochrana proti zneužití – kolik skupin může mít jeden instruktor. */
  groupsPerInstructor: 30,
  /** Kolik studentů se může připojit do jedné skupiny. */
  membersPerGroup: 300,
} as const;

// --- Části zkoušky (skladba testu 17/5/5/3) ---

export type SectionKey = "pravo" | "nauka" | "bezpecnost" | "zdravoveda";

const SECTION_DEFS: { key: SectionKey; label: string; short: string; marker: string }[] = [
  { key: "pravo", label: "Právní předpisy", short: "Právo", marker: "zaklady" },
  { key: "nauka", label: "Nauka o zbraních a střelivu", short: "Nauka", marker: "nauka" },
  { key: "bezpecnost", label: "Bezpečné zacházení se zbraní", short: "Bezpečnost", marker: "bezpecna-manipulace" },
  { key: "zdravoveda", label: "Zdravotnické minimum", short: "Zdravověda", marker: "zdravoveda" },
];

/** Části zkoušky odvozené ze skladby testu v content/exam.ts. */
export const EXAM_SECTIONS = SECTION_DEFS.map((d) => {
  const group = EXAM.groups.find((g) => g.topics.includes(d.marker));
  return { ...d, topics: group?.topics ?? [d.marker], examQuestions: group?.count ?? 0 };
});

const SECTION_BY_TOPIC = new Map<string, SectionKey>(EXAM_SECTIONS.flatMap((s) => s.topics.map((t) => [t, s.key] as const)));

export function sectionOfTopic(topic: string): SectionKey | null {
  return SECTION_BY_TOPIC.get(topic) ?? null;
}

export type AttemptCount = { topic: string; correct: boolean; count: number };
export type SectionStat = { answered: number; correct: number; accuracy: number | null };

/** Úspěšnost podle částí zkoušky z agregovaných pokusů (groupBy topic + correct). */
export function sectionAccuracy(counts: AttemptCount[]): Record<SectionKey, SectionStat> {
  const out = Object.fromEntries(EXAM_SECTIONS.map((s) => [s.key, { answered: 0, correct: 0, accuracy: null }])) as Record<
    SectionKey,
    SectionStat
  >;
  for (const c of counts) {
    const key = sectionOfTopic(c.topic);
    if (!key) continue;
    out[key].answered += c.count;
    if (c.correct) out[key].correct += c.count;
  }
  for (const s of Object.values(out)) s.accuracy = s.answered ? s.correct / s.answered : null;
  return out;
}

/** Úspěšnost potřebná u zkoušky (obecné ZO 26/30 ≈ 87 %) – hranice pro "dobře". */
export const PASS_RATIO = (EXAM.questionCount - EXAM.maxErrors.obecne) / EXAM.questionCount;

export type Tone = "none" | "good" | "ok" | "weak";

export function accuracyTone(accuracy: number | null, answered = Infinity): Tone {
  if (accuracy === null || answered < 5) return "none"; // z pár odpovědí nic nevyvozujeme
  if (accuracy >= PASS_RATIO) return "good";
  if (accuracy >= 0.7) return "ok";
  return "weak";
}

// --- Testy nanečisto ---

export type TestLite = { score: number; total: number; passed: boolean; permitType: string; createdAt: Date };
export type BestTest = { score: number; total: number; passed: boolean; attempts: number; passedCount: number };

export const PERMIT_TYPES: PermitType[] = ["obecne", "rozsirene"];
export const PERMIT_SHORT: Record<PermitType, string> = { obecne: "Obecné ZO", rozsirene: "Rozšířené ZO" };

/** Nejlepší výsledek testu nanečisto pro každý typ oprávnění (podle podílu správných odpovědí). */
export function bestTestByPermit(tests: TestLite[]): Record<PermitType, BestTest | null> {
  const out: Record<PermitType, BestTest | null> = { obecne: null, rozsirene: null };
  for (const type of PERMIT_TYPES) {
    const list = tests.filter((t) => t.permitType === type && t.total > 0);
    if (!list.length) continue;
    const best = [...list].sort(
      (a, b) =>
        b.score / b.total - a.score / a.total ||
        Number(b.passed) - Number(a.passed) ||
        b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];
    out[type] = {
      score: best.score,
      total: best.total,
      passed: best.passed,
      attempts: list.length,
      passedCount: list.filter((t) => t.passed).length,
    };
  }
  return out;
}

// --- Aktivita ---

export function latestDate(dates: (Date | null | undefined)[]): Date | null {
  let max: Date | null = null;
  for (const d of dates) if (d && (!max || d > max)) max = d;
  return max;
}

/** Počet kalendářních dní (Europe/Prague) od data do `now`. */
export function daysSince(date: Date, now = new Date()) {
  return Math.round((Date.parse(pragueDay(now)) - Date.parse(pragueDay(date))) / 86_400_000);
}

export function activityLabel(date: Date | null, now = new Date()): string {
  if (!date) return "zatím žádná";
  const days = daysSince(date, now);
  if (days <= 0) return "dnes";
  if (days === 1) return "včera";
  if (days <= 30) return `před ${days} dny`;
  return date.toLocaleDateString("cs-CZ", { timeZone: "Europe/Prague" });
}

/** Student je "neaktivní", pokud se týden neučil (pro zvýraznění instruktorovi). */
export const INACTIVE_AFTER_DAYS = 7;

// --- Místa (aktivační kódy) ---

export type CodeLite = { redeemedAt: Date | null };

export function seatSummary(codes: CodeLite[]) {
  const redeemed = codes.filter((c) => c.redeemedAt).length;
  return { total: codes.length, redeemed, available: codes.length - redeemed };
}

/** Jak dopadne uplatnění kódu (rozhodnutí bez DB – pro testy i akci). */
export type RedeemDecision = "ok" | "not_found" | "already_yours" | "used";

export function redeemDecision(code: { redeemedById: string | null } | null, userId: string): RedeemDecision {
  if (!code) return "not_found";
  if (code.redeemedById === null) return "ok";
  return code.redeemedById === userId ? "already_yours" : "used";
}

// --- Název skupiny ---

export function normalizeGroupName(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

export function groupNameError(name: string): string | null {
  if (name.length < GROUP_LIMITS.nameMin) return `Název musí mít alespoň ${GROUP_LIMITS.nameMin} znaky.`;
  if (name.length > GROUP_LIMITS.nameMax) return `Název může mít nejvýš ${GROUP_LIMITS.nameMax} znaků.`;
  return null;
}

/** Bezpečná interní cesta pro přesměrování (ochrana proti open redirect). */
export function safeInternalPath(path: string | null | undefined): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return null;
  return path;
}

/** Cookie s cílem po registraci (odkaz do skupiny / uplatnění kódu). */
export const AFTER_REGISTER_COOKIE = "zk_after_register";
/** Povolené cíle – striktní vzory, aby cookie nešla zneužít k přesměrování jinam. */
const AFTER_REGISTER_ALLOWED = [/^\/skupina\/pripojit\/[A-Z0-9]{4,16}$/, /^\/aktivovat(\?kod=[A-Z0-9]{1,20})?$/];

export function allowedAfterRegisterPath(path: string | null | undefined) {
  const safe = safeInternalPath(path);
  return safe && AFTER_REGISTER_ALLOWED.some((re) => re.test(safe)) ? safe : null;
}

export function czPlural(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
}
