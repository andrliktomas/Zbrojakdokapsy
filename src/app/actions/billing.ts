"use server";

import { notFound, redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { requireUser } from "@/lib/auth";
import { appUrl, fakePaymentsAllowed, grantPlan, grantSeats, stripe } from "@/lib/billing";
import { getPlan, getPurchasablePlan, getSeatPackage } from "@/lib/plans";
import { getInstructorGroup } from "@/lib/groups.server";

export async function startCheckout(formData: FormData) {
  const user = await requireUser();
  const plan = getPurchasablePlan(String(formData.get("planId")));
  if (!plan) throw new Error("Neznámý balíček");

  if (!stripe) {
    // Vývojový / ukázkový režim bez Stripe klíče: balíček se aktivuje rovnou.
    if (process.env.NODE_ENV === "production" && process.env.ALLOW_FAKE_PAYMENTS !== "1") {
      throw new Error("Platby nejsou nakonfigurovány");
    }
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

/** Nákup balíčku míst (aktivačních kódů) pro skupinu – jen instruktor dané skupiny. */
export async function startSeatCheckout(formData: FormData) {
  const user = await requireUser();
  const pkg = getSeatPackage(String(formData.get("packageId")));
  if (!pkg) throw new Error("Neznámý balíček míst");
  const group = await getInstructorGroup(String(formData.get("groupId") ?? ""), user.id);
  if (!group) notFound();
  const plan = getPlan(pkg.planId)!;

  if (!stripe) {
    // Testovací režim: kódy se vygenerují rovnou (stejné pravidlo jako u startCheckout).
    if (!fakePaymentsAllowed()) throw new Error("Platby nejsou nakonfigurovány");
    await grantSeats({ groupId: group.id, buyerId: user.id, packageId: pkg.id, provider: "dev", providerRef: `dev_${randomUUID()}`, amountCzk: 0 });
    redirect(`/skupiny/${group.id}/kody?zaplaceno=test`);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "czk",
          unit_amount: pkg.priceCzk * 100,
          product_data: { name: `Zbroják do kapsy – ${pkg.seats} aktivačních kódů (přístup na ${plan.name})` },
        },
      },
    ],
    metadata: { kind: "seats", userId: user.id, groupId: group.id, packageId: pkg.id },
    success_url: `${appUrl()}/skupiny/${group.id}/platba?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/skupiny/${group.id}?zruseno=1`,
  });
  redirect(session.url!);
}
