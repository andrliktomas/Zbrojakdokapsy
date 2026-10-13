export type Topic = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  /** Dostupné i bez zaplaceného balíčku (ochutnávka). */
  free?: boolean;
};

export type LessonSection = {
  heading: string;
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
};

/** Obsah jednoho okruhu – každý okruh má vlastní soubor v src/content/data/<slug>.ts */
export type TopicContent = {
  lessons: Lesson[];
  glossary: GlossaryTerm[];
  flashcards: Flashcard[];
  questions: Question[];
};
