import "server-only";
import Stripe from "stripe";
import { db } from "./db";
import { computeAccessWindow, getPlan } from "./plans";
import { getAccessEnd } from "./access";

export const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const appUrl = () => process.env.APP_URL ?? "http://localhost:3000";

/**
 * Aktivuje zaplacený balíček. Idempotentní díky unikátnímu providerRef –
 * může ho zavolat webhook i návratová stránka a balíček se připíše jen jednou.
 */
export async function grantPlan(opts: { userId: string; planId: string; provider: string; providerRef: string; amountCzk: number }) {
  const existing = await db.purchase.findUnique({ where: { providerRef: opts.providerRef } });
  if (existing) return existing;
  const plan = getPlan(opts.planId);
  if (!plan) throw new Error(`Neznámý balíček ${opts.planId}`);
  const { startsAt, endsAt } = computeAccessWindow(plan, await getAccessEnd(opts.userId));
  try {
    return await db.purchase.create({
      data: { userId: opts.userId, planId: plan.id, amountCzk: opts.amountCzk, startsAt, endsAt, provider: opts.provider, providerRef: opts.providerRef },
    });
  } catch {
    // Souběh webhooku a návratové stránky – druhý zápis narazí na unikátní index.
    return db.purchase.findUniqueOrThrow({ where: { providerRef: opts.providerRef } });
  }
}

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return null;
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
