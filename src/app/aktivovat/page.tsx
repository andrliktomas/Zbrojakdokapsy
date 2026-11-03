import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { normalizeCode } from "@/lib/codes";
import { RedeemForm } from "@/components/groups/RedeemForm";

export const metadata: Metadata = { title: "Aktivovat kód – Zbroják do kapsy" };

export default async function RedeemPage({ searchParams }: { searchParams: Promise<{ kod?: string }> }) {
  const [user, sp] = await Promise.all([getCurrentUser(), searchParams]);
  const code = sp.kod ? normalizeCode(sp.kod).slice(0, 20) : "";
  const here = code ? `/aktivovat?kod=${encodeURIComponent(code)}` : "/aktivovat";

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="card space-y-4">
        <header>
          <h1 className="text-2xl font-bold">Aktivovat kód</h1>
          <p className="mt-1 text-stone-600">
            Kód od instruktora nebo střelnice vám zapne přístup ke všem okruhům, kartičkám a testům nanečisto.
            Pokud už přístup máte, prodlouží se.
          </p>
        </header>
        {user ? (
          <>
            <RedeemForm initialCode={code} />
            <p className="text-xs text-stone-500">
              Instruktor, který kód zakoupil, uvidí, že jste kód uplatnili (vaše jméno a e-mail). Váš pokrok uvidí jen tehdy,
              pokud se sami připojíte k jeho skupině.
            </p>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-stone-600">Kód se uplatní k vašemu účtu. Nejdřív se prosím přihlaste nebo si účet založte.</p>
            <a href={code ? `/aktivovat/registrace?kod=${encodeURIComponent(code)}` : "/aktivovat/registrace"} className="btn-primary w-full">
              Založit účet a uplatnit kód
            </a>
            <Link href={`/prihlaseni?next=${encodeURIComponent(here)}`} className="btn-secondary w-full">Mám účet – přihlásit se</Link>
          </div>
        )}
      </div>
    </div>
  );
}
