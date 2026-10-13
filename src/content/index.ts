import type { Flashcard, GlossaryTerm, Lesson, Question, Topic } from "./types";
import { TOPICS } from "./topics";
import { FLASHCARDS, GLOSSARY, LESSONS, QUESTIONS } from "./data";
import { EXAM, PERMIT_LABEL, type PermitType } from "./exam";

export { TOPICS, LESSONS, GLOSSARY, FLASHCARDS, QUESTIONS, EXAM, PERMIT_LABEL };
export type { PermitType };
export type { Flashcard, GlossaryTerm, Lesson, Question, Topic };

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
export const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));
export const cardById = new Map(FLASHCARDS.map((c) => [c.id, c]));
export const lessonById = new Map(LESSONS.map((l) => [l.id, l]));

export const FREE_TOPICS = new Set(TOPICS.filter((t) => t.free).map((t) => t.slug));

export function questionIdsByTopic() {
  const out: Record<string, string[]> = Object.fromEntries(TOPICS.map((t) => [t.slug, [] as string[]]));
  for (const q of QUESTIONS) out[q.topic]?.push(q.id);
  return out;
}

export function cardCountByTopic() {
  const out: Record<string, number> = Object.fromEntries(TOPICS.map((t) => [t.slug, 0]));
  for (const c of FLASHCARDS) out[c.topic] = (out[c.topic] ?? 0) + 1;
  return out;
}
