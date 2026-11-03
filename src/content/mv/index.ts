// Oficiální soubor testových otázek MV ČR (verze 15. 12. 2025) – doslovné znění s uvedením zdroje.
// Data generuje scripts/build-mv-questions.mjs; ručně needitovat. Modul je čistě datový (bez "server-only"),
// aby šel testovat; do klientských komponent posílejte jen potřebné otázky, ne celý soubor.

import { EXAM, type PermitType } from "../exam";
import { TOPICS } from "../topics";
import data from "./questions.json";
import mapping from "./mapping.json";

export type MvSectionKey = "I" | "II" | "III" | "IV" | "V";
export type MvGroupKey = "pravo" | "nauka" | "zachazeni" | "zdravoveda";

export type MvQuestion = {
  num: number;
  section: MvSectionKey;
  page: number;
  topic: string;
  group: MvGroupKey;
  image: boolean;
  q: string;
  answers: string[];
  correct: number;
};

/** Otázka bez správné odpovědi – pro procvičování a test (správnost vyhodnocuje server). */
export type MvPublicQuestion = Pick<MvQuestion, "num" | "section" | "topic" | "q" | "answers"> & {
  id: string;
  topicTitle: string;
};

export const MV_META = data.meta;
export const MV_ALL = data.questions as MvQuestion[];
/** Otázky zařazené do režimu – bez otázek s fotografiemi MV (nejasná autorská práva k fotografiím). */
export const MV_QUESTIONS = MV_ALL.filter((q) => !q.image);
export const MV_EXCLUDED = MV_ALL.filter((q) => q.image);

export const MV_SECTIONS = mapping.sections as { key: MvSectionKey; title: string; from: number; to: number }[];
export const MV_TOPIC_RANGES = mapping.ranges as { from: number; to: number; topic: string }[];
export const MV_TOPIC_GROUP = mapping.groups as Record<string, MvGroupKey>;

/** Skupiny testu ve stejném pořadí jako EXAM.groups (17 / 5 / 5 / 3). */
export const MV_GROUPS: { key: MvGroupKey; title: string; short: string; count: number; topics: string[] }[] = [
  { key: "pravo", title: "Právní předpisy", short: "Právo", count: EXAM.groups[0].count, topics: EXAM.groups[0].topics },
  { key: "nauka", title: "Nauka o zbraních a střelivu", short: "Nauka", count: EXAM.groups[1].count, topics: EXAM.groups[1].topics },
  { key: "zachazeni", title: "Zásady bezpečného zacházení", short: "Zacházení", count: EXAM.groups[2].count, topics: EXAM.groups[2].topics },
  { key: "zdravoveda", title: "Zdravotnické minimum", short: "Zdravověda", count: EXAM.groups[3].count, topics: EXAM.groups[3].topics },
];

/** Ukázka zdarma: prvních 20 zařazených otázek (č. 1–20). */
export const MV_FREE_SAMPLE_SIZE = 20;
export const MV_FREE_NUMS = new Set(MV_QUESTIONS.slice(0, MV_FREE_SAMPLE_SIZE).map((q) => q.num));

const byNum = new Map(MV_QUESTIONS.map((q) => [q.num, q]));
export const mvId = (num: number) => `mv-${num}`;
export function mvNumFromId(id: string) {
  const m = /^mv-(\d{1,3})$/.exec(id);
  return m ? Number(m[1]) : null;
}
/** Jen zařazené otázky (bez obrázkových). */
export const mvByNum = (num: number) => byNum.get(num);
export const mvById = (id: string) => {
  const n = mvNumFromId(id);
  return n === null ? undefined : byNum.get(n);
};
export const mvAnyByNum = (num: number) => MV_ALL.find((q) => q.num === num);

export const mvSection = (key: string) => MV_SECTIONS.find((s) => s.key === key);
export const mvTopicTitle = (slug: string) => TOPICS.find((t) => t.slug === slug)?.title ?? slug;
export const mvGroup = (key: MvGroupKey) => MV_GROUPS.find((g) => g.key === key)!;
export const mvTopicSlugs = TOPICS.map((t) => t.slug);

export function toPublicMv(q: MvQuestion): MvPublicQuestion {
  return { id: mvId(q.num), num: q.num, section: q.section, topic: q.topic, topicTitle: mvTopicTitle(q.topic), q: q.q, answers: q.answers };
}

/** Bez diakritiky a velikosti písmen – pro vyhledávání. */
export function foldText(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
const searchIndex = new Map(MV_QUESTIONS.map((q) => [q.num, foldText([q.q, ...q.answers].join(" "))]));

export type MvFilter = { section?: string; topic?: string; query?: string };

export function filterMv(f: MvFilter, pool: MvQuestion[] = MV_QUESTIONS) {
  const terms = f.query ? foldText(f.query).split(/\s+/).filter(Boolean) : [];
  return pool.filter(
    (q) =>
      (!f.section || q.section === f.section) &&
      (!f.topic || q.topic === f.topic) &&
      (!terms.length || terms.every((t) => searchIndex.get(q.num)!.includes(t))),
  );
}

/** Počty zařazených a vyřazených otázek podle oddílu. */
export function mvSectionCounts() {
  return MV_SECTIONS.map((s) => ({
    ...s,
    total: MV_ALL.filter((q) => q.section === s.key).length,
    included: MV_QUESTIONS.filter((q) => q.section === s.key).length,
  }));
}

/**
 * Náhodný test nanečisto ve skladbě zkoušky (17/5/5/3). Sestavuje ho aplikace při každém spuštění
 * z veřejného souboru otázek – nejde o test sestavený ministerstvem (§ 11 odst. 3 písm. h) zákona č. 90/2024 Sb.).
 */
export function buildMvTest(rnd: () => number = Math.random): MvQuestion[] {
  const out: MvQuestion[] = [];
  for (const g of MV_GROUPS) {
    const pool = MV_QUESTIONS.filter((q) => q.group === g.key);
    out.push(...sample(pool, g.count, rnd));
  }
  return out;
}

function sample<T>(items: T[], count: number, rnd: () => number) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, count);
}

/** Ověří, že sada otázek má přesně skladbu testu (17/5/5/3, bez opakování, jen zařazené otázky). */
export function isValidMvTest(nums: number[]) {
  if (nums.length !== EXAM.questionCount || new Set(nums).size !== nums.length) return false;
  const qs = nums.map((n) => byNum.get(n));
  if (qs.some((q) => !q)) return false;
  return MV_GROUPS.every((g) => qs.filter((q) => q!.group === g.key).length === g.count);
}

export function mvPassScore(permitType: PermitType) {
  return EXAM.passScore(EXAM.questionCount, permitType);
}
