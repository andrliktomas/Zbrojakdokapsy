import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAM, TOPICS } from "../content";
import {
  MV_ALL,
  MV_EXCLUDED,
  MV_FREE_NUMS,
  MV_GROUPS,
  MV_META,
  MV_QUESTIONS,
  MV_SECTIONS,
  MV_TOPIC_GROUP,
  MV_TOPIC_RANGES,
  buildMvTest,
  filterMv,
  isValidMvTest,
  mvById,
  mvPassScore,
} from "../content/mv";

const slugs = new Set(TOPICS.map((t) => t.slug));

/** Jednoduchý deterministický generátor pro opakovatelné testy. */
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32);
}

test("soubor MV: 837 otázek, čísla 1–837 bez duplicit", () => {
  assert.equal(MV_ALL.length, 837);
  assert.equal(MV_META.total, 837);
  const nums = MV_ALL.map((q) => q.num);
  assert.equal(new Set(nums).size, nums.length, "duplicitní čísla otázek");
  assert.deepEqual(nums, Array.from({ length: 837 }, (_, i) => i + 1));
});

test("každá otázka má 3 neprázdné odpovědi a platnou správnou odpověď", () => {
  const knownDuplicates = new Set([211]); // b) a c) jsou totožné už ve zdroji (meta.keptAsIs)
  for (const q of MV_ALL) {
    assert.equal(q.answers.length, 3, `č. ${q.num}`);
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 3, `č. ${q.num}: správná ${q.correct}`);
    for (const t of [q.q, ...q.answers]) {
      assert.equal(typeof t, "string");
      assert.ok(t.trim().length > 0, `č. ${q.num}: prázdný text`);
      assert.equal(t, t.trim(), `č. ${q.num}: mezery na okraji`);
    }
    if (!knownDuplicates.has(q.num)) assert.equal(new Set(q.answers).size, 3, `č. ${q.num}: duplicitní odpovědi`);
  }
  assert.ok(MV_META.keptAsIs.some((k) => k.num === 211));
});

test("v textu nezůstaly artefakty převodu z PDF", () => {
  const leftovers = /\p{L}- \p{Ll}|�|\b(?:tim|timto|zatimco|odněti|nabyti|rozhodnutim|použitim|uplynutim)\b/u;
  for (const q of MV_ALL) {
    for (const t of [q.q, ...q.answers]) assert.ok(!leftovers.test(t), `č. ${q.num}: ${t.match(leftovers)?.[0]}`);
  }
  assert.ok(MV_META.fixes.length > 0 && MV_META.fixes.every((f) => f.from !== f.to));
});

test("mapování na okruhy pokrývá 1–837 bez mezer a překryvů", () => {
  const ranges = [...MV_TOPIC_RANGES].sort((a, b) => a.from - b.from);
  assert.equal(ranges[0].from, 1);
  assert.equal(ranges.at(-1)!.to, 837);
  for (let i = 1; i < ranges.length; i++) assert.equal(ranges[i].from, ranges[i - 1].to + 1, `mezera/překryv u ${ranges[i].from}`);
  for (const r of ranges) assert.ok(slugs.has(r.topic), `neznámý okruh ${r.topic}`);
  const sections = [...MV_SECTIONS].sort((a, b) => a.from - b.from);
  assert.equal(sections[0].from, 1);
  assert.equal(sections.at(-1)!.to, 837);
  for (let i = 1; i < sections.length; i++) assert.equal(sections[i].from, sections[i - 1].to + 1);
});

test("každá zařazená otázka má okruh a skupinu testu podle mapování a EXAM.groups", () => {
  for (const q of MV_ALL) {
    const range = MV_TOPIC_RANGES.find((r) => q.num >= r.from && q.num <= r.to);
    assert.ok(range, `č. ${q.num}: bez okruhu`);
    assert.equal(q.topic, range.topic, `č. ${q.num}: okruh neodpovídá mapování`);
    const section = MV_SECTIONS.find((s) => q.num >= s.from && q.num <= s.to);
    assert.equal(q.section, section?.key, `č. ${q.num}: oddíl`);
    assert.equal(q.group, MV_TOPIC_GROUP[q.topic], `č. ${q.num}: skupina`);
  }
  // Skupiny MV odpovídají skladbě zkoušky v src/content/exam.ts.
  assert.equal(MV_GROUPS.length, EXAM.groups.length);
  MV_GROUPS.forEach((g, i) => {
    assert.equal(g.count, EXAM.groups[i].count);
    for (const slug of EXAM.groups[i].topics) assert.equal(MV_TOPIC_GROUP[slug], g.key, `okruh ${slug} ve skupině ${g.key}`);
  });
  assert.equal(Object.keys(MV_TOPIC_GROUP).length, TOPICS.length);
});

test("otázky s obrázkem MV jsou z režimu vyřazené", () => {
  assert.equal(MV_EXCLUDED.length, 71);
  assert.equal(MV_META.withImage, 71);
  assert.equal(MV_QUESTIONS.length, 837 - 71);
  assert.ok(MV_QUESTIONS.every((q) => !q.image));
  assert.ok(MV_EXCLUDED.every((q) => mvById(`mv-${q.num}`) === undefined), "obrázková otázka dostupná přes mvById");
  for (const n of MV_FREE_NUMS) assert.ok(!MV_ALL[n - 1].image);
  assert.deepEqual([...MV_FREE_NUMS], Array.from({ length: 20 }, (_, i) => i + 1));
});

test("test nanečisto z otázek MV: náhodný, 30 otázek ve skladbě 17/5/5/3 bez obrázků", () => {
  for (const g of MV_GROUPS) {
    const available = MV_QUESTIONS.filter((q) => q.group === g.key).length;
    assert.ok(available >= g.count * 2, `málo otázek pro ${g.key}: ${available}`);
  }
  const seen = new Set<string>();
  for (let seed = 1; seed <= 25; seed++) {
    const t = buildMvTest(seeded(seed));
    assert.equal(t.length, 30);
    assert.ok(isValidMvTest(t.map((q) => q.num)));
    assert.ok(t.every((q) => !q.image));
    seen.add(t.map((q) => q.num).join());
  }
  assert.ok(seen.size > 20, "testy se neliší");
  assert.ok(!isValidMvTest(MV_QUESTIONS.slice(0, 30).map((q) => q.num)), "skladba jen z práva projít nesmí");
  assert.ok(!isValidMvTest([...MV_EXCLUDED.slice(0, 30).map((q) => q.num)]));
  assert.equal(mvPassScore("obecne"), 26);
  assert.equal(mvPassScore("rozsirene"), 28);
});

test("vyhledávání nezávisí na diakritice", () => {
  assert.ok(filterMv({ query: "zaruceno ustavou" }).some((q) => q.num === 1));
  assert.ok(filterMv({ query: "ZARUČENO" }).some((q) => q.num === 1));
  assert.ok(filterMv({ section: "V" }).every((q) => q.topic === "zdravoveda"));
  assert.equal(filterMv({ section: "V" }).length, 38);
});
