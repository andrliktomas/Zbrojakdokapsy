// Čistá logika gamifikace – bez přístupu k databázi, aby šla snadno testovat.

export const XP = {
  correctAnswer: 10,
  wrongAnswer: 2,
  cardKnown: 5,
  cardAgain: 2,
  lessonRead: 20,
  testCompleted: 30,
  testPassed: 100,
} as const;

/** Hranice levelů rostou kvadraticky: level n začíná na 50·n·(n−1) XP. */
export function levelFromXp(xp: number) {
  let level = 1;
  while (50 * (level + 1) * level <= xp) level++;
  const start = 50 * level * (level - 1);
  const next = 50 * (level + 1) * level;
  return { level, current: xp - start, needed: next - start, progress: (xp - start) / (next - start) };
}

export const LEVEL_TITLES = [
  "Nováček",
  "Začátečník",
  "Učeň",
  "Střelec",
  "Zkušený střelec",
  "Znalec předpisů",
  "Instruktor",
  "Mistr zbrojního práva",
];

export function levelTitle(level: number) {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1];
}

/** Den ve formátu YYYY-MM-DD v pražském čase. */
export function pragueDay(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Prague" }).format(date);
}

function dayDiff(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

/** Aktualizace série dní v řadě po aktivitě v den `today`. */
export function nextStreak(lastActiveDay: string | null, streak: number, today: string) {
  if (lastActiveDay === today) return streak;
  if (lastActiveDay && dayDiff(lastActiveDay, today) === 1) return streak + 1;
  return 1;
}

/** Série je "živá", pokud byl uživatel aktivní dnes nebo včera. */
export function displayedStreak(lastActiveDay: string | null, streak: number, today: string) {
  if (!lastActiveDay) return 0;
  return dayDiff(lastActiveDay, today) <= 1 ? streak : 0;
}

// --- Leitnerův systém pro kartičky ---

export const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 7, 14]; // index = box (1–5)

export function nextCardState(box: number, known: boolean, now = new Date()) {
  const newBox = known ? Math.min(box + 1, 5) : 1;
  const days = known ? BOX_INTERVAL_DAYS[newBox] : 0;
  // Nevědět = kartička se vrací ještě v téže lekci (za 1 minutu).
  const dueAt = new Date(now.getTime() + (known ? days * 86_400_000 : 60_000));
  return { box: newBox, dueAt };
}

// --- Zvládnutí okruhů ---

export type AttemptLite = { questionId: string; topic: string; correct: boolean; createdAt: Date };

/**
 * Otázka je "zvládnutá", pokud na ni uživatel odpověděl správně posledních
 * min(2, počet pokusů) krát a aspoň jednou celkem. Mastery okruhu = podíl zvládnutých otázek.
 */
export function questionMastery(attempts: AttemptLite[], questionIdsByTopic: Record<string, string[]>) {
  const byQuestion = new Map<string, AttemptLite[]>();
  for (const a of attempts) {
    const list = byQuestion.get(a.questionId) ?? [];
    list.push(a);
    byQuestion.set(a.questionId, list);
  }
  const result: Record<string, { mastered: number; seen: number; total: number; mastery: number }> = {};
  for (const [topic, ids] of Object.entries(questionIdsByTopic)) {
    let mastered = 0;
    let seen = 0;
    for (const id of ids) {
      const list = byQuestion.get(id);
      if (!list?.length) continue;
      seen++;
      const recent = [...list].sort((x, y) => y.createdAt.getTime() - x.createdAt.getTime()).slice(0, 2);
      if (recent.every((r) => r.correct)) mastered++;
    }
    result[topic] = { mastered, seen, total: ids.length, mastery: ids.length ? mastered / ids.length : 0 };
  }
  return result;
}

/** Kartičky: box 1 = 0 %, box 5 = 100 %. Neviděné kartičky se počítají jako 0. */
export function cardMastery(boxes: number[], totalCards: number) {
  if (!totalCards) return 0;
  const sum = boxes.reduce((acc, b) => acc + (b - 1) / 4, 0);
  return sum / totalCards;
}

export function topicMastery(questionPart: number, cardPart: number, hasCards: boolean) {
  return hasCards ? 0.75 * questionPart + 0.25 * cardPart : questionPart;
}

