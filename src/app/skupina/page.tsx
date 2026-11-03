import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { listMemberships } from "@/lib/groups.server";
import { leaveGroup } from "@/app/actions/groups";
import { ConfirmSubmit } from "@/components/groups/ConfirmSubmit";
import { NOT_SHARED, SHARED_DATA } from "@/components/groups/SharedDataNotice";

export const metadata: Metadata = { title: "Moje skupiny – Zbroják do kapsy" };

export default async function MyGroupsPage({ searchParams }: { searchParams: Promise<{ pripojeno?: string; odchod?: string }> }) {
  const user = await requireUser();
  const [memberships, sp] = await Promise.all([listMemberships(user.id), searchParams]);
  const joined = sp.pripojeno ? memberships.find((m) => m.groupId === sp.pripojeno) : undefined;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Moje skupiny</h1>
        <p className="mt-1 text-stone-600">Skupiny kurzů, ve kterých jste. Instruktor skupiny vidí váš pokrok v přípravě.</p>
      </header>

      {joined && (
        <p role="status" className="rounded-lg bg-brand-50 px-3 py-2 text-brand-700">
          Připojili jste se ke skupině „{joined.group.name}“. Instruktor nyní vidí váš pokrok.
        </p>
      )}
      {sp.odchod && (
        <p role="status" className="rounded-lg bg-stone-100 px-3 py-2">Opustili jste skupinu. Instruktor už váš pokrok nevidí.</p>
      )}

      {memberships.length ? (
        <ul className="space-y-3">
          {memberships.map((m) => (
            <li key={m.groupId} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold">{m.group.name}</h2>
                  <p className="text-sm text-stone-600">
                    Instruktor {m.group.instructor.name} · členem od {m.joinedAt.toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <form action={leaveGroup}>
                  <input type="hidden" name="groupId" value={m.groupId} />
                  <ConfirmSubmit
                    confirm={`Opravdu odejít ze skupiny „${m.group.name}“? Instruktor přestane vidět váš pokrok.`}
                    className="btn-secondary text-sm"
                    pendingLabel="Odcházím…"
                  >
                    Odejít ze skupiny
                  </ConfirmSubmit>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card text-stone-600">
          Nejste členem žádné skupiny. Odkaz na skupinu vám pošle instruktor kurzu nebo střelnice.
        </div>
      )}

      <details className="card">
        <summary className="cursor-pointer font-semibold">Co instruktor ve skupině vidí</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-700">
          {SHARED_DATA.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-2 text-sm text-stone-700">{NOT_SHARED}</p>
      </details>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/aktivovat" className="card block transition hover:ring-stone-400">
          <span className="font-semibold">Máte aktivační kód?</span>
          <span className="mt-1 block text-sm text-stone-600">Uplatněte kód od instruktora a zapněte si přístup.</span>
        </Link>
        <Link href="/skupiny" className="card block transition hover:ring-stone-400">
          <span className="font-semibold">Jste instruktor?</span>
          <span className="mt-1 block text-sm text-stone-600">Založte skupinu pro svůj kurz a sledujte pokrok studentů.</span>
        </Link>
      </div>
    </div>
  );
}
