import { startSeatCheckout } from "@/app/actions/billing";
import { PLANS, SEAT_PACKAGES, getPlan, pricePerSeat } from "@/lib/plans";
import { SubmitButton } from "./ConfirmSubmit";

const czk = (n: number) => `${n.toLocaleString("cs-CZ")} Kč`;

/** Nabídka balíčků aktivačních kódů. S `groupId` zobrazí tlačítka nákupu, bez něj jen ceník. */
export function SeatPackages({ groupId, testMode }: { groupId?: string; testMode?: boolean }) {
  const plan = getPlan(SEAT_PACKAGES[0].planId);
  const retail = PLANS.find((p) => p.id === plan?.id)?.priceCzk;
  return (
    <div>
      <ul className="space-y-2">
        {SEAT_PACKAGES.map((pkg) => {
          const perSeat = pricePerSeat(pkg);
          const saving = retail ? Math.round((1 - perSeat / retail) * 100) : null;
          return (
            <li
              key={pkg.id}
              className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl px-4 py-3 ring-1 ${pkg.highlight ? "ring-2 ring-brand-500" : "ring-stone-200"}`}
            >
              <div className="min-w-0">
                <div className="font-semibold">{pkg.seats} kódů</div>
                <div className="text-xs text-stone-500">
                  <span className="font-mono">{czk(perSeat)}</span> za studenta
                  {saving !== null && saving > 0 && <> · sleva {saving} %</>}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="font-mono text-lg font-bold">{czk(pkg.priceCzk)}</span>
                {groupId && (
                  <form action={startSeatCheckout}>
                    <input type="hidden" name="groupId" value={groupId} />
                    <input type="hidden" name="packageId" value={pkg.id} />
                    <SubmitButton className={`${pkg.highlight ? "btn-primary" : "btn-secondary"} py-2`} pendingLabel="Moment…">
                      Koupit<span className="sr-only"> {pkg.seats} kódů</span>
                    </SubmitButton>
                  </form>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-stone-500">
        Každý kód aktivuje jednomu studentovi přístup na {plan?.name ?? "2 měsíce"} (běžná cena {retail ? czk(retail) : "–"}, sleva je počítaná z ní). Platba je jednorázová, nevyužité kódy zůstávají ve skupině k dispozici.
        {testMode && " Testovací režim: kódy se vygenerují bez platby."}
      </p>
    </div>
  );
}
