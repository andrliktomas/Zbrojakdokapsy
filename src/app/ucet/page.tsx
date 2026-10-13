import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/lib/plans";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ zaplaceno?: string }> }) {
  const user = await requireUser();
  const [purchases, sp] = await Promise.all([
    db.purchase.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    searchParams,
  ]);
  const now = new Date();
  const accessEnd = purchases.filter((p) => p.endsAt > now).reduce<Date | null>((m, p) => (!m || p.endsAt > m ? p.endsAt : m), null);
  const daysLeft = accessEnd ? Math.ceil((accessEnd.getTime() - now.getTime()) / 86_400_000) : 0;
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Můj účet</h1>
      {sp.zaplaceno && <p className="rounded-lg bg-brand-50 px-3 py-2 text-brand-700">Balíček byl aktivován (testovací režim bez platební brány).</p>}
      <div className="card">
        <div className="text-sm text-stone-500">Přihlášen jako</div>
        <div className="font-semibold">{user.name} · {user.email}</div>
      </div>
      <div className="card">
        <h2 className="font-bold">Předplatné</h2>
        {accessEnd ? (
          <p className="mt-1">Aktivní do <b>{accessEnd.toLocaleDateString("cs-CZ")}</b> (zbývá {daysLeft} dní).</p>
        ) : (
          <p className="mt-1 text-stone-600">Nemáte aktivní balíček. K dispozici jsou jen ukázkové okruhy.</p>
        )}
        <Link href="/cenik" className="btn-primary mt-3">{accessEnd ? "Prodloužit" : "Vybrat balíček"}</Link>
      </div>
      {purchases.length > 0 && (
        <div className="card">
          <h2 className="mb-2 font-bold">Historie nákupů</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-stone-500"><tr><th>Balíček</th><th>Od</th><th>Do</th><th className="text-right">Cena</th></tr></thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="py-1.5">{getPlan(p.planId)?.name ?? p.planId}</td>
                  <td>{p.startsAt.toLocaleDateString("cs-CZ")}</td>
                  <td>{p.endsAt.toLocaleDateString("cs-CZ")}</td>
                  <td className="text-right">{p.amountCzk} Kč</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
