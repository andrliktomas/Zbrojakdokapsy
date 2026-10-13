import { test } from "node:test";
import assert from "node:assert/strict";
import {
  levelFromXp,
  nextStreak,
  displayedStreak,
  nextCardState,
  questionMastery,
  earnedAchievements,
  pickPracticeQuestions,
  accuracyTrend,
} from "./gamification";
import { computeAccessWindow, getPlan } from "./plans";

test("levelFromXp", () => {
  assert.equal(levelFromXp(0).level, 1);
  assert.equal(levelFromXp(99).level, 1);
  assert.equal(levelFromXp(100).level, 2);
  assert.equal(levelFromXp(300).level, 3);
  assert.equal(levelFromXp(150).current, 50);
});

test("streak", () => {
  assert.equal(nextStreak(null, 0, "2026-10-13"), 1);
  assert.equal(nextStreak("2026-10-12", 4, "2026-10-13"), 5);
  assert.equal(nextStreak("2026-10-13", 4, "2026-10-13"), 4);
  assert.equal(nextStreak("2026-10-10", 4, "2026-10-13"), 1);
  assert.equal(displayedStreak("2026-10-11", 4, "2026-10-13"), 0);
  assert.equal(displayedStreak("2026-10-12", 4, "2026-10-13"), 4);
});

test("leitner", () => {
  const now = new Date("2026-10-13T10:00:00Z");
  assert.equal(nextCardState(1, true, now).box, 2);
  assert.equal(nextCardState(5, true, now).box, 5);
  assert.equal(nextCardState(4, false, now).box, 1);
  assert.equal(nextCardState(2, true, now).dueAt.getTime() - now.getTime(), 4 * 86_400_000); // box 2 → 3 = 4 dny
});

test("questionMastery requires last two correct", () => {
  const t = (s: number) => new Date(2026, 0, 1, 0, 0, s);
  const m = questionMastery(
    [
      { questionId: "a", topic: "x", correct: false, createdAt: t(1) },
      { questionId: "a", topic: "x", correct: true, createdAt: t(2) },
      { questionId: "a", topic: "x", correct: true, createdAt: t(3) },
      { questionId: "b", topic: "x", correct: true, createdAt: t(1) },
      { questionId: "b", topic: "x", correct: false, createdAt: t(2) },
    ],
    { x: ["a", "b", "c", "d"] },
  );
  assert.deepEqual(m.x, { mastered: 1, seen: 2, total: 4, mastery: 0.25 });
});

test("achievements", () => {
  const got = earnedAchievements({
    answers: 120, streak: 3, cardReviews: 10, tests: 1, testsPassed: 0, perfectTests: 0, topicMasteries: [0.9, 0.5],
  });
  assert.deepEqual(got, ["first_answer", "answers_100", "streak_3", "first_test", "topic_master"]);
});

test("pickPracticeQuestions returns unique ids", () => {
  const ids = Array.from({ length: 50 }, (_, i) => `q${i}`);
  const picked = pickPracticeQuestions(ids, new Map([["q1", true]]), 20);
  assert.equal(picked.length, 20);
  assert.equal(new Set(picked).size, 20);
});

test("accuracyTrend", () => {
  const now = new Date("2026-10-13T00:00:00Z");
  const d = (days: number, correct: boolean) => ({
    questionId: "q", topic: "t", correct, createdAt: new Date(now.getTime() - days * 86_400_000),
  });
  const tr = accuracyTrend([d(1, true), d(2, true), d(8, false), d(9, true)], now);
  assert.equal(tr.recent, 1);
  assert.equal(tr.previous, 0.5);
  assert.equal(tr.delta, 0.5);
});

test("access window extends running plan", () => {
  const plan = getPlan("1m")!;
  const now = new Date("2026-10-13T00:00:00Z");
  const end = new Date("2026-10-20T00:00:00Z");
  assert.equal(computeAccessWindow(plan, end, now).startsAt.getTime(), end.getTime());
  assert.equal(computeAccessWindow(plan, new Date("2026-10-01"), now).startsAt.getTime(), now.getTime());
});
