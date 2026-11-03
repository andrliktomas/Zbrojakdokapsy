import type { Article, ArticleBlock, Inline, RichText } from "./types";
import { article as jakZiskat } from "./jak-ziskat-zbrojni-opravneni";
import { article as zkouska } from "./zkouska-odborne-zpusobilosti";
import { article as obecneRozsirene } from "./obecne-vs-rozsirene-zbrojni-opravneni";
import { article as kategorie } from "./kategorie-zbrani-a-streliva";
import { article as lhuty } from "./lhuty-a-cisla-ke-zkousce";
import { article as nutnaObrana } from "./nutna-obrana-a-krajni-nouze";
import { article as bezpecneZachazeni } from "./bezpecne-zachazeni-se-zbrani";

export type { Article, ArticleBlock, ArticleFaq, ArticleSection, Inline, RichText } from "./types";

/** Pořadí = pořadí na rozcestníku /clanky (od obecného k detailům). */
export const ARTICLES: Article[] = [jakZiskat, zkouska, obecneRozsirene, kategorie, lhuty, nutnaObrana, bezpecneZachazeni];

const bySlug = new Map(ARTICLES.map((a) => [a.slug, a]));
export const articleBySlug = (slug: string) => bySlug.get(slug);

/** Datum poslední revize kteréhokoli článku (pro sitemapu a rozcestník). */
export const latestArticleUpdate = () => ARTICLES.map((a) => a.updatedAt).sort().at(-1)!;

export const inlineText = (i: Inline) => (typeof i === "string" ? i : "strong" in i ? i.strong : i.text);
export const richText = (t: RichText) => (typeof t === "string" ? t : t.map(inlineText).join(""));

function blockText(b: ArticleBlock): string[] {
  switch (b.type) {
    case "p":
      return [richText(b.text)];
    case "list":
      return b.items.map(richText);
    case "steps":
      return [b.title ?? "", ...b.items.flatMap((s) => [s.title, richText(s.text)])];
    case "table":
      return [b.caption, ...b.head, ...b.rows.flat().map(richText)];
    case "note":
      return [b.title ?? "", richText(b.text)];
    case "topic":
      return [b.text];
  }
}

/** Veškerý čitelný text článku (bez seznamu zdrojů) – pro počet slov a dobu čtení. */
export function articlePlainText(a: Article): string {
  return [
    a.title,
    a.perex,
    ...a.summary,
    ...a.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockText)]),
    ...a.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");
}

export function wordCount(a: Article): number {
  return articlePlainText(a).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Doba čtení při ~200 slovech za minutu (odborný text). */
export const readingMinutes = (a: Article) => Math.max(1, Math.round(wordCount(a) / 200));

/** Všechny odkazy v článku (inline odkazy, okruhy aplikace, související články). */
export function articleLinks(a: Article): string[] {
  const out: string[] = [];
  const fromRich = (t: RichText) => {
    if (typeof t !== "string") for (const i of t) if (typeof i !== "string" && "href" in i) out.push(i.href);
  };
  for (const s of a.sections) {
    for (const b of s.blocks) {
      if (b.type === "p") fromRich(b.text);
      else if (b.type === "list") b.items.forEach(fromRich);
      else if (b.type === "steps") b.items.forEach((i) => fromRich(i.text));
      else if (b.type === "table") b.rows.flat().forEach(fromRich);
      else if (b.type === "note") fromRich(b.text);
      else if (b.type === "topic") out.push(`/okruhy/${b.topic}`);
    }
  }
  a.topics.forEach((t) => out.push(`/okruhy/${t}`));
  a.related.forEach((r) => out.push(`/clanky/${r}`));
  return out;
}
