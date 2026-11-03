import type { TopicContent } from "../types";

// Zdroj faktů: docs/research/legislativa.md (kap. 2.1, 2.5, 3.1, 5).
// Rešerše má k střelnicím jen omezený počet ověřených faktů – otázky stojí jen na nich.
// Čísla § k úpravě střelnic rešerše neuvádí, proto je neuvádíme ani zde.

const T = "strelnice";

export const content: TopicContent = {
  lessons: [
    {
      id: "strelnice-l1",
      topic: T,
      title: "Druhy střelnic",
      sections: [
        {
          heading: "Proč na střelnicích záleží",
          paragraphs: [
            "Střílet se zbraní smíte jen tam, kde je to dovoleno. Typickým takovým místem je střelnice. Zákon o zbraních a střelivu proto upravuje, jaké druhy střelnic existují a za jakých podmínek se provozují. Právně závazné technické a organizační požadavky na střelnice stanoví příloha č. 3 zákona o zbraních a střelivu; nařízení vlády č. 187/2025 Sb. k nim stanoví některé další technické specifikace.",
          ],
          tip: "Na otázku „kde jsou stanoveny technické a organizační požadavky na střelnice“ je u zkoušky správně: v příloze č. 3 zákona.",
          source: "zákon č. 90/2024 Sb., příloha č. 3 (soubor MV ot. č. 556)",
        },
        {
          heading: "Dělení podle konstrukce",
          bullets: [
            "krytá střelnice – celý ohrožený prostor se nachází v uzavřeném objektu, který je konstruován tak, aby byl únik střel do okolí při dodržení provozního řádu vyloučen,",
            "otevřená střelnice – každá střelnice, která není krytá.",
          ],
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 239–242",
        },
        {
          heading: "Dělení podle způsobu provozování",
          paragraphs: [
            "Podle toho, jak často se střelnice využívá, rozlišuje zákon střelnice příležitostné a stálé.",
          ],
          bullets: [
            "příležitostná střelnice – provozní řád nedovoluje využívat ji častěji než 26 dnů v kalendářním roce,",
            "stálá střelnice – ostatní střelnice, které takové omezení nemají.",
          ],
          tip: "Číslo 26 dnů v kalendářním roce je oblíbený chyták. Příležitostnost se neurčuje podle správce ani podle toho, zda je střelnice venku.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 239–242",
        },
        {
          heading: "Provozní řád a správce střelnice",
          paragraphs: [
            "Každá střelnice se řídí svým provozním řádem. Ten mimo jiné stanoví, jak často a jakým způsobem se na ní smí střílet. Na bezpečnost provozu dohlíží správce střelnice. Jako střelec se vždy řiďte provozním řádem a pokyny správce.",
            "Podrobnosti o technických a organizačních opatřeních (např. ohrožený prostor střelnice) obsahuje příloha č. 3 zákona a nařízení vlády č. 187/2025 Sb.",
          ],
          source: "zákon č. 90/2024 Sb., příloha č. 3; NV č. 187/2025 Sb.",
        },
      ],
    },
    {
      id: "strelnice-l2",
      topic: T,
      title: "Zkoušková střelnice a vaše zkouška",
      sections: [
        {
          heading: "Zapsaná zkoušková střelnice",
          paragraphs: [
            "Zkouška odborné způsobilosti se koná vždy na zapsané zkouškové střelnici. Právo provozovat ji přizná KŘP provozovateli, který je držitelem zbrojní licence nebo nevyňatou veřejnoprávní institucí.",
            "Komisionální zkouška (poslední šance po neúspěšném opakování) se zpravidla koná na střelnici vyňaté instituce – například ministerstva vnitra, policie nebo armády.",
          ],
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 144, 145, 243",
        },
        {
          heading: "Co zajišťuje provozovatel",
          paragraphs: [
            "Zbraně, střelivo a pomůcky ke zkoušce zajišťuje provozovatel střelnice. Značky a modely zbraní, které se budou používat, musí zveřejnit nejméně 14 dní předem. Máte tak čas si s nimi předem vyzkoušet manipulaci.",
          ],
          tip: "Vlastní zbraň na zkoušku nepotřebujete – zbraně zajišťuje provozovatel střelnice.",
          source: "soubor MV ot. č. 146",
        },
        {
          heading: "Kdo co platí",
          bullets: [
            "správní poplatek za přijetí žádosti o ZO: 3 000 Kč (při podání na elektronickém formuláři přes Podací portál MV 2 400 Kč),",
            "odměnu zkušebního komisaře hradí policie (KŘP), žadatel ji neplatí – ani u opakované zkoušky,",
            "použití zapsané zkouškové střelnice hradí žadatel zvlášť podle ceníku provozovatele.",
          ],
          tip: "Poplatek za střelnici v ceně správního poplatku NENÍ.",
          source: "§ 31 odst. 1 zákona č. 90/2024 Sb.; položka 30 sazebníku zákona č. 634/2004 Sb.; soubor MV ot. č. 143",
        },
        {
          heading: "Praktická střelba v kostce",
          paragraphs: [
            "Na zkouškové střelnici budete střílet na kruhový terč o průměru 500 mm: 5 ran z krátké kulové zbraně na 10 m a 5 ran z dlouhé kulové zbraně na 25 m, celkem do 5 minut. Pro obecné oprávnění potřebujete aspoň 6 zásahů z 10, pro rozšířené aspoň 8.",
          ],
          source: "NV č. 238/2025 Sb.; soubor MV ot. č. 118, 119",
        },
      ],
    },
  ],

  glossary: [
    { term: "Krytá střelnice", topic: T, definition: "Střelnice, u níž se celý ohrožený prostor nachází v uzavřeném objektu, který vylučuje únik střel do okolí.", source: "soubor MV ot. č. 241" },
    { term: "Otevřená střelnice", topic: T, definition: "Každá střelnice, která není krytá.", source: "soubor MV ot. č. 241" },
    { term: "Příležitostná střelnice", topic: T, definition: "Střelnice, kterou provozní řád nedovoluje využívat častěji než 26 dnů v kalendářním roce.", source: "soubor MV ot. č. 239–242" },
    { term: "Stálá střelnice", topic: T, definition: "Střelnice, která není příležitostná – její využití není omezeno na 26 dnů v roce.", source: "soubor MV ot. č. 239–242" },
    { term: "Provozní řád", topic: T, definition: "Dokument, kterým se řídí provoz konkrétní střelnice; mimo jiné určuje, jak často se smí využívat.", source: "zákon č. 90/2024 Sb." },
    { term: "Správce střelnice", topic: T, definition: "Osoba, která dohlíží na bezpečný provoz střelnice. Střelci se řídí jejími pokyny.", source: "zákon č. 90/2024 Sb." },
    { term: "Zapsaná zkoušková střelnice", topic: T, definition: "Střelnice, na které se koná zkouška odborné způsobilosti. Provozuje ji držitel zbrojní licence (zákon připouští i nevyňatou veřejnoprávní instituci).", source: "§ 33 zákona č. 90/2024 Sb.; soubor MV ot. č. 144, 147, 243" },
    { term: "Vyňatá instituce", topic: T, definition: "Např. MV, policie nebo armáda. Na jejich střelnicích se zpravidla konají komisionální zkoušky.", source: "soubor MV ot. č. 145" },
  ],

  flashcards: [
    { id: "strelnice-k01", topic: T, front: "Dělení střelnic podle konstrukce", back: "Kryté a otevřené." },
    { id: "strelnice-k02", topic: T, front: "Dělení střelnic podle způsobu provozování", back: "Příležitostné a stálé." },
    { id: "strelnice-k03", topic: T, front: "Příležitostná střelnice", back: "Provozní řád nedovoluje využití častěji než 26 dnů v kalendářním roce." },
    { id: "strelnice-k04", topic: T, front: "Kde se koná zkouška odborné způsobilosti?", back: "Vždy na zapsané zkouškové střelnici." },
    { id: "strelnice-k05", topic: T, front: "Kdo provozuje zapsanou zkouškovou střelnici?", back: "Držitel zbrojní licence (nebo nevyňatá veřejnoprávní instituce, § 33)." },
    { id: "strelnice-k06", topic: T, front: "Kde se zpravidla koná komisionální zkouška?", back: "Na střelnici vyňaté instituce (MV, policie, armáda)." },
    { id: "strelnice-k07", topic: T, front: "Kdo zajišťuje zbraně a střelivo ke zkoušce?", back: "Provozovatel střelnice." },
    { id: "strelnice-k08", topic: T, front: "Kdy musí provozovatel zveřejnit modely zbraní ke zkoušce?", back: "Nejméně 14 dní předem." },
    { id: "strelnice-k09", topic: T, front: "Kdo platí použití zkouškové střelnice?", back: "Žadatel, zvlášť podle ceníku provozovatele (není ve správním poplatku)." },
    { id: "strelnice-k10", topic: T, front: "Kdo hradí odměnu zkušebního komisaře?", back: "Policie (KŘP), nikoli žadatel. Žadatel platí správní poplatek a použití střelnice." },
    { id: "strelnice-k11", topic: T, front: "Kde jsou stanoveny právně závazné technické a organizační požadavky na střelnice?", back: "V příloze č. 3 zákona o zbraních a střelivu." },
    { id: "strelnice-k12", topic: T, front: "Terč při zkoušce", back: "Kruhový terč o průměru 500 mm." },
    { id: "strelnice-k13", topic: T, front: "Vzdálenosti při zkouškové střelbě", back: "Krátká kulová zbraň 10 m, dlouhá kulová zbraň 25 m (po 5 ranách, celkem do 5 minut)." },
    { id: "strelnice-k14", topic: T, front: "Kolik zásahů je třeba při zkoušce?", back: "Obecné ZO alespoň 6 z 10, rozšířené ZO alespoň 8 z 10." },
    { id: "strelnice-k15", topic: T, front: "Čím se řídíte na každé střelnici?", back: "Provozním řádem a pokyny správce střelnice." },
  ],

  questions: [
    {
      id: "strelnice-x01", topic: T,
      question: "Jak se střelnice dělí podle své konstrukce?",
      options: [
        "Na kryté a otevřené",
        "Na stálé a příležitostné",
        "Na veřejné a soukromé",
      ],
      correct: 0,
      explanation: "Podle konstrukce zákon rozlišuje kryté a otevřené střelnice. Dělení na stálé a příležitostné se týká způsobu provozování.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 239–242",
    },
    {
      id: "strelnice-x02", topic: T,
      question: "Jak se střelnice dělí podle způsobu provozování?",
      options: [
        "Na kryté a otevřené",
        "Na stálé a příležitostné",
        "Na sportovní a lovecké",
      ],
      correct: 1,
      explanation: "Podle způsobu provozování jsou střelnice stálé a příležitostné. Kryté a otevřené jsou kategorie podle konstrukce.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 239–242",
    },
    {
      id: "strelnice-x03", topic: T,
      question: "Provozní řád střelnice dovoluje střílet na ní nejvýše 20 dnů v kalendářním roce. O jakou střelnici jde?",
      options: [
        "O stálou střelnici",
        "O krytou střelnici",
        "O příležitostnou střelnici",
      ],
      correct: 2,
      explanation: "Příležitostná je střelnice, kterou provozní řád nedovoluje využívat častěji než 26 dnů v kalendářním roce. Dvacet dnů tuto hranici nepřekračuje.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 239–242",
    },
    {
      id: "strelnice-x04", topic: T,
      question: "Kde se koná zkouška odborné způsobilosti?",
      options: [
        "Vždy na zapsané zkouškové střelnici",
        "Na kterékoli stálé střelnici podle volby žadatele",
        "V budově krajského ředitelství policie",
      ],
      correct: 0,
      explanation: "Zkouška odborné způsobilosti se koná vždy na zapsané zkouškové střelnici, kterou provozuje držitel zbrojní licence (případně nevyňatá veřejnoprávní instituce).",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 144",
    },
    {
      id: "strelnice-x05", topic: T,
      question: "Kdo je provozovatelem zapsané zkouškové střelnice?",
      options: [
        "Krajské ředitelství policie",
        "Držitel zbrojní licence",
        "Ministerstvo vnitra",
      ],
      correct: 1,
      explanation: "Zapsanou zkouškovou střelnici provozuje držitel zbrojní licence (§ 33 připouští i nevyňatou veřejnoprávní instituci). Policie u zkoušky vykonává dozor.",
      source: "§ 33 zákona č. 90/2024 Sb.; soubor MV ot. č. 144, 147, 243",
    },
    {
      id: "strelnice-x06", topic: T,
      question: "Kdo zajišťuje zbraně, střelivo a pomůcky pro praktickou část zkoušky?",
      options: [
        "Žadatel si přinese vlastní zbraně a střelivo.",
        "Krajské ředitelství policie.",
        "Provozovatel střelnice.",
      ],
      correct: 2,
      explanation: "Zbraně, střelivo i pomůcky zajišťuje provozovatel zkouškové střelnice. Žadatel vlastní zbraň nepotřebuje.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 146",
    },
    {
      id: "strelnice-x07", topic: T,
      question: "S jakým předstihem musí provozovatel zkouškové střelnice zveřejnit značky a modely zbraní pro zkoušku?",
      options: [
        "Nejméně 14 dní předem",
        "Nejméně 3 dny předem",
        "Až v den zkoušky",
      ],
      correct: 0,
      explanation: "Provozovatel zveřejňuje značky a modely zbraní nejméně 14 dní předem, aby se žadatelé mohli připravit.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 146",
    },
    {
      id: "strelnice-x08", topic: T,
      question: "Kdo hradí použití zapsané zkouškové střelnice při zkoušce?",
      options: [
        "Nikdo zvlášť, je zahrnuto ve správním poplatku za žádost.",
        "Žadatel, podle ceníku provozovatele střelnice.",
        "Krajské ředitelství policie.",
      ],
      correct: 1,
      explanation: "Náklady na využití zapsané zkouškové střelnice hradí žadatel, odměnu zkušebního komisaře hradí policie.",
      source: "§ 31 odst. 1 zákona č. 90/2024 Sb.; soubor MV ot. č. 143",
    },
    {
      id: "strelnice-x09", topic: T,
      question: "Kde se zpravidla koná komisionální zkouška?",
      options: [
        "Na libovolné soukromé střelnici",
        "V sídle ministerstva vnitra bez praktické střelby",
        "Na střelnici vyňaté instituce, např. ministerstva vnitra, policie nebo armády",
      ],
      correct: 2,
      explanation: "Komisionální zkouška se zpravidla koná na střelnici vyňaté instituce, zatímco běžná zkouška na zapsané zkouškové střelnici držitele zbrojní licence.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 145",
    },
    {
      id: "strelnice-x10", topic: T,
      question: "Kde jsou stanoveny právně závazné technické a organizační požadavky na střelnice?",
      options: [
        "V příloze č. 3 zákona o zbraních a střelivu",
        "Jen v provozním řádu, který si střelnice sama schválí",
        "V nařízení vlády č. 351/2025 Sb.",
      ],
      correct: 0,
      explanation: "Technické a organizační požadavky na střelnice obsahuje příloha č. 3 zákona o zbraních a střelivu. NV č. 351/2025 Sb. se týká zdravotní způsobilosti.",
      source: "zákon č. 90/2024 Sb., příloha č. 3 (soubor MV ot. č. 556)",
    },
  ],
};
