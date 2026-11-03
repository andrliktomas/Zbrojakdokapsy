import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EXAM_TOPICS,
  MODEL,
  buildDailyPlan,
  countdownLabel,
  daysUntil,
  examDateError,
  examWeights,
  isIsoDay,
  plural,
  predictExam,
  rankTopics,
  scoreDistribution,
  startOfPragueDay,
  summarizeAttempts,
  type AttemptRow,
  type PlanInput,
  type PlanTopic,
  type TopicEvidence,
} from "./plan";

// Velikosti bank otázek – pevně, aby testy nezávisely na obsahu.
const COUNTS: Record<string, number> = {
  zaklady: 34, kategorie: 37, opravneni: 45, zkouska: 27, nakladani: 52, strelnice: 32,
  nauka: 58, "bezpecna-manipulace": 27, "trestni-pravo": 22, zdravoveda: 40,
};
const TODAY = "2026-11-03";
const NOW = new Date("2026-11-03T12:00:00Z");

/** Vygeneruje odpovědi: pro každý okruh [počet, úspěšnost], všechny staré `ageDays` dní. */
function attempts(per: Record<string, [number, number]>, ageDays = 1): AttemptRow[] {
  const out: AttemptRow[] = [];
  for (const [topic, [n, acc]] of Object.entries(per)) {
    for (let i = 0; i < n; i++) {
      out.push({ topic, correct: i < Math.round(n * acc), createdAt: new Date(NOW.getTime() - ageDays * 86_400_000) });
    }
  }
  return out;
}
const everywhere = (n: number, acc: number) =>
  Object.fromEntries(EXAM_TOPICS.map((t) => [t, [n, acc] as [number, number]]));

function topics(evidence: Record<string, TopicEvidence> = {}, opts: { locked?: string[]; answeredToday?: Record<string, number> } = {}): PlanTopic[] {
  return EXAM_TOPICS.map((slug) => ({
    slug,
    title: `Okruh ${slug}`,
    accessible: !opts.locked?.includes(slug),
    evidence: evidence[slug],
    answeredToday: opts.answeredToday?.[slug] ?? 0,
    unreadLessons: [{ id: `${slug}-l1`, title: `Lekce ${slug}` }],
  }));
}

function input(over: Partial<PlanInput> = {}): PlanInput {
  return {
    today: TODAY,
    examDate: null,
    permit: "obecne",
    topics: topics(),
    questionCounts: COUNTS,
    dueCards: 0,
    cardsReviewedToday: 0,
    lessonReadToday: null,
    hasTestAccess: true,
    lastTestDay: null,
    ...over,
  };
}

// --- Kalendář a validace ---

test("kalendář: platná data, rozdíl dní, odpočet", () => {
  assert.ok(isIsoDay("2026-11-15"));
  assert.ok(!isIsoDay("2026-02-30"));
  assert.ok(!isIsoDay("15. 11. 2026"));
  assert.equal(daysUntil("2026-11-15", TODAY), 12);
  assert.equal(daysUntil("2026-11-02", TODAY), -1);
  // Přes změnu času (25. 10. 2026) se počítají kalendářní dny, ne hodiny.
  assert.equal(daysUntil("2026-10-26", "2026-10-24"), 2);
  assert.equal(countdownLabel(12), "Zkouška za 12 dní");
  assert.equal(countdownLabel(3), "Zkouška za 3 dny");
  assert.equal(countdownLabel(1), "Zkouška je zítra");
  assert.equal(countdownLabel(0), "Zkouška je dnes");
  assert.equal(countdownLabel(-2), "Termín zkoušky už proběhl");
  assert.equal(plural(1, "otázka", "otázky", "otázek"), "otázka");
  assert.equal(plural(0, "otázka", "otázky", "otázek"), "otázek");
  assert.equal(plural(22, "otázka", "otázky", "otázek"), "otázek");
});

test("validace termínu: dnes nebo později, nejvýš dva roky", () => {
  assert.equal(examDateError(TODAY, TODAY), null);
  assert.equal(examDateError("2026-12-01", TODAY), null);
  assert.match(examDateError("2026-11-02", TODAY)!, /minulosti/);
  assert.match(examDateError("2026-13-01", TODAY)!, /platné datum/);
  assert.match(examDateError("", TODAY)!, /platné datum/);
  assert.match(examDateError("2029-01-01", TODAY)!, /dva roky/);
});

