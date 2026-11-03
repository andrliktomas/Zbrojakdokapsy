import { serializeJsonLd } from "@/lib/seo";

/** Strukturovaná data schema.org; obsah pochází z vlastních dat, „<“ je escapováno. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
