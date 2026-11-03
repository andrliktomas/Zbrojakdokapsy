import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ALLOWED_ANNEX_POINTS,
  ALLOWED_MV_QUESTIONS,
  ALLOWED_NV_PARAGRAPHS,
  FAULT_SCENARIOS,
  PRACTICAL_OVERVIEW,
  PROCEDURES,
  TRAINER_XP,
  VIOLATION_SCENARIOS,
  WEAPONS,
  gradeFault,
  gradeOrder,
  gradeViolation,
  isFreeItem,
  orderXp,
  trainerView,
  type SourceRef,
} from "../content/trainer";
import { compressNumbers, formatSources, seededRandom, shuffleChanged } from "../components/trainer/util";

const weaponIds = new Set(WEAPONS.map((w) => w.id));

function allIds() {
  return [
    ...WEAPONS.map((w) => w.id),
    ...PROCEDURES.flatMap((p) => [p.id, ...p.steps.map((s) => s.id)]),
    ...FAULT_SCENARIOS.flatMap((s) => [s.id, ...s.steps.flatMap((st) => [st.id, ...st.options.map((o) => o.id)])]),
    ...VIOLATION_SCENARIOS.flatMap((s) => [s.id, ...s.actions.map((a) => a.id)]),
  ];
}

/** Všechny odkazy na zdroje s popisem, odkud pochází (pro srozumitelné chybové hlášky). */
function allSourceLists(): [string, SourceRef[]][] {
  return [
    ...WEAPONS.map((w) => [`zbraň ${w.id}`, w.sources] as [string, SourceRef[]]),
    ...PRACTICAL_OVERVIEW.map((n, i) => [`přehled ${i}`, n.sources] as [string, SourceRef[]]),
    ...PROCEDURES.flatMap((p) => [
      ...p.steps.map((s) => [`krok ${s.id}`, s.sources] as [string, SourceRef[]]),
      ...p.notes.map((n, i) => [`poznámka ${p.id}/${i}`, n.sources] as [string, SourceRef[]]),
    ]),
    ...FAULT_SCENARIOS.flatMap((s) => [
      [`závada ${s.id}`, s.sources] as [string, SourceRef[]],
      ...s.steps.flatMap((st) => st.options.map((o) => [`možnost ${o.id}`, o.sources] as [string, SourceRef[]])),
    ]),
    ...VIOLATION_SCENARIOS.flatMap((s) => [
      [`situace ${s.id}`, s.sources] as [string, SourceRef[]],
      ...s.actions.map((a) => [`jednání ${a.id}`, a.sources] as [string, SourceRef[]]),
    ]),
  ];
}

test("trenažér: všechna ID jsou unikátní", () => {
  const ids = allIds();
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepEqual(dup, [], `duplicitní ID: ${dup.join(", ")}`);
});

test("trenažér: každá položka má zdroj a odkazy míří jen na povolená ustanovení a otázky MV", () => {
  for (const [where, refs] of allSourceLists()) {
    assert.ok(refs.length > 0, `chybí zdroj: ${where}`);
    for (const ref of refs) {
      if ("mv" in ref) {
        assert.ok(ref.mv.length > 0, `prázdný odkaz na MV: ${where}`);
        for (const n of ref.mv) assert.ok(ALLOWED_MV_QUESTIONS.has(n), `nepovolená otázka MV ${n}: ${where}`);
      } else {
        const para = /^§ (\d+)/.exec(ref.nv);
        const annex = /^příloha č\. 2 bod (\d(?:\.\d)?)/.exec(ref.nv);
        assert.ok(para || annex, `neznámý formát odkazu „${ref.nv}“: ${where}`);
        if (para) assert.ok(ALLOWED_NV_PARAGRAPHS.includes(Number(para[1])), `nepovolený § ${para[1]}: ${where}`);
        if (annex) assert.ok(ALLOWED_ANNEX_POINTS.includes(annex[1]), `neexistující bod přílohy ${annex[1]}: ${where}`);
      }
    }
  }
});

test("trenažér: každý postup se zbraní odkazuje na bod 2.2 přílohy č. 2", () => {
  for (const [where, refs] of allSourceLists().filter(([w]) => w.startsWith("krok ") && !w.endsWith("-smer"))) {
    assert.ok(
      refs.some((r) => "nv" in r && r.nv.startsWith("příloha č. 2 bod 2.2")),
      `krok bez odkazu na bod 2.2: ${where}`,
    );
  }
});

