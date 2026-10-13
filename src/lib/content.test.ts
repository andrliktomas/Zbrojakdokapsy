import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAM, FLASHCARDS, GLOSSARY, LESSONS, QUESTIONS, TOPICS } from "../content";

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
