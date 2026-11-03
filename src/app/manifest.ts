import type { MetadataRoute } from "next";

/** Barvy značky: grafit (téma) a papír (pozadí). */
const PAPER = "#F3F1EC";

const SHORTCUT_ICON = [{ src: "/icons/icon-96.png", sizes: "96x96", type: "image/png" }];

/** Web App Manifest – Next ho servíruje na /manifest.webmanifest a sám přidá <link rel="manifest">. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Zbroják do kapsy",
    short_name: "Zbroják",
    description:
      "Příprava na zkoušku odborné způsobilosti ke zbrojnímu oprávnění – výklad, kartičky, procvičování otázek a testy nanečisto.",
    lang: "cs",
    dir: "ltr",
    start_url: "/prehled",
    scope: "/",
    display: "standalone",
    theme_color: PAPER,
    background_color: PAPER,
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Procvičování",
        description: "Náhodné otázky s okamžitým vysvětlením",
        url: "/procvicovani",
        icons: SHORTCUT_ICON,
      },
      {
        name: "Kartičky",
        description: "Učební kartičky s opakováním",
        url: "/karticky",
        icons: SHORTCUT_ICON,
      },
      {
        name: "Test nanečisto",
        short_name: "Test",
        description: "Cvičný test ve skladbě skutečné zkoušky",
        url: "/test",
        icons: SHORTCUT_ICON,
      },
    ],
  };
}
