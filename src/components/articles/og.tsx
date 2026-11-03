import { ImageResponse } from "next/og";
import { BRAND, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

type FontSpec = { name: string; family: string; weight: 500 | 700 | 800 };
const FONTS: FontSpec[] = [
  { name: "Archivo", family: "Archivo", weight: 800 },
  { name: "Archivo", family: "Archivo", weight: 500 },
  { name: "Plex Mono", family: "IBM Plex Mono", weight: 500 },
];

/**
 * Načte TTF podmnožinu písma z Google Fonts (jen znaky, které obrázek použije).
 * Když síť není k dispozici (např. offline build), vrátí null a obrázek použije výchozí písmo next/og.
 */
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url, { signal: AbortSignal.timeout(4000) })).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src, { signal: AbortSignal.timeout(4000) });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function loadFonts(text: string) {
  const chars = [...new Set(text)].join("");
  const loaded = await Promise.all(FONTS.map(async (f) => ({ f, data: await loadGoogleFont(f.family, f.weight, chars) })));
  // Bez hlavního písma nemá smysl míchat – raději celé výchozí písmo.
  if (!loaded[0].data) return undefined;
  return loaded
    .filter((l) => l.data)
    .map((l) => ({ name: l.f.name, data: l.data as ArrayBuffer, weight: l.f.weight, style: "normal" as const }));
}

/** Terč vpravo: soustředné kruhy se zásahem uprostřed („trefa“). */
function Target() {
  const ring = (size: number, opacity: number) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    left: (440 - size) / 2,
    top: (440 - size) / 2,
    borderRadius: 9999,
    border: `3px solid rgba(243, 241, 236, ${opacity})`,
  });
  return (
    <div style={{ position: "absolute", right: -40, top: 95, width: 440, height: 440, display: "flex" }}>
      <div style={ring(440, 0.12)} />
      <div style={ring(320, 0.18)} />
      <div style={ring(200, 0.28)} />
      <div style={{ position: "absolute", left: 219, top: 0, width: 2, height: 440, background: "rgba(243, 241, 236, 0.12)" }} />
      <div style={{ position: "absolute", top: 219, left: 0, height: 2, width: 440, background: "rgba(243, 241, 236, 0.12)" }} />
      <div style={{ position: "absolute", left: 170, top: 170, width: 100, height: 100, borderRadius: 9999, background: BRAND.signal }} />
    </div>
  );
}

type OgInput = { eyebrow: string; title: string; subtitle?: string; highlight?: string; footer: string };

export async function renderOgImage({ eyebrow, title, subtitle, highlight, footer }: OgInput) {
  // Do podmnožiny písma musí jít každý vykreslený znak, včetně značky „ZK“.
  const fonts = await loadFonts([eyebrow, title, subtitle, highlight, footer, SITE_NAME, "ZK"].join(" "));
  const titleSize = title.length > 60 ? 58 : title.length > 36 ? 68 : 80;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.graphite,
          color: BRAND.paper,
          padding: "64px 72px",
          position: "relative",
          fontFamily: fonts ? "Archivo" : undefined,
        }}
      >
        <Target />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: BRAND.signal,
              color: BRAND.graphite,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            ZK
          </div>
          <div style={{ display: "flex", fontFamily: fonts ? "Plex Mono" : undefined, fontSize: 24, letterSpacing: 0.5, color: BRAND.signal, fontWeight: 500 }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
          {(subtitle || highlight) && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 40, fontWeight: 500, lineHeight: 1.2 }}>
              {subtitle && <div style={{ display: "flex", color: "rgba(243, 241, 236, 0.82)" }}>{subtitle}</div>}
              {highlight && <div style={{ display: "flex", color: BRAND.signal }}>{highlight}</div>}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 56, height: 4, background: BRAND.signal }} />
          <div style={{ display: "flex", fontFamily: fonts ? "Plex Mono" : undefined, fontSize: 22, color: "rgba(243, 241, 236, 0.7)", fontWeight: 500 }}>
            {footer}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Tagline rozdělená na dvě věty – druhá se zvýrazní signální oranžovou. */
export const TAGLINE_PARTS = (() => {
  const [first, ...rest] = SITE_TAGLINE.split(". ");
  return { subtitle: `${first}.`, highlight: rest.join(". ") };
})();
