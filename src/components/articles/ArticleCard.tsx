import Link from "next/link";
import { readingMinutes, type Article } from "@/content/articles";
import { formatDate } from "./format";
import { typo } from "./typo";

/** Karta článku pro rozcestník a „Související články“. Celá karta je klikací přes rozšířený odkaz. */
export function ArticleCard({ article, index, headingLevel = "h2" }: { article: Article; index?: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card relative flex h-full flex-col transition hover:shadow-md focus-within:ring-2 focus-within:ring-brand-500">
      {index !== undefined && (
        <p aria-hidden="true" className="font-mono text-xs font-semibold text-stone-500">
          {String(index + 1).padStart(2, "0")}
        </p>
      )}
      <Heading className="mt-1 text-lg font-bold leading-snug text-stone-900">
        <Link href={`/clanky/${article.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {typo(article.title)}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{typo(article.description)}</p>
      <p className="mt-4 font-mono text-xs text-stone-500">
        <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time> · {readingMinutes(article)}&nbsp;min čtení
      </p>
    </article>
  );
}