test("začátek dne v Praze v zimním i letním čase", () => {
  assert.equal(startOfPragueDay("2026-11-03").toISOString(), "2026-11-02T23:00:00.000Z");
  assert.equal(startOfPragueDay("2026-07-01").toISOString(), "2026-06-30T22:00:00.000Z");
});

// --- Model znalostí ---

test("novější odpovědi mají větší váhu (poločas)", () => {
  const ev = summarizeAttempts(
    [
      { topic: "nauka", correct: true, createdAt: NOW },
      { topic: "nauka", correct: false, createdAt: new Date(NOW.getTime() - MODEL.halfLifeDays * 86_400_000) },
    ],
    NOW,
  );
  assert.equal(ev.nauka.attempts, 2);
  assert.equal(ev.nauka.correct, 1);
  assert.ok(Math.abs(ev.nauka.weightedAttempts - 1.5) < 1e-9);
  assert.ok(Math.abs(ev.nauka.weightedCorrect - 1) < 1e-9);
});

test("váhy okruhů odpovídají skladbě zkoušky 17/5/5/3", () => {
  const w = examWeights(COUNTS);
  const sum = Object.values(w).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 30) < 1e-9);
  assert.equal(w.nauka, 5);
  assert.equal(w["bezpecna-manipulace"], 5);
  assert.equal(w.zdravoveda, 3);
  // Právo se dělí podle velikosti banky: registrace (52 otázek) váží víc než trestní právo (22).
  assert.ok(w.nakladani > w["trestni-pravo"]);
  const law = ["zaklady", "kategorie", "opravneni", "zkouska", "nakladani", "strelnice", "trestni-pravo"];
  assert.ok(Math.abs(law.reduce((a, t) => a + w[t], 0) - 17) < 1e-9);
});

test("rozdělení skóre dává součet 1 a správný průměr", () => {
  const dist = scoreDistribution([{ count: 17, p: 0.8 }, { count: 13, p: 0.6 }]);
  assert.equal(dist.length, 31);
  assert.ok(Math.abs(dist.reduce((a, b) => a + b, 0) - 1) < 1e-9);
  const mean = dist.reduce((a, p, k) => a + p * k, 0);
  assert.ok(Math.abs(mean - (17 * 0.8 + 13 * 0.6)) < 1e-9);
});

// --- Odhad výsledku ---

test("odhad bez dat: opatrně 15/30, málo dat, nízká jistota", () => {
  const p = predictExam({}, COUNTS, "obecne");
  assert.equal(p.total, 30);
  assert.equal(p.passScore, 26);
  assert.ok(Math.abs(p.expected - 15) < 1e-9);
  assert.equal(p.status, "malo-dat");
  assert.equal(p.confidence, "nizka");
  assert.ok(p.passProbability < 0.01);
  assert.equal(predictExam({}, COUNTS, "rozsirene").passScore, 28);
});

test("silný uživatel: odhad nad hranicí obecného ZO, rozšířené je přísnější", () => {
  const ev = summarizeAttempts(attempts(everywhere(30, 0.95)), NOW);
  const obecne = predictExam(ev, COUNTS, "obecne");
  assert.ok(obecne.expected >= 27.5 && obecne.expected <= 29, `odhad ${obecne.expected}`);
  assert.equal(obecne.score, 28);
  assert.equal(obecne.status, "na-dobre-ceste");
  assert.equal(obecne.confidence, "vysoka");
  assert.ok(obecne.low <= obecne.score && obecne.score <= obecne.high);
  const rozsirene = predictExam(ev, COUNTS, "rozsirene");
  assert.ok(rozsirene.passProbability < obecne.passProbability);
  assert.notEqual(rozsirene.status, "malo-dat");
});

