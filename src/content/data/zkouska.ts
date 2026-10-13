import type { TopicContent } from "../types";

const T = "zkouska";

export const content: TopicContent = {
  lessons: [
    {
      id: "zkouska-l1",
      topic: T,
      title: "Kdo, kde a jak zkoušku vede",
      sections: [
        {
          heading: "Zkušební komisař",
          paragraphs: [
            "Zkoušku odborné způsobilosti (ZOZ) vede zkušební komisař, kterého jmenuje ministerstvo vnitra. Nejde tedy o policistu, ale o odborníka s vlastním oprávněním.",
          ],
          bullets: [
            "věk alespoň 30 let,",
            "rozšířené zbrojní oprávnění alespoň 3 roky,",
            "maturita,",
            "složená zkouška zkušebního komisaře.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 135, 149, 154)",
        },
        {
          heading: "Dozor a záznam",
          paragraphs: [
            "Nad průběhem zkoušky dohlíží krajské ředitelství policie (KŘP). U komisionální zkoušky vykonává dozor ministerstvo vnitra nebo Policejní prezidium ČR.",
            "KŘP pořizuje obrazový a zvukový záznam praktické části zkoušky.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 137, 138)",
        },
        {
          heading: "Zapsaná zkoušková střelnice",
          paragraphs: [
            "ZOZ se koná vždy na zapsané zkouškové střelnici, kterou provozuje držitel zbrojní licence. Komisionální zkouška se koná zpravidla na střelnici vyňaté instituce (MV, policie, armáda).",
            "Zbraně, střelivo a pomůcky ke zkoušce zajišťuje provozovatel střelnice. Značky a modely zbraní musí zveřejnit nejméně 14 dní předem – můžete se tak připravit právě na ty zbraně, se kterými budete u zkoušky manipulovat.",
          ],
          tip: "Vlastní zbraň ke zkoušce nepotřebujete – zbraně zajišťuje provozovatel střelnice.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 144–146, 243)",
        },
        {
          heading: "Pravidla průběhu",
          bullets: [
            "zkoušky jsou neveřejné,",
            "zkoušku je nutné vykonat osobně – bez tlumočníka, podpůrce či podobné osoby,",
            "teoretická i praktická část se konají ve stejný den; výjimečně může komisař povolit praktickou část v jiný den,",
            "současně lze být přihlášen jen na jeden termín (podle NV č. 238/2025 Sb.; ověřte aktuální znění).",
          ],
          source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 114, 136, 148)",
        },
      ],
    },
    {
      id: "zkouska-l2",
      topic: T,
      title: "Teoretická část – písemný test",
      sections: [
        {
          heading: "Co se v testu zkouší",
          bullets: [
            "právní předpisy o zbraních a střelivu,",
            "ověřování zbraní a střeliva,",
            "trestněprávní aspekty (nutná obrana, krajní nouze),",
            "nauka o zbraních a střelivu,",
            "zásady bezpečného nakládání se zbraní,",
            "zdravotnické minimum (první pomoc).",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 116)",
        },
        {
          heading: "Forma testu",
          paragraphs: [
            "Test je písemný a každá otázka má tři možnosti, z nichž je správná vždy jen jedna. Pro teoretickou část zveřejnilo ministerstvo vnitra oficiální soubor testových otázek (verze 15. 12. 2025, celkem 837 otázek).",
          ],
          bullets: [
            "30 otázek,",
            "skladba: 17 otázek z právních předpisů, 5 z nauky o zbraních a střelivu, 5 ze zásad bezpečného zacházení, 3 ze zdravotnického minima,",
            "časový limit 40 minut,",
            "obecné ZO: nejméně 26 správných odpovědí z 30 (max. 4 chyby),",
            "rozšířené ZO: nejméně 28 správných odpovědí z 30 (max. 2 chyby).",
          ],
          tip: "Parametry testu uvádíme podle NV č. 238/2025 Sb.; ověřte aktuální znění. Staré bodové hranice (67/71/74 bodů pro skupiny A–E) platily jen do 31. 12. 2025.",
          source: "NV č. 238/2025 Sb.",
        },
        {
          heading: "Jak se učit",
          paragraphs: [
            "Nejvíc otázek pochází z oddílu o zákoně o zbraních a střelivu. Vyplatí se proto nejdřív zvládnout kategorie, podmínky oprávnění a lhůty – a teprve potom se pustit do nauky a zdravovědy. Starší soubor otázek (platný do 31. 12. 2025) už neplatí, neučte se z něj.",
          ],
        },
      ],
    },
    {
      id: "zkouska-l3",
      topic: T,
      title: "Praktická část – manipulace a střelba",
      sections: [
        {
          heading: "Bezpečné zacházení se zbraní",
          paragraphs: [
            "V praktické části předvedete, že umíte se zbraní bezpečně zacházet. Postupy stanoví příloha č. 2 k nařízení vlády č. 238/2025 Sb.",
          ],
          bullets: [
            "kontrola a uvedení do bezpečného stavu – samonabíjecí pistole, revolver, samonabíjecí a opakovací dlouhá kulová zbraň,",
            "řešení závad: selhač, slabá rána, zádržka,",
            "příprava k rozebrání a slovní popis čištění.",
          ],
          tip: "U selhače je nutné vyčkat alespoň 10 sekund se zbraní v bezpečném směru.",
          source: "NV č. 238/2025 Sb., příloha č. 2 (soubor MV ot. č. 562–596)",
        },
        {
          heading: "Střelba",
          bullets: [
            "terč: kruhový o průměru 500 mm,",
            "5 ran z krátké kulové zbraně na vzdálenost 10 m,",
            "5 ran z dlouhé kulové zbraně na vzdálenost 25 m,",
            "celkový čas: do 5 minut,",
            "obecné ZO: alespoň 6 zásahů z 10,",
            "rozšířené ZO: alespoň 8 zásahů z 10.",
          ],
          source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 118, 119)",
        },
        {
          heading: "Kdy praktická část nevyjde",
          paragraphs: [
            "Neuspějete, pokud ohrozíte bezpečnost osob, nebo pokud byste ji při stejném jednání v praxi ohrozili. Typicky jde o míření na osobu, prst v lučíku bez pokynu nebo porušení bezpečného směru.",
          ],
          tip: "I když se nic nestane, chyba typu „prst na spoušti bez pokynu“ znamená neúspěch – rozhoduje, že by v praxi ohrožovala bezpečnost.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 120)",
        },
      ],
    },
    {
      id: "zkouska-l4",
      topic: T,
      title: "Lhůty, opakování, protest a poplatky",
      sections: [
        {
          heading: "12 měsíců a jedno opakování",
          paragraphs: [
            "Po podání žádosti zapíše KŘP do CRZ, že jste oprávněni prokázat odbornou způsobilost. Od tohoto dne máte 12 měsíců na úspěšné složení zkoušky. Zkoušku lze jednou opakovat.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 133)",
        },
        {
          heading: "Komisionální zkouška",
          paragraphs: [
            "Pokud neuspějete ani v opakované zkoušce, ale alespoň jednou jste prošli teoretickou částí, můžete vykonat komisionální zkoušku před komisí.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 134, 135)",
        },
        {
          heading: "Protest",
          paragraphs: [
            "Nesouhlasíte s průběhem nebo výsledkem? Protest musíte podat ihned na místě po oznámení výsledku, u dozorujícího KŘP. Pozdější protest se nezohlední. Je-li protest důvodný, příslušnou část zkoušky opakujete.",
          ],
          tip: "Protest se nepodává dodatečně písemně ani u ministerstva – jen hned na místě.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 139–142)",
        },
        {
          heading: "Kolik to stojí",
          bullets: [
            "správní poplatek za přijetí žádosti o ZO: 3 000 Kč,",
            "při podání přes Podací portál MV: 2 400 Kč,",
            "poplatek zahrnuje odměnu zkušebního komisaře (hradí ji KŘP) i případné opakování zkoušky,",
            "zvlášť platíte použití zapsané zkouškové střelnice podle ceníku provozovatele a lékařský posudek.",
          ],
          source: "MV – správní poplatky od 1. 1. 2026 (soubor MV ot. č. 143)",
        },
      ],
    },
  ],

  glossary: [
    { term: "Zkouška odborné způsobilosti (ZOZ)", topic: T, definition: "Zkouška z teoretické a praktické části, kterou žadatel prokazuje odbornou způsobilost pro zbrojní oprávnění.", source: "soubor MV ot. č. 115–117" },
    { term: "Zkušební komisař", topic: T, definition: "Osoba jmenovaná MV, která vede zkoušku; musí mít mimo jiné 30 let a rozšířené ZO alespoň 3 roky.", source: "soubor MV ot. č. 149, 154" },
    { term: "Zapsaná zkoušková střelnice", topic: T, definition: "Střelnice provozovaná držitelem zbrojní licence, na které se ZOZ vždy koná.", source: "soubor MV ot. č. 144" },
    { term: "Komisionální zkouška", topic: T, definition: "Zkouška před komisí pro žadatele, který neuspěl ani při opakování, ale alespoň jednou prošel teoretickou částí.", source: "soubor MV ot. č. 134, 135" },
    { term: "Protest", topic: T, definition: "Námitka proti průběhu nebo výsledku zkoušky; podává se ihned na místě u dozorujícího KŘP.", source: "soubor MV ot. č. 139–142" },
    { term: "Dozor", topic: T, definition: "Dohled nad zkouškou; u ZOZ ho vykonává KŘP, u komisionální zkoušky MV nebo Policejní prezidium ČR.", source: "soubor MV ot. č. 137" },
    { term: "Selhač", topic: T, definition: "Náboj, který po úderu nevystřelil; u zkoušky je nutné vyčkat alespoň 10 s se zbraní v bezpečném směru.", source: "soubor MV ot. č. 586" },
    { term: "NV č. 238/2025 Sb.", topic: T, definition: "Nařízení vlády o provádění zkoušek; příloha č. 2 obsahuje postupy praktické části.", source: "NV č. 238/2025 Sb." },
    { term: "Soubor testových otázek MV", topic: T, definition: "Oficiální zveřejněný soubor otázek pro teoretickou část (verze 15. 12. 2025, 837 otázek, vždy 3 možnosti a 1 správná).", source: "mv.gov.cz/zbrojni-opravneni" },
  ],

  flashcards: [
    { id: "zkouska-k01", topic: T, front: "Kdo jmenuje zkušebního komisaře?", back: "Ministerstvo vnitra." },
    { id: "zkouska-k02", topic: T, front: "Podmínky pro zkušebního komisaře", back: "30 let, rozšířené ZO alespoň 3 roky, maturita, zkouška zkušebního komisaře." },
    { id: "zkouska-k03", topic: T, front: "Kdo vykonává dozor nad ZOZ?", back: "KŘP (u komisionální zkoušky MV nebo PP ČR)." },
    { id: "zkouska-k04", topic: T, front: "Co KŘP u zkoušky nahrává?", back: "Obrazový a zvukový záznam praktické části." },
    { id: "zkouska-k05", topic: T, front: "Kde se ZOZ koná?", back: "Vždy na zapsané zkouškové střelnici (provozuje ji držitel ZL)." },
    { id: "zkouska-k06", topic: T, front: "Kdo zajišťuje zbraně a střelivo ke zkoušce?", back: "Provozovatel střelnice." },
    { id: "zkouska-k07", topic: T, front: "Kdy musí být zveřejněny modely zbraní ke zkoušce?", back: "Nejméně 14 dní předem." },
    { id: "zkouska-k08", topic: T, front: "Je zkouška veřejná? Smím mít tlumočníka?", back: "Ne a ne – neveřejná, vykonává se osobně." },
    { id: "zkouska-k09", topic: T, front: "Teorie a praxe – kdy?", back: "Ve stejný den (výjimečně praxe jindy se svolením komisaře)." },
    { id: "zkouska-k10", topic: T, front: "Lhůta na složení zkoušky a počet opakování", back: "12 měsíců od zápisu do CRZ; 1 opakování." },
    { id: "zkouska-k11", topic: T, front: "Kdy je možná komisionální zkouška?", back: "Neúspěch i v opakované ZOZ, ale aspoň jednou úspěch v teorii." },
    { id: "zkouska-k12", topic: T, front: "Kdy a kde podat protest?", back: "Ihned na místě po oznámení výsledku, u dozorujícího KŘP." },
    { id: "zkouska-k13", topic: T, front: "Test – počet otázek a čas", back: "30 otázek, 40 minut (podle NV č. 238/2025 Sb.; ověřte aktuální znění)." },
    { id: "zkouska-k14", topic: T, front: "Test – hranice úspěšnosti", back: "Obecné 26/30, rozšířené 28/30 (podle NV č. 238/2025 Sb.; ověřte aktuální znění)." },
    { id: "zkouska-k15", topic: T, front: "Kolik možností má každá otázka?", back: "3 možnosti, 1 správná." },
    { id: "zkouska-k16", topic: T, front: "Terč u praktické zkoušky", back: "Kruhový, průměr 500 mm." },
    { id: "zkouska-k17", topic: T, front: "Střelba – krátká a dlouhá zbraň", back: "5 ran krátkou na 10 m, 5 ran dlouhou na 25 m, celkem do 5 minut." },
    { id: "zkouska-k18", topic: T, front: "Potřebné zásahy z 10 ran", back: "Obecné ZO 6, rozšířené ZO 8." },
    { id: "zkouska-k19", topic: T, front: "Selhač – jak dlouho vyčkat?", back: "Alespoň 10 sekund." },
    { id: "zkouska-k20", topic: T, front: "Správní poplatek za žádost o ZO", back: "3 000 Kč, přes Podací portál MV 2 400 Kč." },
    { id: "zkouska-k21", topic: T, front: "Co poplatek nezahrnuje?", back: "Použití zkouškové střelnice a lékařský posudek." },
  ],

  questions: [
    {
      id: "zkouska-x01", topic: T,
      question: "Kdo jmenuje zkušebního komisaře?",
      options: ["Krajské ředitelství policie", "Ministerstvo vnitra", "Český úřad pro zkoušení zbraní a střeliva"],
      correct: 1,
      explanation: "Zkušební komisaře jmenuje ministerstvo vnitra. KŘP nad zkouškou jen vykonává dozor.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 149)",
    },
    {
      id: "zkouska-x02", topic: T,
      question: "Jak dlouho musí být zkušební komisař nejméně držitelem rozšířeného zbrojního oprávnění?",
      options: ["Alespoň 3 roky", "Alespoň 1 rok", "Alespoň 10 let"],
      correct: 0,
      explanation: "Mezi podmínky jmenování zkušebního komisaře patří věk 30 let, rozšířené ZO alespoň 3 roky, maturita a složená zkouška zkušebního komisaře.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 154)",
    },
    {
      id: "zkouska-x03", topic: T,
      question: "Kdo vykonává dozor nad zkouškou odborné způsobilosti?",
      options: ["Obecní úřad obce s rozšířenou působností", "Provozovatel střelnice", "Krajské ředitelství policie"],
      correct: 2,
      explanation: "Dozor nad ZOZ vykonává KŘP. U komisionální zkoušky je to ministerstvo vnitra nebo Policejní prezidium ČR.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 137)",
    },
    {
      id: "zkouska-x04", topic: T,
      question: "Co pořizuje dozorující KŘP během praktické části zkoušky?",
      options: ["Obrazový a zvukový záznam", "Jen písemný protokol bez záznamu", "Fotografii terče, nic dalšího"],
      correct: 0,
      explanation: "KŘP pořizuje obrazový a zvukový záznam praktické části, aby bylo možné průběh zpětně ověřit.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 138)",
    },
    {
      id: "zkouska-x05", topic: T,
      question: "Kdo zajišťuje zbraně, střelivo a pomůcky pro zkoušku odborné způsobilosti?",
      options: ["Žadatel si přinese vlastní", "Provozovatel zkouškové střelnice", "Krajské ředitelství policie"],
      correct: 1,
      explanation: "Zbraně, střelivo a pomůcky zajišťuje provozovatel zapsané zkouškové střelnice.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 146)",
    },
    {
      id: "zkouska-x06", topic: T,
      question: "Jak dlouho předem musí provozovatel zkouškové střelnice zveřejnit značky a modely zbraní použitých u zkoušky?",
      options: ["Nejméně 3 dny předem", "V den zkoušky", "Nejméně 14 dní předem"],
      correct: 2,
      explanation: "Značky a modely zbraní se zveřejňují nejméně 14 dní předem, aby se žadatelé mohli připravit.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 146)",
    },
    {
      id: "zkouska-x07", topic: T,
      question: "Smí se zkoušky odborné způsobilosti účastnit veřejnost (např. rodina žadatele)?",
      options: ["Ano, zkouška je veřejná", "Ne, zkoušky jsou neveřejné", "Ano, ale jen během praktické části"],
      correct: 1,
      explanation: "Zkoušky jsou neveřejné. Žadatel je navíc musí vykonat osobně, bez tlumočníka nebo podpůrce.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 114, 136)",
    },
    {
      id: "zkouska-x08", topic: T,
      question: "Kdy se koná teoretická a praktická část zkoušky?",
      options: ["Ve stejný den; výjimečně může komisař povolit praktickou část v jiný den", "Vždy s odstupem nejméně 7 dnů", "Praktická část vždy až po zápisu výsledku teorie do CRZ"],
      correct: 0,
      explanation: "Obě části se konají ve stejný den. Jen výjimečně může zkušební komisař povolit vykonání praktické části v jiný den.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 148)",
    },
    {
      id: "zkouska-x09", topic: T,
      question: "Jaký terč se používá při střelbě v praktické části zkoušky?",
      options: ["Silueta postavy v životní velikosti", "Kruhový terč o průměru 250 mm", "Kruhový terč o průměru 500 mm"],
      correct: 2,
      explanation: "Střílí se na kruhový terč o průměru 500 mm.",
      source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 118, 119)",
    },
    {
      id: "zkouska-x10", topic: T,
      question: "Na jakou vzdálenost se při zkoušce střílí z krátké kulové zbraně?",
      options: ["10 m", "25 m", "50 m"],
      correct: 0,
      explanation: "Z krátké kulové zbraně se střílí 5 ran na 10 m, z dlouhé kulové zbraně 5 ran na 25 m.",
      source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 118, 119)",
    },
    {
      id: "zkouska-x11", topic: T,
      question: "Na jakou vzdálenost se při zkoušce střílí z dlouhé kulové zbraně?",
      options: ["10 m", "25 m", "100 m"],
      correct: 1,
      explanation: "Dlouhá kulová zbraň: 5 ran na 25 m. Krátká: 5 ran na 10 m. Celá střelba musí proběhnout do 5 minut.",
      source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 118, 119)",
    },
    {
      id: "zkouska-x12", topic: T,
      question: "Kolik ran a v jakém čase celkem vystřelíte v praktické části zkoušky?",
      options: ["20 ran do 10 minut", "5 ran do 2 minut", "10 ran (5 z krátké a 5 z dlouhé zbraně) celkem do 5 minut"],
      correct: 2,
      explanation: "Střílí se 5 ran z krátké kulové zbraně a 5 ran z dlouhé kulové zbraně, celkem do 5 minut.",
      source: "zákon č. 90/2024 Sb.; NV č. 238/2025 Sb. (soubor MV ot. č. 118, 119)",
    },
    {
      id: "zkouska-x13", topic: T,
      question: "Při praktické části vám zbraň po stisku spouště nevystřelí (selhač). Jak dlouho musíte nejméně vyčkat?",
      options: ["Není třeba čekat, ihned přebijete", "Alespoň 10 sekund", "Alespoň 2 minuty"],
      correct: 1,
      explanation: "U selhače je nutné vyčkat alespoň 10 sekund se zbraní v bezpečném směru – náboj může vystřelit se zpožděním.",
      source: "NV č. 238/2025 Sb., příloha č. 2 (soubor MV ot. č. 586)",
    },
    {
      id: "zkouska-x14", topic: T,
      question: "Kdy žadatel v praktické části neuspěje?",
      options: ["Když ohrozí bezpečnost osob nebo by ji svým jednáním v praxi ohrozil", "Jen když skutečně někoho zraní", "Když nestihne rozebrat zbraň do 1 minuty"],
      correct: 0,
      explanation: "Neúspěch znamená, že žadatel ohrozil, nebo by v praxi ohrozil bezpečnost osob – např. mířil na osobu, měl prst v lučíku bez pokynu nebo porušil bezpečný směr.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 120)",
    },
    {
      id: "zkouska-x15", topic: T,
      question: "Kolik činí správní poplatek za přijetí žádosti o zbrojní oprávnění podané přes Podací portál MV?",
      options: ["3 000 Kč", "1 000 Kč", "2 400 Kč"],
      correct: 2,
      explanation: "Běžný poplatek je 3 000 Kč; při podání přes Podací portál MV je nižší, 2 400 Kč.",
      source: "MV – správní poplatky podle zákona o zbraních platné od 1. 1. 2026",
    },
    {
      id: "zkouska-x16", topic: T,
      question: "Co z následujícího NENÍ zahrnuto ve správním poplatku za žádost o zbrojní oprávnění?",
      options: ["Odměna zkušebního komisaře", "Použití zapsané zkouškové střelnice", "Opakování zkoušky"],
      correct: 1,
      explanation: "Poplatek pokrývá odměnu komisaře (hradí ji KŘP) i případné opakování. Použití zkouškové střelnice platí žadatel zvlášť podle ceníku provozovatele.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 143)",
    },
  ],
};
