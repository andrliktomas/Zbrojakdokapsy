import type { Metadata } from "next";
import { ARTICLES, latestArticleUpdate } from "@/content/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleCta } from "@/components/articles/ArticleCta";
import { Breadcrumbs } from "@/components/articles/Breadcrumbs";
import { JsonLd } from "@/components/articles/JsonLd";
import { formatDate } from "@/components/articles/format";
import {
  articleListJsonLd,
  breadcrumbJsonLd,
  DISCLAIMER,
  organizationJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Články ke zkoušce na zbrojní oprávnění 2026",
  description:
    "Srozumitelné články ke zkoušce na zbrojní oprávnění podle zákona č. 90/2024 Sb.: postup žádosti, průběh zkoušky, kategorie zbraní, lhůty, nutná obrana a bezpečné zacházení.",
  path: "/clanky",
});

const crumbs = [
  { name: "Úvod", path: "/" },
  { name: "Články", path: "/clanky" },
];

export default function ArticlesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={articleListJsonLd(ARTICLES)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <Breadcrumbs items={crumbs} />
      <header className="mt-6 max-w-[70ch]">
        <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-stone-700">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-400" />
          Průvodce ke zkoušce
        </p>
        <h1 className="mt-2 text-[2em] font-extrabold leading-[1.12] tracking-tight text-stone-900 sm:text-[2.4em]">
          Články ke zkoušce na zbrojní oprávnění
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-stone-700 sm:text-[18px]">
          Co potřebujete vědět před zkouškou odborné způsobilosti podle zákona č.&nbsp;90/2024&nbsp;Sb. Fakta opíráme o konkrétní paragrafy
          a otázky oficiálního souboru Ministerstva vnitra a každý článek navazuje na okruh v aplikaci, kde si látku procvičíte.
        </p>
        <p className="mt-3 font-mono text-xs text-stone-500">
          {ARTICLES.length}&nbsp;článků · aktualizováno <time dateTime={latestArticleUpdate()}>{formatDate(latestArticleUpdate())}</time>
        </p>
      </header>

      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {ARTICLES.map((a, i) => (
          <li key={a.slug}>
            <ArticleCard article={a} index={i} />
          </li>
        ))}
      </ol>

      <div className="max-w-[70ch] text-[17px] sm:text-[18px]">
        <ArticleCta />
      </div>

      <p className="mt-10 border-t border-stone-200 pt-4 text-xs text-stone-500">
        {DISCLAIMER} Články jsou výukové a nenahrazují znění právních předpisů ani právní poradenství.
      </p>
    </div>
  );
}
