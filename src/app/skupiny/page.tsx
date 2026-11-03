import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { fakePaymentsAllowed } from "@/lib/billing";
import { listInstructorGroups } from "@/lib/groups.server";
import { czPlural } from "@/lib/groups";
import { CreateGroupForm } from "@/components/groups/CreateGroupForm";
import { SeatPackages } from "@/components/groups/SeatPackages";

export const metadata: Metadata = { title: "Skupiny pro instruktory – Zbroják do kapsy" };

const STEPS = [
  { title: "Založte skupinu", text: "Pro každý kurz nebo termín zvlášť. Dostanete odkaz, který pošlete studentům." },
  { title: "Studenti se připojí", text: "Před připojením vidí, jaké údaje se s vámi sdílejí, a musí to odsouhlasit." },
  { title: "Sledujte pokrok", text: "Úspěšnost podle částí zkoušky, testy nanečisto a poslední aktivita na jednom místě." },
];

export default async function GroupsPage() {
  const user = await requireUser();
  const groups = await listInstructorGroups(user.id);
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Pro instruktory a střelnice</p>
        <h1 className="mt-1 text-2xl font-bold">Moje skupiny</h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Založte skupinu pro svůj kurz, pošlete studentům odkaz a sledujte, jak se na zkoušku připravují.
          Přístup do aplikace jim můžete zaplatit hromadně aktivačními kódy.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="groups-list-title" className="order-2 md:order-1">
          <h2 id="groups-list-title" className="mb-3 text-lg font-bold">Vaše skupiny</h2>
          {groups.length ? (
            <ul className="space-y-3">
              {groups.map((g) => (
                <li key={g.id}>
                  <Link href={`/skupiny/${g.id}`} className="card block transition hover:ring-stone-400">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold">{g.name}</span>
                      <span className="text-xs text-stone-500">založeno {g.createdAt.toLocaleDateString("cs-CZ")}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-600">
                      <span><b className="font-mono text-stone-900">{g.members}</b> {czPlural(g.members, "student", "studenti", "studentů")}</span>
                      <span>
                        <b className="font-mono text-stone-900">{g.seats.available}</b> {czPlural(g.seats.available, "volný kód", "volné kódy", "volných kódů")}
                        {g.seats.total > 0 && <> z <span className="font-mono">{g.seats.total}</span></>}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card text-stone-600">
              Zatím nemáte žádnou skupinu. Založte první – třeba „Kurz Střelnice Brno – listopad“.
            </div>
          )}
        </section>
        <aside className="card order-1 self-start md:order-2">
          <CreateGroupForm />
        </aside>
      </div>

      <section aria-labelledby="how-title" className="card">
        <h2 id="how-title" className="text-lg font-bold">Jak to funguje</h2>
        <ol className="mt-3 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-stone-900 font-mono text-sm font-bold text-white" aria-hidden>
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold">{s.title}</span>
                <span className="text-sm text-stone-600">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <h3 className="mt-6 font-semibold">Aktivační kódy pro studenty</h3>
        <p className="mb-3 mt-1 text-sm text-stone-600">Kódy koupíte v detailu skupiny. Student kód zadá na stránce Aktivovat kód a přístup se mu ihned zapne.</p>
        <SeatPackages testMode={fakePaymentsAllowed()} />
      </section>
    </div>
  );
}
