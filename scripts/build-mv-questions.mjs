#!/usr/bin/env node
// Generátor src/content/mv/questions.json z rozparsovaného oficiálního souboru testových otázek MV ČR.
//
// Použití:
//   node scripts/build-mv-questions.mjs <cesta/k/questions.json> [výstup]
//
// Zdroj: „Soubor testových otázek pro teoretickou část zkoušky odborné způsobilosti a komisionální zkoušku“,
// Ministerstvo vnitra ČR, verze 15. 12. 2025 (https://mv.gov.cz/zbrojni-opravneni), zveřejněný podle § 27 odst. 1
// zákona č. 90/2024 Sb. Vstupní JSON je strojový přepis PDF (SHA-256 PDF edd539ef…a04a4) z veřejného repozitáře
// https://github.com/zbrojak-2026/zbrojak-2026.github.io (soubor data/questions.json).
//
// Skript text otázek a odpovědí NEMĚNÍ. Výjimkou jsou jen níže vyjmenované opravy chyb, které vznikly strojovým
// převodem z PDF (parser spojuje řádky mezerou a neznámý glyf ligatury nahrazuje „ti“). Každá oprava se ověří
// (přesný počet výskytů) a vypíše; když nesedí, skript skončí chybou. Otázky přiřadí k okruhům aplikace podle
// rozsahů čísel v src/content/mv/mapping.json a ke skupině testu nanečisto (17/5/5/3).

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [srcPath, outArg] = process.argv.slice(2);
if (!srcPath) {
  console.error("Použití: node scripts/build-mv-questions.mjs <questions.json> [výstup]");
  process.exit(1);
}
const outPath = resolve(outArg ?? `${root}/src/content/mv/questions.json`);
const mapping = JSON.parse(readFileSync(`${root}/src/content/mv/mapping.json`, "utf8"));

const raw = readFileSync(srcPath);
const sourceSha256 = createHash("sha256").update(raw).digest("hex");
const parsed = JSON.parse(raw.toString("utf8"));
const source = Array.isArray(parsed) ? parsed : parsed.questions;

