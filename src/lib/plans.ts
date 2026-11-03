export type Plan = {
  id: string;
  name: string;
  days: number;
  priceCzk: number;
  highlight?: boolean;
  tagline: string;
  /** Interní balíček (bonus za doporučení) – nelze koupit přes ceník. */
  internal?: boolean;
};

// Ceny jsou zatím orientační – upravte podle obchodního modelu.
export const PLANS: Plan[] = [
  { id: "3w", name: "3 týdny", days: 21, priceCzk: 299, tagline: "Rychlá příprava před termínem zkoušky" },
  { id: "1m", name: "1 měsíc", days: 30, priceCzk: 379, highlight: true, tagline: "Nejoblíbenější – pohodové tempo" },
  { id: "2m", name: "2 měsíce", days: 60, priceCzk: 549, tagline: "Pro důkladnou přípravu" },
  { id: "3m", name: "3 měsíce", days: 90, priceCzk: 690, tagline: "Bez stresu, s rezervou" },
];

/**
 * Interní balíčky, které se připisují bez platby (bonusy za doporučení).
 * Nejsou v PLANS, takže se nezobrazují v ceníku; getPlan je ale najde,
 * aby se v historii nákupů ukázal srozumitelný název.
 */
export const INTERNAL_PLANS: Plan[] = [
  { id: "bonus_referrer", name: "Bonus za doporučení", days: 7, priceCzk: 0, internal: true, tagline: "Kamarád si přes váš odkaz aktivoval přístup" },
  { id: "bonus_referred", name: "Bonus za registraci s doporučením", days: 7, priceCzk: 0, internal: true, tagline: "Dny navíc k prvnímu přístupu" },
];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id) ?? INTERNAL_PLANS.find((p) => p.id === id);
}

/** Jen balíčky, které si uživatel může sám koupit (pro checkout). */
export function getPurchasablePlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id && !p.internal);
}

// --- Balíčky míst pro instruktory a střelnice (aktivační kódy) ---

export type SeatPackage = {
  id: string;
  seats: number;
  /** Celková cena balíčku v Kč (vč. DPH, stejně jako PLANS). */
  priceCzk: number;
  /** Balíček přístupu, který aktivuje každý kód (musí existovat v PLANS). */
  planId: string;
  highlight?: boolean;
};

// CENY K POTVRZENÍ MAJITELEM – návrh množstevní slevy oproti 2měsíčnímu balíčku (549 Kč):
// 10 kódů = 349 Kč/kód, 20 kódů = 299 Kč/kód, 50 kódů = 249 Kč/kód.
export const SEAT_PACKAGES: SeatPackage[] = [
  { id: "seats10", seats: 10, priceCzk: 3490, planId: "2m" },
  { id: "seats20", seats: 20, priceCzk: 5980, planId: "2m", highlight: true },
  { id: "seats50", seats: 50, priceCzk: 12450, planId: "2m" },
];

export function getSeatPackage(id: string): SeatPackage | undefined {
  return SEAT_PACKAGES.find((p) => p.id === id);
}

export function pricePerSeat(pkg: SeatPackage) {
  return Math.round(pkg.priceCzk / pkg.seats);
}

/** Nový balíček navazuje na konec stávajícího, pokud ještě běží. */
export function computeAccessWindow(plan: Plan, currentEnd: Date | null, now = new Date()) {
  const startsAt = currentEnd && currentEnd > now ? currentEnd : now;
  const endsAt = new Date(startsAt.getTime() + plan.days * 24 * 60 * 60 * 1000);
  return { startsAt, endsAt };
}
