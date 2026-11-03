import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAM, FLASHCARDS, GLOSSARY, LESSONS, QUESTIONS, TOPICS } from "../content";
import type { FigureRef } from "../content/types";
import { FIGURE_CATALOG, FIGURE_IDS, figureMeta } from "../components/figures/catalog";
import { QUESTION_FIGURES } from "../components/figures/question-figures";

const slugs = new Set(TOPICS.map((t) => t.slug));

test("všechna ID jsou unikátní", () => {
  for (const [name, items] of [["otázky", QUESTIONS], ["kartičky", FLASHCARDS], ["lekce", LESSONS]] as const) {
    const ids = items.map((i) => i.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepEqual(dup, [], `duplicitní ${name}: ${dup.join(", ")}`);
  }
});

test("obsah odkazuje jen na existující okruhy", () => {
  for (const item of [...QUESTIONS, ...FLASHCARDS, ...LESSONS, ...GLOSSARY]) {
    assert.ok(slugs.has(item.topic), `neznámý okruh ${item.topic}`);
  }
});

test("otázky mají 3 možnosti a platnou správnou odpověď", () => {
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 3, q.id);
    assert.ok(q.correct >= 0 && q.correct < q.options.length, q.id);
    assert.equal(new Set(q.options).size, q.options.length, `duplicitní možnosti v ${q.id}`);
    assert.ok(q.explanation.length > 10, `chybí vysvětlení u ${q.id}`);
  }
});

test("každý okruh má výklad, kartičky i otázky", () => {
  for (const t of TOPICS) {
    assert.ok(LESSONS.some((l) => l.topic === t.slug), `bez výkladu: ${t.slug}`);
    assert.ok(FLASHCARDS.some((c) => c.topic === t.slug), `bez kartiček: ${t.slug}`);
    assert.ok(QUESTIONS.some((q) => q.topic === t.slug), `bez otázek: ${t.slug}`);
  }
});

test("banka otázek pokryje skladbu testu nanečisto", () => {
  for (const g of EXAM.groups) {
    const available = QUESTIONS.filter((q) => g.topics.includes(q.topic)).length;
    assert.ok(available >= g.count * 2, `málo otázek pro ${g.topics.join("/")}: ${available}`);
  }
  assert.equal(EXAM.groups.reduce((a, g) => a + g.count, 0), EXAM.questionCount);
  assert.equal(EXAM.passScore(30, "obecne"), 26);
  assert.equal(EXAM.passScore(30, "rozsirene"), 28);
});

// --- Schematické obrázky (src/components/figures) ---

const figureRefs: { where: string; ref: FigureRef }[] = [
  ...LESSONS.flatMap((l) => l.sections.flatMap((s) => (s.figure ? [{ where: `${l.id} / ${s.heading}`, ref: s.figure }] : []))),
  ...QUESTIONS.flatMap((q) => (q.figure ? [{ where: q.id, ref: q.figure }] : [])),
];

test("katalog obrázků: čísla a klíče součástí jsou jednoznačné, odkazy leží v obrázku", () => {
  for (const id of FIGURE_IDS) {
    const meta = FIGURE_CATALOG[id];
    const keys = meta.parts.map((p) => p.key);
    assert.equal(new Set(keys).size, keys.length, `duplicitní klíč součásti v ${id}`);
    assert.deepEqual(meta.parts.map((p) => p.n).sort((a, b) => a - b), meta.parts.map((_, i) => i + 1), `čísla v ${id} nejdou 1..n`);
    for (const p of meta.parts) {
      for (const [x, y] of [p.at, p.pos]) {
        assert.ok(x >= 0 && x <= meta.width && y >= 0 && y <= meta.height, `${id}/${p.key}: bod mimo viewBox`);
      }
    }
  }
});

test("obsah odkazuje jen na existující obrázky a součásti", () => {
  assert.ok(figureRefs.length > 0, "žádný obsah nepoužívá obrázky");
  for (const { where, ref } of figureRefs) {
    const meta = figureMeta(ref.id);
    assert.ok(meta, `${where}: neznámý obrázek ${ref.id}`);
    if (ref.highlight) assert.ok(meta.parts.some((p) => p.key === ref.highlight), `${where}: neznámá součást ${ref.highlight}`);
    if (ref.callouts === "highlight") assert.ok(ref.highlight, `${where}: šipka bez zvýrazněné součásti`);
  }
});

test("mapa obrázků pro klienta odpovídá otázkám", () => {
  const fromContent = Object.fromEntries(QUESTIONS.filter((q) => q.figure).map((q) => [q.id, q.figure]));
  assert.deepEqual(QUESTION_FIGURES, fromContent);
});

test("číselné možnosti obrázkových otázek odkazují na čísla v obrázku", () => {
  for (const q of QUESTIONS) {
    if (!q.figure || (q.figure.callouts ?? "all") !== "all") continue;
    const meta = figureMeta(q.figure.id)!;
    const numbers = new Set(meta.parts.map((p) => p.n));
    for (const opt of q.options) {
      if (!/^[\d\s,a]+$/.test(opt)) continue;
      for (const n of opt.match(/\d+/g) ?? []) assert.ok(numbers.has(Number(n)), `${q.id}: číslo ${n} v obrázku není`);
    }
  }
});
