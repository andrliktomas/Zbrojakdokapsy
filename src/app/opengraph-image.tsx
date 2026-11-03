import { OG_SIZE, renderOgImage, TAGLINE_PARTS } from "@/components/articles/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const alt = `${SITE_NAME} – ${SITE_TAGLINE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Výchozí Open Graph obrázek pro celý web (podstránky ho dědí, články mají vlastní). */
export default async function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Podle zákona č. 90/2024 Sb.",
    title: SITE_NAME,
    subtitle: TAGLINE_PARTS.subtitle,
    highlight: TAGLINE_PARTS.highlight,
    footer: "Výklad · kartičky · otázky · testy nanečisto",
  });
}
