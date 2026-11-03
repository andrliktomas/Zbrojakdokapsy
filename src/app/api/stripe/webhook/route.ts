import { NextResponse } from "next/server";
import { fulfillCheckoutSession, fulfillSeatCheckoutSession, isSeatCheckout, settleReferralRewards, stripe } from "@/lib/billing";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe není nakonfigurován" }, { status: 501 });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Chybí podpis" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Neplatný podpis" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (isSeatCheckout(session)) {
      // Balíček míst pro instruktora → vygenerovat aktivační kódy (idempotentně).
      await fulfillSeatCheckoutSession(session);
    } else {
      const purchase = await fulfillCheckoutSession(session);
      // Odměna za doporučení: chyba zde vrátí 500 a Stripe webhook zopakuje (vše je idempotentní).
      if (purchase) await settleReferralRewards(purchase.userId);
    }
  }
  return NextResponse.json({ received: true });
}
