import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPlan } from "@/lib/plans";
import { displayedStreak, levelFromXp, levelTitle, pragueDay } from "@/lib/gamification";
import { PageHeader, ProgressBar, StreakBadge, XpChip, num, plural } from "@/components/ui";
import { ReferralCard } from "@/components/referral/ReferralCard";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ zaplaceno?: string }> }) {
  const user = await requireUser();
  const [purchases, sp] = await Promise.all([
    db.purchase.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    searchParams,
  ]);
  const now = new Date();
  const accessEnd = purchases.filter((p) => p.endsAt > now).reduce<Date | null>((m, p) => (!m || p.endsAt > m ? p.endsAt : m), null);
  const daysLeft = accessEnd ? Math.ceil((accessEnd.getTime() - now.getTime()) / 86_400_000) : 0;
  const level = levelFromXp(user.xp);
  const streak = displayedStreak(user.lastActiveDay, user.streak, pragueDay());

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Můj účet" />

      {sp.zaplaceno && (
        <p role="status" className="rounded-md border-l-4 border-zasah bg-zasah-50 px-4 py-3 font-semibold">
          Balíček byl aktivován (testovací režim bez platební brány).
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card p-6" aria-labelledby="ucet-pristup">
          <h2 id="ucet-pristup" className="eyebrow">Přístup</h2>
          {accessEnd ? (
            <>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-4xl leading-none font-semibold">{daysLeft}</span>
                <span className="font-bold">{plural(daysLeft, "den", "dny", "dní")} do konce přístupu</span>
              </p>
              <p className="mt-2 text-stone-700">
                Aktivní do <span className="num">{accessEnd.toLocaleDateString("cs-CZ")}</span>.
              </p>
            </>
          ) : (
            <p className="mt-3 text-stone-700">Nemáte aktivní balíček. K dispozici jsou jen ukázkové okruhy.</p>
          )}
          <Link href="/cenik" className={`${accessEnd ? "btn-secondary" : "btn-accent"} mt-5 w-full sm:w-auto`}>
            {accessEnd ? "Prodloužit přístup" : "Vybrat balíček"}
          </Link>
        </section>

        <section className="card p-6" aria-labelledby="ucet-pokrok">
          <h2 id="ucet-pokrok" className="eyebrow">Pokrok</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <XpChip xp={user.xp} />
            <StreakBadge days={streak} />
          </div>
          <p className="mt-3 font-bold">
            Level <span className="num">{level.level}</span> · {levelTitle(level.level)}
          </p>
          <ProgressBar value={level.progress} tone="ink" className="mt-2" label="Postup do dalšího levelu" />
          <p className="mt-2 text-sm text-ocel">
            Do dalšího levelu <span className="num">{num(level.needed - level.current)}</span> XP · nejlepší série{" "}
            <span className="num">{user.bestStreak}</span> {plural(user.bestStreak, "den", "dny", "dní")}
          </p>
        </section>
      </div>

      <ReferralCard userId={user.id} />

      <section className="card p-6" aria-labelledby="ucet-kody">
        <h2 id="ucet-kody" className="eyebrow">Kódy a skupiny</h2>
        <p className="mt-2 text-stone-700">
          Máte aktivační kód od instruktora nebo střelnice? Uplatněte ho. Vedete kurz? Založte skupinu a sledujte pokrok
          svých studentů.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/aktivovat" className="btn-secondary">Uplatnit aktivační kód</Link>
          <Link href="/skupina" className="btn-secondary">Moje skupiny</Link>
          <Link href="/skupiny" className="btn-secondary">Pro instruktory</Link>
        </div>
      </section>

      <section className="card p-6" aria-labelledby="ucet-profil">
        <h2 id="ucet-profil" className="eyebrow">Přihlášen jako</h2>
        <p className="mt-2 text-lg font-bold">{user.name}</p>
        <p className="break-all text-stone-700">{user.email}</p>
      </section>

      {purchases.length > 0 && (
        <section className="card p-0" aria-labelledby="ucet-historie">
          <h2 id="ucet-historie" className="px-6 pt-5 text-lg font-extrabold">Historie nákupů</h2>
          <div className="overflow-x-auto">
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[11px] tracking-[0.1em] text-ocel uppercase">
                  <th scope="col" className="px-6 py-2 font-semibold">Balíček</th>
                  <th scope="col" className="px-2 py-2 font-semibold">Od</th>
                  <th scope="col" className="px-2 py-2 font-semibold">Do</th>
                  <th scope="col" className="px-6 py-2 text-right font-semibold">Cena</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-t border-line">
                    <td className="px-6 py-3 font-semibold whitespace-nowrap">{getPlan(p.planId)?.name ?? p.planId}</td>
                    <td className="px-2 py-3 font-mono whitespace-nowrap">{p.startsAt.toLocaleDateString("cs-CZ")}</td>
                    <td className="px-2 py-3 font-mono whitespace-nowrap">{p.endsAt.toLocaleDateString("cs-CZ")}</td>
                    <td className="px-6 py-3 text-right font-mono whitespace-nowrap">{p.amountCzk} Kč</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
