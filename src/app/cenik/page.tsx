import { PLANS } from "@/lib/plans";
import { getCurrentUser } from "@/lib/auth";
import { getAccessEnd } from "@/lib/access";
import { startCheckout } from "../actions/billing";
import Link from "next/link";

const FEATURES = [
  "Kompletní výklad všech zkouškových okruhů",
  "Učební kartičky s chytrým opakováním",
  "Neomezené náhodné procvičování otázek",
  "Testy nanečisto ve formátu skutečné zkoušky",
  "Statistiky, slabá místa a doporučení",
  "Body, levely, série a odznaky",
];

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ expired?: string; zruseno?: string }> }) {
  const [user, sp] = await Promise.all([getCurrentUser(), searchParams]);
  const accessEnd = user ? await getAccessEnd(user.id) : null;
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Vyberte si délku přípravy</h1>
        <p className="mt-2 text-stone-600">Jednorázová platba, žádné automatické obnovování. Nový balíček navazuje na stávající.</p>
        {sp.expired && <p className="mx-auto mt-4 max-w-md rounded-lg bg-amber-50 px-3 py-2 text-amber-800">Pro tuto část potřebujete aktivní balíček.</p>}
        {sp.zruseno && <p className="mx-auto mt-4 max-w-md rounded-lg bg-stone-100 px-3 py-2">Platba byla zrušena.</p>}
        {accessEnd && <p className="mt-4 text-brand-700">Máte přístup do {accessEnd.toLocaleDateString("cs-CZ")}. Další balíček se připojí na konec.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {PLANS.map((p) => (
          <div key={p.id} className={`card flex flex-col ${p.highlight ? "ring-2 ring-brand-500" : ""}`}>
            {p.highlight && <span className="mb-2 self-start rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">Nejoblíbenější</span>}
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-sm text-stone-500">{p.tagline}</p>
            <div className="my-4 text-3xl font-extrabold">{p.priceCzk} Kč</div>
            <div className="mb-4 text-xs text-stone-500">≈ {Math.round(p.priceCzk / p.days * 10) / 10} Kč / den</div>
            {user ? (
              <form action={startCheckout} className="mt-auto">
                <input type="hidden" name="planId" value={p.id} />
                <button className={p.highlight ? "btn-primary w-full" : "btn-secondary w-full"}>Koupit</button>
              </form>
            ) : (
              <Link href="/registrace" className="btn-secondary mt-auto w-full">Založit účet</Link>
            )}
          </div>
        ))}
      </div>
      <div className="card mx-auto max-w-xl">
        <h3 className="font-bold">Každý balíček obsahuje</h3>
        <ul className="mt-2 grid gap-1 text-stone-700">
          {FEATURES.map((f) => <li key={f}>✔ {f}</li>)}
        </ul>
      </div>
    </div>
  );
}
