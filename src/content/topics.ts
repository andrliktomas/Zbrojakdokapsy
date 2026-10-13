import type { Topic } from "./types";

// Taxonomie podle rešerše (docs/research/legislativa.md, kap. 5) a oddílů souboru testových otázek MV ČR.
export const TOPICS: Topic[] = [
  { slug: "zaklady", title: "Základy zákona a obecné povinnosti", icon: "⚖️", free: true,
    summary: "Co zákon č. 90/2024 Sb. upravuje, co je nakládání a nošení zbraně a jaké povinnosti má každý – i bez oprávnění." },
  { slug: "kategorie", title: "Kategorie zbraní a střeliva", icon: "🗂️",
    summary: "Nové kategorie R1–R4, PO, NO a S1–S4, krátká vs. dlouhá zbraň, nadlimitní zásobník, regulované součásti." },
  { slug: "opravneni", title: "Zbrojní oprávnění", icon: "🪪",
    summary: "Obecné a rozšířené zbrojní oprávnění, podmínky (věk, zdraví, bezúhonnost, spolehlivost), pozastavení, odnětí a zánik." },
  { slug: "zkouska", title: "Zkouška odborné způsobilosti", icon: "📋", free: true,
    summary: "Jak zkouška probíhá: zkušební komisař, teoretický test, praktická část, střelba, opakování a poplatky." },
  { slug: "nakladani", title: "Registrace a nakládání v praxi", icon: "🗃️",
    summary: "Centrální registr zbraní, ohlašovací lhůty, přenechání a svěření, nošení, zabezpečení, přeprava a přestupky." },
  { slug: "strelnice", title: "Střelnice", icon: "🎯",
    summary: "Stálé a příležitostné střelnice, zkoušková střelnice, provozní řád a správce střelnice." },
  { slug: "nauka", title: "Nauka o zbraních a střelivu", icon: "🔩",
    summary: "Konstrukce pistolí, revolverů a dlouhých zbraní, mechanismy, náboje, ráže, balistika a zkušební značky." },
  { slug: "bezpecna-manipulace", title: "Bezpečné zacházení se zbraní", icon: "🦺",
    summary: "Základní bezpečnostní pravidla, kontrola zbraně, řešení závad a postupy z praktické části zkoušky." },
  { slug: "trestni-pravo", title: "Nutná obrana a krajní nouze", icon: "🛡️",
    summary: "§ 28 a § 29 trestního zákoníku, přiměřenost obrany, nedovolené ozbrojování a související předpisy." },
  { slug: "zdravoveda", title: "Zdravotnické minimum", icon: "🩹",
    summary: "První pomoc: masivní krvácení, zaškrcovadlo, bezvědomí, resuscitace, střelná poranění a další stavy." },
];
