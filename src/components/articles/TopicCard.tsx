import Link from "next/link";
import { FLASHCARDS, FREE_TOPICS, LESSONS, QUESTIONS, topicBySlug } from "@/content";
import { plural } from "./format";
import { typo } from "./typo";

/** Odkaz z článku na odpovídající okruh v aplikaci (/okruhy/<slug>) s počty z obsahu aplikace. */
export function TopicCard({ slug, text }: { slug: string; text: string }) {
  const topic = topicBySlug(slug);
  if (!topic) return null;
  const lessons = LESSONS.filter((l) => l.topic === slug).length;
  const questions = QUESTIONS.filter((q) => q.topic === slug).length;
  const cards = FLASHCARDS.filter((c) => c.topic === slug).length;
  const free = FREE_TOPICS.has(slug);
  return (
    <aside aria-label={`Okruh v aplikaci: ${topic.title}`} className="card my-8 border-l-4 border-accent-400 text-[0.95em]">
      <p className="flex flex-wrap items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-stone-500">
        Procvičte v aplikaci
        {free && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-brand-700 normal-case tracking-normal">okruh zdarma po registraci</span>}
      </p>
      <p className="mt-2 text-[1.1em] font-bold text-stone-900">{typo(topic.title)}</p>
      <p className="mt-1 text-stone-700">{typo(text)}</p>
      <p className="mt-2 font-mono text-xs text-stone-500">
        {plural(lessons, "lekce", "lekce", "lekcí")} · {plural(questions, "otázka", "otázky", "otázek")} · {plural(cards, "kartička", "kartičky", "kartiček")}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href={`/okruhy/${slug}`} className="btn-secondary">
          Otevřít okruh v aplikaci
        </Link>
        <span className="text-sm text-stone-600">
          Nemáte účet?{" "}
          <Link href="/registrace" className="font-semibold text-brand-700 underline underline-offset-2">
            Registrace zdarma
          </Link>
        </span>
      </div>
    </aside>
  );
}
