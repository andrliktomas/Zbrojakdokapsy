import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { fulfillSeatCheckoutSession, stripe } from "@/lib/billing";
import { getInstructorGroup } from "@/lib/groups.server";

/** Návrat ze Stripe Checkout po nákupu kódů. Vyřízení je idempotentní (stejně jako webhook). */
export default async function SeatPaymentReturn({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ session_id?: string }> }) {
  const user = await requireUser();
  const [{ id }, { session_id }] = await Promise.all([params, searchParams]);
  const group = await getInstructorGroup(id, user.id);
  if (!group) notFound();

  let order = null;
  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.metadata?.userId === user.id && session.metadata?.groupId === group.id) {
        order = await fulfillSeatCheckoutSession(session);
      }
    } catch (e) {
      console.error("Ověření platby za kódy selhalo", e);
    }
  }
  if (order) redirect(`/skupiny/${group.id}/kody?zaplaceno=1`);

  return (
    <div className="card mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold">Platbu ověřujeme</h1>
      <p className="mt-2 text-stone-600">Jakmile platební brána platbu potvrdí, kódy se objeví ve skupině. Zkuste stránku za chvíli obnovit.</p>
      <Link href={`/skupiny/${group.id}`} className="btn-primary mt-4">Zpět na skupinu</Link>
    </div>
  );
}
