"use server";

import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { requireUser } from "@/lib/auth";
import { appUrl, grantPlan, stripe } from "@/lib/billing";
import { getPlan } from "@/lib/plans";

export async function startCheckout(formData: FormData) {
  const user = await requireUser();
  const plan = getPlan(String(formData.get("planId")));
  if (!plan) throw new Error("Neznámý balíček");

  if (!stripe) {
    // Vývojový režim bez Stripe klíče: balíček se aktivuje rovnou.
    if (process.env.NODE_ENV === "production") throw new Error("Platby nejsou nakonfigurovány");
    await grantPlan({ userId: user.id, planId: plan.id, provider: "dev", providerRef: `dev_${randomUUID()}`, amountCzk: 0 });
    redirect("/ucet?zaplaceno=1");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "czk",
          unit_amount: plan.priceCzk * 100,
          product_data: { name: `Zbroják do kapsy – přístup na ${plan.name}` },
        },
      },
    ],
    metadata: { userId: user.id, planId: plan.id },
    success_url: `${appUrl()}/platba/uspech?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/cenik?zruseno=1`,
  });
  redirect(session.url!);
}
