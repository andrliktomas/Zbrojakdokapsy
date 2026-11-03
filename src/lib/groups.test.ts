import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACTIVATION_CODE_LENGTH,
  CODE_ALPHABET,
  JOIN_CODE_LENGTH,
  REDEEM_LIMITS,
  codeEntropyBits,
  formatCode,
  isWellFormedCode,
  normalizeCode,
  randomCode,
  randomCodes,
  rateLimitStatus,
} from "./codes";
import {
  EXAM_SECTIONS,
  accuracyTone,
  activityLabel,
  allowedAfterRegisterPath,
  bestTestByPermit,
  groupNameError,
  latestDate,
  normalizeGroupName,
  redeemDecision,
  seatSummary,
  sectionAccuracy,
  sectionOfTopic,
} from "./groups";
import { EXAM } from "../content/exam";
import { PLANS, SEAT_PACKAGES, getPlan, getPurchasablePlan, getSeatPackage, pricePerSeat } from "./plans";

// --- Generování kódů ---

test("randomCode používá jen povolenou abecedu a správnou délku", () => {
  for (let i = 0; i < 200; i++) {
    const code = randomCode(ACTIVATION_CODE_LENGTH);
    assert.equal(code.length, ACTIVATION_CODE_LENGTH);
    assert.ok(isWellFormedCode(code, ACTIVATION_CODE_LENGTH), code);
  }
  // deterministický generátor pro kontrolu mapování
  assert.equal(randomCode(4, () => 0), "2222");
  assert.equal(randomCode(3, (max) => max - 1), "ZZZ");
});

test("abeceda neobsahuje snadno zaměnitelné znaky", () => {
  for (const ch of "01OIL") assert.ok(!CODE_ALPHABET.includes(ch), ch);
  assert.equal(new Set(CODE_ALPHABET).size, CODE_ALPHABET.length);
});

test("aktivační kódy jsou dost dlouhé, aby nešly uhodnout", () => {
  assert.ok(codeEntropyBits(ACTIVATION_CODE_LENGTH) >= 58);
  assert.ok(codeEntropyBits(JOIN_CODE_LENGTH) >= 39);
});

test("randomCodes vrací požadovaný počet různých kódů", () => {
  const codes = randomCodes(50);
  assert.equal(codes.length, 50);
  assert.equal(new Set(codes).size, 50);
  // i při kolizích generátoru (opakující se hodnoty) skončí s unikátními kódy
  let n = 0;
  const flaky = (max: number) => Math.floor(n++ / 8) % max;
  assert.equal(new Set(randomCodes(3, 4, flaky)).size, 3);
});

test("normalizace a formátování kódu", () => {
  assert.equal(normalizeCode(" abcd-efgh jkmn "), "ABCDEFGHJKMN");
  assert.equal(normalizeCode("abcd–efgh.jkmn"), "ABCDEFGHJKMN");
  assert.equal(formatCode("ABCDEFGHJKMN"), "ABCD-EFGH-JKMN");
  assert.equal(formatCode("ABCDEFGH"), "ABCD-EFGH");
  assert.ok(isWellFormedCode(normalizeCode("abcd-efgh-jkmn"), 12));
  assert.ok(!isWellFormedCode("ABCDEFGHJKM0", 12), "nula není v abecedě");
  assert.ok(!isWellFormedCode("ABCDEFGHJKM", 12), "krátký kód");
  assert.ok(!isWellFormedCode("abcdefghjkmn", 12), "malá písmena se musí nejdřív normalizovat");
});

// --- Omezení pokusů ---

test("rateLimitStatus – posuvné okno", () => {
  const now = new Date("2026-11-03T12:00:00Z");
  const min = (m: number) => new Date(now.getTime() - m * 60_000);
  const limit = { max: 3, windowMs: 15 * 60_000 };
  assert.equal(rateLimitStatus([min(1), min(2)], now, limit).limited, false);
  const blocked = rateLimitStatus([min(1), min(2), min(10)], now, limit);
  assert.equal(blocked.limited, true);
  assert.equal(blocked.retryAfterSec, 5 * 60); // nejstarší (před 10 min) vypadne za 5 min
  // pokusy mimo okno se nepočítají
  assert.equal(rateLimitStatus([min(1), min(2), min(20)], now, limit).limited, false);
  assert.ok(REDEEM_LIMITS.user.max <= 10 && REDEEM_LIMITS.ip.max >= REDEEM_LIMITS.user.max);
});

// --- Místa a uplatnění kódu ---

test("seatSummary počítá volná a použitá místa", () => {
  const d = new Date();
  assert.deepEqual(seatSummary([]), { total: 0, redeemed: 0, available: 0 });
  assert.deepEqual(seatSummary([{ redeemedAt: d }, { redeemedAt: null }, { redeemedAt: null }]), { total: 3, redeemed: 1, available: 2 });
});

test("redeemDecision", () => {
  assert.equal(redeemDecision(null, "u1"), "not_found");
  assert.equal(redeemDecision({ redeemedById: null }, "u1"), "ok");
  assert.equal(redeemDecision({ redeemedById: "u1" }, "u1"), "already_yours");
  assert.equal(redeemDecision({ redeemedById: "u2" }, "u1"), "used");
});

