import { getReferralOverview } from "@/lib/referral.server";
import { REFERRAL } from "@/lib/referral";
import { CopyField } from "./CopyField";

/**
 * Karta "Doporučte Zbroják" – odkaz pro doporučení a počty.
 * Použití (server component): <ReferralCard userId={user.id} />
 */
export async function ReferralCard({ userId }: { userId: string }) {
  const o = await getReferralOverview(userId);
  const stats = [
    { label: "Registrace přes odkaz", value: String(o.registered) },
    { label: "Aktivovali přístup", value: String(o.activated) },
    { label: "Získané dny", value: `+${o.daysEarned}` },
  ];
  return (
    <section className="card" aria-labelledby="referral-title">
      <h2 id="referral-title" className="font-bold">Doporučte Zbroják a získejte dny navíc</h2>
      <p className="mt-1 text-sm text-stone-600">
        Kdo se zaregistruje přes váš odkaz, dostane k prvnímu přístupu <b>{REFERRAL.referredBonusDays} dní navíc</b>. Vy získáte{" "}
        <b>{REFERRAL.referrerBonusDays} dní přístupu</b>, jakmile si poprvé aktivuje přístup – nákupem nebo kódem od instruktora.
      </p>
      <div className="mt-4">
        <CopyField label="Váš odkaz pro doporučení" value={o.link} />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse rounded-xl bg-stone-50 p-3 text-center ring-1 ring-stone-200">
            <dt className="mt-1 text-xs leading-tight text-stone-500">{s.label}</dt>
            <dd className="font-mono text-xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-stone-500">
        Odměnu získáte nejvýš {REFERRAL.monthlyRewardLimit}× za kalendářní měsíc (tento měsíc zbývá {o.rewardsLeftThisMonth}).
        Doporučení vlastního účtu se nezapočítává.
      </p>
    </section>
  );
}
