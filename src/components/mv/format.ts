/** Čísla → souvislé rozsahy, např. [1,2,3,7] → "1–3, 7". */
export function numRanges(nums: number[]) {
  const sorted = [...nums].sort((a, b) => a - b);
  const out: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i];
    while (i + 1 < sorted.length && sorted[i + 1] === sorted[i] + 1) i++;
    out.push(start === sorted[i] ? `${start}` : `${start}–${sorted[i]}`);
  }
  return out.join(", ");
}

/** Česká množná čísla: plural(5, ["otázka", "otázky", "otázek"]) → "otázek". */
export function plural(n: number, forms: [string, string, string]) {
  if (n === 1) return forms[0];
  if (n >= 2 && n <= 4) return forms[1];
  return forms[2];
}

export const LETTERS = ["a", "b", "c"];
