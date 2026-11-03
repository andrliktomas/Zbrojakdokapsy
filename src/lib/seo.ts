import type { Metadata } from "next";
import type { Article } from "@/content/articles";

export const SITE_NAME = "Zbroják do kapsy";
export const SITE_TAGLINE = "Zkouška na zbrojní oprávnění. Trefa na první pokus.";
export const SITE_DESCRIPTION =
  "Interaktivní příprava na zkoušku odborné způsobilosti ke zbrojnímu oprávnění podle zákona č. 90/2024 Sb. – výklad, kartičky, náhodné otázky a testy nanečisto.";
export const DISCLAIMER = "Zbroják do kapsy není oficiálním materiálem Ministerstva vnitra ani Policie ČR.";
export const LOCALE = "cs_CZ";

/** Barvy značky (pro OG obrázky, kde nelze použít Tailwind). */
export const BRAND = { graphite: "#15181D", paper: "#F3F1EC", signal: "#E8590C", correct: "#276B43" } as const;

/**
 * Veřejná základní URL bez koncového lomítka.
 * Pořadí: APP_URL (používá i billing) → produkční doména Vercelu → http://localhost:3000.
 */
export function siteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw = process.env.APP_URL?.trim() || (vercel ? `https://${vercel}` : "") || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Cesty, které roboti neprocházejí: stránky po přihlášení, přihlašovací a platební toky, API.
 * Sitemapa (src/app/sitemap.ts) nesmí obsahovat nic z tohoto seznamu – hlídá to test.
 */
export const ROBOTS_DISALLOW = [
  "/api/",
  "/prehled",
  "/ucet",
  "/okruhy",
  "/karticky",
  "/procvicovani",
  "/test",
  "/slovnicek",
  "/prihlaseni",
  "/registrace",
  "/platba/",
];

/** Celý titulek stránky: „Název | Zbroják do kapsy“. */
export const fullTitle = (title: string) => (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`);

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Pro články: og:type article + časy publikace a revize. */
  article?: { publishedTime: string; modifiedTime: string; section?: string; tags?: string[] };
  noindex?: boolean;
};

/**
 * Metadata jedné stránky: title (absolutní, nezávislý na případné šabloně v layoutu), description,
 * canonical, Open Graph a Twitter. Obrázek doplní souborová konvence opengraph-image.
 */
export function pageMetadata({ title, description, path, article, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const t = fullTitle(title);
  return {
    metadataBase: new URL(siteUrl()),
    title: { absolute: t },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: article ? "article" : "website",
      url,
      title: t,
      description,
      siteName: SITE_NAME,
      locale: LOCALE,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        section: article.section,
        tags: article.tags,
      }),
    },
    twitter: { card: "summary_large_image", title: t, description },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

// ---------------------------------------------------------------------------------------------
// JSON-LD (schema.org). Vrací prosté objekty; vykresluje je komponenta <JsonLd>.
// ---------------------------------------------------------------------------------------------

const orgId = () => `${siteUrl()}/#organization`;
const websiteId = () => `${siteUrl()}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    slogan: SITE_TAGLINE,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    inLanguage: "cs",
    publisher: { "@id": orgId() },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqJsonLd(faq: Article["faq"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(a: Article) {
  const url = absoluteUrl(`/clanky/${a.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    inLanguage: "cs",
    mainEntityOfPage: url,
    url,
    image: absoluteUrl(`/clanky/${a.slug}/opengraph-image`),
    author: { "@id": orgId() },
    publisher: { "@id": orgId() },
    isPartOf: { "@id": websiteId() },
  };
}

export function articleListJsonLd(articles: Article[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Články ke zkoušce na zbrojní oprávnění",
    url: absoluteUrl("/clanky"),
    inLanguage: "cs",
    isPartOf: { "@id": websiteId() },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/clanky/${a.slug}`),
        name: a.title,
      })),
    },
  };
}

/** Serializace do <script type="application/ld+json"> – escapuje „<“, aby text nemohl ukončit skript. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
