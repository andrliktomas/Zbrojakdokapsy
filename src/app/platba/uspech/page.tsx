import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { fulfillCheckoutSession, stripe } from "@/lib/billing";

export default async function PaymentSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const user = await requireUser();
  const { session_id } = await searchParams;
  let purchase = null;
  if (stripe && session_id) {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.metadata?.userId === user.id) purchase = await fulfillCheckoutSession(session);
  }
  return (
    <div className="card mx-auto max-w-lg text-center">
      {purchase ? (
        <>
          <div className="text-5xl">🎉</div>
          <h1 className="mt-2 text-2xl font-bold">Platba proběhla, přístup je aktivní</h1>
          <p className="mt-2 text-stone-600">Přístup máte do {purchase.endsAt.toLocaleDateString("cs-CZ")}.</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Platbu ověřujeme</h1>
          <p className="mt-2 text-stone-600">Jakmile platební brána platbu potvrdí, přístup se aktivuje. Zkuste stránku za chvíli obnovit.</p>
        </>
      )}
      <Link href="/prehled" className="btn-primary mt-4">Pokračovat k učení</Link>
    </div>
  );
}