test("balíčky míst: množstevní sleva a platné balíčky přístupu", () => {
  const retail = (id: string) => PLANS.find((p) => p.id === id)!.priceCzk;
  let prev = Infinity;
  for (const pkg of [...SEAT_PACKAGES].sort((a, b) => a.seats - b.seats)) {
    assert.ok(getPurchasablePlan(pkg.planId), `balíček ${pkg.id} odkazuje na neexistující plán`);
    const per = pricePerSeat(pkg);
    assert.ok(per < retail(pkg.planId), `${pkg.id}: cena za místo musí být nižší než běžná`);
    assert.ok(per < prev, `${pkg.id}: větší balíček musí být levnější za místo`);
    prev = per;
  }
  assert.deepEqual(SEAT_PACKAGES.map((p) => p.seats), [10, 20, 50]);
  assert.equal(getSeatPackage("seats10")?.seats, 10);
  assert.equal(getSeatPackage("neexistuje"), undefined);
});

test("interní bonusové balíčky nejdou koupit, ale mají název", () => {
  assert.equal(getPurchasablePlan("bonus_referrer"), undefined);
  assert.equal(getPlan("bonus_referrer")?.name, "Bonus za doporučení");
  assert.equal(getPurchasablePlan("1m")?.id, "1m");
});

// --- Pokrok studentů ---

test("části zkoušky pokrývají skladbu testu 17/5/5/3", () => {
  assert.deepEqual(EXAM_SECTIONS.map((s) => s.examQuestions), [17, 5, 5, 3]);
  const all = EXAM.groups.flatMap((g) => g.topics);
  for (const t of all) assert.ok(sectionOfTopic(t), `okruh ${t} nepatří do žádné části`);
  assert.equal(sectionOfTopic("trestni-pravo"), "pravo");
  assert.equal(sectionOfTopic("bezpecna-manipulace"), "bezpecnost");
  assert.equal(sectionOfTopic("neznamy"), null);
});

test("sectionAccuracy sčítá okruhy do částí zkoušky", () => {
  const s = sectionAccuracy([
    { topic: "zaklady", correct: true, count: 6 },
    { topic: "strelnice", correct: true, count: 2 },
    { topic: "kategorie", correct: false, count: 2 },
    { topic: "zdravoveda", correct: false, count: 1 },
    { topic: "neznamy", correct: true, count: 99 },
  ]);
  assert.deepEqual(s.pravo, { answered: 10, correct: 8, accuracy: 0.8 });
  assert.deepEqual(s.zdravoveda, { answered: 1, correct: 0, accuracy: 0 });
  assert.equal(s.nauka.accuracy, null);
});

test("accuracyTone – hranice podle zkoušky, z pár odpovědí nic", () => {
  assert.equal(accuracyTone(null), "none");
  assert.equal(accuracyTone(0.95, 3), "none");
  assert.equal(accuracyTone(0.9, 20), "good");
  assert.equal(accuracyTone(0.75, 20), "ok");
  assert.equal(accuracyTone(0.5, 20), "weak");
});

test("bestTestByPermit vybírá nejlepší výsledek pro každý typ oprávnění", () => {
  const t = (score: number, total: number, passed: boolean, permitType: string, day: number) => ({
    score, total, passed, permitType, createdAt: new Date(2026, 10, day),
  });
  const best = bestTestByPermit([
    t(22, 30, false, "obecne", 1),
    t(27, 30, true, "obecne", 2),
    t(25, 30, false, "obecne", 3),
    t(27, 30, false, "rozsirene", 4),
  ]);
  assert.deepEqual(best.obecne, { score: 27, total: 30, passed: true, attempts: 3, passedCount: 1 });
  assert.equal(best.rozsirene?.passed, false);
  assert.equal(bestTestByPermit([]).obecne, null);
});

test("activityLabel a latestDate (pražský čas)", () => {
  const now = new Date("2026-11-03T10:00:00Z");
  assert.equal(activityLabel(null, now), "zatím žádná");
  assert.equal(activityLabel(new Date("2026-11-03T06:00:00Z"), now), "dnes");
  assert.equal(activityLabel(new Date("2026-11-02T23:30:00Z"), now), "dnes"); // 0:30 v Praze → už 3. 11.
  assert.equal(activityLabel(new Date("2026-11-02T22:30:00Z"), now), "včera"); // 23:30 v Praze → ještě 2. 11.
  assert.equal(activityLabel(new Date("2026-11-02T12:00:00Z"), now), "včera");
  assert.equal(activityLabel(new Date("2026-10-30T12:00:00Z"), now), "před 4 dny");
  assert.match(activityLabel(new Date("2026-08-01T12:00:00Z"), now), /2026/);
  const a = new Date(1), b = new Date(2);
  assert.equal(latestDate([a, null, b, undefined]), b);
  assert.equal(latestDate([]), null);
});

test("název skupiny", () => {
  assert.equal(normalizeGroupName("  Kurz   Brno \n listopad "), "Kurz Brno listopad");
  assert.ok(groupNameError("ab"));
  assert.ok(groupNameError("x".repeat(81)));
  assert.equal(groupNameError("Kurz Střelnice X – listopad"), null);
});

test("cíl po registraci propustí jen povolené interní cesty", () => {
  assert.equal(allowedAfterRegisterPath("/skupina/pripojit/ABCD2345"), "/skupina/pripojit/ABCD2345");
  assert.equal(allowedAfterRegisterPath("/aktivovat?kod=ABCDEFGHJKMN"), "/aktivovat?kod=ABCDEFGHJKMN");
  assert.equal(allowedAfterRegisterPath("/aktivovat"), "/aktivovat");
  for (const bad of ["//evil.example", "/\\evil.example", "https://evil.example", "/prehled", "/skupina/pripojit/../../ucet", "/aktivovat?kod=x&next=//e", null, ""]) {
    assert.equal(allowedAfterRegisterPath(bad), null, String(bad));
  }
});
