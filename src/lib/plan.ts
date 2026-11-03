// Plán podle termínu zkoušky – čistá logika bez přístupu k databázi, aby šla snadno testovat.
// Data z DB skládá getExamPlan() v src/lib/progress.ts.

import { EXAM, type PermitType } from "../content/exam";
import { pragueDay } from "./gamification";

export type { PermitType };

// ---------------------------------------------------------------------------
// Kalendář
// ---------------------------------------------------------------------------

const DAY_MS = 86_400_000;
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Nejzazší termín, který lze zadat (zhruba dva roky dopředu). */
export const EXAM_DATE_MAX_DAYS = 730;

/** Je řetězec skutečné kalendářní datum YYYY-MM-DD? (2026-02-30 není.) */
export function isIsoDay(value: string) {
  if (!ISO_DAY.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Počet kalendářních dní z `today` do `day` (obojí YYYY-MM-DD). Záporné číslo = den už byl. */
export function daysUntil(day: string, today: string) {
  return Math.round((Date.parse(`${day}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / DAY_MS);
}

export function addDays(day: string, n: number) {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** Okamžik půlnoci daného dne v Praze (22:00 nebo 23:00 UTC předchozího dne podle letního/zimního času). */
export function startOfPragueDay(day: string) {
  const prev = addDays(day, -1);
  for (const hour of ["22", "23"]) {
    const d = new Date(`${prev}T${hour}:00:00Z`);
    if (pragueDay(d) === day) return d;
  }
  return new Date(`${day}T00:00:00Z`);
}

/** Validace termínu zkoušky. Vrací chybovou hlášku pro uživatele, nebo null. */
export function examDateError(value: string, today: string): string | null {
  if (!isIsoDay(value)) return "Zadejte platné datum zkoušky.";
  const d = daysUntil(value, today);
  if (d < 0) return "Termín zkoušky nemůže být v minulosti.";
  if (d > EXAM_DATE_MAX_DAYS) return "Zadejte termín nejvýš dva roky dopředu.";
  return null;
}

/** České skloňování podle počtu: 1 den, 2–4 dny, 0 a 5+ dní. */
export function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(n);
  if (abs === 1) return one;
  if (abs >= 2 && abs <= 4) return few;
  return many;
}

export function countdownLabel(daysLeft: number) {
  if (daysLeft < 0) return "Termín zkoušky už proběhl";
  if (daysLeft === 0) return "Zkouška je dnes";
  if (daysLeft === 1) return "Zkouška je zítra";
  return `Zkouška za ${daysLeft} ${plural(daysLeft, "den", "dny", "dní")}`;
}

export const PERMIT_SHORT: Record<PermitType, string> = { obecne: "obecné ZO", rozsirene: "rozšířené ZO" };

export function parsePermit(value: string | null | undefined): PermitType {
  return value === "rozsirene" ? "rozsirene" : "obecne";
}

// ---------------------------------------------------------------------------
// Model znalostí
// ---------------------------------------------------------------------------

/**
 * Parametry odhadu. Záměrně opatrné: s málo daty se odhad drží u 50 %
 * (otázka má 3 možnosti, tipováním by vyšla 1/3, selským rozumem zhruba polovina).
 */
export const MODEL = {
  /** Odpověď stará tolik dní má poloviční váhu (novější odpovědi lépe vystihují, co umíte teď). */
  halfLifeDays: 21,
  /** Výchozí úspěšnost bez dat. */
  baseAccuracy: 0.5,
  /** Váha výchozí úspěšnosti při výpočtu vaší celkové úspěšnosti (jako by šlo o 10 odpovědí). */
  overallPriorStrength: 10,
  /** Jak moc se celková úspěšnost přenáší na okruh, který jste skoro neprocvičovali (0 = vůbec, 1 = plně). */
  transfer: 0.5,
  /** Váha předpokladu u jednotlivého okruhu (jako by šlo o 4 odpovědi). */
  topicPriorStrength: 4,
  /** Pod tímto počtem odpovědí odhad nezobrazujeme. */
  minAnswers: 15,
} as const;

export type AttemptRow = { topic: string; correct: boolean; createdAt: Date };

export type TopicEvidence = {
  attempts: number;
  correct: number;
  /** Součet vah odpovědí podle stáří (viz MODEL.halfLifeDays). */
  weightedAttempts: number;
  weightedCorrect: number;
  lastAt: Date | null;
};

const EMPTY_EVIDENCE: TopicEvidence = { attempts: 0, correct: 0, weightedAttempts: 0, weightedCorrect: 0, lastAt: null };

/** Sečte odpovědi po okruzích; novější odpovědi mají větší váhu. */
export function summarizeAttempts(attempts: AttemptRow[], now: Date): Record<string, TopicEvidence> {
  const out: Record<string, TopicEvidence> = {};
  for (const a of attempts) {
    const e = (out[a.topic] ??= { ...EMPTY_EVIDENCE });
    const ageDays = Math.max(0, (now.getTime() - a.createdAt.getTime()) / DAY_MS);
    const w = Math.pow(0.5, ageDays / MODEL.halfLifeDays);
    e.attempts++;
    e.weightedAttempts += w;
    if (a.correct) {
      e.correct++;
      e.weightedCorrect += w;
    }
    if (!e.lastAt || a.createdAt > e.lastAt) e.lastAt = a.createdAt;
  }
  return out;
}

/** Všechny okruhy, ze kterých se skládá zkouška. */
export const EXAM_TOPICS = EXAM.groups.flatMap((g) => g.topics);

/**
 * Vyhlazená úspěšnost po okruzích (beta-binomický odhad s dvoustupňovým předpokladem):
 *   celková = (správně + 10·0,5) / (odpovědí + 10)
 *   předpoklad okruhu = 0,5 + 0,5·(celková − 0,5)
 *   okruh = (správně v okruhu + 4·předpoklad) / (odpovědí v okruhu + 4)
 * (počty jsou vážené stářím odpovědi). Okruh bez odpovědí tak dostane jen polovinu
 * vašeho celkového náskoku nad 50 % – znalost jiných okruhů se přenáší jen částečně.
 */
export function topicAccuracies(evidence: Record<string, TopicEvidence>, slugs: string[] = EXAM_TOPICS) {
  let n = 0;
  let c = 0;
  for (const s of slugs) {
    n += evidence[s]?.weightedAttempts ?? 0;
    c += evidence[s]?.weightedCorrect ?? 0;
  }
  const overall = (c + MODEL.overallPriorStrength * MODEL.baseAccuracy) / (n + MODEL.overallPriorStrength);
  const prior = MODEL.baseAccuracy + MODEL.transfer * (overall - MODEL.baseAccuracy);
  const bySlug: Record<string, number> = {};
  for (const s of slugs) {
    const e = evidence[s] ?? EMPTY_EVIDENCE;
    bySlug[s] = (e.weightedCorrect + MODEL.topicPriorStrength * prior) / (e.weightedAttempts + MODEL.topicPriorStrength);
  }
  return { overall, prior, bySlug };
}

/**
 * Kolik otázek z okruhu průměrně padne v testu: počet otázek skupiny (17/5/5/3)
 * rozdělený mezi okruhy skupiny podle velikosti jejich banky otázek.
 */
export function examWeights(questionCounts: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const g of EXAM.groups) {
    const total = g.topics.reduce((acc, t) => acc + (questionCounts[t] ?? 0), 0);
    for (const t of g.topics) {
      out[t] = g.count * (total ? (questionCounts[t] ?? 0) / total : 1 / g.topics.length);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Odhad výsledku testu
// ---------------------------------------------------------------------------

/** Rozdělení počtu správných odpovědí (Poissonovo-binomické) pro otázky s danými pravděpodobnostmi. */
export function scoreDistribution(groups: { count: number; p: number }[]) {
  let dist = [1];
  for (const g of groups) {
    for (let i = 0; i < g.count; i++) {
      const next = new Array<number>(dist.length + 1).fill(0);
      for (let k = 0; k < dist.length; k++) {
        next[k] += dist[k] * (1 - g.p);
        next[k + 1] += dist[k] * g.p;
      }
      dist = next;
    }
  }
  return dist;
}

function quantile(dist: number[], q: number) {
  let cum = 0;
  for (let k = 0; k < dist.length; k++) {
    cum += dist[k];
    if (cum >= q - 1e-9) return k;
  }
  return dist.length - 1;
}

const GROUP_LABELS: Record<string, string> = {
  nauka: "Nauka o zbraních",
  "bezpecna-manipulace": "Bezpečné zacházení",
  zdravoveda: "Zdravověda",
};

export type GroupEstimate = {
  label: string;
  topics: string[];
  count: number;
  accuracy: number;
  expected: number;
  /** Vážený počet odpovědí v okruzích skupiny (míra jistoty). */
  answers: number;
};

export type ReadinessStatus = "malo-dat" | "pod-hranici" | "na-hrane" | "na-dobre-ceste";
export type Confidence = "nizka" | "stredni" | "vysoka";

export type Prediction = {
  permit: PermitType;
  total: number;
  passScore: number;
  /** Očekávaný počet správných odpovědí (desetinné číslo). */
  expected: number;
  /** Zaokrouhlený odhad pro zobrazení. */
  score: number;
  /** Pravděpodobnost, že při této úrovni znalostí dosáhnete hranice. */
  passProbability: number;
  /** 80% rozpětí výsledku (10. a 90. percentil) – jen náhoda výběru otázek. */
  low: number;
  high: number;
  groups: GroupEstimate[];
  /** Nejslabší skupina mezi procvičenými (null, dokud nejsou procvičené aspoň dvě). */
  weakestGroup: GroupEstimate | null;
  /** Skupiny bez odpovědí – jejich odhad stojí jen na opatrném předpokladu. */
  unpracticed: GroupEstimate[];
  answers: number;
  status: ReadinessStatus;
  confidence: Confidence;
};

export const STATUS_LABEL: Record<ReadinessStatus, string> = {
  "malo-dat": "Málo dat pro odhad",
  "pod-hranici": "Zatím pod hranicí",
  "na-hrane": "Na hraně",
  "na-dobre-ceste": "Na dobré cestě",
};

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  nizka: "nízká jistota",
  stredni: "střední jistota",
  vysoka: "vysoká jistota",
};

/**
 * Odhad výsledku testu: Σ přes skupiny zkoušky (počet otázek skupiny × vyhlazená úspěšnost skupiny),
 * kde úspěšnost skupiny je průměr úspěšností jejích okruhů vážený velikostí banky otázek.
 */
export function predictExam(
  evidence: Record<string, TopicEvidence>,
  questionCounts: Record<string, number>,
  permit: PermitType,
): Prediction {
  const { bySlug } = topicAccuracies(evidence);
  const weights = examWeights(questionCounts);
  const groups: GroupEstimate[] = EXAM.groups.map((g) => {
    const expected = g.topics.reduce((acc, t) => acc + weights[t] * bySlug[t], 0);
    return {
      label: g.topics.length === 1 ? (GROUP_LABELS[g.topics[0]] ?? g.topics[0]) : "Právní předpisy",
      topics: g.topics,
      count: g.count,
      accuracy: expected / g.count,
      expected,
      answers: g.topics.reduce((acc, t) => acc + (evidence[t]?.weightedAttempts ?? 0), 0),
    };
  });
  const total = groups.reduce((acc, g) => acc + g.count, 0);
  const passScore = EXAM.passScore(total, permit);
  const expected = groups.reduce((acc, g) => acc + g.expected, 0);
  const dist = scoreDistribution(groups.map((g) => ({ count: g.count, p: g.accuracy })));
  const passProbability = Math.min(1, dist.slice(passScore).reduce((a, b) => a + b, 0));
  const answers = EXAM_TOPICS.reduce((acc, t) => acc + (evidence[t]?.attempts ?? 0), 0);
  const weighted = groups.reduce((acc, g) => acc + g.answers, 0);
  const minPerQuestion = Math.min(...groups.map((g) => g.answers / g.count));
  const practiced = groups.filter((g) => g.answers >= 1);

  const confidence: Confidence =
    weighted >= 150 && minPerQuestion >= 4 ? "vysoka" : weighted >= 50 && minPerQuestion >= 1.5 ? "stredni" : "nizka";
  const status: ReadinessStatus =
    answers < MODEL.minAnswers
      ? "malo-dat"
      : passProbability >= 0.75
        ? "na-dobre-ceste"
        : passProbability >= 0.4
          ? "na-hrane"
          : "pod-hranici";

  return {
    permit,
    total,
    passScore,
    expected,
    score: Math.round(expected),
    passProbability,
    low: quantile(dist, 0.1),
    high: quantile(dist, 0.9),
    groups,
    weakestGroup: practiced.length >= 2 ? [...practiced].sort((a, b) => a.accuracy - b.accuracy)[0] : null,
    unpracticed: groups.filter((g) => g.answers < 1),
    answers,
    status,
    confidence,
  };
}

// ---------------------------------------------------------------------------
// Dnešní plán
// ---------------------------------------------------------------------------

/** Velikost sady na /procvicovani (SET_SIZE v src/app/procvicovani/page.tsx). */
export const PRACTICE_SET = 10;

export type PlanPhase = "bez-terminu" | "prubezne" | "intenzivne" | "finis" | "den-zkousky" | "po-zkousce";

type PhaseConfig = {
  questionSets: number;
  cardCap: number;
  newCards: number;
  lesson: boolean;
  /** Jak často test nanečisto (ve dnech); null = nenavrhovat. */
  testEvery: (daysLeft: number) => number | null;
  note: string;
};

export const PHASES: Record<PlanPhase, PhaseConfig> = {
  "bez-terminu": {
    questionSets: 1, cardCap: 15, newCards: 10, lesson: true, testEvery: () => null,
    note: "Zadejte termín zkoušky a plán se přizpůsobí času, který vám zbývá.",
  },
  prubezne: {
    questionSets: 1, cardCap: 15, newCards: 10, lesson: true, testEvery: () => null,
    note: "Času máte dost. Stačí každý den kousek – pravidelnost dělá víc než dlouhé učení naráz.",
  },
  intenzivne: {
    questionSets: 2, cardCap: 20, newCards: 10, lesson: true, testEvery: (d) => (d <= 7 ? 2 : 4),
    note: "Poslední dva týdny: víc otázek ze slabých míst a průběžně test nanečisto.",
  },
  finis: {
    questionSets: 1, cardCap: 20, newCards: 0, lesson: true, testEvery: () => 1,
    note: "Finiš: každý den jeden test nanečisto a opakování toho, v čem chybujete.",
  },
  "den-zkousky": {
    questionSets: 1, cardCap: 10, newCards: 0, lesson: false, testEvery: () => null,
    note: "Dnes už nic nového. Krátké rozcvičení, klid a hodně štěstí.",
  },
  "po-zkousce": {
    questionSets: 0, cardCap: 0, newCards: 0, lesson: false, testEvery: () => null,
    note: "Termín zkoušky už proběhl. Pokud jdete znovu, nastavte nový termín.",
  },
};

export function phaseFor(daysLeft: number | null): PlanPhase {
  if (daysLeft === null) return "bez-terminu";
  if (daysLeft < 0) return "po-zkousce";
  if (daysLeft === 0) return "den-zkousky";
  if (daysLeft <= 3) return "finis";
  if (daysLeft <= 14) return "intenzivne";
  return "prubezne";
}

export type PlanTopic = {
  slug: string;
  title: string;
  /** Má uživatel okruh odemčený (zdarma nebo s balíčkem)? */
  accessible: boolean;
  /** Pokrok do včerejška – dnešní plán se tak během dne nepřeskupuje. */
  evidence?: TopicEvidence;
  answeredToday: number;
  /** Nepřečtené lekce v pořadí výkladu. */
  unreadLessons: { id: string; title: string }[];
};

export type PlanInput = {
  today: string;
  examDate: string | null;
  permit: PermitType;
  /** Okruhy v pořadí výkladu. */
  topics: PlanTopic[];
  questionCounts: Record<string, number>;
  dueCards: number;
  cardsReviewedToday: number;
  lessonReadToday: { id: string; title: string; topic: string } | null;
  hasTestAccess: boolean;
  lastTestDay: string | null;
};

export type PlanItemKind = "questions" | "cards" | "lesson" | "test";

export type PlanItem = {
  id: string;
  kind: PlanItemKind;
  title: string;
  detail: string;
  href: string;
  minutes: number;
  target: number;
  progress: number;
  done: boolean;
  locked?: boolean;
};

export type TopicPriority = { slug: string; title: string; accuracy: number; examQuestions: number; loss: number; answers: number };

export type DailyPlan = {
  phase: PlanPhase;
  daysLeft: number | null;
  note: string;
  items: PlanItem[];
  /** Odhad času na kartičky, lekci a otázky (bez testu nanečisto). */
  minutes: number;
  /** Čas na test nanečisto, pokud je v plánu a odemčený (jinak 0). */
  testMinutes: number;
  /** Odemčené okruhy seřazené podle očekávané ztráty bodů v testu. */
  priorities: TopicPriority[];
};

/**
 * Pořadí okruhů podle očekávané ztráty bodů v testu:
 *   ztráta = (kolik otázek z okruhu průměrně padne) × (1 − vyhlazená úspěšnost).
 * Slabý okruh s velkou váhou ve zkoušce má přednost před slabým okruhem, ze kterého padá jedna otázka.
 */
export function rankTopics(topics: PlanTopic[], questionCounts: Record<string, number>): TopicPriority[] {
  const evidence: Record<string, TopicEvidence> = {};
  for (const t of topics) if (t.evidence) evidence[t.slug] = t.evidence;
  const { bySlug } = topicAccuracies(evidence);
  const weights = examWeights(questionCounts);
  return topics
    .map((t, order) => ({ t, order }))
    .filter(({ t }) => t.accessible && (questionCounts[t.slug] ?? 0) > 0 && bySlug[t.slug] !== undefined)
    .map(({ t, order }) => ({
      order,
      slug: t.slug,
      title: t.title,
      accuracy: bySlug[t.slug],
      examQuestions: weights[t.slug] ?? 0,
      loss: (weights[t.slug] ?? 0) * (1 - bySlug[t.slug]),
      answers: t.evidence?.attempts ?? 0,
    }))
    .sort((a, b) => b.loss - a.loss || a.answers - b.answers || a.order - b.order)
    .map(({ order: _order, ...p }) => p);
}

const pctText = (v: number) => `${Math.round(v * 100)} %`;

export function buildDailyPlan(input: PlanInput): DailyPlan {
  const daysLeft = input.examDate ? daysUntil(input.examDate, input.today) : null;
  const phase = phaseFor(daysLeft);
  const cfg = PHASES[phase];
  const priorities = rankTopics(input.topics, input.questionCounts);
  const items: PlanItem[] = [];
  const topicBySlug = new Map(input.topics.map((t) => [t.slug, t]));

  if (phase === "po-zkousce") {
    return { phase, daysLeft, note: cfg.note, items, minutes: 0, testMinutes: 0, priorities };
  }

  // 1) Kartičky – nejdřív ty, které jsou podle Leitnerova systému na řadě.
  const dueTarget = Math.min(cfg.cardCap, input.dueCards + input.cardsReviewedToday);
  if (dueTarget > 0) {
    items.push({
      id: "cards",
      kind: "cards",
      title: `Zopakujte ${dueTarget} ${plural(dueTarget, "kartičku", "kartičky", "kartiček")}`,
      detail: input.dueCards > dueTarget ? `Na řadě je ${input.dueCards}, dnes stačí ${dueTarget}` : "Jsou na řadě k opakování",
      href: "/karticky",
      minutes: Math.max(1, Math.ceil(dueTarget / 6)),
      target: dueTarget,
      progress: Math.min(input.cardsReviewedToday, dueTarget),
      done: input.cardsReviewedToday >= dueTarget,
    });
  } else if (cfg.newCards > 0 && priorities.length) {
    const top = priorities[0];
    items.push({
      id: "cards",
      kind: "cards",
      title: `Projděte ${cfg.newCards} nových kartiček`,
      detail: top.title,
      href: `/karticky?okruh=${top.slug}`,
      minutes: Math.max(1, Math.ceil(cfg.newCards / 6)),
      target: cfg.newCards,
      progress: 0,
      done: false,
    });
  }

  // 2) Jedna lekce – z okruhu s nejvyšší prioritou, který má ještě něco nepřečteného.
  if (cfg.lesson) {
    if (input.lessonReadToday) {
      const topic = topicBySlug.get(input.lessonReadToday.topic);
      items.push({
        id: "lesson",
        kind: "lesson",
        title: `Lekce: ${input.lessonReadToday.title}`,
        detail: topic ? `${topic.title} · přečteno dnes` : "Přečteno dnes",
        href: `/okruhy/${input.lessonReadToday.topic}#${input.lessonReadToday.id}`,
        minutes: 5,
        target: 1,
        progress: 1,
        done: true,
      });
    } else {
      const withLesson = priorities.find((p) => (topicBySlug.get(p.slug)?.unreadLessons.length ?? 0) > 0);
      if (withLesson) {
        const lesson = topicBySlug.get(withLesson.slug)!.unreadLessons[0];
        items.push({
          id: "lesson",
          kind: "lesson",
          title: `Lekce: ${lesson.title}`,
          detail: withLesson.title,
          href: `/okruhy/${withLesson.slug}#${lesson.id}`,
          minutes: 5,
          target: 1,
          progress: 0,
          done: false,
        });
      }
    }
  }

  // 3) Otázky ze slabých míst – po sadách, jak je nabízí /procvicovani.
  for (const p of priorities.slice(0, cfg.questionSets)) {
    const answered = topicBySlug.get(p.slug)?.answeredToday ?? 0;
    items.push({
      id: `questions-${p.slug}`,
      kind: "questions",
      title: `Procvičte ${PRACTICE_SET} ${plural(PRACTICE_SET, "otázku", "otázky", "otázek")}`,
      detail: `${p.title} · ${p.answers ? `úspěšnost ${pctText(p.accuracy)}` : answered ? "dnes poprvé" : "zatím neprocvičeno"}`,
      href: `/procvicovani?okruh=${p.slug}`,
      minutes: Math.ceil(PRACTICE_SET * 0.4),
      target: PRACTICE_SET,
      progress: Math.min(answered, PRACTICE_SET),
      done: answered >= PRACTICE_SET,
    });
  }

  // 4) Test nanečisto – podle blízkosti termínu.
  const every = daysLeft !== null ? cfg.testEvery(daysLeft) : null;
  const testedToday = input.lastTestDay === input.today;
  const sinceTest = input.lastTestDay ? daysUntil(input.today, input.lastTestDay) : Infinity;
  if (every !== null && (testedToday || sinceTest >= every)) {
    const pass = EXAM.passScore(EXAM.questionCount, input.permit);
    items.push({
      id: "test",
      kind: "test",
      title: `Test nanečisto – ${PERMIT_SHORT[input.permit]}`,
      detail: input.hasTestAccess
        ? `${EXAM.questionCount} otázek, ${EXAM.timeLimitMin} minut, hranice ${pass}/${EXAM.questionCount}`
        : "Součást placeného balíčku",
      href: input.hasTestAccess ? `/test?typ=${input.permit}` : "/cenik",
      minutes: EXAM.timeLimitMin,
      target: 1,
      progress: testedToday ? 1 : 0,
      done: testedToday,
      locked: !input.hasTestAccess,
    });
  }

  const testMinutes = items.reduce((acc, i) => acc + (i.kind === "test" && !i.locked ? i.minutes : 0), 0);
  const minutes = items.reduce((acc, i) => acc + (i.kind === "test" || i.locked ? 0 : i.minutes), 0);
  return { phase, daysLeft, note: cfg.note, items, minutes, testMinutes, priorities };
}
