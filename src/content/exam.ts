// Parametry teoretické části zkoušky (docs/research/legislativa.md, kap. 2.3), ověřeno v textu předpisů:
// - 30 otázek, 40 minut, 26 (obecné ZO) / 28 (rozšířené ZO): § 20 odst. 3 písm. a) zákona č. 90/2024 Sb.
// - 3 možnosti, 1 správná, skladba 17/5/5/3: § 12 odst. 2 NV č. 238/2025 Sb.

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
