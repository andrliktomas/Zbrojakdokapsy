const NBSP = " ";

/**
 * Česká typografie pro zobrazení: nezlomitelné mezery za jednopísmennými předložkami a spojkami,
 * za „§“ a zkratkami (č., odst., písm., ot.), v datech, mezi číslem a jednotkou a v tisících (3 000).
 * Používá se jen pro vykreslený text, ne pro strukturovaná data.
 */
export function typo(text: string): string {
  return text
    .replace(/(?<=^|[\s(„–])([vkzouaiVKSZOUAI]) /g, `$1${NBSP}`)
    // „s“ za číslem je jednotka (10 s), ne předložka.
    .replace(/(?<=^|[\s(„–])(?<!\d[  ])s /g, `s${NBSP}`)
    .replace(/§ /g, `§${NBSP}`)
    // JS \b nebere „č“ jako písmeno, proto lookbehind místo \b.
    .replace(/(?<=^|[\s(;,])(č|odst|písm|ot|čl|zák|bod|body)\. (?=[\p{L}\p{N}])/gu, `$1.${NBSP}`)
    .replace(/(§ \d+[a-z]?) (?=(odst|písm)\.)/g, `$1${NBSP}`)
    .replace(/(\d{1,2})\. (\d{1,2})\. (\d{4})/g, `$1.${NBSP}$2.${NBSP}$3`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`)
    .replace(
      /(\d) (?=(Kč|mm|m|kg|s|min|minut|minuty|let|roky|roku|dnů|dní|dny|hodiny|hodin|měsíců|nábojů|zbraní|ran|zásahů|otázek|kusů)(?![\p{L}]))/gu,
      `$1${NBSP}`,
    );
}
