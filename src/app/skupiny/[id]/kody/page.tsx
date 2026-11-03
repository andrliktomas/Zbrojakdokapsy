import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { appUrl } from "@/lib/billing";
import { getGroupCodes, getInstructorGroup } from "@/lib/groups.server";
import { formatCode } from "@/lib/codes";
import { getPlan, getSeatPackage } from "@/lib/plans";
import { CopyButton } from "@/components/referral/CopyField";

export const metadata: Metadata = { title: "Aktivační kódy – Zbroják do kapsy" };

type Filter = "vse" | "volne" | "pouzite";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "vse", label: "Vše" },
  { key: "volne", label: "Volné" },
  { key: "pouzite", label: "Použité" },
];

const dateTime = (d: Date) => d.toLocaleString("cs-CZ", { timeZone: "Europe/Prague", day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function GroupCodesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ stav?: string; zaplaceno?: string }>;
}) {
  const user = await requireUser();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const group = await getInstructorGroup(id, user.id);
  if (!group) notFound();
  const { codes, orders, summary } = await getGroupCodes(group.id);
  const filter: Filter = sp.stav === "volne" || sp.stav === "pouzite" ? sp.stav : "vse";
  const shown = codes.filter((c) => (filter === "vse" ? true : filter === "volne" ? !c.redeemedAt : !!c.redeemedAt));
  const unused = codes.filter((c) => !c.redeemedAt);
  const redeemUrl = `${appUrl()}/aktivovat`;
  const copyText = unused.map((c) => `${formatCode(c.code)}  ${redeemUrl}?kod=${c.code}`).join("\n");
  const planName = getPlan(codes[0]?.planId ?? "")?.name;

  return (
    <div className="space-y-6">
      <nav aria-label="Navigace" className="text-sm">
        <Link href={`/skupiny/${group.id}`} className="text-stone-600 underline-offset-2 hover:underline">← {group.name}</Link>
      </nav>
      <header>
        <h1 className="text-2xl font-bold">Aktivační kódy</h1>
        <p className="mt-1 max-w-2xl text-stone-600">
          Každý kód aktivuje jednomu studentovi přístup{planName ? <> na <b>{planName}</b></> : null}. Student ho zadá na stránce{" "}
          <span className="font-mono text-sm">{redeemUrl}</span>, nebo mu pošlete přímý odkaz. Kód lze použít jen jednou.
        </p>
      </header>

      {sp.zaplaceno && (
        <p role="status" className="rounded-lg bg-brand-50 px-3 py-2 text-brand-700">
          Kódy jsou připravené k rozdání.{sp.zaplaceno === "test" && " (Testovací režim bez platební brány.)"}
        </p>
      )}

      <section className="card space-y-4" aria-labelledby="codes-list-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="codes-list-title" className="text-lg font-bold">
            Použito <span className="font-mono">{summary.redeemed}</span> z <span className="font-mono">{summary.total}</span>
          </h2>
          {unused.length > 0 && <CopyButton text={copyText} label={`Kopírovat volné kódy s odkazy (${unused.length})`} />}
        </div>

        <nav aria-label="Filtr kódů" className="flex flex-wrap gap-2 text-sm">
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={f.key === "vse" ? `/skupiny/${group.id}/kody` : `/skupiny/${group.id}/kody?stav=${f.key}`}
              aria-current={filter === f.key ? "page" : undefined}
              className={`rounded-full px-3 py-1 ring-1 ${filter === f.key ? "bg-stone-900 text-white ring-stone-900" : "ring-stone-300 hover:bg-stone-100"}`}
            >
              {f.label}
            </Link>
          ))}
        </nav>

        {shown.length ? (
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">Seznam aktivačních kódů skupiny</caption>
              <thead className="text-left text-xs text-stone-500">
                <tr>
                  <th scope="col" className="px-5 py-2 font-medium">Kód</th>
                  <th scope="col" className="px-2 py-2 font-medium">Stav</th>
                  <th scope="col" className="hidden px-5 py-2 font-medium sm:table-cell">Uplatněno</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <tr key={c.id} className="border-t border-stone-100 align-top">
                    <td className="whitespace-nowrap px-5 py-2.5 font-mono font-semibold tracking-wide">{formatCode(c.code)}</td>
                    <td className="px-2 py-2.5">
                      {c.redeemedAt ? (
                        <>
                          <span className="font-semibold">Použitý</span>
                          {c.redeemedBy && (
                            <div className="text-xs text-stone-600">
                              {c.redeemedBy.name} · <span className="break-all">{c.redeemedBy.email}</span>
                            </div>
                          )}
                          <div className="text-xs text-stone-500 sm:hidden">{dateTime(c.redeemedAt)}</div>
                        </>
                      ) : (
                        <span className="text-brand-700">Volný</span>
                      )}
                    </td>
                    <td className="hidden whitespace-nowrap px-5 py-2.5 text-stone-600 sm:table-cell">{c.redeemedAt ? dateTime(c.redeemedAt) : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-stone-600">{codes.length ? "V tomto filtru nejsou žádné kódy." : "Zatím jste nekoupili žádné kódy."}</p>
        )}
      </section>

      {orders.length > 0 && (
        <section className="card" aria-labelledby="orders-title">
          <h2 id="orders-title" className="mb-2 font-bold">Objednávky</h2>
          <ul className="divide-y divide-stone-100 text-sm">
            {orders.map((o) => (
              <li key={o.id} className="flex flex-wrap justify-between gap-2 py-2">
                <span>
                  <span className="font-mono">{o.seats}</span> kódů · {getSeatPackage(o.packageId) ? `přístup na ${getPlan(o.planId)?.name ?? o.planId}` : o.packageId}
                </span>
                <span className="text-stone-600">
                  {o.createdAt.toLocaleDateString("cs-CZ")} · <span className="font-mono">{o.amountCzk.toLocaleString("cs-CZ")} Kč</span>
                  {o.provider === "dev" && " (testovací platba)"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
