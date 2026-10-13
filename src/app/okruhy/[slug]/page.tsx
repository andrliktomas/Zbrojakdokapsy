import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { db } from "@/lib/db";
import { FREE_TOPICS, GLOSSARY, LESSONS, topicBySlug } from "@/content";
import { LessonReadButton } from "@/components/LessonReadButton";
import { Paywall } from "@/components/ui";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) notFound();
  const user = await requireUser();
  if (!FREE_TOPICS.has(slug) && !(await hasAccess(user.id))) return <Paywall />;

  const lessons = LESSONS.filter((l) => l.topic === slug);
  const terms = GLOSSARY.filter((g) => g.topic === slug);
  const read = new Set(
    (await db.lessonRead.findMany({ where: { userId: user.id, lessonId: { in: lessons.map((l) => l.id) } } })).map((r) => r.lessonId),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <article className="space-y-6">
        <div>
          <Link href="/okruhy" className="text-sm text-stone-500 hover:underline">← Všechny okruhy</Link>
          <h1 className="mt-1 text-3xl font-extrabold">{topic.icon} {topic.title}</h1>
          <p className="mt-1 text-stone-600">{topic.summary}</p>
        </div>
        {lessons.map((lesson, li) => (
          <section key={lesson.id} id={lesson.id} className="card space-y-4">
            <h2 className="text-xl font-bold">{li + 1}. {lesson.title}</h2>
            {lesson.sections.map((s, i) => (
              <div key={i}>
                <h3 className="font-semibold text-brand-700">{s.heading}</h3>
                {s.paragraphs?.map((p, j) => <p key={j} className="mt-1 leading-relaxed text-stone-800">{p}</p>)}
                {s.bullets && (
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-800">
                    {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                {s.tip && <p className="mt-2 rounded-lg border-l-4 border-accent-400 bg-amber-50 px-3 py-2 text-sm">💡 {s.tip}</p>}
                {s.source && <p className="mt-1 text-xs text-stone-500">Zdroj: {s.source}</p>}
              </div>
            ))}
            <LessonReadButton lessonId={lesson.id} initiallyRead={read.has(lesson.id)} />
          </section>
        ))}
      </article>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="card space-y-2">
          <h2 className="font-bold">Procvičit okruh</h2>
          <Link href={`/karticky?okruh=${slug}`} className="btn-secondary w-full">🃏 Kartičky</Link>
          <Link href={`/procvicovani?okruh=${slug}`} className="btn-primary w-full">🎯 Otázky</Link>
        </div>
        {terms.length > 0 && (
          <div className="card">
            <h2 className="mb-2 font-bold">Vysvětlivky</h2>
            <dl className="space-y-2 text-sm">
              {terms.map((t) => (
                <div key={t.term}>
                  <dt className="font-semibold">{t.term}</dt>
                  <dd className="text-stone-600">{t.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </aside>
    </div>
  );
}