test("slabý uživatel: pod hranicí a nejslabší skupina je poznat", () => {
  const per = everywhere(20, 0.6);
  per.zdravoveda = [20, 0.2];
  const p = predictExam(summarizeAttempts(attempts(per), NOW), COUNTS, "obecne");
  assert.ok(p.expected < 20, `odhad ${p.expected}`);
  assert.equal(p.status, "pod-hranici");
  assert.equal(p.confidence, "stredni");
  assert.equal(p.weakestGroup?.label, "Zdravověda");
});

test("odhad nepřeceňuje: 100 % v jednom okruhu neznamená složenou zkoušku", () => {
  const p = predictExam(summarizeAttempts(attempts({ zaklady: [100, 1] }), NOW), COUNTS, "obecne");
  assert.ok(p.expected < 23, `odhad ${p.expected}`);
  assert.equal(p.status, "pod-hranici");
  assert.equal(p.confidence, "nizka");
  // Neprocvičené části se označí zvlášť; "nejslabší" má smysl až mezi dvěma procvičenými.
  assert.deepEqual(p.unpracticed.map((g) => g.label), ["Nauka o zbraních", "Bezpečné zacházení", "Zdravověda"]);
  assert.equal(p.weakestGroup, null);
});

test("staré odpovědi postupně ztrácejí váhu", () => {
  const fresh = predictExam(summarizeAttempts(attempts(everywhere(30, 0.95), 1), NOW), COUNTS, "obecne");
  const old = predictExam(summarizeAttempts(attempts(everywhere(30, 0.95), 90), NOW), COUNTS, "obecne");
  assert.ok(old.expected < fresh.expected);
  assert.ok(old.expected > 15);
});

// --- Dnešní plán ---

test("plán bez dat a bez termínu: kartičky, lekce a sada otázek z okruhu s největší vahou", () => {
  const plan = buildDailyPlan(input());
  assert.equal(plan.phase, "bez-terminu");
  assert.equal(plan.daysLeft, null);
  assert.deepEqual(plan.items.map((i) => i.kind), ["cards", "lesson", "questions"]);
  // Bez dat rozhoduje váha ve zkoušce: nauka (5 otázek) před menšími právními okruhy.
  assert.equal(plan.priorities[0].slug, "nauka");
  const q = plan.items.find((i) => i.kind === "questions")!;
  assert.equal(q.href, "/procvicovani?okruh=nauka");
  assert.equal(q.target, 10);
  assert.match(q.detail, /zatím neprocvičeno/);
  assert.equal(plan.items.find((i) => i.kind === "lesson")!.href, "/okruhy/nauka#nauka-l1");
  assert.equal(plan.items.find((i) => i.kind === "cards")!.href, "/karticky?okruh=nauka");
  assert.ok(plan.minutes >= 8 && plan.minutes <= 15, `${plan.minutes} min`);
  assert.ok(!plan.items.some((i) => i.kind === "test"));
});

test("plán míří na slabá místa vážená skladbou zkoušky", () => {
  const per = everywhere(30, 0.95);
  per["trestni-pravo"] = [30, 0.5]; // slabé, ale v testu ~1,5 otázky
  per["bezpecna-manipulace"] = [30, 0.6]; // o něco lepší, ale v testu 5 otázek
  const ev = summarizeAttempts(attempts(per), NOW);
  const ranked = rankTopics(topics(ev), COUNTS);
  assert.equal(ranked[0].slug, "bezpecna-manipulace");
  assert.equal(ranked[1].slug, "trestni-pravo");
  const plan = buildDailyPlan(input({ topics: topics(ev), examDate: "2026-11-13" })); // 10 dní → 2 sady
  const q = plan.items.filter((i) => i.kind === "questions");
  assert.deepEqual(q.map((i) => i.href), ["/procvicovani?okruh=bezpecna-manipulace", "/procvicovani?okruh=trestni-pravo"]);
  assert.match(q[0].detail, /úspěšnost \d+\s%/);
});

test("plán vynechá zamčené okruhy", () => {
  const locked = EXAM_TOPICS.filter((t) => t !== "zaklady" && t !== "zkouska");
  const plan = buildDailyPlan(input({ topics: topics({}, { locked }), hasTestAccess: false }));
  assert.ok(plan.priorities.every((p) => p.slug === "zaklady" || p.slug === "zkouska"));
  assert.ok(plan.items.every((i) => !i.href.includes("nauka")));
});

