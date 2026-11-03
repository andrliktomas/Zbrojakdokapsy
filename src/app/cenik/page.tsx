import Link from "next/link";
import { PLANS, SEAT_PACKAGES, pricePerSeat } from "@/lib/plans";
import { getCurrentUser } from "@/lib/auth";
import { getAccessEnd } from "@/lib/access";
import { TOPICS } from "@/content";
import { CheckIcon, PageHeader, plural } from "@/components/ui";
import { startCheckout } from "../actions/billing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ceník přípravy na zbrojní oprávnění",
  path: "/cenik",
  description:
    "Jednorázové balíčky přípravy na zkoušku zbrojního oprávnění na 3 týdny až 3 měsíce, bez automatického obnovování. Ukázkové okruhy zdarma.",
});

const FEATURES = [
  "Kompletní výklad všech zkouškových okruhů",
  "Učební kartičky s chytrým opakováním",
  "Neomezené náhodné procvičování otázek",
  "Testy nanečisto ve formátu skutečné zkoušky",
  "Statistiky, slabá místa a doporučení",
  "Body, levely, série a odznaky",
];

const perDay = (price: number, days: number) =>
  (price / days).toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ expired?: string; zruseno?: string }> }) {
  const [user, sp] = await Promise.all([getCurrentUser(), searchParams]);
  const accessEnd = user ? await getAccessEnd(user.id) : null;
  const freeTopics = TOPICS.filter((t) => t.free);

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Ceník" title="Vyberte si délku přípravy">
        Jednorázová platba, žádné automatické obnovování. Nový balíček navazuje na stávající.
      </PageHeader>

      {(sp.expired || sp.zruseno || accessEnd) && (
        <div className="space-y-2">
          {sp.expired && (
            <p className="rounded-md border-l-4 border-signal bg-signal-50 px-4 py-3 font-semibold">
              Pro tuto část potřebujete aktivní balíček.
            </p>
          )}
          {sp.zruseno && (
            <p className="rounded-md border-l-4 border-line-strong bg-white px-4 py-3">Platba byla zrušena. Nic se nestrhlo.</p>
          )}
          {accessEnd && (
            <p className="rounded-md border-l-4 border-zasah bg-zasah-50 px-4 py-3">
              Máte přístup do <span className="num">{accessEnd.toLocaleDateString("cs-CZ")}</span>. Další balíček se připojí na konec.
            </p>
          )}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => (
          <li
            key={p.id}
            className={`card relative flex flex-col p-6 ${p.highlight ? "ring-2 ring-ink" : ""}`}
          >
            {p.highlight && <span className="chip absolute -top-2.5 left-5">Doporučujeme</span>}
            <h2 className="text-xl font-extrabold">{p.name}</h2>
            <p className="mt-1 text-sm leading-snug text-ocel lg:min-h-10">{p.tagline}</p>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="font-mono text-[40px] leading-none font-semibold tracking-tight">{p.priceCzk}</span>
              <span className="text-lg font-bold">Kč</span>
            </p>
            <p className="mt-2 flex flex-col font-mono text-xs font-semibold text-ocel uppercase [word-spacing:-0.2em]">
              <span>{p.days} {plural(p.days, "den", "dny", "dní")} přístupu</span>
              <span>≈ {perDay(p.priceCzk, p.days)} Kč/den</span>
            </p>
            <div className="mt-6 flex-1" />
            {user ? (
              <form action={startCheckout}>
                <input type="hidden" name="planId" value={p.id} />
                <button className={`${p.highlight ? "btn-accent" : "btn-secondary"} w-full`}>
                  Koupit {p.name}
                </button>
              </form>
            ) : (
              <Link href="/registrace" className={`${p.highlight ? "btn-accent" : "btn-secondary"} w-full`}>
                Založit účet
              </Link>
            )}
          </li>
        ))}
      </ul>

      <section className="card p-6 md:flex md:items-center md:justify-between md:gap-6" aria-labelledby="b2b-title">
        <div>
          <p className="eyebrow">Pro instruktory a střelnice</p>
          <h2 id="b2b-title" className="mt-1 text-xl font-extrabold">Připravte celý kurz najednou</h2>
          <p className="mt-1 text-stone-700">
            Založte skupinu pro svůj kurz, sledujte pokrok studentů a zaplaťte jim přístup hromadně – od{" "}
            <span className="num">{Math.min(...SEAT_PACKAGES.map(pricePerSeat))} Kč</span> za studenta.
          </p>
        </div>
        <div className="mt-4 flex shrink-0 flex-wrap gap-2 md:mt-0">
          <Link href={user ? "/skupiny" : "/registrace"} className="btn-primary">Založit skupinu</Link>
          <Link href="/aktivovat" className="btn-secondary">Mám aktivační kód</Link>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-6">
          <h2 className="text-lg font-extrabold">Každý balíček obsahuje</h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 shrink-0 text-zasah" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-extrabold">Zdarma i bez balíčku</h2>
          <p className="mt-2 text-stone-700">Po registraci můžete hned projít ukázkové okruhy:</p>
          <ul className="mt-2 space-y-1.5">
            {freeTopics.map((t) => (
              <li key={t.slug} className="flex items-start gap-2.5 font-semibold">
                <span className="chip-outline mt-0.5 shrink-0 text-zasah">Zdarma</span>
                {t.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
