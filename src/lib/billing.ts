import "server-only";
import Stripe from "stripe";
import { randomUUID } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { db } from "./db";
import { computeAccessWindow, getPlan, getSeatPackage } from "./plans";
import { randomCodes } from "./codes";
import { QUALIFYING_PROVIDERS, REFERRAL, isQualifyingProvider, rewardDecision, rewardMonth } from "./referral";

export const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const appUrl = () => process.env.APP_URL ?? "http://localhost:3000";

/** Testovací platby (bez Stripe): mimo produkci vždy, v produkci jen s ALLOW_FAKE_PAYMENTS=1. */
export function fakePaymentsAllowed() {
  return !stripe && (process.env.NODE_ENV !== "production" || process.env.ALLOW_FAKE_PAYMENTS === "1");
}

type GrantOpts = { userId: string; planId: string; provider: string; providerRef: string; amountCzk: number };

/** Data nového nákupu – okno přístupu navazuje na konec běžícího balíčku. */
export async function planPurchaseData(client: Prisma.TransactionClient, opts: GrantOpts, now = new Date()) {
  const plan = getPlan(opts.planId);
  if (!plan) throw new Error(`Neznámý balíček ${opts.planId}`);
  const current = await client.purchase.findFirst({
    where: { userId: opts.userId, endsAt: { gt: now } },
    orderBy: { endsAt: "desc" },
    select: { endsAt: true },
  });
  const { startsAt, endsAt } = computeAccessWindow(plan, current?.endsAt ?? null, now);
  return { userId: opts.userId, planId: plan.id, amountCzk: opts.amountCzk, startsAt, endsAt, provider: opts.provider, providerRef: opts.providerRef };
}

/**
 * Zapíše nákup přístupu přes předaného klienta (transakce nebo db).
 * Idempotentní díky unikátnímu providerRef; nový balíček navazuje na konec běžícího.
 */
export async function grantPlanTx(tx: Prisma.TransactionClient, opts: GrantOpts, now = new Date()) {
  const existing = await tx.purchase.findUnique({ where: { providerRef: opts.providerRef } });
  if (existing) return existing;
  return tx.purchase.create({ data: await planPurchaseData(tx, opts, now) });
}

/**
 * Aktivuje zaplacený balíček. Idempotentní díky unikátnímu providerRef –
 * může ho zavolat webhook i návratová stránka a balíček se připíše jen jednou.
 */
export async function grantPlan(opts: GrantOpts) {
  let purchase;
  try {
    purchase = await grantPlanTx(db, opts);
  } catch (e) {
    // Souběh webhooku a návratové stránky – druhý zápis narazí na unikátní index.
    const again = await db.purchase.findUnique({ where: { providerRef: opts.providerRef } });
    if (!again) throw e;
    purchase = again;
  }
  if (isQualifyingProvider(opts.provider)) await settleReferralSafely(opts.userId);
  return purchase;
}

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return null;
  if (isSeatCheckout(session)) return null; // balíčky míst vyřizuje fulfillSeatCheckoutSession
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  if (!userId || !planId) return null;
  return grantPlan({
    userId,
    planId,
    provider: "stripe",
    providerRef: session.id,
    amountCzk: Math.round((session.amount_total ?? 0) / 100),
  });
}

// --- Doporučení: odměny při první aktivaci přístupu doporučeného ---

/** Připíše nákup jen jednou (unikátní providerRef); souběžný druhý zápis tiše přeskočí. */
async function grantOnce(opts: GrantOpts, now: Date) {
  try {
    return await grantPlanTx(db, opts, now);
  } catch (e) {
    const existing = await db.purchase.findUnique({ where: { providerRef: opts.providerRef } });
    if (!existing) throw e;
    return existing;
  }
}

/**
 * Pokud má uživatel doporučení a už aktivoval přístup (platba nebo kód),
 * připíše bonus jemu i doporučujícímu (ten jen do měsíčního limitu).
 *
 * Idempotentní a bez dlouhé transakce (SQLite i PostgreSQL):
 * 1. doporučení se "zabere" jedním podmíněným updateMany (pending → rewarded/capped) –
 *    souběžný požadavek (webhook + návratová stránka) dostane count 0 a skončí,
 * 2. bonusy mají unikátní providerRef, takže každé další volání je jen doplní,
 *    pokud by se zápis po kroku 1 nepovedl (samooprava).
 */
