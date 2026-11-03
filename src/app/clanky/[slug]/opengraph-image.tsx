import { notFound } from "next/navigation";
import { ARTICLES, articleBySlug } from "@/content/articles";
import { OG_SIZE, renderOgImage } from "@/components/articles/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `Článek – ${SITE_NAME}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Params = { slug: string };

export default async function ArticleOpengraphImage({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  return renderOgImage({
    eyebrow: "Článek · zákon č. 90/2024 Sb.",
    title: article.title,
    footer: `${SITE_NAME} · příprava na zkoušku`,
  });
}
