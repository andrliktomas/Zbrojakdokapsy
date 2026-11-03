import type { Article } from "./types";

// Fakta: docs/research/legislativa.md kap. 2.1–2.3; zákon č. 90/2024 Sb. § 20, § 24–31; NV č. 238/2025 Sb. § 9–24, § 43.

export const article: Article = {
  slug: "zkouska-odborne-zpusobilosti",
  title: "Jak probíhá zkouška odborné způsobilosti",
  metaTitle: "Jak probíhá zkouška odborné způsobilosti (zbrojní oprávnění)",
  description:
    "Zkouška na zbrojní oprávnění: 30 otázek za 40 minut (26/28 správně), skladba 17/5/5/3, střelba na 10 a 25 m, 6/8 zásahů, opakování, komisionální zkouška a protest.",
  perex:
    "Zkouška odborné způsobilosti má teoretickou a praktickou část a skládá se na zapsané zkouškové střelnici před zkušebním komisařem. Hlavní parametry stanoví přímo § 20 odst. 3 zákona č. 90/2024 Sb., podrobnosti nařízení vlády č. 238/2025 Sb. Tady je přehled, co vás čeká.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["zkouska", "bezpecna-manipulace"],
  summary: [
    "Test: 30 otázek se 3 možnostmi, nejvýše 40 minut; pro obecné oprávnění 26 správně, pro rozšířené 28.",
    "Skladba testu: 17 otázek z práva, 5 z nauky o zbraních, 5 z bezpečného zacházení a 3 ze zdravotnického minima.",
    "Praxe: kontrola zbraně, řešení závad, příprava k rozebrání; pak 5 ran z krátké zbraně na 10 m a 5 ran z dlouhé na 25 m do 5 minut.",
    "Na kruhový terč o průměru 500 mm potřebujete celkem 6 zásahů (obecné) nebo 8 (rozšířené).",
    "Zkoušku lze jednou opakovat, potom je možná komisionální zkouška; protest jen ihned na místě.",
  ],
  sections: [
    {
      id: "kde-a-pred-kym",
      heading: "Kde a před kým se zkouška koná",
      blocks: [
        {
          type: "p",
          text: "Zkouška se koná na zapsané zkouškové střelnici (§ 25 odst. 1). Vede ji zkušební komisař jmenovaný ministerstvem vnitra, kterého určí krajské ředitelství policie (§ 26 odst. 1, § 34). KŘP nad průběhem vykonává dozor a z praktické části pořizuje zvukový a obrazový záznam (§ 28). Zkouška je neveřejná a musíte ji vykonat osobně, bez tlumočníka nebo podpůrce (§ 20 odst. 2, § 26 odst. 4).",
        },
        {
          type: "p",
          text: "Vlastní zbraň nepotřebujete. Zbraně a střelivo připravuje provozovatel střelnice a konkrétní značky a modely musí zveřejnit na svých webových stránkách nejméně 14 dní před termínem (§ 43 odst. 1 NV č. 238/2025 Sb.).",
        },
        {
          type: "p",
          text: "Před zahájením platí tato pravidla podle nařízení vlády č. 238/2025 Sb.:",
        },
        {
          type: "list",
          items: [
            "komisař ověří vaši totožnost; kdo ji neprokáže, není připuštěn, ale o termín nepřichází a může se přihlásit znovu (§ 11),",
            "nedovolené pomůcky a opuštění místa bez dovolení jsou zakázané; při hrubém nebo opakovaném porušení komisař zkoušku ukončí s hodnocením „neprospěl“ (§ 9 odst. 2),",
            "potřebu zdravotnického prostředku musíte ohlásit nejpozději před zahájením a doložit (§ 9 odst. 3),",
            "do tiskopisu se píše psacími prostředky, které zajistí nesmazatelný záznam (§ 10).",
          ],
        },
      ],
    },
    {
      id: "test",
      heading: "Teoretická část: písemný test",
      blocks: [
        {
          type: "table",
          caption: "Parametry teoretické části",
          head: ["Parametr", "Hodnota", "Ustanovení"],
          rows: [
            ["Počet otázek", "30, každá se 3 možnostmi a 1 správnou odpovědí", "§ 20 odst. 3 písm. a) zákona; § 12 odst. 2 NV"],
            ["Čas", "nejdéle 40 minut", "§ 20 odst. 3 písm. a)"],
            ["Obecné ZO", "alespoň 26 správných odpovědí (nejvýše 4 chyby)", "§ 20 odst. 3 písm. a)"],
            ["Rozšířené ZO", "alespoň 28 správných odpovědí (nejvýše 2 chyby)", "§ 20 odst. 3 písm. a)"],
            ["Skladba", "17 právní předpisy (vč. ověřování zbraní a trestního práva), 5 nauka o zbraních a střelivu, 5 zásady bezpečného nakládání, 3 zdravotnické minimum", "§ 12 odst. 2 NV"],
          ],
        },
        {
          type: "p",
          text: "Testový soubor si vylosujete tak, abyste předem neznali jeho číslo (§ 12 odst. 3 NV). Odpovědi zapisujete do vyhodnocovací tabulky a po odevzdání je už nelze opravit (§ 12 odst. 7 a § 13 odst. 1 NV). Po vyhlášení výsledku máte právo nahlédnout do svého testu a porovnat chyby se správným řešením (§ 14 odst. 4 NV).",
        },
        {
          type: "p",
          text: "Testy se sestavují z oficiálního souboru otázek, který ministerstvo vnitra zveřejňuje i se správnými odpověďmi (§ 27 odst. 1). Platná verze z 15. 12. 2025 obsahuje 837 otázek. Nejvíc váží právní část – 17 z 30 otázek testu.",
        },
        {
          type: "note",
          tone: "tip",
          text: "Kdo v teoretické části neprospěje, praktickou část už nekoná a je celkově hodnocen „neprospěl“ (§ 14 odst. 5 NV). Pozor i na staré učebnice: bodové hranice podle zákona č. 119/2002 Sb. platily jen do 31. 12. 2025.",
        },
        {
          type: "topic",
          topic: "zkouska",
          text: "Průběh zkoušky, komisař, protest a poplatky v pěti lekcích, s kartičkami a otázkami k procvičení.",
        },
      ],
    },
    {
      id: "manipulace",
      heading: "Praktická část: bezpečné zacházení se zbraní",
      blocks: [
        {
          type: "p",
          text: "Praktickou část konáte zpravidla ve stejný den jako teorii (§ 15 NV). Nejdřív podle pokynů komisaře předvedete s krátkou i dlouhou kulovou zbraní (§ 17 odst. 1 a 2 NV):",
        },
        {
          type: "list",
          items: [
            "kontrolu zbraně za účelem zjištění jejího stavu,",
            "přípravu zbraně k částečnému rozebrání a složení pro vyčištění (předvedení kontroly a slovní popis čištění),",
            "přípravu zbraně a střeliva ke střelbě,",
            "zjištění a odstranění závady: selhač, slabá rána, zádržka,",
            "postup při ukončení střelby.",
          ],
        },
        {
          type: "p",
          text: "Používají se školní náboje bez výmetné náplně a zápalkové slože (§ 17 odst. 4 NV). Přehled postupů stanoví příloha č. 2 k nařízení. Úkony nad rámec povinných postupů vám komisař zadat může, jejich nezvládnutí ale není důvodem k neúspěchu (§ 18 odst. 2 NV).",
        },
        {
          type: "note",
          tone: "warning",
          title: "Za co se neprojde",
          text: "Neprospějete, pokud postupy v dostatečném rozsahu nepředvedete, pokud porušíte zásady bezpečného nakládání tak, že bezprostředně ohrozíte nebo byste v praxi ohrozili bezpečnost osob, nebo pokud je porušíte hrubě či opakovaně (§ 19 odst. 2 NV). Typicky jde o ústí mimo bezpečný směr nebo prst na spoušti bez důvodu.",
        },
        {
          type: "p",
          text: [
            "Postupy pro pistoli, revolver i dlouhé zbraně rozebírá článek ",
            { text: "Bezpečné zacházení se zbraní a praktická část zkoušky", href: "/clanky/bezpecne-zachazeni-se-zbrani" },
            ".",
          ],
        },
      ],
    },
    {
      id: "strelba",
      heading: "Střelba na terč",
      blocks: [
        {
          type: "table",
          caption: "Parametry střelby podle § 20 odst. 3 písm. c) zákona",
          head: ["Parametr", "Hodnota"],
          rows: [
            ["Terč", "kruhový, o průměru 500 mm"],
            ["Krátká kulová zbraň", "5 ran na vzdálenost 10 m"],
            ["Dlouhá kulová zbraň", "5 ran na vzdálenost 25 m"],
            ["Čas", "celkem nejvýše 5 minut"],
            ["Potřebné zásahy", "obecné ZO alespoň 6, rozšířené ZO alespoň 8 – součet z obou zbraní"],
          ],
        },
        {
          type: "p",
          text: "Nařízení vlády doplňuje podrobnosti. Před hodnocenou střelbou si můžete nastřelení ověřit 3 výstřely z každé zbraně (§ 22 odst. 3). Časový limit se přerušuje mezi poslední ranou z jedné zbraně a přechodem na druhou (§ 22 odst. 4) a doba odstraňování závady se do něj nepočítá (§ 23). Tečný zásah okraje kruhu se počítá (§ 24 odst. 1).",
        },
        {
          type: "p",
          text: "Střílí se vstoje, ze zdravotních důvodů vsedě (§ 22 odst. 1 NV). Oporu smí ze zdravotních důvodů použít jen střelec s dlouhou zbraní, u krátké zbraně se opora nepřipouští (§ 21 odst. 5 NV). Krátké zkouškové zbraně jsou na náboje se středovým zápalem, dlouhé mohou být i v ráži .22 LR nebo .22 WMR a mít kolimátor, optiku i tlumič (§ 43 odst. 3 a 6 NV).",
        },
      ],
    },
    {
      id: "opakovani",
      heading: "Neúspěch, opakování a protest",
      blocks: [
        {
          type: "list",
          items: [
            "Na úspěšné složení máte 12 měsíců od zápisu do CRZ, že jste oprávněni prokázat odbornou způsobilost (§ 24 odst. 2).",
            "Zkoušku odborné způsobilosti můžete v této lhůtě jednou opakovat.",
            "Kdo neuspěje ani napodruhé, ale alespoň jednou prošel teoretickou částí, může v téže lhůtě vykonat komisionální zkoušku (§ 24 odst. 3). Hlásí se přes KŘP; termín určuje Policejní prezidium zpravidla alespoň jednou za 60 dnů (§ 25 odst. 4).",
            "Komisionální zkouška se koná před tříčlennou komisí a dozor nad ní vykonává ministerstvo vnitra nebo Policejní prezidium (§ 26 odst. 3, § 28 odst. 3).",
          ],
        },
        {
          type: "p",
          text: "Pokud neuspějete a nesouhlasíte s průběhem nebo výsledkem zkoušky, můžete vznést protest. Vznáší se ihned po oznámení výsledku na místě, u KŘP, které vykonává dozor, a musíte v něm uvést, v čem vidíte nedostatky. Na později vznesený protest se nebere zřetel. Je-li protest důvodný, KŘP vám umožní příslušnou část zkoušky opakovat (§ 29).",
        },
        {
          type: "note",
          tone: "tip",
          text: "O možnosti protestu vás musí zkušební komisař poučit, když vám oznamuje neúspěšný výsledek (§ 29 odst. 1).",
        },
      ],
    },
    {
      id: "priprava",
      heading: "Jak se na zkoušku připravit",
      blocks: [
        {
          type: "p",
          text: "Protože 17 z 30 otázek pochází z právních předpisů, vyplatí se začít kategoriemi zbraní, podmínkami oprávnění a lhůtami a teprve potom přejít na nauku o zbraních a zdravovědu. Pro obecné oprávnění si můžete dovolit nejvýše 4 chyby, pro rozšířené jen 2.",
        },
        {
          type: "p",
          text: [
            "Zbroják do kapsy nabízí test nanečisto ve stejné skladbě 17/5/5/3, se stejným časovým limitem a vyhodnocením podle zvoleného druhu oprávnění. Je součástí placeného balíčku, viz ",
            { text: "ceník", href: "/cenik" },
            ". Otázky v aplikaci jsou vlastní parafráze, nikoli doslovné znění souboru MV.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Kolik otázek je v testu a kolik chyb si mohu dovolit?",
      a: "Test má 30 otázek a na odpovědi máte nejvýše 40 minut. Pro obecné zbrojní oprávnění potřebujete alespoň 26 správných odpovědí (nejvýše 4 chyby), pro rozšířené alespoň 28 (nejvýše 2 chyby) – § 20 odst. 3 písm. a) zákona č. 90/2024 Sb.",
    },
    {
      q: "Potřebuji ke zkoušce vlastní zbraň?",
      a: "Ne. Zbraně a střelivo připravuje provozovatel zapsané zkouškové střelnice a jejich značky a modely zveřejňuje nejméně 14 dní před termínem (§ 43 nařízení vlády č. 238/2025 Sb.).",
    },
    {
      q: "Kolik zásahů potřebuji při střelbě?",
      a: "Z 10 ran (5 z krátké zbraně na 10 m a 5 z dlouhé na 25 m) potřebujete na kruhový terč o průměru 500 mm celkem alespoň 6 zásahů pro obecné a 8 pro rozšířené oprávnění. Tečný zásah se počítá.",
    },
    {
      q: "Co když neuspěji v teoretické části?",
      a: "Praktickou část už nekonáte a zkouška je hodnocena jako neúspěšná. V 12měsíční lhůtě ji můžete jednou opakovat, případně pak vykonat komisionální zkoušku, pokud jste teoretickou částí alespoň jednou prošli.",
    },
    {
      q: "Mohu proti výsledku protestovat později?",
      a: "Ne. Protest se vznáší jen ihned na místě po oznámení výsledku, u krajského ředitelství policie, které vykonává dozor. Na později vznesený protest se nebere zřetel (§ 29 odst. 2 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Kdo platí zkušebního komisaře?",
      a: "Odměnu zkušebního komisaře hradí policie. Žadatel platí použití zapsané zkouškové střelnice (§ 31 odst. 1 zákona č. 90/2024 Sb.).",
    },
  ],
  sources: [
    "Zákon č. 90/2024 Sb., o zbraních a střelivu (§ 20, § 24–31, § 34)",
    "Nařízení vlády č. 238/2025 Sb., o provádění zkoušek (§ 9–24, § 43, příloha č. 2)",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025",
  ],
  related: ["jak-ziskat-zbrojni-opravneni", "bezpecne-zachazeni-se-zbrani", "lhuty-a-cisla-ke-zkousce"],
};