test("splněné úkoly se odškrtnou", () => {
  const plan = buildDailyPlan(
    input({
      topics: topics({}, { answeredToday: { nauka: 12 } }),
      dueCards: 4,
      cardsReviewedToday: 8,
      lessonReadToday: { id: "nauka-l1", title: "Pistole", topic: "nauka" },
    }),
  );
  const byKind = Object.fromEntries(plan.items.map((i) => [i.kind, i]));
  assert.equal(byKind.cards.target, 12);
  assert.equal(byKind.cards.progress, 8);
  assert.equal(byKind.cards.done, false);
  assert.equal(byKind.lesson.done, true);
  assert.equal(byKind.questions.done, true);
  assert.equal(byKind.questions.progress, 10);
  assert.match(byKind.questions.detail, /dnes poprvé/);
});

test("hodně kartiček na řadě: dnes jen rozumná dávka", () => {
  const plan = buildDailyPlan(input({ examDate: "2026-12-31", dueCards: 48 }));
  const cards = plan.items.find((i) => i.kind === "cards")!;
  assert.equal(plan.phase, "prubezne");
  assert.equal(cards.target, 15);
  assert.equal(cards.href, "/karticky");
  assert.match(cards.detail, /Na řadě je 48/);
});

test("zkouška zítra: každý den test nanečisto podle typu oprávnění", () => {
  const plan = buildDailyPlan(input({ examDate: "2026-11-04", permit: "rozsirene", lastTestDay: "2026-11-02" }));
  assert.equal(plan.phase, "finis");
  assert.equal(plan.daysLeft, 1);
  const t = plan.items.find((i) => i.kind === "test")!;
  assert.equal(t.href, "/test?typ=rozsirene");
  assert.match(t.detail, /hranice 28\/30/);
  assert.equal(t.done, false);
  // Test už dnes proběhl → odškrtnutý, ale v plánu zůstává.
  const after = buildDailyPlan(input({ examDate: "2026-11-04", lastTestDay: TODAY }));
  assert.equal(after.items.find((i) => i.kind === "test")!.done, true);
  // Čas na test se uvádí zvlášť, krátký denní blok zůstává krátký.
  assert.equal(plan.testMinutes, 40);
  assert.ok(plan.minutes <= 15, `${plan.minutes} min`);
  // Bez balíčku je test zamčený a nezapočítává se do času.
  const free = buildDailyPlan(input({ examDate: "2026-11-04", hasTestAccess: false }));
  const lockedTest = free.items.find((i) => i.kind === "test")!;
  assert.equal(lockedTest.locked, true);
  assert.equal(lockedTest.href, "/cenik");
  assert.equal(free.testMinutes, 0);
});

test("intenzivní fáze: test jen v rozumných rozestupech", () => {
  const recent = buildDailyPlan(input({ examDate: "2026-11-10", lastTestDay: "2026-11-02" })); // 7 dní, test před 1 dnem
  assert.equal(recent.phase, "intenzivne");
  assert.ok(!recent.items.some((i) => i.kind === "test"));
  const due = buildDailyPlan(input({ examDate: "2026-11-10", lastTestDay: "2026-10-31" })); // před 3 dny
  assert.ok(due.items.some((i) => i.kind === "test"));
  assert.equal(due.items.filter((i) => i.kind === "questions").length, 2);
});

test("den zkoušky: jen krátké rozcvičení", () => {
  const plan = buildDailyPlan(input({ examDate: TODAY, dueCards: 30 }));
  assert.equal(plan.phase, "den-zkousky");
  assert.deepEqual(plan.items.map((i) => i.kind), ["cards", "questions"]);
  assert.equal(plan.items[0].target, 10);
});

test("termín proběhl: žádný plán, jen výzva k novému termínu", () => {
  const plan = buildDailyPlan(input({ examDate: "2026-10-30", dueCards: 10 }));
  assert.equal(plan.phase, "po-zkousce");
  assert.equal(plan.daysLeft, -4);
  assert.deepEqual(plan.items, []);
  assert.equal(plan.minutes, 0);
  assert.equal(plan.testMinutes, 0);
  assert.match(plan.note, /nový termín/);
});
