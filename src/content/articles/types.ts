// Typy veřejných článků (SEO vrstva). Obsah je čistá data – žádné HTML řetězce.
// Fakta pouze z docs/research/legislativa.md a src/content/data/*.ts; u každého tvrzení uvádějte §.

/** Kousek textu uvnitř odstavce: prostý text, odkaz nebo zvýraznění. */
export type Inline = string | { text: string; href: string } | { strong: string };

/** Text odstavce: buď prostý řetězec, nebo posloupnost kousků s odkazy. */
export type RichText = string | Inline[];

export type ArticleBlock =
  | { type: "p"; text: RichText }
  | { type: "list"; ordered?: boolean; items: RichText[] }
  /** Číslovaný postup; volitelný nadpis se vykreslí jako H3. */
  | { type: "steps"; title?: string; items: { title: string; text: RichText }[] }
  | { type: "table"; caption: string; head: string[]; rows: RichText[][] }
  /** Zvýrazněné upozornění. „tip“ = na co se ve zkoušce chytá, „warning“ = důležité varování. */
  | { type: "note"; tone: "tip" | "warning"; title?: string; text: RichText }
  /** Odkaz na okruh v aplikaci (/okruhy/<slug>) s krátkým popisem, co v něm čtenář najde. */
  | { type: "topic"; topic: string; text: string };

export type ArticleSection = {
  /** Kotva pro obsah článku (#id). */
  id: string;
  heading: string;
  blocks: ArticleBlock[];
};

export type ArticleFaq = {
  q: string;
  /** Prostý text – použije se i ve strukturovaných datech FAQPage. */
  a: string;
};

export type Article = {
  slug: string;
  /** Nadpis H1. */
  title: string;
  /** Titulek do <title> a sociálních sítí (bez názvu webu, ten se doplní). */
  metaTitle: string;
  /** Meta description, ideálně 120–160 znaků. */
  description: string;
  /** Úvodní odstavec pod nadpisem. */
  perex: string;
  /** ISO datum první publikace. */
  publishedAt: string;
  /** ISO datum poslední revize obsahu. */
  updatedAt: string;
  /** Související okruhy aplikace; první je hlavní (CTA vede na něj). */
  topics: string[];
  /** Body do rámečku „Shrnutí“. */
  summary: string[];
  sections: ArticleSection[];
  faq: ArticleFaq[];
  /** Použité předpisy a zdroje (prostý text). */
  sources: string[];
  /** Slugy souvisejících článků. */
  related: string[];
};