// --- Opravy artefaktů převodu z PDF ------------------------------------------------------------------------------
// Pole: num, field ("q" = otázka, 0–2 = odpověď a–c), from, to, count (výchozí 1), kind.
//  - "zalomení": slovo se spojovníkem zalomené na konci řádku; parser vložil za spojovník mezeru.
//  - "ligatura": v PDF je „tí“ (příp. „ft“) vysázeno ligaturou bez převodu na Unicode a parser ji přepsal na „ti“.
//    Chyba se týká jen běžného řezu písma (nesprávné odpovědi) na části stran; otázky (tučně) a správné odpovědi
//    (kurzívou) mají „tí“ převedené správně. Opraveno jen tam, kde tvar s „ti“ v daném kontextu není spisovně
//    možný (např. „s tim“, „o odněti“, „zatimco“) nebo jej jednoznačně určuje shoda (např. „s vysokou bezpečnosti“).
const H = "zalomení";
const L = "ligatura";
const FIXES = [
  { num: 58, field: "q", from: "jde- li", to: "jde-li", kind: H },
  { num: 87, field: 0, from: "sportovně- střeleckou", to: "sportovně-střeleckou", kind: H },
  { num: 99, field: "q", from: "psycho- sociální", to: "psycho-sociální", kind: H },
  { num: 106, field: 0, from: "bylo- li", to: "bylo-li", kind: H },
  { num: 232, field: 0, from: "jde- li", to: "jde-li", kind: H },

  { num: 211, field: 1, from: "k nabyti,", to: "k nabytí,", kind: L },
  { num: 211, field: 2, from: "k nabyti,", to: "k nabytí,", kind: L },
  { num: 212, field: 2, from: "nabyti právní moci rozhodnuti o odněti", to: "nabytí právní moci rozhodnutí o odnětí", kind: L },
  { num: 213, field: 2, from: "nepřipoušti", to: "nepřipouští", kind: L },
  { num: 217, field: 1, from: "uplynuti", to: "uplynutí", kind: L },
  { num: 217, field: 2, from: "uplynutim", to: "uplynutím", kind: L },
  { num: 218, field: 2, from: "o odněti", to: "o odnětí", kind: L },
  { num: 230, field: 2, from: "svého využiti", to: "svého využití", kind: L },
  { num: 231, field: 1, from: "v rozhodnuti", to: "v rozhodnutí", kind: L },
  { num: 231, field: 2, from: "s rozšířenou působnosti", to: "s rozšířenou působností", kind: L },
  { num: 235, field: 2, from: "pokud použiti", to: "pokud použití", kind: L },
  { num: 235, field: 2, from: "připoušti", to: "připouští", kind: L },
  { num: 257, field: 0, from: "nad činnosti", to: "nad činností", kind: L },
  { num: 261, field: 0, from: "s tim", to: "s tím", kind: L },
  { num: 263, field: 1, from: "s tim", to: "s tím", kind: L },
  { num: 263, field: 1, from: "vytiženost", to: "vytíženost", kind: L },
  { num: 265, field: 1, from: "k odněti", to: "k odnětí", kind: L },
  { num: 267, field: 0, from: "nabyti právní moci rozhodnuti o jeho odněti", to: "nabytí právní moci rozhodnutí o jeho odnětí", kind: L },
  { num: 270, field: 0, from: "nabiti zbraně", to: "nabití zbraně", kind: L },
  { num: 270, field: 2, from: "nabiti zbraně", to: "nabití zbraně", kind: L },
  { num: 274, field: 0, from: "titul nabyti", to: "titul nabytí", kind: L },
  { num: 275, field: 0, from: "o odmítnuti", to: "o odmítnutí", kind: L },
  { num: 275, field: 0, from: "znehodnoti", to: "znehodnotí", kind: L },
  { num: 278, field: 1, from: "s tim", to: "s tím", kind: L },
  { num: 278, field: 2, from: "po uplynuti", to: "po uplynutí", kind: L },
  { num: 279, field: 0, from: "nabyti", to: "nabytí", count: 2, kind: L },
  { num: 284, field: 1, from: "pro použiti", to: "pro použití", kind: L },
  { num: 288, field: 2, from: "znehodnoti", to: "znehodnotí", kind: L },
  { num: 290, field: 0, from: "s rozhodnutim", to: "s rozhodnutím", kind: L },
  { num: 290, field: 0, from: "přeshraničně přemísti", to: "přeshraničně přemístí", kind: L },
  { num: 290, field: 1, from: "nakládat, přemísti", to: "nakládat, přemístí", kind: L },
  { num: 292, field: 0, from: "nabyti nebo", to: "nabytí nebo", kind: L },
  { num: 292, field: 1, from: "nabyti nebo", to: "nabytí nebo", kind: L },
  { num: 298, field: 0, from: "a součásti zbraně umožňujících", to: "a součástí zbraně umožňujících", kind: L },
  { num: 298, field: 1, from: "NO, součásti zbraně umožňujících", to: "NO, součástí zbraně umožňujících", kind: L },
  { num: 298, field: 1, from: "neregulovaných součásti", to: "neregulovaných součástí", kind: L },
  { num: 299, field: 1, from: "regulovaných součásti", to: "regulovaných součástí", kind: L },
  { num: 303, field: 2, from: "nebo převzeti", to: "nebo převzetí", kind: L },
  { num: 304, field: 2, from: "a nabyti zbraně", to: "a nabytí zbraně", kind: L },
  { num: 312, field: 2, from: "airsotiovou", to: "airsoftovou", kind: L },
  { num: 313, field: 2, from: "airsotiové", to: "airsoftové", kind: L },
  { num: 313, field: 2, from: "nepřipoušti", to: "nepřipouští", kind: L },
  { num: 320, field: 1, from: "civilní použiti", to: "civilní použití", kind: L },
  { num: 322, field: 0, from: "pokud tim", to: "pokud tím", kind: L },
  { num: 324, field: 1, from: "obecně plati", to: "obecně platí", kind: L },
  { num: 324, field: 2, from: "v rozhodnuti", to: "v rozhodnutí", kind: L },
  { num: 340, field: 2, from: "místě použiti", to: "místě použití", kind: L },
  { num: 341, field: 0, from: "s vysokou bezpečnosti", to: "s vysokou bezpečností", kind: L },
  { num: 344, field: 1, from: "v rozhodnuti", to: "v rozhodnutí", kind: L },
  { num: 345, field: 1, from: "po převzeti", to: "po převzetí", kind: L },
  { num: 349, field: 2, from: "se tim neznemožní", to: "se tím neznemožní", kind: L },
  { num: 349, field: 2, from: "neztiží", to: "neztíží", kind: L },
  { num: 355, field: 1, from: "čtvrtleti", to: "čtvrtletí", kind: L },
  { num: 355, field: 1, from: "pololeti", to: "pololetí", kind: L },
  { num: 359, field: 2, from: "celistvých součásti", to: "celistvých součástí", kind: L },
  { num: 365, field: 0, from: "k rozhodnuti", to: "k rozhodnutí", kind: L },
  { num: 370, field: 1, from: "verifikační rozhodnuti", to: "verifikační rozhodnutí", count: 2, kind: L },
  { num: 371, field: 0, from: "dni uplynuti", to: "dni uplynutí", kind: L },
  { num: 374, field: 2, from: "rozhodnutim", to: "rozhodnutím", kind: L },
  { num: 380, field: 0, from: "dočasného použiti", to: "dočasného použití", kind: L },
  { num: 380, field: 1, from: "dočasného použiti", to: "dočasného použití", kind: L },
  { num: 380, field: 1, from: "s tim", to: "s tím", kind: L },
  { num: 381, field: 0, from: "za timto", to: "za tímto", kind: L },
  { num: 382, field: 2, from: "rozhodnutim", to: "rozhodnutím", kind: L },
  { num: 383, field: 1, from: "nabyti právní moci rozhodnuti o jejich odněti", to: "nabytí právní moci rozhodnutí o jejich odnětí", kind: L },
  { num: 383, field: 2, from: "nebo použiti,", to: "nebo použití,", kind: L },
  { num: 387, field: 0, from: "započetim", to: "započetím", kind: L },
  { num: 387, field: 2, from: "započetim", to: "započetím", kind: L },
  { num: 393, field: 1, from: "k převzeti", to: "k převzetí", kind: L },
  { num: 396, field: 1, from: "kalendářním čtvrtleti", to: "kalendářním čtvrtletí", kind: L },
  { num: 398, field: 2, from: "dnem uplynuti platnosti dosavadního rozhodnuti", to: "dnem uplynutí platnosti dosavadního rozhodnutí", kind: L },
  { num: 401, field: 2, from: "rozhodnutim", to: "rozhodnutím", kind: L },
  { num: 403, field: 2, from: "o odněti", to: "o odnětí", kind: L },
  { num: 404, field: 0, from: "o odněti", to: "o odnětí", count: 2, kind: L },
  { num: 404, field: 0, from: "vydání rozhodnuti", to: "vydání rozhodnutí", kind: L },
  { num: 405, field: 0, from: "rozhodnuti musí", to: "rozhodnutí musí", kind: L },
  { num: 406, field: 2, from: "k přijeti", to: "k přijetí", kind: L },
  { num: 407, field: 1, from: "o odněti", to: "o odnětí", kind: L },
  { num: 408, field: 1, from: "o odněti", to: "o odnětí", kind: L },
  { num: 611, field: 0, from: "jehož přijeti", to: "jehož přijetí", kind: L },
  { num: 612, field: 2, from: "zatimco", to: "zatímco", kind: L },
  { num: 618, field: 0, from: "povinnou součásti", to: "povinnou součástí", kind: L },
  { num: 624, field: 2, from: "pro použiti", to: "pro použití", kind: L },
  { num: 626, field: 2, from: "administrativních povinnosti", to: "administrativních povinností", kind: L },
  { num: 629, field: 0, from: "dopusti", to: "dopustí", kind: L },
  { num: 629, field: 2, from: "se dopusti", to: "se dopustí", kind: L },
  { num: 629, field: 2, from: "instituce, plati, že", to: "instituce, platí, že", kind: L },
  { num: 630, field: 0, from: "dopusti", to: "dopustí", kind: L },
  { num: 630, field: 1, from: "dopusti", to: "dopustí", kind: L },
  { num: 632, field: 0, from: "chráněni timto", to: "chráněni tímto", kind: L },
  { num: 637, field: 0, from: "za použiti", to: "za použití", kind: L },
  { num: 637, field: 0, from: "jejím použitim", to: "jejím použitím", kind: L },
  { num: 637, field: 2, from: "daných okolnosti", to: "daných okolností", kind: L },
  { num: 639, field: 2, from: "všech okolnosti", to: "všech okolností", kind: L },
  { num: 646, field: 1, from: "jelikož timto", to: "jelikož tímto", kind: L },
  { num: 646, field: 2, from: "hrozit použitim", to: "hrozit použitím", kind: L },
  { num: 800, field: 2, from: "masti nebo olejem", to: "mastí nebo olejem", kind: L },
  { num: 806, field: 0, from: "tim lépe", to: "tím lépe", kind: L },
  { num: 807, field: 0, from: "měkkou části dlaně", to: "měkkou částí dlaně", kind: L },
  { num: 808, field: 1, from: "ochrnuti", to: "ochrnutí", kind: L },
  { num: 811, field: 2, from: "s dušnosti, slabosti", to: "s dušností, slabostí", kind: L },
  { num: 811, field: 2, from: "vdechnuti", to: "vdechnutí", kind: L },
  { num: 814, field: 1, from: "vdechnuti", to: "vdechnutí", kind: L },
  { num: 819, field: 2, from: "Zajistime", to: "Zajistíme", kind: L },
  { num: 821, field: 1, from: "potižích", to: "potížích", kind: L },
  { num: 827, field: 2, from: "malých děti", to: "malých dětí", kind: L },
  { num: 832, field: 0, from: "štipání", to: "štípání", kind: L },
  { num: 832, field: 2, from: "zvednuti", to: "zvednutí", kind: L },
  { num: 837, field: 2, from: "štipne", to: "štípne", kind: L },
];

