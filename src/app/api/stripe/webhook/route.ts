import { NextResponse } from "next/server";
import { fulfillCheckoutSession, stripe } from "@/lib/billing";

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
    await fulfillCheckoutSession(event.data.object);
  }
  return NextResponse.json({ received: true });
}
