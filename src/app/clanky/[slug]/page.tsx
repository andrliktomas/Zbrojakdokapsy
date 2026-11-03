import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, articleBySlug, readingMinutes, type Article } from "@/content/articles";
import { topicBySlug } from "@/content";
import { ArticleSections, LINK_CLASS } from "@/components/articles/ArticleBlocks";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleCta } from "@/components/articles/ArticleCta";
import { Breadcrumbs } from "@/components/articles/Breadcrumbs";
import { JsonLd } from "@/components/articles/JsonLd";
import { formatDate } from "@/components/articles/format";
import { typo } from "@/components/articles/typo";
import { articleJsonLd, breadcrumbJsonLd, DISCLAIMER, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleBySlug((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/clanky/${article.slug}`,
    article: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: "Příprava na zkoušku",
      tags: article.topics.map((t) => topicBySlug(t)?.title ?? t),
    },
  });
}

function Toc({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <ol className={`space-y-2 text-sm ${className}`}>
      {article.sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="text-stone-700 underline-offset-2 hover:text-stone-900 hover:underline">
            {typo(s.heading)}
          </a>
        </li>
      ))}
      <li>
        <a href="#caste-otazky" className="text-stone-700 underline-offset-2 hover:text-stone-900 hover:underline">
          Časté otázky
        </a>
      </li>
    </ol>
  );
}

export default async function ArticlePage({ params }: Props) {
  const article = articleBySlug((await params).slug);
  if (!article) notFound();

  const crumbs = [
    { name: "Úvod", path: "/" },
    { name: "Články", path: "/clanky" },
    { name: article.title, path: `/clanky/${article.slug}` },
  ];
  const related = article.related.map(articleBySlug).filter((a): a is Article => Boolean(a));

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,70ch)_15rem] lg:justify-center lg:gap-12">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={faqJsonLd(article.faq)} />

      <article className="mx-auto max-w-[70ch] text-[17px] leading-[1.7] text-stone-800 sm:text-[18px] lg:mx-0">
        <Breadcrumbs items={crumbs} />

        <header className="mt-6">
          <h1 className="text-[2em] font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-[2.3em]">{typo(article.title)}</h1>
          <p className="mt-3 font-mono text-xs text-stone-500">
            Aktualizováno <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time> · {readingMinutes(article)}&nbsp;min čtení ·
            zákon č.&nbsp;90/2024&nbsp;Sb.
          </p>
          <p className="mt-5 text-[1.12em] leading-relaxed text-stone-700">{typo(article.perex)}</p>
        </header>

        <aside aria-labelledby="shrnuti" className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:p-6">
          <h2 id="shrnuti" className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-stone-700">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-400" />
            Shrnutí
          </h2>
          <ul className="mt-3 space-y-2 pl-5 text-[0.95em] marker:text-accent-500 list-disc">
            {article.summary.map((s, i) => (
              <li key={i} className="pl-1">
                {typo(s)}
              </li>
            ))}
          </ul>
        </aside>

        <details className="group mt-6 rounded-xl ring-1 ring-stone-200 lg:hidden">
          <summary className="cursor-pointer list-none px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-stone-600 marker:hidden">
            Obsah článku <span aria-hidden="true" className="ml-1 inline-block transition group-open:rotate-90">›</span>
          </summary>
          <nav aria-label="Obsah článku" className="px-4 pb-4">
            <Toc article={article} className="list-decimal pl-5 marker:font-mono marker:text-stone-400" />
          </nav>
        </details>

        <ArticleSections sections={article.sections} />

        <section aria-labelledby="caste-otazky" className="mt-12">
          <h2 id="caste-otazky" className="scroll-mt-24 text-[1.45em] font-extrabold leading-tight tracking-tight text-stone-900">
            Časté otázky
          </h2>
          <div className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
            {article.faq.map((f, i) => (
              <div key={i} className="py-4">
                <h3 className="font-bold text-stone-900">{typo(f.q)}</h3>
                <p className="mt-1 text-stone-700">{typo(f.a)}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="zdroje" className="mt-10 text-sm text-stone-600">
          <h2 id="zdroje" className="font-mono text-xs font-semibold uppercase tracking-wide text-stone-500">
            Zdroje
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {article.sources.map((s) => (
              <li key={s}>{typo(s)}</li>
            ))}
          </ul>
          <p className="mt-3">
            Článek je výukový a nenahrazuje znění právních předpisů ani právní poradenství. Vychází z předpisů ve znění účinném od 1.&nbsp;1.&nbsp;2026.
          </p>
        </section>

        <ArticleCta />

        {related.length > 0 && (
          <nav aria-labelledby="souvisejici" className="mt-14">
            <h2 id="souvisejici" className="text-[1.2em] font-extrabold text-stone-900">
              Související články
            </h2>
            <ul className="mt-4 grid gap-4 text-base sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard article={r} headingLevel="h3" />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base">
              <Link href="/clanky" className={LINK_CLASS}>
                Všechny články
              </Link>
            </p>
          </nav>
        )}

        <p className="mt-10 border-t border-stone-200 pt-4 text-xs text-stone-500">{DISCLAIMER}</p>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <nav aria-label="Obsah článku (boční panel)">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-stone-500">Obsah článku</p>
            <Toc article={article} className="mt-3 border-l border-stone-200 pl-4" />
          </nav>
          <div className="card text-sm">
            <p className="font-bold text-stone-900">Procvičte si to</p>
            <p className="mt-1 text-stone-600">Kartičky, otázky a testy nanečisto podle skutečné zkoušky.</p>
            <Link href="/registrace" className="btn-primary mt-3 w-full">
              Vyzkoušet zdarma
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