// Zvláštnosti zdroje, které vědomě NEOPRAVUJEME (nelze je bez PDF ověřit, nebo jsou přímo v PDF).
const KEPT_AS_IS = [
  { num: 211, note: "Odpovědi b) a c) jsou totožné (shodně uvádí i zdrojový přepis); správná je a)." },
  { num: 270, note: "V odpovědi a) je překlep „zraň“ – ponecháno podle zdroje." },
  { num: 322, note: "Odpověď c) „v nabitim stavu“ – správný tvar nelze bez PDF určit (nabitím/nabitém), ponecháno." },
  { num: 617, note: "Odpověď a) „dodržováním povinnosti“ – jednotné i množné číslo je možné, ponecháno." },
  { num: 626, note: "Odpověď a) končí bez tečky – ponecháno podle zdroje." },
  { num: 757, note: "Odpověď b) končí znakem „≐“ – je ve zdrojovém přepisu, ponecháno." },
  { num: 799, note: "Odpověď c) končí „… si má být“ (zřejmě zkrácená přímo ve zdroji) – ponecháno." },
];

const errors = [];
const fail = (msg) => errors.push(msg);

// --- Kontroly zdroje -------------------------------------------------------------------------------------------------
if (source.length !== 837) fail(`čekáno 837 otázek, je ${source.length}`);
const byNum = new Map();
for (const q of source) {
  if (byNum.has(q.num)) fail(`duplicitní číslo ${q.num}`);
  byNum.set(q.num, q);
}
for (let n = 1; n <= 837; n++) if (!byNum.has(n)) fail(`chybí otázka č. ${n}`);

