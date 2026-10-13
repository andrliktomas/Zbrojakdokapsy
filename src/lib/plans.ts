export type Plan = {
  id: string;
  name: string;
  days: number;
  priceCzk: number;
  highlight?: boolean;
  tagline: string;
};

// Ceny jsou zatím orientační – upravte podle obchodního modelu.
export const PLANS: Plan[] = [
  { id: "3w", name: "3 týdny", days: 21, priceCzk: 299, tagline: "Rychlá příprava před termínem zkoušky" },
  { id: "1m", name: "1 měsíc", days: 30, priceCzk: 379, highlight: true, tagline: "Nejoblíbenější – pohodové tempo" },
  { id: "2m", name: "2 měsíce", days: 60, priceCzk: 549, tagline: "Pro důkladnou přípravu" },
  { id: "3m", name: "3 měsíce", days: 90, priceCzk: 690, tagline: "Bez stresu, s rezervou" },
];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

/** Nový balíček navazuje na konec stávajícího, pokud ještě běží. */
export function computeAccessWindow(plan: Plan, currentEnd: Date | null, now = new Date()) {
  const startsAt = currentEnd && currentEnd > now ? currentEnd : now;
  const endsAt = new Date(startsAt.getTime() + plan.days * 24 * 60 * 60 * 1000);
  return { startsAt, endsAt };
}
