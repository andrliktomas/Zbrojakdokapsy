import type { Article } from "./types";

// Fakta: docs/research/legislativa.md kap. 1.4; zákon č. 90/2024 Sb. § 4–9, § 72, § 78, § 134, přílohy č. 1 a 2;
// soubor MV ot. č. 18–22, 530, 551.

export const article: Article = {
  slug: "kategorie-zbrani-a-streliva",
  title: "Kategorie zbraní R1–R4, PO, NO a střeliva S1–S4 přehledně",
  metaTitle: "Kategorie zbraní R1–R4, PO, NO a střeliva S1–S4",
  description:
    "Kategorie zbraní a střeliva podle § 4 a přílohy č. 2 zákona č. 90/2024 Sb.: co patří do R1 až R4, PO a NO, kdo s nimi smí nakládat a co znamená S1 až S4.",
  perex:
    "Místo dřívějších kategorií A až D dělí zákon č. 90/2024 Sb. zbraně do šesti kategorií a střelivo do čtyř. Otázky na kategorie u zkoušky nechybí a na kategorii závisí i to, jaké povolení ke konkrétní zbrani potřebujete. Přehled vychází z § 4, § 7 a přílohy č. 2 zákona.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["kategorie", "opravneni"],
  summary: [
    "Zbraně: R1, R2, R3 a R4 podléhají registraci, PO ohlášení a NO ani jednomu (§ 4 odst. 1).",
    "Zakázané jsou zbraně R1 a R2 a střelivo S1 a S2.",
    "Držitel zbrojního oprávnění smí mít R4 bez dalšího povolení, R3 s povolením R3, R2 s výjimkou R2; výjimku R1 dostat nemůže.",
    "Běžné pistole a revolvery jsou R3, opakovací kulovnice a brokové kozlice R4.",
    "Běžné náboje včetně poloplášťových (SP) jsou S3; do S2 patří deformační a fragmentační náboje pro krátké zbraně a svítící náboje.",
  ],
  sections: [
    {
      id: "princip",
      heading: "Jak kategorie fungují",
      blocks: [
        {
          type: "p",
          text: "Zbraně se dělí do kategorií R1, R2, R3, R4, PO a NO (§ 4 odst. 1). Písmeno R znamená registraci v centrálním registru zbraní, PO jsou zbraně podléhající ohlášení a NO zbraně, které ohlášení nepodléhají. Zakázané jsou kategorie R1 a R2. „Zakázaná“ ale neznamená nedostupná – jen to, že k ní potřebujete výjimku nebo zbrojní licenci.",
        },
        {
          type: "p",
          text: "Konkrétní druhy zbraní a střeliva přiřazuje ke kategoriím příloha č. 2 zákona (§ 4 odst. 3). Pokud lze zbraň zařadit do více kategorií, platí ta nejpřísnější, s výjimkou historických a neaktivních zbraní (§ 5 odst. 1). Zbraň, která v příloze chybí, patří do stejné kategorie jako zbraň, které je konstrukcí, funkcí nebo účelem a účinkem nejbližší (§ 5 odst. 2). Neodstraní-li to pochybnosti, rozhodne Český úřad pro zkoušení zbraní a střeliva opatřením obecné povahy (§ 134).",
        },
      ],
    },
    {
      id: "zbrane",
      heading: "Kategorie zbraní v přehledu",
      blocks: [
        {
          type: "table",
          caption: "Kategorie zbraní podle přílohy č. 2 zákona č. 90/2024 Sb.",
          head: ["Kategorie", "Typické zbraně", "Kdo smí nakládat (§ 7)"],
          rows: [
            [
              "R1 (zakázaná)",
              "samočinné (automatické) zbraně, zákeřné zbraně, například maskované jako jiný předmět, a zbraně zvláště účinné",
              "držitel ZL1, případně ZL2 s výjimkou R1 (§ 46); držitel zbrojního oprávnění ne",
            ],
            [
              "R2 (zakázaná)",
              "samonabíjecí zbraň se středovým zápalem s nadlimitním zásobníkem, samonabíjecí zbraň upravená ze samočinné, dlouhá samonabíjecí zbraň se sklopnou pažbou zkrátitelná pod 600 mm",
              "ZL1; držitel ZO nebo ZL2 s výjimkou R2 na každý kus (§ 48)",
            ],
            [
              "R3",
              "krátké samonabíjecí a opakovací zbraně (běžné pistole a revolvery), samonabíjecí dlouhé zbraně pro více než 3 náboje, krátké jednotlivě nabíjené zbraně se středovým zápalem",
              "ZL1; držitel ZO nebo ZL2 s povolením R3 na každý kus (§ 50)",
            ],
            [
              "R4",
              "opakovací kulovnice a malorážky, brokové kozlice a dvojky a další palné zbraně, které nepatří do jiné kategorie",
              "držitel ZO nebo zbrojní licence bez dalšího povolení",
            ],
            [
              "PO",
              "poplašné a signalizační zbraně, signální zbraně do ráže 16 mm, jednoranové a dvouranové zbraně pro dělené střelivo, zbraně znehodnocené podle předpisu EU, laserové značkovače, které mohou oslepit",
              "držitel ZO, zbrojní licence nebo zapsané autorizace; nabytí se ohlašuje (§ 72)",
            ],
            [
              "NO",
              "expanzní přístroje, historické zbraně (vyrobené do 31. 12. 1890), plynové zbraně do ráže 6,35 mm, airsoftové a paintballové zbraně",
              "každá plně svéprávná zletilá osoba s pobytem v ČR",
            ],
          ],
        },
        {
          type: "note",
          tone: "tip",
          title: "Hranice mezi R3 a R4",
          text: "Samonabíjecí dlouhá zbraň s drážkovaným vývrtem patří do R4 jen tehdy, když její zásobník a nábojová komora pojmou dohromady nejvýše 3 náboje a nelze ji běžně dostupnými nástroji upravit na vyšší kapacitu (soubor MV, ot. č. 530). Jinak jde o R3 (příloha č. 2 body 1.3.2 a 1.3.3).",
        },
      ],
    },
    {
      id: "definice",
      heading: "Krátká, dlouhá zbraň a nadlimitní zásobník",
      blocks: [
        {
          type: "list",
          items: [
            "Krátká zbraň má celkovou délku nejvýše 600 mm, nebo hlaveň nejvýše 300 mm – stačí splnit jednu z podmínek. Dlouhá je každá palná zbraň, která není krátká (příloha č. 1).",
            "Nadlimitní zásobník pojme u zbraní se středovým zápalem více než 20 nábojů u krátké nebo více než 10 nábojů u dlouhé zbraně. Samonabíjecí zbraň s ním patří do R2; se samotným zásobníkem se nakládá přiměřeně podle pravidel pro střelivo S2 (§ 9 odst. 5).",
            "Tlumič hluku výstřelu je regulovaná součást a nakládá se s ním podle pravidel pro kategorii R4 (§ 9 odst. 4).",
            "Historická zbraň je zbraň, která byla včetně všech hlavních částí vyrobena nejpozději 31. 12. 1890. Patří do kategorie NO.",
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "Spojka „nebo“ u krátké zbraně je častý chyták. Puška s hlavní dlouhou nejvýše 300 mm je krátká zbraň, i když je celkově delší než 600 mm.",
        },
      ],
    },
    {
      id: "strelivo",
      heading: "Kategorie střeliva S1 až S4",
      blocks: [
        {
          type: "table",
          caption: "Kategorie střeliva podle přílohy č. 2 zákona č. 90/2024 Sb.",
          head: ["Kategorie", "Co sem patří", "Kdo smí nakládat (§ 8)"],
          rows: [
            [
              "S1 (zakázané)",
              "náboje s výbušnou, zápalnou nebo průbojnou střelou, náboje nezjistitelné detekčními a rentgenovými přístroji",
              "ZL1; ZL2 s výjimkou S1; držitel zbrojního oprávnění ne",
            ],
            [
              "S2 (zakázané)",
              "náboje pro krátké zbraně se střelou s řízenou deformací nebo fragmentací určenou ke zvýšení ranivého účinku, náboje se svítící střelou",
              "ZL1; držitel ZO nebo ZL2 s výjimkou S2",
            ],
            [
              "S3",
              "běžné náboje s jednotnou nebo hromadnou střelou, cvičné náboje, signální náboje nad ráži 16 mm",
              "kdo smí nakládat se zbraněmi R1 až R4, tedy i držitel ZO",
            ],
            [
              "S4",
              "aktivní komponenty (zápalky, prach, střely kromě výbušných, zápalných a svítících), nábojky, signální náboje do ráže 16 mm",
              "plně svéprávná zletilá osoba s pobytem v ČR, držitel ZO nebo zbrojní licence",
            ],
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "Běžné náboje s poloplášťovou (SP) střelou nejsou zakázané S2, ale S3 (soubor MV, ot. č. 551). Do S2 patří jen náboje pro krátké zbraně se střelou s řízenou deformací nebo fragmentací, která má vyvolat zvýšený ranivý účinek.",
        },
      ],
    },
    {
      id: "zapamatovat",
      heading: "Jak si kategorie zapamatovat",
      blocks: [
        {
          type: "list",
          items: [
            "R1 a R2 = zakázané, potřebujete výjimku; výjimku R1 držitel zbrojního oprávnění nedostane.",
            "R3 = povolení na každý kus.",
            "R4 = stačí zbrojní oprávnění.",
            "PO = nabytí ohlásit do 10 pracovních dnů, zbraň se nepředkládá (§ 72).",
            "NO = bez ohlášení; stačí zletilost, plná svéprávnost a pobyt v ČR.",
          ],
        },
        {
          type: "p",
          text: [
            "Staré kategorie A až D lze s novými srovnávat jen orientačně a u zkoušky se ptají výhradně na nové. Co z kategorie vyplývá pro ohlašování, přenechání a zabezpečení, shrnuje článek ",
            { text: "Lhůty a čísla, která musíte znát ke zkoušce", href: "/clanky/lhuty-a-cisla-ke-zkousce" },
            ".",
          ],
        },
        {
          type: "topic",
          topic: "kategorie",
          text: "Kategorie zbraní a střeliva, definice, regulované součásti a starší zbraně v pěti lekcích, s kartičkami a otázkami.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Do jaké kategorie patří běžná pistole?",
      a: "Krátké samonabíjecí a opakovací palné zbraně patří do kategorie R3 (příloha č. 2 bod 1.3.1 zákona č. 90/2024 Sb.). Držitel zbrojního oprávnění k nim potřebuje povolení R3, a to na každý kus. Pistole se středovým zápalem s nadlimitním zásobníkem (více než 20 nábojů) patří do kategorie R2.",
    },
    {
      q: "Co mohu mít jen se zbrojním oprávněním, bez dalšího povolení?",
      a: "Zbraně kategorie R4, například opakovací kulovnice, malorážky, brokové kozlice a dvojky, dále tlumič hluku výstřelu, zbraně kategorie PO (jejich nabytí se jen ohlašuje) a střelivo S3 a S4.",
    },
    {
      q: "Které střelivo je zakázané?",
      a: "Zakázané je střelivo kategorií S1 a S2 (§ 4 odst. 2 zákona č. 90/2024 Sb.). Držitel zbrojního oprávnění smí se S2 nakládat jen na základě výjimky S2, se S1 vůbec.",
    },
    {
      q: "Musím ohlašovat airsoftovou zbraň?",
      a: "Ne. Airsoftové a paintballové zbraně patří do kategorie NO, která ohlášení nepodléhá. Přenechat je lze i osobě od 15 let se souhlasem jejího zákonného zástupce (§ 78 odst. 5 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Kdo rozhodne, když není jasné, kam zbraň patří?",
      a: "Zbraň se zařadí podle té, která je jí v příloze č. 2 zákona nejbližší. Pokud pochybnost přetrvá, zařadí zbraň nebo střelivo do kategorie Český úřad pro zkoušení zbraní a střeliva opatřením obecné povahy (§ 5 odst. 2 a § 134).",
    },
  ],
  sources: [
    "Zákon č. 90/2024 Sb., o zbraních a střelivu (§ 4–9, § 46–50, § 72, § 78, § 134, přílohy č. 1 a 2)",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025 (ot. č. 18–22, 530, 551)",
  ],
  related: ["obecne-vs-rozsirene-zbrojni-opravneni", "lhuty-a-cisla-ke-zkousce", "jak-ziskat-zbrojni-opravneni"],
};
