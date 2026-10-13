import "server-only";
import { db } from "./db";
import {
  ACHIEVEMENTS,
  accuracyTrend,
  cardMastery,
  displayedStreak,
  earnedAchievements,
  levelFromXp,
  levelTitle,
  nextStreak,
  pragueDay,
  questionMastery,
  topicMastery,
} from "./gamification";
import { TOPICS, cardCountByTopic, questionIdsByTopic } from "@/content";

/** Připíše XP, posune sérii dní a zkontroluje nové odznaky. Vrací nově získané odznaky. */
export async function recordActivity(userId: string, xpGain: number) {
  const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
  const today = pragueDay();
  const streak = nextStreak(user.lastActiveDay, user.streak, today);
  await db.user.update({
    where: { id: userId },
    data: { xp: { increment: xpGain }, streak, bestStreak: Math.max(user.bestStreak, streak), lastActiveDay: today },
  });
  return checkAchievements(userId);
}

export async function computeTopicStats(userId: string) {
  const [attempts, cards] = await Promise.all([
    db.questionAttempt.findMany({
      where: { userId },
      select: { questionId: true, topic: true, correct: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    db.cardProgress.findMany({ where: { userId }, select: { topic: true, box: true } }),
  ]);
  const qm = questionMastery(attempts, questionIdsByTopic());
  const cardCounts = cardCountByTopic();
  const stats = TOPICS.map((t) => {
    const boxes = cards.filter((c) => c.topic === t.slug).map((c) => c.box);
    const cm = cardMastery(boxes, cardCounts[t.slug]);
    const q = qm[t.slug] ?? { mastered: 0, seen: 0, total: 0, mastery: 0 };
    const topicAttempts = attempts.filter((a) => a.topic === t.slug);
    const trend = accuracyTrend(topicAttempts);
    const accuracy = topicAttempts.length
      ? topicAttempts.filter((a) => a.correct).length / topicAttempts.length
      : null;
    return {
      topic: t,
      mastery: topicMastery(q.mastery, cm, cardCounts[t.slug] > 0),
      questions: q,
      cardsMastery: cm,
      cardsSeen: boxes.length,
      cardsTotal: cardCounts[t.slug],
      attempts: topicAttempts.length,
      accuracy,
      trend,
    };
  });
  return { stats, attempts };
}

async function checkAchievements(userId: string) {
  const [user, answers, cardReviews, tests, existing, { stats }] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    db.questionAttempt.count({ where: { userId, mode: "practice" } }),
    db.cardProgress.aggregate({ where: { userId }, _sum: { reviews: true } }),
    db.testResult.findMany({ where: { userId }, select: { passed: true, score: true, total: true } }),
    db.achievement.findMany({ where: { userId }, select: { code: true } }),
    computeTopicStats(userId),
  ]);
  const earned = earnedAchievements({
    answers,
    streak: user.streak,
    cardReviews: cardReviews._sum.reviews ?? 0,
    tests: tests.length,
    testsPassed: tests.filter((t) => t.passed).length,
    perfectTests: tests.filter((t) => t.score === t.total).length,
    topicMasteries: stats.map((s) => s.mastery),
  });
  const have = new Set(existing.map((e) => e.code));
  const fresh = earned.filter((c) => !have.has(c));
  if (fresh.length) {
    await db.achievement.createMany({ data: fresh.map((code) => ({ userId, code })) });
  }
  return ACHIEVEMENTS.filter((a) => fresh.includes(a.code));
}

export async function getDashboard(userId: string) {
  const [user, { stats, attempts }, achievements, tests, dueCards] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    computeTopicStats(userId),
    db.achievement.findMany({ where: { userId } }),
    db.testResult.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    db.cardProgress.count({ where: { userId, dueAt: { lte: new Date() } } }),
  ]);
  const level = levelFromXp(user.xp);
  const overall = stats.length ? stats.reduce((a, s) => a + s.mastery, 0) / stats.length : 0;

  // Slabá místa: okruhy s nejnižším zvládnutím; přednost mají ty, kde už se uživatel chybuje.
  const weak = [...stats]
    .filter((s) => s.mastery < 0.8)
    .sort((a, b) => a.mastery - b.mastery || (a.accuracy ?? 1) - (b.accuracy ?? 1))
    .slice(0, 3);
  const improving = stats.filter((s) => (s.trend.delta ?? 0) >= 0.1 && s.trend.recentCount >= 5);
  const declining = stats.filter((s) => (s.trend.delta ?? 0) <= -0.1 && s.trend.recentCount >= 5);

  const today = pragueDay();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86_400_000);
    const key = pragueDay(d);
    const dayAttempts = attempts.filter((a) => pragueDay(a.createdAt) === key);
    return { day: key, count: dayAttempts.length, correct: dayAttempts.filter((a) => a.correct).length };
  });

  return {
    user,
    level: { ...level, title: levelTitle(level.level) },
    streak: displayedStreak(user.lastActiveDay, user.streak, today),
    stats,
    overall,
    weak,
    improving,
    declining,
    achievements: ACHIEVEMENTS.map((a) => ({
      ...a,
      unlockedAt: achievements.find((x) => x.code === a.code)?.unlockedAt ?? null,
    })),
    tests,
    dueCards,
    last7,
    totalAnswers: attempts.length,
  };
}
