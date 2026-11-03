// Renders the Zbroják target mark into PWA PNG icons with Playwright's Chromium.
// Usage: node scripts/gen-icons.cjs .   (vyžaduje Playwright s Chromiem)
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

const root = process.argv[2];
if (!root) throw new Error("usage: node gen-icons.cjs <repo-root>");

const PAPER = "#F3F1EC";
const MARK = `<circle cx="48" cy="48" r="44" fill="none" stroke="#15181D" stroke-width="5"/><circle cx="48" cy="48" r="29" fill="none" stroke="#15181D" stroke-width="5"/><circle cx="48" cy="48" r="14" fill="#15181D"/><line x1="48" y1="0" x2="48" y2="10" stroke="#15181D" stroke-width="5"/><line x1="48" y1="86" x2="48" y2="96" stroke="#15181D" stroke-width="5"/><line x1="0" y1="48" x2="10" y2="48" stroke="#15181D" stroke-width="5"/><line x1="86" y1="48" x2="96" y2="48" stroke="#15181D" stroke-width="5"/><circle cx="57" cy="40" r="9" fill="#E8590C" stroke="#F3F1EC" stroke-width="3"/>`;

/**
 * size: output px; markRatio: mark edge / icon edge; radius: background corner radius ratio (0 = full bleed).
 * Maskable: the mark's farthest point (crosshair tips) is ~0.5 of its edge from the centre, so a 0.72 ratio
 * keeps everything within r = 0.36 * size, inside the 0.4 * size maskable safe zone.
 */
function svg(size, markRatio, radius) {
  const m = size * markRatio;
  const o = (size - m) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" rx="${size * radius}" fill="${PAPER}"/>` +
    `<svg x="${o}" y="${o}" width="${m}" height="${m}" viewBox="0 0 96 96">${MARK}</svg></svg>`;
}

const outputs = [
  { file: "public/icons/icon-96.png", size: 96, mark: 0.78, radius: 0.2 },
  { file: "public/icons/icon-192.png", size: 192, mark: 0.78, radius: 0.2 },
  { file: "public/icons/icon-512.png", size: 512, mark: 0.78, radius: 0.2 },
  { file: "public/icons/maskable-512.png", size: 512, mark: 0.72, radius: 0 },
  { file: "public/apple-touch-icon.png", size: 180, mark: 0.78, radius: 0 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const o of outputs) {
    await page.setViewportSize({ width: o.size, height: o.size });
    await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg(o.size, o.mark, o.radius)}</body></html>`);
    const out = path.join(root, o.file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out, omitBackground: true, clip: { x: 0, y: 0, width: o.size, height: o.size } });
    console.log("wrote", o.file);
  }
  // Preview sheet incl. a maskable circle crop for visual QA.
  await page.setViewportSize({ width: 900, height: 300 });
  const img = (f, s, extra = "") => `<img src="data:image/png;base64,${fs.readFileSync(path.join(root, f)).toString("base64")}" width="${s}" height="${s}" style="${extra}">`;
  await page.setContent(`<body style="margin:0;padding:20px;background:#888;display:flex;gap:20px;align-items:center">
    ${img("public/icons/icon-192.png", 192)}${img("public/icons/maskable-512.png", 192)}${img("public/icons/maskable-512.png", 192, "border-radius:50%")}
    ${img("public/apple-touch-icon.png", 180, "border-radius:22%")}${img("public/icons/icon-96.png", 96)}</body>`);
  await page.screenshot({ path: path.join(__dirname, "shots", "pwa", "icons-preview.png") });
  await browser.close();
})();