export async function settleReferralRewards(referredId: string, now = new Date()) {
  const referral = await db.referral.findUnique({ where: { referredId } });
  if (!referral) return null;
  let status = referral.status;

  if (status === "pending") {
    const qualifying = await db.purchase.findFirst({
      where: { userId: referredId, provider: { in: [...QUALIFYING_PROVIDERS] } },
      select: { id: true },
    });
    if (!qualifying) return null;
    const month = rewardMonth(now);
    const rewardedThisMonth = await db.referral.count({
      where: { referrerId: referral.referrerId, status: "rewarded", rewardMonth: month },
    });
    status = rewardDecision(rewardedThisMonth);
    const claimed = await db.referral.updateMany({
      where: { id: referral.id, status: "pending" },
      data: { status, qualifiedAt: now, rewardMonth: month },
    });
    if (claimed.count === 0) return null; // vyřizuje souběžný požadavek
  }

  await grantOnce(
    { userId: referredId, planId: REFERRAL.referredPlanId, provider: "referral", providerRef: `ref_referred_${referral.id}`, amountCzk: 0 },
    now,
  );
  if (status === "rewarded") {
    await grantOnce(
      { userId: referral.referrerId, planId: REFERRAL.referrerPlanId, provider: "referral", providerRef: `ref_referrer_${referral.id}`, amountCzk: 0 },
      now,
    );
  }
  return status;
}

/** Odměna za doporučení nesmí shodit samotný nákup – chyba se jen zaloguje. */
export async function settleReferralSafely(referredId: string) {
  try {
    return await settleReferralRewards(referredId);
  } catch (e) {
    console.error("Připsání odměny za doporučení selhalo", e);
    return null;
  }
}

// --- Balíčky míst (aktivační kódy) pro instruktory ---

type SeatGrantOpts = { groupId: string; buyerId: string; packageId: string; provider: string; providerRef: string; amountCzk: number };

/**
 * Zapíše objednávku míst a vygeneruje jednorázové kódy (v jedné transakci).
 * Idempotentní přes unikátní providerRef objednávky. Dávková transakce (bez zpátečních
 * volání do JS) drží zámek jen krátce – souběh webhooku a návratové stránky je rychlý i na SQLite.
 */
export async function grantSeats(opts: SeatGrantOpts) {
  const pkg = getSeatPackage(opts.packageId);
  if (!pkg || !getPlan(pkg.planId)) throw new Error(`Neznámý balíček míst ${opts.packageId}`);
  for (let attempt = 1; ; attempt++) {
    const existing = await db.seatOrder.findUnique({ where: { providerRef: opts.providerRef } });
    if (existing) return existing;
    const orderId = randomUUID();
    try {
      const [order] = await db.$transaction([
        db.seatOrder.create({
          data: {
            id: orderId,
            groupId: opts.groupId,
            buyerId: opts.buyerId,
            packageId: pkg.id,
            seats: pkg.seats,
            planId: pkg.planId,
            amountCzk: opts.amountCzk,
            provider: opts.provider,
            providerRef: opts.providerRef,
          },
        }),
        db.activationCode.createMany({
          data: randomCodes(pkg.seats).map((code) => ({ code, groupId: opts.groupId, orderId, planId: pkg.planId })),
        }),
      ]);
      return order;
    } catch (e) {
      // Souběh (objednávku mezitím zapsal jiný požadavek) nebo – prakticky nemožná – kolize kódu: zkusit znovu.
      if (attempt >= 3) {
        const again = await db.seatOrder.findUnique({ where: { providerRef: opts.providerRef } });
        if (again) return again;
        throw e;
      }
    }
  }
}

export function isSeatCheckout(session: Stripe.Checkout.Session) {
  return session.metadata?.kind === "seats";
}

export async function fulfillSeatCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid" || !isSeatCheckout(session)) return null;
  const { userId, groupId, packageId } = session.metadata ?? {};
  if (!userId || !groupId || !packageId) return null;
  const group = await db.group.findUnique({ where: { id: groupId }, select: { instructorId: true } });
  if (!group || group.instructorId !== userId) return null;
  return grantSeats({
    groupId,
    buyerId: userId,
    packageId,
    provider: "stripe",
    providerRef: session.id,
    amountCzk: Math.round((session.amount_total ?? 0) / 100),
  });
}
