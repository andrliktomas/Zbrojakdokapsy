import type { MetadataRoute } from "next";
import { absoluteUrl, ROBOTS_DISALLOW } from "@/lib/seo";

// Generuje se při požadavku, aby URL sitemapy odpovídala APP_URL v běžícím prostředí.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ROBOTS_DISALLOW }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
