import type { TopicContent } from "../types";

const T = "zaklady";

export const content: TopicContent = {
  lessons: [
    {
      id: "zaklady-l1",
      topic: T,
      title: "Nový zákon o zbraních a střelivu",
      sections: [
        {
          heading: "Jaký zákon dnes platí",
          paragraphs: [
            "Od 1. 1. 2026 je účinný zákon č. 90/2024 Sb., o zbraních a střelivu. Nahradil dlouholetý zákon č. 119/2002 Sb., podle kterého se vydávaly zbrojní průkazy skupin A až E.",
            "Vedle něj platí samostatný zákon č. 91/2024 Sb., o munici. Ten řeší civilní nakládání s municí, neaktivní muniční předměty a pyrotechnický průzkum – tedy věci, které do „zbraňového“ zákona nepatří.",
          ],
          bullets: [
            "zákon č. 90/2024 Sb. – zbraně a střelivo (účinný od 1. 1. 2026),",
            "zákon č. 91/2024 Sb. – munice,",
            "nařízení vlády č. 238/2025 Sb. – provádění zkoušek,",
            "nařízení vlády č. 187/2025 Sb. – mimo jiné zabezpečení zbraní a střeliva,",
            "nařízení vlády č. 351/2025 Sb. – nemoci a stavy vylučující zdravotní způsobilost.",
          ],
          tip: "Starý zákon č. 119/2002 Sb. i jeho prováděcí předpisy už neplatí. Pokud v testu uvidíte odpověď se „zbrojním průkazem skupiny B“, jde téměř jistě o past.",
          source: "zákon č. 90/2024 Sb.; zákon č. 91/2024 Sb. (soubor MV ot. č. 236, 620)",
        },
        {
          heading: "Zbraně a ústava",
          paragraphs: [
            "Právo nabývat, držet a nosit zbraně je zaručeno, ale jen za podmínek, které stanoví zákon o zbraních a střelivu. Nejde tedy o neomezené právo.",
            "Listina základních práv a svobod navíc výslovně zaručuje právo bránit život svůj i jiného člověka i se zbraní. Do Listiny bylo doplněno ústavním zákonem č. 295/2021 Sb.",
          ],
          source: "Listina základních práv a svobod (soubor MV ot. č. 1, 610, 611)",
        },
        {
          heading: "Konec zbrojního průkazu",
          paragraphs: [
            "Fyzický zbrojní průkaz (plastová kartička) zanikl. Místo něj existuje zbrojní oprávnění, které se vede pouze elektronicky v Centrálním registru zbraní (CRZ).",
            "Kdo měl zbrojní průkaz podle starého zákona, stal se automaticky držitelem zbrojního oprávnění. Staré průkazy ztratily platnost, ale není nutné je nikam odevzdávat.",
          ],
          bullets: [
            "CRZ je neveřejný informační systém veřejné správy,",
            "správcem CRZ je Policejní prezidium ČR,",
            "o vydání oprávnění se písemné rozhodnutí nevyhotovuje – krajské ředitelství policie (KŘP) jen zapíše údaj do CRZ.",
          ],
          tip: "Správcem CRZ není ministerstvo vnitra ani krajské ředitelství, ale Policejní prezidium ČR.",
          source: "zákon č. 90/2024 Sb.; FAQ MV (soubor MV ot. č. 415, 416, 445)",
        },
        {
          heading: "Jak prokážu, že oprávnění mám",
          paragraphs: [
            "Protože průkaz neexistuje, oprávnění se prokazuje jinak. Nejčastěji zbrojním listem – ověřeným výstupem z CRZ, který se předkládá spolu s dokladem totožnosti.",
          ],
          bullets: [
            "zbrojní list + doklad totožnosti,",
            "ověření přímo u KŘP nebo Policejního prezidia ČR,",
            "ověření v CRZ držitelem zbrojní licence (např. prodejcem zbraní),",
            "evropský zbrojní pas.",
          ],
          tip: "Zbrojní list je zdarma na Portálu veřejné správy (přihlášení přes eIdentitu) a nemá omezenou platnost. Vydá ho také KŘP nebo Czech POINT.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 433–443)",
        },
      ],
    },
    {
      id: "zaklady-l2",
      topic: T,
      title: "Nošení zbraně a regulované součásti",
      sections: [
        {
          heading: "Co znamená „nosit“ zbraň",
          paragraphs: [
            "Zákon chápe nošení úzce. Zbraň nosíte, když ji máte na místě veřejnosti přístupném při sobě a je nabitá nebo viditelná.",
            "Obě podmínky – veřejné místo a zároveň nabitá nebo viditelná zbraň – rozhodují. Nenabitá dlouhá zbraň zavřená v neprůhledném pouzdře se proto „nenosí“, jen přepravuje.",
          ],
          tip: "Častá past: doma nebo na vlastní zahradě zbraň v zákonném smyslu „nenosíte“, protože nejde o místo veřejnosti přístupné.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 15, 16)",
        },
        {
          heading: "Skrytě, nebo viditelně?",
          paragraphs: [
            "Zbraň se obecně nosí skrytě. Viditelně ji lze nosit jen při akcích, kde to dává smysl – například při lovu, sportovní střelbě, výcviku, kulturní akci nebo rekonstrukci bitvy.",
            "Ke skrytému nošení zbraně podléhající registraci k ochraně života, zdraví a majetku je potřeba rozšířené zbrojní oprávnění.",
          ],
          source: "§ 81 zákona č. 90/2024 Sb. (soubor MV ot. č. 322–328)",
        },
        {
          heading: "Regulované součásti",
          paragraphs: [
            "Zákon nehlídá jen celé zbraně, ale i některé jejich součásti. S regulovanými součástmi se zachází podobně jako se zbraní.",
          ],
          bullets: [
            "hlavní část zbraně (hlaveň, tělo, revolverový válec, závěr),",
            "součást umožňující samočinnou (automatickou) střelbu,",
            "polotovar hlavní části,",
            "tlumič hluku výstřelu,",
            "nadlimitní zásobník.",
          ],
          tip: "Noktovizor (zařízení pro noční vidění) ani běžná optika regulovanou součástí nejsou.",
          source: "zákon č. 90/2024 Sb., příloha č. 1 (soubor MV ot. č. 6–8)",
        },
      ],
    },
    {
      id: "zaklady-l3",
      topic: T,
      title: "Povinnosti a zákazy pro každého",
      sections: [
        {
          heading: "Povinnosti platí i bez oprávnění",
          paragraphs: [
            "Některé povinnosti zákon ukládá „každému“ – tedy i člověku, který žádné zbrojní oprávnění nemá a třeba jen drží zbraň kategorie NO.",
          ],
          bullets: [
            "na požádání předložit zbraň nebo střelivo, se kterými nakládá, Policii ČR,",
            "neprodleně ohlásit Policii ČR ztrátu nebo odcizení zbraně podléhající registraci nebo zbraně PO,",
            "neprodleně ohlásit Policii ČR použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi.",
          ],
          tip: "Hlásí se i výstřel v nutné obraně, který byl zcela oprávněný. Ohlášení neznamená přiznání viny.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 55–60)",
        },
        {
          heading: "Nalezená zbraň",
          paragraphs: [
            "Kdo najde zbraň, musí nález neprodleně oznámit policii. Pokud ji najde ve vojenském objektu, oznamuje nález Vojenské policii.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 389, 390)",
        },
        {
          heading: "Zákaz nákupu na dálku",
          paragraphs: [
            "Zbraně podléhající registraci (R1–R4), zbraně PO, palné zbraně NO a střelivo nelze nabýt na dálku – typicky přes e-shop spotřebitelskou smlouvou uzavřenou na dálku.",
          ],
          tip: "Zákaz se týká i střeliva, nejen zbraní.",
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 53)",
        },
        {
          heading: "Testy z MV se nešíří",
          paragraphs: [
            "Zákon zakazuje šířit písemné testy, které ministerstvo vnitra oficiálně sestavilo k ověřování odborné způsobilosti. Zveřejněný soubor testových otázek je přitom veřejně k dispozici pro přípravu.",
          ],
          source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 75)",
        },
      ],
    },
  ],

  glossary: [
    { term: "Zákon č. 90/2024 Sb.", topic: T, definition: "Zákon o zbraních a střelivu, účinný od 1. 1. 2026; nahradil zákon č. 119/2002 Sb.", source: "zákon č. 90/2024 Sb." },
    { term: "Zákon č. 91/2024 Sb.", topic: T, definition: "Samostatný zákon o munici – civilní nakládání s municí, neaktivní muniční předměty, pyrotechnický průzkum.", source: "soubor MV ot. č. 236, 620" },
    { term: "Centrální registr zbraní (CRZ)", topic: T, definition: "Neveřejný informační systém veřejné správy, ve kterém se elektronicky vedou zbrojní oprávnění a registrované zbraně. Spravuje ho Policejní prezidium ČR.", source: "soubor MV ot. č. 415, 416" },
    { term: "Zbrojní oprávnění (ZO)", topic: T, definition: "Oprávnění fyzické osoby nakládat se zbraněmi podléhajícími registraci a se střelivem; vede se jen elektronicky v CRZ a nahradilo zbrojní průkaz.", source: "soubor MV ot. č. 78" },
    { term: "Zbrojní list", topic: T, definition: "Ověřený výstup z CRZ, kterým se spolu s dokladem totožnosti prokazuje zbrojní oprávnění. Zdarma, bez omezení platnosti.", source: "soubor MV ot. č. 433–443" },
    { term: "Nošení zbraně", topic: T, definition: "Mít zbraň na místě veřejnosti přístupném při sobě nabitou nebo viditelně.", source: "soubor MV ot. č. 15" },
    { term: "Regulovaná součást", topic: T, definition: "Hlavní část zbraně, součást pro samočinnou střelbu, polotovar hlavní části, tlumič hluku výstřelu a nadlimitní zásobník.", source: "zákon č. 90/2024 Sb., příloha č. 1" },
    { term: "Hlavní části zbraně", topic: T, definition: "Hlaveň (i vložná), tělo (i rám revolveru), revolverový válec a závěr.", source: "soubor MV ot. č. 493–498" },
    { term: "KŘP", topic: T, definition: "Krajské ředitelství policie – úřad, který vede řízení o zbrojním oprávnění a zapisuje údaje do CRZ.", source: "zákon č. 90/2024 Sb." },
    { term: "Nabytí na dálku", topic: T, definition: "Koupě spotřebitelskou smlouvou uzavřenou na dálku (e-shop); u zbraní R1–R4, PO, palných zbraní NO a střeliva zakázáno.", source: "soubor MV ot. č. 53" },
  ],

  flashcards: [
    { id: "zaklady-k01", topic: T, front: "Od kdy je účinný zákon č. 90/2024 Sb.?", back: "Od 1. 1. 2026." },
    { id: "zaklady-k02", topic: T, front: "Který zákon nový zákon o zbraních nahradil?", back: "Zákon č. 119/2002 Sb." },
    { id: "zaklady-k03", topic: T, front: "Jak se jmenuje samostatný zákon o munici?", back: "Zákon č. 91/2024 Sb., o munici." },
    { id: "zaklady-k04", topic: T, front: "Kde se dnes vede zbrojní oprávnění?", back: "Jen elektronicky v Centrálním registru zbraní (CRZ)." },
    { id: "zaklady-k05", topic: T, front: "Kdo je správcem CRZ?", back: "Policejní prezidium ČR." },
    { id: "zaklady-k06", topic: T, front: "Musím odevzdat starý zbrojní průkaz?", back: "Ne. Ztratil platnost, ale odevzdávat se nemusí." },
    { id: "zaklady-k07", topic: T, front: "Zbrojní list – cena a platnost?", back: "Zdarma (Portál veřejné správy), platnost není omezena." },
    { id: "zaklady-k08", topic: T, front: "Kde ještě získám zbrojní list?", back: "Na KŘP nebo na Czech POINTu." },
    { id: "zaklady-k09", topic: T, front: "Nošení zbraně = ?", back: "Na místě veřejnosti přístupném při sobě nabitou NEBO viditelně." },
    { id: "zaklady-k10", topic: T, front: "Nenabitá dlouhá zbraň v neprůhledném pouzdře na ulici – nošení?", back: "Ne, taková zbraň se „nenosí“." },
    { id: "zaklady-k11", topic: T, front: "Jak se zbraň nosí obecně?", back: "Skrytě. Viditelně jen při lovu, sportu, výcviku, kulturních akcích apod. (§ 81)." },
    { id: "zaklady-k12", topic: T, front: "Vyjmenujte regulované součásti.", back: "Hlavní část, součást pro samočinnou střelbu, polotovar hlavní části, tlumič, nadlimitní zásobník." },
    { id: "zaklady-k13", topic: T, front: "Je noktovizor regulovaná součást?", back: "Ne." },
    { id: "zaklady-k14", topic: T, front: "Co musí každý neprodleně ohlásit Policii ČR?", back: "Ztrátu nebo odcizení zbraně R1–R4 nebo PO a ostrou střelbu v nutné obraně či krajní nouzi." },
    { id: "zaklady-k15", topic: T, front: "Komu oznámit nález zbraně ve vojenském objektu?", back: "Vojenské policii (jinak Policii ČR)." },
    { id: "zaklady-k16", topic: T, front: "Co nelze koupit přes e-shop na dálku?", back: "Zbraně R1–R4, PO, palné zbraně NO a střelivo." },
    { id: "zaklady-k17", topic: T, front: "Vyhotovuje se písemné rozhodnutí o vydání ZO?", back: "Ne, KŘP jen zapíše údaj do CRZ." },
    { id: "zaklady-k18", topic: T, front: "Kterým předpisem bylo do Listiny doplněno právo bránit život i se zbraní?", back: "Ústavním zákonem č. 295/2021 Sb." },
  ],

  questions: [
    {
      id: "zaklady-x01", topic: T,
      question: "Od kterého dne je účinný zákon č. 90/2024 Sb., o zbraních a střelivu?",
      options: ["Od 1. 1. 2024", "Od 1. 1. 2026", "Od 1. 7. 2025"],
      correct: 1,
      explanation: "Zákon byl vyhlášen v roce 2024 (proto číslo 90/2024 Sb.), ale účinnosti nabyl až 1. 1. 2026.",
      source: "zákon č. 90/2024 Sb.",
    },
    {
      id: "zaklady-x02", topic: T,
      question: "Který předpis nahradil zákon č. 90/2024 Sb.?",
      options: ["Zákon č. 119/2002 Sb., o zbraních", "Zákon č. 40/2009 Sb., trestní zákoník", "Zákon č. 91/2024 Sb., o munici"],
      correct: 0,
      explanation: "Nový zákon o zbraních a střelivu nahradil zákon č. 119/2002 Sb. Trestní zákoník platí dál a zákon o munici je samostatný předpis přijatý současně.",
      source: "zákon č. 90/2024 Sb.",
    },
    {
      id: "zaklady-x03", topic: T,
      question: "Kterým zákonem se řídí civilní nakládání s municí?",
      options: ["Zákonem č. 90/2024 Sb., o zbraních a střelivu", "Zákonem č. 14/2021 Sb.", "Samostatným zákonem č. 91/2024 Sb., o munici"],
      correct: 2,
      explanation: "Munici, neaktivní muniční předměty a pyrotechnický průzkum upravuje samostatný zákon o munici, nikoli zákon o zbraních a střelivu.",
      source: "zákon č. 91/2024 Sb. (soubor MV ot. č. 236, 620)",
    },
    {
      id: "zaklady-x04", topic: T,
      question: "V jaké podobě dnes existuje zbrojní oprávnění?",
      options: ["Jako plastová kartička se 4letou platností", "Jen elektronicky jako záznam v Centrálním registru zbraní", "Jako papírové rozhodnutí krajského ředitelství policie"],
      correct: 1,
      explanation: "Fyzický zbrojní průkaz zanikl. Oprávnění se vede pouze elektronicky v CRZ a písemné rozhodnutí o jeho vydání se nevyhotovuje.",
      source: "zákon č. 90/2024 Sb.; FAQ MV",
    },
    {
      id: "zaklady-x05", topic: T,
      question: "Máte starý zbrojní průkaz vydaný podle zákona č. 119/2002 Sb. Co s ním musíte udělat?",
      options: ["Nic – průkaz ztratil platnost a odevzdávat ho není nutné", "Do 10 pracovních dnů ho odevzdat na KŘP", "Nechat si ho na Czech POINTu vyměnit za nový"],
      correct: 0,
      explanation: "Držitelé zbrojních průkazů se automaticky stali držiteli zbrojního oprávnění. Průkazy sice ztratily platnost, ale není povinnost je odevzdat.",
      source: "FAQ MV k nové právní úpravě",
    },
    {
      id: "zaklady-x06", topic: T,
      question: "Co je zbrojní list?",
      options: ["Nový název pro plastový zbrojní průkaz", "Seznam zbraní, které smí prodejce prodávat", "Ověřený výstup z CRZ, kterým se spolu s dokladem totožnosti prokazuje oprávnění"],
      correct: 2,
      explanation: "Zbrojní list je ověřený výstup z Centrálního registru zbraní. Slouží k prokázání zbrojního oprávnění a předkládá se spolu s dokladem totožnosti.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 433–443)",
    },
    {
      id: "zaklady-x07", topic: T,
      question: "Jakou platnost a cenu má zbrojní list získaný přes Portál veřejné správy?",
      options: ["Platí 5 let, stojí 100 Kč", "Je zdarma a jeho platnost není omezena", "Platí 1 rok a je zdarma"],
      correct: 1,
      explanation: "Zbrojní list je na Portálu veřejné správy zdarma (po přihlášení přes eIdentitu) a jeho platnost není časově omezena.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 433–443)",
    },
    {
      id: "zaklady-x08", topic: T,
      question: "Kdo je správcem Centrálního registru zbraní?",
      options: ["Ministerstvo vnitra", "Krajské ředitelství policie podle místa pobytu", "Policejní prezidium ČR"],
      correct: 2,
      explanation: "CRZ je neveřejný informační systém veřejné správy a jeho správcem je Policejní prezidium ČR. KŘP do něj údaje zapisuje, ale nespravuje ho.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 415, 416)",
    },
    {
      id: "zaklady-x09", topic: T,
      question: "Nesete po ulici nenabitou dlouhou zbraň uzavřenou v neprůhledném pouzdře. Nosíte ji ve smyslu zákona?",
      options: ["Ne, taková zbraň se nenosí", "Ano, každá zbraň mimo domov se nosí", "Ano, pokud je pouzdro uzamčené"],
      correct: 0,
      explanation: "Nošení vyžaduje, aby zbraň byla nabitá nebo viditelná. Nenabitá zbraň v neprůhledném pouzdře není ani jedno, takže se nenosí.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 16)",
    },
    {
      id: "zaklady-x10", topic: T,
      question: "Je noktovizor (přístroj pro noční vidění) regulovanou součástí zbraně?",
      options: ["Ano, stejně jako tlumič", "Ne, není regulovanou součástí", "Jen pokud je namontován na zbrani R3"],
      correct: 1,
      explanation: "Regulovanými součástmi jsou hlavní části, součásti pro samočinnou střelbu, polotovary hlavních částí, tlumiče a nadlimitní zásobníky. Noktovizor mezi ně nepatří.",
      source: "zákon č. 90/2024 Sb., příloha č. 1 (soubor MV ot. č. 6–8)",
    },
    {
      id: "zaklady-x11", topic: T,
      question: "Ve vojenském výcvikovém objektu najdete zbraň. Komu nález oznámíte?",
      options: ["Obecnímu úřadu", "Nikomu, pokud zbraň nepoužijete", "Vojenské policii"],
      correct: 2,
      explanation: "Nález zbraně je nutné neprodleně oznámit policii; jde-li o vojenský objekt, oznamuje se Vojenské policii.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 389, 390)",
    },
    {
      id: "zaklady-x12", topic: T,
      question: "Zjistíte, že vám byla odcizena registrovaná zbraň. Co musíte udělat?",
      options: ["Neprodleně to ohlásit Policii ČR", "Ohlásit to do 10 pracovních dnů obecnímu úřadu", "Ohlásit to jen pojišťovně"],
      correct: 0,
      explanation: "Ztrátu nebo odcizení zbraně podléhající registraci nebo zbraně PO musí každý neprodleně ohlásit Policii ČR.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 58)",
    },
    {
      id: "zaklady-x13", topic: T,
      question: "Kdy smíte nosit zbraň viditelně?",
      options: ["Kdykoli, má-li zbraň pojistku", "Například při lovu, sportovní střelbě, výcviku nebo kulturní akci", "Jen s rozšířeným zbrojním oprávněním, kdekoli"],
      correct: 1,
      explanation: "Zbraň se obecně nosí skrytě. Viditelné nošení zákon připouští jen při určitých akcích, jako je lov, sport, výcvik, kultura či rekonstrukce bitev.",
      source: "§ 81 zákona č. 90/2024 Sb. (soubor MV ot. č. 322–328)",
    },
    {
      id: "zaklady-x14", topic: T,
      question: "Jak Listina základních práv a svobod upravuje právo bránit se se zbraní?",
      options: ["Neupravuje ho, vyplývá jen z trestního zákoníku", "Zaručuje ho jen policistům a vojákům", "Zaručuje právo bránit život svůj i jiného člověka i se zbraní"],
      correct: 2,
      explanation: "Ústavním zákonem č. 295/2021 Sb. bylo do Listiny doplněno právo bránit život svůj i jiného člověka i se zbraní.",
      source: "Listina základních práv a svobod (soubor MV ot. č. 610, 611)",
    },
    {
      id: "zaklady-x15", topic: T,
      question: "Dostanete po vydání zbrojního oprávnění písemné rozhodnutí?",
      options: ["Ne, KŘP pouze zapíše údaj do CRZ", "Ano, doporučeně poštou", "Ano, ale jen na vyžádání a za poplatek"],
      correct: 0,
      explanation: "U rozhodnutí, kterým se přiznává právo (např. vydání ZO), se písemné rozhodnutí nevyhotovuje. Úřad jen zapíše údaj do CRZ.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 445)",
    },
    {
      id: "zaklady-x16", topic: T,
      question: "Smí se šířit písemné testy, které ministerstvo vnitra oficiálně sestavilo pro zkoušku odborné způsobilosti?",
      options: ["Ano, jsou veřejné", "Ano, ale jen se souhlasem zkušebního komisaře", "Ne, zákon jejich šíření zakazuje"],
      correct: 2,
      explanation: "Zákon zakazuje šířit oficiálně sestavené písemné testy určené k ověřování odborné způsobilosti.",
      source: "zákon č. 90/2024 Sb. (soubor MV ot. č. 75)",
    },
  ],
};