// --- Mapování na okruhy ----------------------------------------------------------------------------------------------
const ranges = [...mapping.ranges].sort((a, b) => a.from - b.from);
for (let i = 0; i < ranges.length; i++) {
  const prevTo = i === 0 ? 0 : ranges[i - 1].to;
  if (ranges[i].from !== prevTo + 1) fail(`mapování: mezera/překryv před ${ranges[i].from}`);
  if (!mapping.groups[ranges[i].topic]) fail(`mapování: okruh ${ranges[i].topic} nemá skupinu testu`);
}
if (ranges.at(-1)?.to !== 837) fail("mapování nekončí číslem 837");
const topicOf = (num) => ranges.find((r) => num >= r.from && num <= r.to)?.topic;
const sectionOf = (num) => mapping.sections.find((s) => num >= s.from && num <= s.to);

// --- Opravy ----------------------------------------------------------------------------------------------------------
const fixed = new Map(source.map((q) => [q.num, { ...q, answers: [...q.answers] }]));
const appliedFixes = [];
for (const f of FIXES) {
  const q = fixed.get(f.num);
  if (!q) { fail(`oprava: otázka ${f.num} neexistuje`); continue; }
  const text = f.field === "q" ? q.q : q.answers[f.field];
  const count = text.split(f.from).length - 1;
  const want = f.count ?? 1;
  if (count !== want) { fail(`oprava ${f.num}/${f.field}: „${f.from}“ nalezeno ${count}×, čekáno ${want}×`); continue; }
  const next = text.split(f.from).join(f.to);
  if (f.field === "q") q.q = next; else q.answers[f.field] = next;
  appliedFixes.push({ num: f.num, field: f.field === "q" ? "otázka" : `odpověď ${"abc"[f.field]})`, from: f.from, to: f.to, kind: f.kind });
}

