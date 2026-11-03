import { test } from "node:test";
import assert from "node:assert/strict";
import {
  REFERRAL,
  attributionRejection,
  canonicalEmail,
  isPlausibleReferralCode,
  isQualifyingProvider,
  referralStats,
  rewardDecision,
  rewardMonth,
} from "./referral";
import { REFERRAL_CODE_LENGTH, randomCode } from "./codes";
import { getPlan, getPurchasablePlan } from "./plans";

test("bonusové balíčky existují a mají 7 dní", () => {
  assert.equal(REFERRAL.referrerBonusDays, 7);
  assert.equal(REFERRAL.referredBonusDays, 7);
  assert.equal(getPlan(REFERRAL.referrerPlanId)?.days, 7);
  assert.equal(getPlan(REFERRAL.referredPlanId)?.days, 7);
  assert.equal(getPurchasablePlan(REFERRAL.referredPlanId), undefined, "bonus nejde koupit");
});

test("canonicalEmail odhalí varianty stejné schránky", () => {
  assert.equal(canonicalEmail("Jan.Novak+zbrojak@Gmail.com"), "jannovak@gmail.com");
  assert.equal(canonicalEmail("jannovak@googlemail.com"), "jannovak@gmail.com");
  assert.equal(canonicalEmail("jan.novak+x@seznam.cz"), "jan.novak@seznam.cz"); // tečky mimo Gmail jsou významné
  assert.notEqual(canonicalEmail("jan.novak@seznam.cz"), canonicalEmail("jannovak@seznam.cz"));
});

test("attributionRejection – žádné doporučení sebe sama", () => {
  const base = { referrerId: "a", referredId: "b", referrerEmail: "petr@seznam.cz", referredEmail: "jana@seznam.cz" };
  assert.equal(attributionRejection(base), null);
  assert.equal(attributionRejection({ ...base, referredId: "a" }), "self");
  assert.equal(attributionRejection({ ...base, referrerEmail: "p.etr@gmail.com", referredEmail: "petr+2@gmail.com" }), "same_email");
});

test("rewardDecision – měsíční limit odměn", () => {
  assert.equal(rewardDecision(0), "rewarded");
  assert.equal(rewardDecision(REFERRAL.monthlyRewardLimit - 1), "rewarded");
  assert.equal(rewardDecision(REFERRAL.monthlyRewardLimit), "capped");
  assert.equal(rewardDecision(2, 2), "capped");
});

test("rewardMonth počítá kalendářní měsíc v pražském čase", () => {
  assert.equal(rewardMonth(new Date("2026-11-15T12:00:00Z")), "2026-11");
  // 31. 10. 23:30 UTC = 1. 11. 0:30 v Praze (zimní čas)
  assert.equal(rewardMonth(new Date("2026-10-31T23:30:00Z")), "2026-11");
  // 31. 7. 22:30 UTC = 1. 8. 0:30 v Praze (letní čas)
  assert.equal(rewardMonth(new Date("2026-07-31T22:30:00Z")), "2026-08");
  assert.equal(rewardMonth(new Date("2026-07-31T21:30:00Z")), "2026-07");
});

test("odměnu spouští jen skutečná aktivace přístupu, ne bonusy", () => {
  assert.ok(isQualifyingProvider("stripe"));
  assert.ok(isQualifyingProvider("dev"));
  assert.ok(isQualifyingProvider("code"));
  assert.ok(!isQualifyingProvider("referral"), "bonus nesmí spustit další odměnu (řetězení)");
  assert.ok(!isQualifyingProvider(""));
});

test("referralStats", () => {
  const now = new Date("2026-11-03T12:00:00Z");
  const s = referralStats(
    [
      { status: "pending", rewardMonth: null },
      { status: "rewarded", rewardMonth: "2026-11" },
      { status: "rewarded", rewardMonth: "2026-10" },
      { status: "capped", rewardMonth: "2026-11" },
    ],
    now,
  );
  assert.deepEqual(s, { registered: 4, activated: 3, rewarded: 2, daysEarned: 14, rewardsLeftThisMonth: REFERRAL.monthlyRewardLimit - 1 });
  assert.equal(referralStats([], now).rewardsLeftThisMonth, REFERRAL.monthlyRewardLimit);
});

test("kód doporučení", () => {
  const code = randomCode(REFERRAL_CODE_LENGTH);
  assert.ok(isPlausibleReferralCode(code));
  assert.ok(!isPlausibleReferralCode("abc"));
  assert.ok(!isPlausibleReferralCode("AB/../CD"));
  assert.ok(!isPlausibleReferralCode(""));
});
