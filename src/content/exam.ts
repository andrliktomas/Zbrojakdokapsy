// DOČASNÉ – přepíše se podle výsledků researche.
export const EXAM = {
  questionCount: 30,
  timeLimitMin: 40,
  passScore: (total: number) => Math.ceil(total * 0.8),
  distribution: {} as Record<string, number>,
};
