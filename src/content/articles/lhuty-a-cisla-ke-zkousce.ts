import type { Article } from "./types";

// Fakta: docs/research/legislativa.md kap. 1.5–1.8, 2.1–2.4; zákon č. 90/2024 Sb.; NV č. 187/2025 Sb. a 238/2025 Sb.;
// soubor MV ot. č. 58–60, 91, 92, 336, 586, 598–602, 606, 607.

export const article: Article = {
  slug: "lhuty-a-cisla-ke-zkousce",
  title: "Lhůty a čísla, která musíte znát ke zkoušce",
  metaTitle: "Lhůty a čísla ke zkoušce na zbrojní oprávnění",
  description:
    "Lhůty a čísla ke zkoušce podle zákona č. 90/2024 Sb.: 10 pracovních dnů, 30 dnů přenechání, 21 let a 3 roky, posudek na 5 let, 90 dnů, 4 hodiny ve vozidle.",
  perex:
    "Velká část testových otázek se ptá na konkrétní čísla: lhůty, věkové hranice, počty zbraní a nábojů. Sepsali jsme je na jedno místo, roztříděné podle témat a vždy s ustanovením, ze kterého vycházejí. Hodí se jako tahák na opakování.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["nakladani", "zkouska"],
  summary: [
    "10 pracovních dnů: ohlášení nabytí a převodu zbraně a odevzdání zbraní po pozastavení či zániku oprávnění.",
    "12 měsíců: lhůta na složení zkoušky i na naložení se zbraní, než připadne státu.",
    "5 let: platnost lékařského posudku a prověření podmínek; posudek k žádosti nesmí být starší 90 dnů.",
    "30 dnů: nejdelší přenechání zbraně R4. Dohled nad nezletilým: 21 let věku a oprávnění déle než 3 roky.",
    "Vozidlo: nejvýše 4 hodiny, 2 zbraně a 1 000 nábojů.",
  ],
  sections: [
    {
      id: "zkouska",
      heading: "Čísla ke zkoušce",
      blocks: [
        {
          type: "table",
          caption: "Čísla ke zkoušce odborné způsobilosti",
          head: ["Číslo", "Co znamená", "Ustanovení"],
          rows: [
            ["30 / 40 min", "počet otázek testu a časový limit", "§ 20 odst. 3 písm. a)"],
            ["26 / 28", "nejméně správných odpovědí pro obecné / rozšířené oprávnění", "§ 20 odst. 3 písm. a)"],
            ["17 / 5 / 5 / 3", "skladba testu: právo, nauka o zbraních, bezpečné zacházení, zdravověda", "§ 12 odst. 2 NV č. 238/2025 Sb."],
            ["500 mm", "průměr kruhového terče", "§ 20 odst. 3 písm. c)"],
            ["10 m / 25 m", "vzdálenost pro krátkou / dlouhou kulovou zbraň, vždy 5 ran", "§ 20 odst. 3 písm. c)"],
            ["5 minut", "časový limit celé střelby", "§ 20 odst. 3 písm. c)"],
            ["6 / 8", "nejméně zásahů z 10 ran pro obecné / rozšířené oprávnění", "§ 20 odst. 3 písm. c)"],
            ["3", "zkušební výstřely z každé zbraně před hodnocenou střelbou", "§ 22 odst. 3 NV č. 238/2025 Sb."],
            ["10 s", "nejkratší doba vyčkání u selhače", "příloha č. 2 NV č. 238/2025 Sb.; soubor MV, ot. č. 586"],
            ["12 měsíců", "lhůta na úspěšné složení zkoušky od zápisu do CRZ; jedno opakování", "§ 24 odst. 2"],
            ["60 dnů", "termín komisionální zkoušky zpravidla alespoň jednou za 60 dnů", "§ 25 odst. 4"],
            ["14 dní", "nejpozději tehdy střelnice zveřejní značky a modely zkouškových zbraní", "§ 43 odst. 1 NV č. 238/2025 Sb."],
            ["3 000 / 2 400 Kč", "správní poplatek za žádost / při podání přes Podací portál MV", "položka 30 bod 1 a § 9 zák. č. 634/2004 Sb."],
          ],
        },
      ],
    },
    {
      id: "vek-a-podminky",
      heading: "Věk, posudek a bezúhonnost",
      blocks: [
        {
          type: "table",
          caption: "Čísla k podmínkám zbrojního oprávnění",
          head: ["Číslo", "Co znamená", "Ustanovení"],
          rows: [
            ["18 let", "obecné oprávnění (zletilost)", "§ 14 odst. 1 písm. b)"],
            ["21 let", "rozšířené oprávnění", "§ 14 odst. 1 písm. c)"],
            ["15 let", "výjimečně obecné oprávnění (střední škola, sportovně-střelecký spolek)", "§ 14 odst. 1 písm. a)"],
            ["5 let", "platnost lékařského posudku, pokud lékař neurčí kratší", "§ 15 odst. 2"],
            ["90 dnů", "nejvyšší stáří posudku k žádosti; novou prohlídku lze absolvovat nejdříve 90 dnů před koncem platnosti", "zák. č. 373/2011 Sb.; soubor MV, ot. č. 91, 92"],
            ["3 roky", "nejkratší lhůta bezúhonnosti (podmíněné odsouzení, jiný trest než odnětí svobody, nedbalostní čin se zbraní)", "§ 18 odst. 1"],
            ["30 let", "nejdelší časově omezená lhůta bezúhonnosti: úmyslný násilný čin nebo čin se zbraní s trestem nad 5 let", "§ 18 odst. 2"],
            ["3 roky", "spolehlivost: období, ve kterém se sledují vybrané přestupky (více než 1) a podmíněné zastavení stíhání", "§ 19"],
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "Nepředložení nového posudku nevede k automatickému zániku oprávnění, ale je důvodem k jeho pozastavení (§ 15 odst. 3, § 21 odst. 1 písm. b)).",
        },
      ],
    },
    {
      id: "nakladani",
      heading: "Ohlašování, přenechání a svěření",
      blocks: [
        {
          type: "table",
          caption: "Lhůty při nakládání se zbraněmi",
          head: ["Číslo", "Co znamená", "Ustanovení"],
          rows: [
            ["10 pracovních dnů", "ohlášení nabytí zbraně R1 až R4 a její předložení k prohlídce; ohlášení převodu", "§ 70 odst. 1 a 2"],
            ["10 pracovních dnů", "ohlášení nabytí a převodu zbraně PO; zbraň se nepředkládá", "§ 72"],
            ["neprodleně", "ohlášení ztráty nebo odcizení zbraně R1 až R4 nebo PO a použití zbraně k ostré střelbě v nutné obraně či krajní nouzi", "soubor MV, ot. č. 58–60"],
            ["30 dnů", "nejdelší přenechání zbraně R4 držiteli zbrojního oprávnění (po sobě jdoucích)", "§ 78 odst. 3 písm. c)"],
            ["21 let + 3 roky", "dohled nad osobou mladší 18 let bez oprávnění, které je svěřena zbraň R2 až R4: dohlížející dosáhl 21 let a má oprávnění déle než 3 roky", "§ 79 odst. 3 písm. c)"],
            ["15 let", "přenechání airsoftové, paintballové nebo jiné plynové zbraně NO, se souhlasem zákonného zástupce", "§ 78 odst. 5"],
            ["10 pracovních dnů", "odevzdání zbraní a střeliva po pozastavení nebo zániku oprávnění", "§ 125 odst. 1"],
            ["12 měsíců", "nenaloží-li vlastník do té doby se zbraní, připadne státu", "§ 125 odst. 3"],
            ["5 let / 10 let", "KŘP prověří podmínky alespoň jednou za 5 let a k předložení zbraní vyzve alespoň jednou za 10 let", "§ 145"],
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "Lhůta 10 dnů se počítá v pracovních dnech, ne v kalendářních. U ztráty, odcizení a použití zbraně v nutné obraně žádná lhůta neplatí – hlásí se neprodleně.",
        },
      ],
    },
    {
      id: "zabezpeceni",
      heading: "Zabezpečení doma a ve vozidle",
      blocks: [
        {
          type: "table",
          caption: "Zabezpečení zbraní podle § 83 zákona a NV č. 187/2025 Sb.",
          head: ["Počet", "Způsob zabezpečení", "Ustanovení"],
          rows: [
            ["do 10 zbraní", "uzamčená ocelová schránka, ocelová skříň nebo zvláštní uzamčené zařízení; střelivo do 10 000 nábojů", "§ 83 odst. 2 a 3"],
            ["11 až 20 zbraní", "uzamčený skříňový trezor, uzamčená místnost nebo objekt; 10 001 až 20 000 nábojů", "§ 83 odst. 2 a 3"],
            ["více než 20 zbraní", "trezor, místnost nebo objekt chráněné elektronickým zabezpečovacím zařízením; nad 20 000 nábojů", "§ 83 odst. 2 a 3"],
            ["2 zbraně / 1 000 nábojů", "„vhodným způsobem“ lze zabezpečit nejvýše 2 zbraně R2 až R4 nebo 1 000 nábojů S2 a S3, například při dočasném uložení v obydlí", "§ 83 odst. 4; soubor MV, ot. č. 340, 341"],
            ["4 hodiny", "nejdelší krátkodobé uložení ve vozidle, nejvýše 2 zbraně a 1 000 nábojů v zamčené schránce upevněné ke karoserii", "NV č. 187/2025 Sb.; soubor MV, ot. č. 598–602"],
          ],
        },
        {
          type: "p",
          text: "Rozhoduje počet současně ukládaných zbraní, například v jedné schránce nebo trezoru, ne celkový počet zbraní, se kterými nakládáte (soubor MV, ot. č. 336). Ve vozidle musí být zbraň nenabitá, střelivo uložené odděleně, okna zavřená a vozidlo zamčené; dlouhodobé uložení ve vozidle zákon nepřipouští (ot. č. 599–602).",
        },
      ],
    },
    {
      id: "ostatni",
      heading: "Přeprava, cesty a definice",
      blocks: [
        {
          type: "list",
          items: [
            "Přepravu více než 100 zbraní nebo více než 200 000 nábojů je nutné ohlásit přes CRZ nejméně 1 hodinu předem (§ 111).",
            "Evropský zbrojní pas se vydává na 5 let a lze ho prodloužit o dalších 5 let (§ 102 odst. 3).",
            "Fyzická osoba bez zbrojní licence smí mít nejvýše 10 kg bezdýmného prachu, 3 kg černého prachu, 15 000 zápalek pro kulové a 10 000 pro brokové náboje a 15 000 perkusních zápalek; limity se nesčítají (NV č. 187/2025 Sb.; soubor MV, ot. č. 606, 607).",
            "Krátká zbraň: celková délka nejvýše 600 mm nebo hlaveň nejvýše 300 mm. Nadlimitní zásobník: více než 20 nábojů u krátké a více než 10 u dlouhé zbraně (příloha č. 1).",
            "Historická zbraň: vyrobená nejpozději 31. 12. 1890 (kategorie NO).",
          ],
        },
        {
          type: "topic",
          topic: "nakladani",
          text: "Registrace a CRZ, přenechání a svěření, nošení, zabezpečení a přeprava – výklad v šesti lekcích s kartičkami.",
        },
      ],
    },
    {
      id: "jak-se-naucit",
      heading: "Jak se čísla naučit",
      blocks: [
        {
          type: "p",
          text: "Čísla se nejlépe učí opakováním v krátkých dávkách. Pomůže seskupit je do „rodin“: 10 pracovních dnů pro ohlašování a odevzdání, 12 měsíců pro zkoušku a pro propadnutí zbraně státu, 5 let pro posudek a prověrku. U zkoušky si dejte pozor na přívlastky: „pracovních“ dnů, „po sobě jdoucích“ dnů, „déle než“ 3 roky.",
        },
        {
          type: "p",
          text: [
            "V aplikaci Zbroják do kapsy najdete čísla v učebních kartičkách s Leitnerovým systémem – kartičky, které umíte, se vracejí méně často, chybné častěji. Kategorie zbraní, na které se lhůty vážou, shrnuje článek ",
            { text: "Kategorie zbraní R1–R4, PO, NO a střeliva S1–S4", href: "/clanky/kategorie-zbrani-a-streliva" },
            ".",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Do kdy musím ohlásit koupi zbraně?",
      a: "Nabytí zbraně podléhající registraci ohlásíte krajskému ředitelství policie do 10 pracovních dnů ode dne, kdy jste se zbraní začali nakládat, a zbraň předložíte k prohlídce (§ 70 odst. 1 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Jak dlouho platí lékařský posudek?",
      a: "Zpravidla 5 let (§ 15 odst. 2 zákona č. 90/2024 Sb.). K žádosti nesmí být starší 90 dnů a novou prohlídku lze absolvovat nejdříve 90 dnů před koncem platnosti dosavadního posudku.",
    },
    {
      q: "Na jak dlouho mohu přenechat zbraň jinému držiteli zbrojního oprávnění?",
      a: "Zbraň kategorie R4 nejvýše na 30 po sobě jdoucích dnů (§ 78 odst. 3 písm. c) zákona č. 90/2024 Sb.). Jiné přenechání zbraně podléhající registraci zákon umožňuje jen ve zvláštních případech, například vedlejšímu držiteli zbraně.",
    },
    {
      q: "Jak dlouho smí zbraň zůstat v autě?",
      a: "Krátkodobě, nejvýše 4 hodiny, a to nejvýše 2 zbraně a 1 000 nábojů v zamčené schránce upevněné ke karoserii, zvenku neviditelné. Zbraň musí být nenabitá a střelivo uložené odděleně (nařízení vlády č. 187/2025 Sb.).",
    },
    {
      q: "Kdo může dohlížet na nezletilého střelce?",
      a: "Pokud je zbraň R2, R3 nebo R4 svěřena osobě mladší 18 let bez zbrojního oprávnění, dohled musí zajišťovat osoba, která dosáhla 21 let a je držitelem zbrojního oprávnění déle než 3 roky (§ 79 odst. 3 písm. c) zákona č. 90/2024 Sb.).",
    },
  ],
  sources: [
    "Zákon č. 90/2024 Sb., o zbraních a střelivu (§ 14–25, § 70–83, § 102, § 111, § 125, § 145, přílohy č. 1 a 2)",
    "Nařízení vlády č. 187/2025 Sb. (zabezpečení zbraní a střeliva)",
    "Nařízení vlády č. 238/2025 Sb., o provádění zkoušek",
    "Zákon č. 634/2004 Sb., o správních poplatcích",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025",
  ],
  related: ["zkouska-odborne-zpusobilosti", "kategorie-zbrani-a-streliva", "jak-ziskat-zbrojni-opravneni"],
};
