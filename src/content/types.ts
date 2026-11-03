export type Topic = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  /** Dostupné i bez zaplaceného balíčku (ochutnávka). */
  free?: boolean;
};

/**
 * Odkaz na vlastní schematický obrázek (registr v src/components/figures).
 * Obrázky jsou vlastní kresby – nepřebíráme fotografie ani kresby ze souboru MV.
 */
export type FigureRef = {
  /** ID obrázku z registru (src/components/figures/catalog.ts). */
  id: string;
  /** Klíč části, která se zvýrazní signální barvou (např. "kovani"). */
  highlight?: string;
  /** Vlastní popisek pod obrázkem; jinak se ve výkladu použije výchozí popisek obrázku. */
  caption?: string;
  /**
   * Které odkazové značky ukázat: "all" = všechna čísla (výchozí),
   * "highlight" = jen šipka na zvýrazněnou část, "none" = žádné.
   */
  callouts?: "all" | "highlight" | "none";
};

export type LessonSection = {
  heading: string;
  /** Schematický obrázek k oddílu (zobrazí se pod nadpisem). */
  figure?: FigureRef;
  paragraphs?: string[];
  bullets?: string[];
  /** Zvýrazněné upozornění / "na tohle se v testu často chytá". */
  tip?: string;
  /** Odkaz na právní předpis, např. "§ 9 zákona č. 90/2024 Sb." */
  source?: string;
};

export type Lesson = {
  id: string;
  topic: string;
  title: string;
  sections: LessonSection[];
};

export type GlossaryTerm = {
  term: string;
  topic: string;
  definition: string;
  source?: string;
};

export type Flashcard = {
  id: string;
  topic: string;
  front: string;
  back: string;
};

export type Question = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  source?: string;
  /** Obrázková otázka – obrázek se zobrazí nad možnostmi. */
  figure?: FigureRef;
};

/** Obsah jednoho okruhu – každý okruh má vlastní soubor v src/content/data/<slug>.ts */
export type TopicContent = {
  lessons: Lesson[];
  glossary: GlossaryTerm[];
  flashcards: Flashcard[];
  questions: Question[];
};