// --- Sestavení a kontrola výstupu ------------------------------------------------------------------------------------
const questions = [];
for (let n = 1; n <= 837; n++) {
  const q = fixed.get(n);
  if (!q) continue;
  const section = sectionOf(n);
  const topic = topicOf(n);
  if (!section) fail(`${n}: bez oddílu`);
  else if (q.section !== section.title) fail(`${n}: oddíl ve zdroji „${q.section}“ ≠ „${section.title}“`);
  if (!topic) fail(`${n}: bez okruhu`);
  if (!Array.isArray(q.answers) || q.answers.length !== 3) fail(`${n}: počet odpovědí ${q.answers?.length}`);
  if (![0, 1, 2].includes(q.correct)) fail(`${n}: neplatná správná odpověď ${q.correct}`);
  for (const [i, t] of [q.q, ...q.answers].entries()) {
    const where = i === 0 ? "otázka" : `odpověď ${"abc"[i - 1]})`;
    if (typeof t !== "string" || !t.trim()) fail(`${n}: prázdný text (${where})`);
    else {
      if (t !== t.trim() || /\s{2,}/.test(t)) fail(`${n}: nadbytečné mezery (${where})`);
      if (/\p{L}- \p{Ll}/u.test(t)) fail(`${n}: neopravené zalomení se spojovníkem (${where}): ${t.match(/\S+- \S+/u)?.[0]}`);
      if (/�/.test(t)) fail(`${n}: náhradní znak U+FFFD (${where})`);
    }
  }
  if (new Set(q.answers).size !== 3 && !KEPT_AS_IS.some((k) => k.num === n)) fail(`${n}: duplicitní odpovědi`);
  questions.push({
    num: n,
    section: section?.key,
    page: q.page,
    topic,
    group: mapping.groups[topic],
    image: Boolean(q.image),
    q: q.q,
    answers: q.answers,
    correct: q.correct,
  });
}

if (errors.length) {
  console.error(`CHYBA – ${errors.length} problémů:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

const meta = {
  title: "Soubor testových otázek pro teoretickou část zkoušky odborné způsobilosti a komisionální zkoušku",
  publisher: "Ministerstvo vnitra České republiky",
  version: "15. 12. 2025",
  validFrom: "2026-01-01",
  legalBasis: "§ 27 odst. 1 zákona č. 90/2024 Sb., o zbraních a střelivu",
  url: "https://mv.gov.cz/zbrojni-opravneni",
  pdfUrl: "https://mv.gov.cz/soubor/mv-soubor-testovych-otazek-pro-teoretickou-cast-zkousky-odborne-zpusobilosti-a-komisionalni-zkousku.aspx",
  pdfSha256: "edd539efc9e504f067d9f5b9409475935a08938c02fbb41c768b1a3f205a04a4",
  transcript: "https://github.com/zbrojak-2026/zbrojak-2026.github.io (data/questions.json)",
  transcriptSha256: sourceSha256,
  generator: "scripts/build-mv-questions.mjs",
  total: questions.length,
  withImage: questions.filter((q) => q.image).length,
  fixes: appliedFixes,
  keptAsIs: KEPT_AS_IS,
};

// Kompaktní, ale čitelný zápis: jedna otázka / oprava na řádek (přehledné diffy při nové verzi souboru).
const lines = (items, indent) => items.map((x) => `${indent}${JSON.stringify(x)}`).join(",\n");
const metaBody = Object.entries(meta)
  .map(([k, v]) =>
    Array.isArray(v) ? `    ${JSON.stringify(k)}: [\n${lines(v, "      ")}\n    ]` : `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`,
  )
  .join(",\n");
const body = ["{", '  "meta": {', metaBody, "  },", '  "questions": [', lines(questions, "    "), "  ]", "}", ""].join("\n");
writeFileSync(outPath, body);

const perTopic = {};
for (const q of questions) {
  const k = `${q.topic}${q.image ? " (s obrázkem)" : ""}`;
  perTopic[k] = (perTopic[k] ?? 0) + 1;
}
console.log(`Zdroj: ${srcPath} (SHA-256 ${sourceSha256})`);
console.log(`Zapsáno: ${outPath}`);
console.log(`Otázek: ${questions.length}, s obrázkem (v režimu vyřazeno): ${meta.withImage}, zařazeno: ${questions.length - meta.withImage}`);
console.log(`Opravy artefaktů převodu z PDF: ${appliedFixes.length}`);
for (const f of appliedFixes) console.log(`  [${f.kind}] č. ${f.num}, ${f.field}: „${f.from}“ → „${f.to}“`);
console.log(`Ponecháno beze změny (zvláštnosti zdroje): ${KEPT_AS_IS.length}`);
for (const k of KEPT_AS_IS) console.log(`  č. ${k.num}: ${k.note}`);
console.log("Otázek podle okruhu:", perTopic);
