// Parametry teoretické části zkoušky podle rešerše (docs/research/legislativa.md, kap. 2.3).
// Stav [ČÁSTEČNĚ] – před ostrým spuštěním ověřit v plném znění NV č. 238/2025 Sb.

export type PermitType = "obecne" | "rozsirene";

export const PERMIT_LABEL: Record<PermitType, string> = {
  obecne: "obecné zbrojní oprávnění",
  rozsirene: "rozšířené zbrojní oprávnění",
};

export const EXAM = {
  questionCount: 30,
  timeLimitMin: 40,
  /** Maximální počet chyb: obecné ZO 4 (26/30), rozšířené ZO 2 (28/30). */
  maxErrors: { obecne: 4, rozsirene: 2 } as Record<PermitType, number>,
  passScore(total: number, type: PermitType = "obecne") {
    // Při kratším testu (málo otázek v bance) se hranice přepočítá poměrně.
    const ratio = (this.questionCount - this.maxErrors[type]) / this.questionCount;
    return total === this.questionCount ? total - this.maxErrors[type] : Math.ceil(total * ratio);
  },
  /** Skladba testu: 17 právo + 5 nauka + 5 bezpečné zacházení + 3 zdravověda. */
  groups: [
    { count: 17, topics: ["zaklady", "kategorie", "opravneni", "zkouska", "nakladani", "strelnice", "trestni-pravo"] },
    { count: 5, topics: ["nauka"] },
    { count: 5, topics: ["bezpecna-manipulace"] },
    { count: 3, topics: ["zdravoveda"] },
  ],
};