test("trenažér: ke každé zbrani ze zkoušky existuje postup kontroly", () => {
  assert.equal(WEAPONS.length, 4);
  for (const w of WEAPONS) {
    assert.equal(PROCEDURES.filter((p) => p.weapon === w.id).length, 1, `postup pro ${w.id}`);
  }
  for (const p of PROCEDURES) {
    assert.ok(weaponIds.has(p.weapon), `neznámá zbraň ${p.weapon}`);
    assert.ok(p.steps.length >= 3, `málo kroků v ${p.id}`);
    assert.equal(new Set(p.steps.map((s) => s.text)).size, p.steps.length, `duplicitní text kroku v ${p.id}`);
    assert.ok(p.steps[0].id.endsWith("-smer"), `${p.id} musí začínat bezpečným směrem`);
    for (const s of p.steps) assert.ok(s.why.length > 20, `chybí vysvětlení u ${s.id}`);
  }
});

test("trenažér: zásobník se vyjímá dřív než manipulace se závěrem", () => {
  for (const p of PROCEDURES.filter((p) => p.weapon !== "revolver")) {
    const mag = p.steps.findIndex((s) => s.id.endsWith("-zasobnik"));
    const bolt = p.steps.findIndex((s) => /závěr/.test(s.text));
    assert.ok(mag > 0 && mag < bolt, `${p.id}: zásobník musí jít ven před závěrem`);
  }
});

test("trenažér: každý krok závady má právě jednu správnou možnost", () => {
  for (const s of FAULT_SCENARIOS) {
    assert.ok(weaponIds.has(s.weapon), `neznámá zbraň v ${s.id}`);
    assert.ok(s.steps.length >= 2, `krátký postup ${s.id}`);
    for (const st of s.steps) {
      assert.ok(st.options.length >= 3, `málo možností v ${st.id}`);
      assert.equal(st.options.filter((o) => o.correct).length, 1, `počet správných možností v ${st.id}`);
      assert.equal(new Set(st.options.map((o) => o.text)).size, st.options.length, `duplicitní možnost v ${st.id}`);
      for (const o of st.options) {
        assert.ok(o.explanation.length > 20, `chybí vysvětlení u ${o.id}`);
        assert.ok(!(o.correct && o.fatal), `správná možnost nemůže být fatální: ${o.id}`);
      }
      // Správná odpověď nesmí být v datech vždy na stejném místě (klient sice míchá, ale i tak).
    }
    const positions = new Set(s.steps.map((st) => st.options.findIndex((o) => o.correct)));
    assert.ok(s.steps.length < 2 || positions.size > 1, `správná odpověď je v ${s.id} vždy na stejném místě`);
  }
});

test("trenažér: selhač vyžaduje odpočet nejméně 10 sekund hned po prvním kroku", () => {
  const selhace = FAULT_SCENARIOS.filter((s) => s.kind === "selhac");
  assert.ok(selhace.length >= 1);
  for (const s of selhace) {
    assert.ok((s.steps[0].waitSecondsAfter ?? 0) >= 10, `${s.id}: chybí čekání 10 s`);
    assert.ok(s.steps[0].waitText, `${s.id}: chybí text k čekání`);
    const correct = s.steps[0].options.find((o) => o.correct)!;
    assert.match(correct.text, /10 sekund/, `${s.id}: správná odpověď musí zmínit 10 sekund`);
  }
  for (const kind of ["selhac", "slaba-rana", "zadrzka"] as const) {
    assert.ok(FAULT_SCENARIOS.some((s) => s.kind === kind), `chybí závada ${kind}`);
  }
});

test("trenažér: každá situace „Co je špatně?“ má právě jedno chybné jednání", () => {
  for (const s of VIOLATION_SCENARIOS) {
    assert.ok(weaponIds.has(s.weapon), `neznámá zbraň v ${s.id}`);
    assert.ok(s.actions.length >= 3, `málo jednání v ${s.id}`);
    assert.equal(s.actions.filter((a) => a.violation).length, 1, `počet porušení v ${s.id}`);
    assert.match(s.verdict, /§ 19 odst\. 2/, `${s.id}: verdikt musí odkazovat na § 19 odst. 2`);
    for (const a of s.actions) assert.ok(a.explanation.length > 20, `chybí vysvětlení u ${a.id}`);
  }
});

