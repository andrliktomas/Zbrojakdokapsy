// Doporučení (referral) – čistá logika bez databáze (testy v referral.test.ts).

import { pragueDay } from "./gamification";
import { INTERNAL_PLANS } from "./plans";

const planDays = (id: string) => INTERNAL_PLANS.find((p) => p.id === id)?.days ?? 0;

export const REFERRAL = {
  /** Bonus pro doporučujícího – připíše se, když doporučený poprvé aktivuje přístup. */
  referrerPlanId: "bonus_referrer",
  /** Bonus pro doporučeného – dny navíc k prvnímu přístupu. */
  referredPlanId: "bonus_referred",
  referrerBonusDays: planDays("bonus_referrer"),
  referredBonusDays: planDays("bonus_referred"),
  /** Nejvýš tolik odměn za kalendářní měsíc (Europe/Prague) pro jednoho doporučujícího. */
  monthlyRewardLimit: 5,
  cookieName: "zk_ref",
  cookieMaxAgeDays: 30,
} as const;

/**
 * Které nákupy se počítají jako "první aktivace přístupu" doporučeného:
 * platba (Stripe), testovací platba a aktivační kód od instruktora (ten je zaplacený).
 * Bonusy ("referral") se nepočítají – jinak by vznikal řetězec odměn.
 */
export const QUALIFYING_PROVIDERS = ["stripe", "dev", "code"] as const;

export function isQualifyingProvider(provider: string) {
  return (QUALIFYING_PROVIDERS as readonly string[]).includes(provider);
}

/** Klíč měsíce pro limit odměn: "YYYY-MM" v pražském čase. */
export function rewardMonth(date = new Date()) {
  return pragueDay(date).slice(0, 7);
}

/**
 * Normalizace e-mailu pro odhalení doporučení sebe sama:
 * malá písmena, bez "+štítku"; u Gmailu i bez teček a se sjednocenou doménou.
 */
export function canonicalEmail(email: string) {
  const [rawLocal, rawDomain = ""] = email.trim().toLowerCase().split("@");
  let local = rawLocal.split("+")[0];
  let domain = rawDomain;
  if (domain === "googlemail.com") domain = "gmail.com";
  if (domain === "gmail.com") local = local.replace(/\./g, "");
  return `${local}@${domain}`;
}

export type AttributionInput = {
  referrerId: string;
  referredId: string;
  referrerEmail: string;
  referredEmail: string;
};

/** Proč doporučení nelze přiřadit (null = lze). */
export function attributionRejection(i: AttributionInput): "self" | "same_email" | null {
  if (i.referrerId === i.referredId) return "self";
  if (canonicalEmail(i.referrerEmail) === canonicalEmail(i.referredEmail)) return "same_email";
  return null;
}

/** Dostane doporučující odměnu, nebo už v tomto měsíci vyčerpal limit? */
export function rewardDecision(rewardedThisMonth: number, limit: number = REFERRAL.monthlyRewardLimit): "rewarded" | "capped" {
  return rewardedThisMonth < limit ? "rewarded" : "capped";
}

export type ReferralStatus = "pending" | "rewarded" | "capped";

export function referralStats(rows: { status: string; rewardMonth: string | null }[], now = new Date()) {
  const month = rewardMonth(now);
  const rewarded = rows.filter((r) => r.status === "rewarded");
  const rewardedThisMonth = rewarded.filter((r) => r.rewardMonth === month).length;
  return {
    registered: rows.length,
    activated: rows.filter((r) => r.status === "rewarded" || r.status === "capped").length,
    rewarded: rewarded.length,
    daysEarned: rewarded.length * REFERRAL.referrerBonusDays,
    rewardsLeftThisMonth: Math.max(0, REFERRAL.monthlyRewardLimit - rewardedThisMonth),
  };
}

/** Kód doporučení v URL – jen velká písmena a číslice, rozumná délka. */
export function isPlausibleReferralCode(code: string) {
  return /^[A-Z0-9]{4,16}$/.test(code);
}
