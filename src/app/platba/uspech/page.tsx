import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { fulfillCheckoutSession, stripe } from "@/lib/billing";
import { LogoMark } from "@/components/Logo";

export default async function PaymentSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const user = await requireUser();
  const { session_id } = await searchParams;
  let purchase = null;
  if (stripe && session_id) {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.metadata?.userId === user.id) purchase = await fulfillCheckoutSession(session);
  }
  return (
    <div className="card mx-auto max-w-lg p-6 text-center sm:p-8">
      <LogoMark size={64} detail className="mx-auto" />
      {purchase ? (
        <>
          <p className="eyebrow mt-5 text-zasah">Zásah</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Platba proběhla, přístup je aktivní</h1>
          <p className="mt-2 text-stone-700">
            Přístup máte do <span className="num">{purchase.endsAt.toLocaleDateString("cs-CZ")}</span>.
          </p>
          <Link href="/prehled" className="btn-accent mt-6 w-full sm:w-auto">Pokračovat k učení</Link>
        </>
      ) : (
        <>
          <p className="eyebrow mt-5">Platba</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Platbu ověřujeme</h1>
          <p className="mt-2 text-stone-700">
            Jakmile platební brána platbu potvrdí, přístup se aktivuje. Zkuste stránku za chvíli obnovit.
          </p>
          <Link href="/prehled" className="btn-secondary mt-6 w-full sm:w-auto">Pokračovat k učení</Link>
        </>
      )}
    </div>
  );
}
