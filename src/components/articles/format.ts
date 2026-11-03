/** Datum ve tvaru „3. listopadu 2026“ (ISO datum se bere jako UTC, aby se neposunulo). */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** České tvary podle počtu: 1 otázka, 2–4 otázky, 5+ otázek. */
export function plural(n: number, one: string, few: string, many: string): string {
  const word = n === 1 ? one : n >= 2 && n <= 4 ? few : many;
  return `${n} ${word}`;
}
