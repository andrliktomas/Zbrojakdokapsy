import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { pendingInviter } from "@/lib/referral.server";
import { REFERRAL } from "@/lib/referral";
import { ReferralCard } from "@/components/referral/ReferralCard";

export const metadata: Metadata = { title: "Doporučte Zbroják do kapsy" };

const BENEFITS = [
  "výklad všech okruhů zkoušky podle zákona č. 90/2024 Sb.",
  "kartičky s chytrým opakováním a náhodné otázky s vysvětlením",
  "testy nanečisto ve formátu skutečné zkoušky",
];

export default async function ReferralPage() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Doporučte Zbroják do kapsy</h1>
          <p className="mt-1 text-stone-600">Pošlete odkaz kamarádům, kteří se chystají na zkoušku. Odměnu dostanete vy i oni.</p>
        </header>
        <ReferralCard userId={user.id} />
        <section className="card text-sm text-stone-700" aria-labelledby="rules-title">
          <h2 id="rules-title" className="font-bold text-stone-900">Pravidla</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Doporučení platí jen pro nové účty založené přes váš odkaz (do {REFERRAL.cookieMaxAgeDays} dní od kliknutí).</li>
            <li>Bonus se připíše, když si doporučený poprvé aktivuje přístup – nákupem balíčku nebo aktivačním kódem.</li>
            <li>Vaše dny navazují na konec běžícího přístupu; pokud žádný nemáte, začínají hned.</li>
            <li>Odměnu získáte nejvýš {REFERRAL.monthlyRewardLimit}× za kalendářní měsíc. Doporučení vlastního účtu se nezapočítává.</li>
          </ul>
        </section>
      </div>
    );
  }

  const inviter = await pendingInviter();
  return (
    <div className="mx-auto max-w-lg">
      <div className="card space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Pozvánka</p>
        <h1 className="text-2xl font-bold">
          {inviter ? `${inviter.name} vás zve do aplikace Zbroják do kapsy` : "Program doporučení Zbroják do kapsy"}
        </h1>
        <p className="text-stone-700">
          Připravte se na zkoušku zbrojního oprávnění v mobilu. {inviter ? "Díky pozvánce" : "S pozvánkou od kamaráda"} získáte k prvnímu
          přístupu <b>{REFERRAL.referredBonusDays} dní navíc</b>.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700">
          {BENEFITS.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/registrace" className="btn-primary">Založit účet zdarma</Link>
          <Link href="/cenik" className="btn-secondary">Ceník</Link>
        </div>
        <p className="text-xs text-stone-500">Ukázkové okruhy jsou zdarma. Bonusové dny se připíšou automaticky po první aktivaci přístupu.</p>
      </div>
    </div>
  );
}