/** Úspěšnost v okně – pro trend "zlepšuješ se / zhoršuješ se". */
export function accuracyTrend(attempts: AttemptLite[], now = new Date(), windowDays = 7) {
  const ms = windowDays * 86_400_000;
  const recent = attempts.filter((a) => now.getTime() - a.createdAt.getTime() < ms);
  const previous = attempts.filter((a) => {
    const age = now.getTime() - a.createdAt.getTime();
    return age >= ms && age < 2 * ms;
  });
  const acc = (list: AttemptLite[]) => (list.length ? list.filter((a) => a.correct).length / list.length : null);
  const r = acc(recent);
  const p = acc(previous);
  return { recent: r, previous: p, recentCount: recent.length, delta: r !== null && p !== null ? r - p : null };
}

// --- Odznaky ---

export type AchievementDef = { code: string; title: string; description: string; icon: string };

export const ACHIEVEMENTS: AchievementDef[] = [
  { code: "first_answer", title: "První výstřel", description: "Odpověz na první otázku", icon: "🎯" },
  { code: "answers_100", title: "Stovka", description: "Odpověz na 100 otázek", icon: "💯" },
  { code: "answers_500", title: "Vytrvalec", description: "Odpověz na 500 otázek", icon: "🏋️" },
  { code: "streak_3", title: "Rozjezd", description: "Uč se 3 dny v řadě", icon: "🔥" },
  { code: "streak_7", title: "Týden v kuse", description: "Uč se 7 dní v řadě", icon: "📅" },
  { code: "cards_50", title: "Kartičkář", description: "Zopakuj 50 kartiček", icon: "🃏" },
  { code: "first_test", title: "Generálka", description: "Dokonči první cvičný test", icon: "📝" },
  { code: "test_passed", title: "Prošel bych", description: "Splň cvičný test na nanečisto", icon: "✅" },
  { code: "test_perfect", title: "Bez chyby", description: "Cvičný test na 100 %", icon: "🏆" },
  { code: "topic_master", title: "Specialista", description: "Zvládni jeden okruh na 80 %", icon: "🎓" },
  { code: "all_topics", title: "Připraven ke zkoušce", description: "Všechny okruhy na 80 %", icon: "🛡️" },
];

export type AchievementStats = {
  answers: number;
  streak: number;
  cardReviews: number;
  tests: number;
  testsPassed: number;
  perfectTests: number;
  topicMasteries: number[];
};

export function earnedAchievements(s: AchievementStats): string[] {
  const out: string[] = [];
  if (s.answers >= 1) out.push("first_answer");
  if (s.answers >= 100) out.push("answers_100");
  if (s.answers >= 500) out.push("answers_500");
  if (s.streak >= 3) out.push("streak_3");
  if (s.streak >= 7) out.push("streak_7");
  if (s.cardReviews >= 50) out.push("cards_50");
  if (s.tests >= 1) out.push("first_test");
  if (s.testsPassed >= 1) out.push("test_passed");
  if (s.perfectTests >= 1) out.push("test_perfect");
  if (s.topicMasteries.some((m) => m >= 0.8)) out.push("topic_master");
  if (s.topicMasteries.length && s.topicMasteries.every((m) => m >= 0.8)) out.push("all_topics");
  return out;
}

/** Náhodné zamíchání (Fisher–Yates). */
export function shuffle<T>(items: T[], rnd = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Výběr otázek k procvičení: přednostně nezvládnuté a dlouho neviděné.
 * Váha: nikdy neviděná 3, naposledy špatně 4, naposledy správně 1.
 */
export function pickPracticeQuestions(
  questionIds: string[],
  lastResult: Map<string, boolean>,
  count: number,
  rnd = Math.random,
) {
  const weighted = questionIds.map((id) => {
    const last = lastResult.get(id);
    const w = last === undefined ? 3 : last ? 1 : 4;
    // Efraimidis–Spirakis vážený výběr bez opakování
    return { id, key: Math.pow(rnd(), 1 / w) };
  });
  return weighted
    .sort((a, b) => b.key - a.key)
    .slice(0, count)
    .map((x) => x.id);
}
