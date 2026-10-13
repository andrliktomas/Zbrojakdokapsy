import "server-only";
import { FREE_TOPICS, TOPICS, topicBySlug } from "@/content";
import type { PublicQuestion } from "@/components/Practice";
import type { Question } from "@/content/types";

export function accessibleTopics(paid: boolean) {
  return paid ? TOPICS.map((t) => t.slug) : TOPICS.filter((t) => FREE_TOPICS.has(t.slug)).map((t) => t.slug);
}

/** Otázka bez správné odpovědi – správnost se vyhodnocuje na serveru. */
export function toPublic(q: Question): PublicQuestion {
  return { id: q.id, topic: q.topic, topicTitle: topicBySlug(q.topic)?.title ?? q.topic, question: q.question, options: q.options };
}
