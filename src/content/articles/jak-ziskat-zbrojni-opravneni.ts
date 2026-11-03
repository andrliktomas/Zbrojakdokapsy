import type { Article } from "./types";

// Fakta: docs/research/legislativa.md kap. 1.2, 1.5, 1.6, 2.1, 2.4; zákon č. 90/2024 Sb. § 12–31, § 70, § 145–147.

export const article: Article = {
  slug: "jak-ziskat-zbrojni-opravneni",
  title: "Jak získat zbrojní oprávnění v roce 2026: postup krok za krokem",
  metaTitle: "Jak získat zbrojní oprávnění 2026: postup krok za krokem",
  description:
    "Postup k zbrojnímu oprávnění podle zákona č. 90/2024 Sb.: podmínky § 13–20, lékařský posudek, žádost za 3 000 Kč (online 2 400 Kč), zkouška a zápis do CRZ.",
  perex:
    "Od 1. 1. 2026 platí zákon č. 90/2024 Sb., o zbraních a střelivu. Zbrojní průkaz nahradilo zbrojní oprávnění vedené v centrálním registru zbraní. Projdeme celý postup od lékařského posudku po zápis do registru – u každého kroku s paragrafem, ze kterého vychází.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["opravneni", "zkouska"],
  summary: [
    "Podmínky stanoví § 13 odst. 1: pobyt v ČR, věk, plná svéprávnost, zdravotní způsobilost, bezúhonnost a spolehlivost a odborná způsobilost.",
    "Obecné oprávnění lze získat od zletilosti (18 let), rozšířené od 21 let, výjimečně obecné už od 15 let (§ 14).",
    "Lékařský posudek vydává praktický lékař, platí 5 let a k žádosti nesmí být starší 90 dnů.",
    "Správní poplatek je 3 000 Kč, při podání přes Podací portál MV 2 400 Kč.",
    "Na složení zkoušky máte 12 měsíců od zápisu do CRZ a jednou ji můžete opakovat (§ 24).",
  ],
  sections: [
    {
      id: "co-se-zmenilo",
      heading: "Co se od roku 2026 změnilo",
      blocks: [
        {
          type: "p",
          text: "Zákon č. 90/2024 Sb. je účinný od 1. 1. 2026 a nahradil zákon č. 119/2002 Sb. Pro žadatele je nejviditelnější změna, že fyzický zbrojní průkaz už nedostanete. O přiznání oprávnění se nevyhotovuje písemné rozhodnutí – krajské ředitelství policie (KŘP) jen zapíše údaj do centrálního registru zbraní (CRZ). Potvrzuje to i otázka č. 445 oficiálního souboru testových otázek Ministerstva vnitra.",
        },
        {
          type: "p",
          text: "Oprávnění pak prokazujete například zbrojním listem, tedy ověřeným výstupem z CRZ (§ 147), spolu s dokladem totožnosti. Další možnosti jsou elektronický přístup se zaručenou identitou nebo ověření u policie či u držitele zbrojní licence (§ 146).",
        },
        {
          type: "p",
          text: [
            "Zákon zná dva druhy oprávnění: obecné a rozšířené (§ 12). Rozšířené potřebujete hlavně ke skrytému nošení zbraně. Rozdíly podrobně vysvětluje článek ",
            { text: "Obecné vs. rozšířené zbrojní oprávnění", href: "/clanky/obecne-vs-rozsirene-zbrojni-opravneni" },
            ".",
          ],
        },
      ],
    },
    {
      id: "podminky",
      heading: "Podmínky podle § 13 až 20",
      blocks: [
        {
          type: "p",
          text: "Zbrojní oprávnění vydá KŘP žadateli, který splní všechny podmínky z § 13 odst. 1. Každou z nich pak podrobně upravuje samostatný paragraf:",
        },
        {
          type: "table",
          caption: "Podmínky zbrojního oprávnění",
          head: ["Podmínka", "Co znamená", "Ustanovení"],
          rows: [
            ["Pobyt", "místo pobytu na území ČR; občanství ČR se nevyžaduje", "§ 13 odst. 1 písm. a)"],
            ["Věk", "obecné ZO od zletilosti (zpravidla 18 let), rozšířené od 21 let; obecné výjimečně od 15 let", "§ 14"],
            ["Svéprávnost", "plná svéprávnost (výjimkou jsou 15letí žadatelé)", "§ 13 odst. 1 písm. c)"],
            ["Zdravotní způsobilost", "lékařský posudek; nemoci, které ji vylučují, stanoví NV č. 351/2025 Sb.", "§ 15 až 17"],
            ["Bezúhonnost a spolehlivost", "žádné odsouzení v zákonných lhůtách, žádné nadměrné požívání alkoholu ani vybrané opakované přestupky", "§ 18, § 19"],
            ["Odborná způsobilost", "úspěšně složená zkouška odborné způsobilosti", "§ 20"],
          ],
        },
        {
          type: "p",
          text: "Výjimka 15 let platí jen pro obecné oprávnění. Týká se žáka střední školy s výukou myslivosti, puškařství, sportovní střelby, v bezpečnostně-právní oblasti nebo vojenství a člena sportovně-střeleckého spolku, který je držitelem zbrojní licence. K žádosti je nutný písemný souhlas zákonného zástupce a školy nebo spolku (§ 14 odst. 2).",
        },
        {
          type: "p",
          text: "Bezúhonnost KŘP posuzuje podle opisu z evidence Rejstříku trestů (§ 144). Lhůty jsou odstupňované podle závažnosti činu, od 3 do 30 let; u činu, za který lze uložit výjimečný trest, platí bez časového omezení. K zahlazení odsouzení se nepřihlíží (§ 18 odst. 4).",
        },
        {
          type: "note",
          tone: "tip",
          text: "Cizinec, který není občanem státu EU ani NATO a nemá zvláštní postavení (například azyl nebo postavení dlouhodobě pobývajícího rezidenta), může být odmítnut z důvodu ochrany vnitřního pořádku a bezpečnosti, i když všechny podmínky splní (§ 13 odst. 2).",
        },
        {
          type: "topic",
          topic: "opravneni",
          text: "Bezúhonnost (§ 18) a spolehlivost (§ 19) podrobně, s tabulkou lhůt, kartičkami a otázkami k procvičení.",
        },
      ],
    },
    {
      id: "postup",
      heading: "Postup krok za krokem",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Lékařský posudek",
              text: "Posudek vydává váš registrující praktický lékař (§ 15 odst. 5), u 15letých žadatelů i praktický lékař pro děti a dorost. Platí 5 let, pokud lékař s ohledem na zdravotní stav neurčí dobu kratší (§ 15 odst. 2). K žádosti nesmí být starší 90 dnů; tuto lhůtu stanoví zákon č. 373/2011 Sb. (soubor MV, ot. č. 91). Posudek hradíte zvlášť, není součástí správního poplatku.",
            },
            {
              title: "Žádost a správní poplatek",
              text: "Žádost podáte krajskému ředitelství policie. Řízení vede KŘP podle místa vašeho pobytu, podat ji ale můžete u kteréhokoli KŘP. Přiložíte lékařský posudek (§ 15 odst. 3). Poplatek za přijetí žádosti je 3 000 Kč (položka 30 bod 1 sazebníku zákona č. 634/2004 Sb.). Při podání elektronickým formulářem přes Podací portál MV zaplatíte 2 400 Kč díky slevě 20 % podle § 9 téhož zákona.",
            },
            {
              title: "Zápis do CRZ a 12 měsíců na zkoušku",
              text: "Pokud splňujete všechny podmínky kromě odborné způsobilosti, KŘP zapíše do CRZ, že jste oprávněni ji prokázat, a vyrozumí vás (§ 24 odst. 1). Od tohoto dne máte 12 měsíců na úspěšné složení zkoušky (§ 24 odst. 2). Řízení o žádosti je mezitím přerušené (§ 24 odst. 4).",
            },
            {
              title: "Přihláška na termín",
              text: "Na konkrétní termín se hlásíte u provozovatele zapsané zkouškové střelnice a současně můžete být přihlášeni jen na jeden termín (§ 25 odst. 1). Použití střelnice platíte provozovateli podle jeho ceníku, odměnu zkušebního komisaře hradí policie (§ 31 odst. 1).",
            },
            {
              title: "Zkouška odborné způsobilosti",
              text: [
                "V teoretické části odpovídáte na 30 otázek nejdéle 40 minut; pro obecné oprávnění potřebujete alespoň 26 správných odpovědí, pro rozšířené 28 (§ 20 odst. 3 písm. a)). Následuje bezpečná manipulace se zbraní a střelba na kruhový terč o průměru 500 mm. Vše podrobně popisuje článek ",
                { text: "Jak probíhá zkouška odborné způsobilosti", href: "/clanky/zkouska-odborne-zpusobilosti" },
                ".",
              ],
            },
            {
              title: "Zápis výsledku a vznik oprávnění",
              text: "Výsledek zkoušky zapíše KŘP bez zbytečného odkladu do CRZ (§ 30 odst. 1). Písemné rozhodnutí o vydání oprávnění se nevyhotovuje; KŘP jen zapíše údaj o přiznání oprávnění do registru (soubor MV, ot. č. 445).",
            },
          ],
        },
      ],
    },
    {
      id: "neuspech",
      heading: "Když u zkoušky neuspějete",
      blocks: [
        {
          type: "p",
          text: "Zkoušku můžete v rámci 12měsíční lhůty jednou opakovat. Pokud neuspějete ani napodruhé, ale alespoň jednou jste prošli teoretickou částí, můžete ve stejné lhůtě vykonat komisionální zkoušku před tříčlennou komisí (§ 24 odst. 2 a 3, § 26 odst. 3). Na komisionální zkoušku se hlásíte přes KŘP.",
        },
        {
          type: "p",
          text: "Proti průběhu nebo výsledku neúspěšné zkoušky lze vznést protest. Jen ale ihned na místě po oznámení výsledku, u KŘP, které nad zkouškou vykonává dozor (§ 29). Pozdější protest se nezohlední.",
        },
      ],
    },
    {
      id: "naklady",
      heading: "Kolik to stojí",
      blocks: [
        {
          type: "table",
          caption: "Náklady spojené se získáním zbrojního oprávnění",
          head: ["Položka", "Kdo platí a kolik", "Zdroj"],
          rows: [
            ["Přijetí žádosti o zbrojní oprávnění", "žadatel, 3 000 Kč", "položka 30 bod 1 sazebníku zák. č. 634/2004 Sb."],
            ["Žádost podaná přes Podací portál MV", "žadatel, 2 400 Kč místo 3 000 Kč", "§ 9 zák. č. 634/2004 Sb."],
            ["Lékařský posudek", "žadatel, hradí se zvlášť", "§ 15 zák. č. 90/2024 Sb."],
            ["Použití zapsané zkouškové střelnice", "žadatel, podle ceníku provozovatele", "§ 31 odst. 1"],
            ["Odměna zkušebního komisaře", "policie, žadatel ji neplatí", "§ 31 odst. 1"],
          ],
        },
        {
          type: "p",
          text: "Cenu lékařského posudku ani použití střelnice zákon nestanoví. Konkrétní částky si proto ověřte u svého lékaře a u provozovatele střelnice, na které budete zkoušku skládat.",
        },
      ],
    },
    {
      id: "po-ziskani",
      heading: "Co platí po získání oprávnění",
      blocks: [
        {
          type: "p",
          text: [
            "Se zbrojním oprávněním smíte bez dalšího povolení nakládat se zbraněmi kategorie R4, například s opakovacími kulovnicemi nebo brokovými kozlicemi. Pro každou zbraň kategorie R3, kam patří běžné pistole a revolvery, potřebujete povolení R3 (§ 50). Přehled najdete v článku ",
            { text: "Kategorie zbraní R1–R4, PO, NO a střeliva S1–S4", href: "/clanky/kategorie-zbrani-a-streliva" },
            ".",
          ],
        },
        {
          type: "p",
          text: "Nabytí zbraně podléhající registraci ohlásíte KŘP do 10 pracovních dnů ode dne, kdy jste s ní začali nakládat, a zbraň předložíte k prohlídce (§ 70 odst. 1). Nový lékařský posudek předkládáte nejpozději ke dni skončení platnosti předchozího (§ 15 odst. 3), jinak hrozí pozastavení oprávnění (§ 21 odst. 1 písm. b)).",
        },
        {
          type: "p",
          text: [
            "Samotné oprávnění časově omezené není. KŘP ale nejméně jednou za 5 let prověří, že podmínky stále splňujete, a alespoň jednou za 10 let vás vyzve k předložení zbraní (§ 145). Další lhůty shrnuje článek ",
            { text: "Lhůty a čísla, která musíte znát ke zkoušce", href: "/clanky/lhuty-a-cisla-ke-zkousce" },
            ".",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Potřebuji ke zbrojnímu oprávnění české občanství?",
      a: "Ne. Podmínkou je místo pobytu na území České republiky (§ 13 odst. 1 písm. a) zákona č. 90/2024 Sb.). Cizinci mimo EU a NATO bez zvláštního postavení může KŘP žádost zamítnout z důvodu ochrany vnitřního pořádku a bezpečnosti (§ 13 odst. 2).",
    },
    {
      q: "Dostanu po zkoušce zbrojní průkaz?",
      a: "Ne. Fyzický zbrojní průkaz od 1. 1. 2026 nedostanete. Oprávnění se vede v centrálním registru zbraní a prokazuje se například zbrojním listem spolu s dokladem totožnosti (§ 146 a § 147 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Kolik stojí žádost o zbrojní oprávnění?",
      a: "Správní poplatek je 3 000 Kč, při podání přes Podací portál MV 2 400 Kč. Zvlášť hradíte lékařský posudek a použití zkouškové střelnice; odměnu zkušebního komisaře platí policie.",
    },
    {
      q: "Jak dlouho mám na složení zkoušky?",
      a: "12 měsíců ode dne, kdy KŘP zapíše do centrálního registru zbraní, že jste oprávněni prokázat odbornou způsobilost. V této lhůtě můžete zkoušku jednou opakovat, případně vykonat komisionální zkoušku (§ 24 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Jak dlouho zbrojní oprávnění platí?",
      a: "Platnost oprávnění není časově omezená. Každých 5 let ale předkládáte nový lékařský posudek a KŘP nejméně jednou za 5 let prověřuje, zda podmínky stále splňujete (§ 15 a § 145 zákona č. 90/2024 Sb.).",
    },
  ],
  sources: [
    "Zákon č. 90/2024 Sb., o zbraních a střelivu, ve znění účinném od 1. 1. 2026 (§ 12–31, § 50, § 70, § 144–147)",
    "Nařízení vlády č. 351/2025 Sb. (zdravotní způsobilost)",
    "Zákon č. 634/2004 Sb., o správních poplatcích (položka 30 bod 1, § 9)",
    "Zákon č. 373/2011 Sb., o specifických zdravotních službách",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025 (ot. č. 91, 445)",
  ],
  related: ["zkouska-odborne-zpusobilosti", "obecne-vs-rozsirene-zbrojni-opravneni", "lhuty-a-cisla-ke-zkousce"],
};