test("trenažér: pistole je ukázka zdarma v každém režimu, zbytek je placený", () => {
  for (const list of [PROCEDURES, FAULT_SCENARIOS, VIOLATION_SCENARIOS]) {
    assert.ok(list.some(isFreeItem), "každý režim má ukázku zdarma");
    assert.ok(list.some((i) => !isFreeItem(i)), "každý režim má placený obsah");
    for (const item of list) assert.equal(isFreeItem(item), item.weapon === "pistole", item.id);
  }
});

test("trenažér: zamčené položky neposílají klientovi kroky ani odpovědi", () => {
  const free = trainerView(false);
  for (const item of [...free.procedures, ...free.faults, ...free.violations]) {
    if (item.weapon === "pistole") {
      assert.equal(item.locked, false, item.id);
      assert.equal(item.free, true, item.id);
    } else {
      assert.equal(item.locked, true, item.id);
      assert.deepEqual(Object.keys(item).sort(), ["free", "id", "locked", "title", "weapon"], item.id);
    }
  }
  const paid = trainerView(true);
  assert.ok([...paid.procedures, ...paid.faults, ...paid.violations].every((i) => !i.locked));
});

test("trenažér: vyhodnocení pořadí kroků", () => {
  const p = PROCEDURES[0];
  const ids = p.steps.map((s) => s.id);
  const perfect = gradeOrder(p, ids);
  assert.ok(perfect.valid && perfect.perfect);
  assert.equal(perfect.correctCount, ids.length);
  assert.equal(orderXp(perfect), TRAINER_XP.orderPerfect);

  // Závěr před zásobníkem: dvě pozice špatně.
  const swapped = [...ids];
  [swapped[1], swapped[2]] = [swapped[2], swapped[1]];
  const g = gradeOrder(p, swapped);
  assert.ok(g.valid && !g.perfect);
  assert.equal(g.correctCount, ids.length - 2);
  assert.deepEqual(g.positions.filter((x) => !x.correct).map((x) => x.expectedId), [ids[1], ids[2]]);
  assert.equal(orderXp(g), TRAINER_XP.orderDone);

  for (const bad of [ids.slice(1), [...ids, ids[0]], [ids[0], ids[0], ...ids.slice(2)], [...ids.slice(1), "cizi-krok"]]) {
    const r = gradeOrder(p, bad);
    assert.equal(r.valid, false);
    assert.equal(orderXp(r), 0);
  }
});

test("trenažér: vyhodnocení závad a situací", () => {
  const s = FAULT_SCENARIOS[0];
  const right = s.steps.map((st) => st.options.find((o) => o.correct)!.id);
  assert.deepEqual(gradeFault(s, right), { valid: true, correctSteps: s.steps.length, total: s.steps.length, perfect: true });
  const firstWrong = [s.steps[0].options.find((o) => !o.correct)!.id, ...right.slice(1)];
  assert.equal(gradeFault(s, firstWrong).perfect, false);
  assert.equal(gradeFault(s, right.slice(1)).valid, false);
  assert.equal(gradeFault(s, [...right.slice(0, -1), "neexistuje"]).valid, false);

  const v = VIOLATION_SCENARIOS[0];
  assert.deepEqual(gradeViolation(v, v.actions.find((a) => a.violation)!.id), { valid: true, correct: true });
  assert.deepEqual(gradeViolation(v, v.actions.find((a) => !a.violation)!.id), { valid: true, correct: false });
  assert.equal(gradeViolation(v, "neexistuje").valid, false);
});

test("trenažér: míchání kroků je deterministické a nikdy nevrátí správné pořadí", () => {
  const ids = PROCEDURES[0].steps.map((s) => s.id);
  for (let seed = 0; seed < 200; seed++) {
    const a = shuffleChanged(ids, seededRandom(seed));
    const b = shuffleChanged(ids, seededRandom(seed));
    assert.deepEqual(a, b);
    assert.notDeepEqual(a, ids);
    assert.deepEqual([...a].sort(), [...ids].sort());
  }
});

test("trenažér: formátování zdrojů", () => {
  assert.equal(compressNumbers([578, 576, 577, 580, 586, 587]), "576–578, 580, 586, 587");
  assert.equal(
    formatSources([{ nv: "příloha č. 2 bod 3.2 písm. a) odst. 1" }, { mv: [586] }]),
    "NV č. 238/2025 Sb., příloha č. 2 bod 3.2 písm. a) odst. 1 · soubor otázek MV, ot. č. 586",
  );
});
