import type { MetadataRoute } from "next";
import { ARTICLES, latestArticleUpdate } from "@/content/articles";
import { absoluteUrl } from "@/lib/seo";

// Generuje se při požadavku, aby URL odpovídala APP_URL v běžícím prostředí (ne v prostředí buildu).
export const dynamic = "force-dynamic";

/**
 * Jen veřejné, indexovatelné stránky. Stránky po přihlášení (přehled, okruhy, kartičky, procvičování,
 * test, slovníček, účet) a přihlášení/registrace sem nepatří – viz robots.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/cenik"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/clanky"), lastModified: latestArticleUpdate(), changeFrequency: "weekly", priority: 0.8 },
    ...ARTICLES.map((a) => ({
      url: absoluteUrl(`/clanky/${a.slug}`),
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
