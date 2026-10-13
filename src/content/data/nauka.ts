import type { TopicContent } from "../types";

const T = "nauka";

export const content: TopicContent = {
  lessons: [
    {
      id: "nauka-l1",
      topic: T,
      title: "Z čeho se skládá palná zbraň",
      sections: [
        {
          heading: "Hlavní části každé palné zbraně",
          paragraphs: [
            "Ať jde o pistoli, revolver, nebo pušku, vždy najdete několik stejných stavebních prvků. Kdo je zná, snadno pochopí, jak zbraň funguje a kde se může stát chyba.",
          ],
          bullets: [
            "Hlaveň – trubice, kterou prochází střela. Vzadu je nábojová komora, uprostřed vývrt, vpředu ústí.",
            "Závěr – uzavírá nábojovou komoru zezadu při výstřelu. U pistole je to pohyblivá horní část, u pušky ho ovládáte závěrovou pákou.",
            "Rám (tělo) zbraně – nosná část, na kterou se připevňují ostatní díly. Je v ní spoušťový mechanismus a u pistole i zásobníková šachta.",
            "Spoušť a lučík – spouští výstřel. Lučík je oblouk, který chrání spoušť před nechtěným stiskem.",
            "Bicí a spoušťový mechanismus – spoušťový mechanismus uvolní bicí mechanismus a ten pak prostřednictvím zápalníku nebo úderníku odpálí zápalku.",
            "Pojistky – brání nechtěnému výstřelu (ručně ovládaná páčka, pojistka zápalníku, spoušťová pojistka a další).",
          ],
        },
        {
          heading: "Pistole",
          paragraphs: [
            "Moderní samonabíjecí pistole má hlaveň, závěr (pouzdro závěru), rám s rukojetí a vyjímatelný zásobník v rukojeti. Po výstřelu se závěr vlivem energie výstřelu pohne dozadu, vyhodí prázdnou nábojnici, napne bicí mechanismus a cestou dopředu zasune další náboj do komory.",
            "Mnoho pistolí má záchyt závěru: po vystřelení posledního náboje nebo ručně zůstane závěr v zadní poloze. To se hodí při kontrole zbraně, protože je vidět do nábojové komory.",
          ],
          tip: "I bez zásobníku může být v nábojové komoře náboj. Vyjmutý zásobník ještě neznamená vybitou zbraň.",
        },
        {
          heading: "Revolver",
          paragraphs: [
            "Revolver nemá zásobník v rukojeti. Náboje jsou ve válci, který má několik nábojových komor (obvykle 5–8). Natočením válce se před hlaveň dostane další komora.",
            "U většiny moderních revolverů se válec vyklápí do strany, takže lze najednou vidět všechny komory. Válec se natáčí ručním natažením kohoutu nebo stiskem spouště, proto je revolver zbraní opakovací.",
          ],
        },
        {
          heading: "Dlouhé zbraně",
          paragraphs: [
            "Mezi dlouhé zbraně patří kulovnice (střílejí jednotnou střelou), brokovnice (střílejí broky, případně jednotnou střelou) a kombinované zbraně (mají kulovou i brokovou hlaveň).",
          ],
          bullets: [
            "Kulovnice s odsuvným (válcovým) závěrem – střelec ručně otočí a odsune závorník, tím vyhodí nábojnici a při zasunutí nabije další náboj.",
            "Brokovnice „zlamovací“ – hlaveň se sklopí dolů a náboje se vkládají přímo do komor.",
            "Pumpovací brokovnice – přebíjí se posunem předpažbí dozadu a dopředu.",
            "Samonabíjecí puška nebo brokovnice – přebíjí se sama energií výstřelu.",
          ],
          tip: "Pažba slouží k opření zbraně o rameno, předpažbí k držení zbraně slabou rukou.",
        },
      ],
    },
    {
      id: "nauka-l2",
      topic: T,
      title: "Jak zbraně fungují: mechanismy a závěry",
      sections: [
        {
          heading: "Podle způsobu nabíjení a střelby",
          bullets: [
            "Jednotlivě nabíjená – každý náboj vkládá střelec ručně přímo do nábojové komory (např. jednoranná zlamovací brokovnice).",
            "Opakovací – zbraň má zásobník nebo válec, ale další náboj se do komory dostane až ruční manipulací střelce (odsuvný závěr, pumpa, revolver).",
            "Samonabíjecí – po výstřelu se zbraň sama přebije, ale každý výstřel vyžaduje nový stisk spouště (běžná pistole).",
            "Samočinná – při stisknuté spoušti střílí, dokud spoušť nepustíte nebo nedojdou náboje (dávka).",
          ],
          tip: "Klíčový rozdíl: samonabíjecí = jeden stisk, jeden výstřel. Samočinná = jeden stisk, dávka.",
        },
        {
          heading: "Uzamčený a neuzamčený závěr",
          paragraphs: [
            "Neuzamčený (dynamický) závěr drží nábojovou komoru zavřenou jen svou hmotností a silou vratné pružiny. Je jednoduchý a používá se hlavně u slabších nábojů, třeba .22 LR nebo 9 mm Browning krátký.",
            "Uzamčený závěr je v okamžiku výstřelu pevně spojen s hlavní a otevře se až poté, co tlak plynů klesne. Je nutný u výkonnějších nábojů – většina pistolí v ráži 9 mm Luger má uzamčený závěr.",
          ],
        },
        {
          heading: "Bicí mechanismus: kohout, nebo úderník",
          paragraphs: [
            "Kohoutový bicí mechanismus má kohout, který při spuštění udeří na zápalník a ten na zápalku. Kohout bývá vidět vzadu na zbrani.",
            "Úderníkový (bezkohoutový) mechanismus má uvnitř závěru napružený úderník, který na zápalku udeří přímo. Tak funguje řada moderních pistolí.",
          ],
        },
        {
          heading: "Spoušťový mechanismus: jednočinný a dvojčinný",
          bullets: [
            "Jednočinný (SA, single action) – spoušť pouze uvolní předem napnutý kohout. Je lehký a krátký.",
            "Dvojčinný (DA, double action) – stisk spouště kohout nejprve napne a pak uvolní. Je delší a těžší.",
            "Kombinovaný (DA/SA) – první rána dvojčinně, další jednočinně, protože kohout napne pohyb závěru.",
          ],
        },
        {
          heading: "Pojistky",
          paragraphs: [
            "Pojistky snižují riziko nechtěného výstřelu, ale nikdy nenahrazují bezpečné chování. I zajištěná zbraň se považuje za nabitou a nebezpečnou.",
          ],
          bullets: [
            "Ruční (manuální) pojistka – páčka, kterou střelec přepíná.",
            "Samočinné pojistky – např. pojistka zápalníku, která uvolní zápalník až při úplném stisku spouště, nebo spoušťová pojistka ve spoušti.",
            "Záchytný ozub kohoutu (bezpečnostní polonapnutí) – zachytí kohout, pokud sklouzne z prstu.",
          ],
        },
      ],
    },
    {
      id: "nauka-l3",
      topic: T,
      title: "Střelivo: náboj, zápal, ráže a střely",
      sections: [
        {
          heading: "Z čeho se skládá náboj",
          bullets: [
            "Nábojnice – pouzdro, které drží všechny části pohromadě a při výstřelu utěsní komoru.",
            "Zápalka (zápalková slož) – po úderu zápalníku vytvoří plamen.",
            "Prachová náplň (střelivina) – shoří a vytvoří tlak plynů.",
            "Střela – to, co opouští hlaveň (jednotná střela nebo broky).",
          ],
          tip: "Střela není totéž co náboj. Náboj je celek, střela je jen jeho část, která letí.",
        },
        {
          heading: "Okrajový a středový zápal",
          paragraphs: [
            "U okrajového zápalu je zápalková slož uložena v dutém okraji dna nábojnice a zápalník udeří na okraj. Typicky .22 LR a Flobertky. Takové nábojnice nejdou znovu přebíjet.",
            "U středového zápalu je ve středu dna samostatná zápalka. Systém Boxer má kovadlinku přímo v zápalce a jeden zápalový otvor (snadné přebíjení). Systém Berdan má kovadlinku jako součást nábojnice a zpravidla dva zápalové otvory.",
          ],
        },
        {
          heading: "Ráže",
          paragraphs: [
            "Ráže kulových zbraní udává průměr vývrtu nebo střely, a to v milimetrech (9 mm Luger = 9×19 mm, druhé číslo je délka nábojnice) nebo v setinách palce (.22 = 0,22 palce, asi 5,6 mm).",
            "U brokovnic se ráže udává číslem: kolik olověných koulí o průměru vývrtu by se dalo odlít z jedné anglické libry olova. Proto platí: čím vyšší číslo, tím menší průměr. Ráže 12 je větší než ráže 20.",
          ],
          tip: "Častý chyták: broková ráže 20 je menší než 12, ne větší.",
        },
        {
          heading: "Typy střel",
          bullets: [
            "FMJ (celoplášťová) – olověné jádro celé kryté pláštěm. Málo se deformuje, používá se hlavně na střelnici.",
            "SP (poloplášťová, soft point) – plášť nechává odkrytou olověnou špičku, střela se v cíli deformuje.",
            "HP (s dutinou ve špičce, hollow point) – v cíli se rozevře (expanduje) a předá více energie.",
            "Broky – mnoho malých kuliček v jednom náboji (hromadná střela).",
            "Brenneke – jednotná střela do brokovnice s žebrováním a ucpávkou, na lov velké zvěře.",
          ],
        },
      ],
    },
    {
      id: "nauka-l4",
      topic: T,
      title: "Balistika a zkušební značky",
      sections: [
        {
          heading: "Hlaveň a vývrt",
          paragraphs: [
            "Drážkovaný vývrt má šroubovitě vinuté drážky a mezi nimi pole. Ta střelu roztočí kolem podélné osy, takže letí stabilně a přesně. Mají ho pistole, revolvery i kulovnice.",
            "Hladký vývrt nemá drážky a je typický pro brokovnice. Broky se roztáčet nemusejí, jednotná střela do brokovnice je stabilizovaná svým tvarem.",
          ],
        },
        {
          heading: "Dostřel a účinný dostřel",
          paragraphs: [
            "Dostřel je největší vzdálenost, kam střela vůbec doletí. Účinný dostřel je kratší – je to vzdálenost, na kterou střela ještě spolehlivě zasahuje a má dostatečný účinek.",
            "I za hranicí účinného dostřelu může střela zranit nebo zabít. Proto musíte vždy vědět, co je za cílem.",
          ],
          bullets: [
            "Pistole 9 mm Luger – dostřel zhruba 1,5–2 km.",
            "Malorážka .22 LR – přes 1,5 km.",
            "Puškové náboje – i několik kilometrů.",
            "Broky – orientační pravidlo: průměr broku v mm × 100 = přibližný dostřel v metrech (broky 3 mm doletí asi 300 m).",
          ],
          tip: "Nejdál střela doletí, když se vystřelí šikmo vzhůru (zhruba pod úhlem 30–35°). Střelba „do vzduchu“ je proto velmi nebezpečná.",
        },
        {
          heading: "Zpětný ráz a odraz",
          paragraphs: [
            "Zpětný ráz je pohyb zbraně dozadu při výstřelu. Vzniká jako reakce na to, že střela a prachové plyny jsou vrženy dopředu. Pevný úchop a správný postoj ho pomáhají zvládnout.",
            "Odraz (rikošet) nastane, když střela narazí na tvrdý nebo plochý povrch – vodní hladinu, kámen, beton, kov. Střela pak letí nečekaným směrem. Na takové povrchy se nestřílí.",
          ],
        },
        {
          heading: "Zkušební značky",
          paragraphs: [
            "Palné zbraně a střelivo se v ČR ověřují v Českém úřadu pro zkoušení zbraní a střeliva (ČÚZZS). Zbraň se podrobí zkoušce zvýšeným tlakem a úspěšné ověření se vyznačí zkušebními značkami na hlavni, závěru a dalších namáhaných dílech.",
            "Česká republika je členem C.I.P. (Stálé mezinárodní komise pro zkoušení ručních palných zbraní). Značky členských států se proto vzájemně uznávají.",
          ],
          tip: "Písmeno „X“ vyražené přes zkušební značky znamená, že ověření už neplatí.",
          source: "zákon č. 156/2000 Sb., o ověřování zbraní; vyhláška č. 335/2004 Sb.",
        },
      ],
    },
  ],

  glossary: [
    { term: "Hlaveň", topic: T, definition: "Trubice, kterou prochází střela. Skládá se z nábojové komory, vývrtu a ústí." },
    { term: "Závěr", topic: T, definition: "Část zbraně, která při výstřelu uzavírá nábojovou komoru zezadu. U samonabíjecích zbraní také vyhazuje nábojnici a nabíjí další náboj." },
    { term: "Lučík", topic: T, definition: "Oblouk kolem spouště, který ji chrání před nechtěným stiskem." },
    { term: "Nábojová komora", topic: T, definition: "Zadní část hlavně (nebo komora válce revolveru), do které se vkládá náboj." },
    { term: "Vývrt", topic: T, definition: "Vnitřní povrch hlavně. Drážkovaný vývrt roztáčí střelu, hladký vývrt mají hlavně brokovnice." },
    { term: "Ráže", topic: T, definition: "Označení průměru vývrtu či střely (např. 9 mm, .22). U brokovnic číslo podle počtu koulí z jedné libry olova – vyšší číslo znamená menší průměr." },
    { term: "Samonabíjecí zbraň", topic: T, definition: "Zbraň, která se po výstřelu sama přebije. Na každý výstřel je třeba znovu stisknout spoušť." },
    { term: "Samočinná zbraň", topic: T, definition: "Zbraň, která střílí dávkou, dokud je spoušť stisknutá a jsou k dispozici náboje." },
    { term: "Opakovací zbraň", topic: T, definition: "Zbraň se zásobníkem nebo válcem, u které se další náboj dostane do komory ruční manipulací střelce." },
    { term: "Neuzamčený (dynamický) závěr", topic: T, definition: "Závěr, který při výstřelu drží komoru zavřenou jen svou hmotností a silou pružiny. Používá se u slabších nábojů." },
    { term: "Okrajový zápal", topic: T, definition: "Zápalková slož je v okraji dna nábojnice (např. .22 LR, Flobert)." },
    { term: "Středový zápal", topic: T, definition: "Samostatná zápalka uprostřed dna nábojnice. Systémy Boxer a Berdan." },
    { term: "Účinný dostřel", topic: T, definition: "Vzdálenost, na kterou střela ještě spolehlivě zasahuje a má dostatečný účinek. Je kratší než (maximální) dostřel." },
    { term: "C.I.P.", topic: T, definition: "Stálá mezinárodní komise pro zkoušení ručních palných zbraní. Její členové, včetně ČR, vzájemně uznávají zkušební značky.", source: "zákon č. 156/2000 Sb." },
  ],

  flashcards: [
    { id: "nauka-k01", topic: T, front: "Jaké jsou tři části hlavně?", back: "Nábojová komora, vývrt a ústí." },
    { id: "nauka-k02", topic: T, front: "K čemu slouží lučík?", back: "Chrání spoušť před nechtěným stiskem." },
    { id: "nauka-k03", topic: T, front: "Co dělá závěr?", back: "Uzavírá nábojovou komoru při výstřelu. U samonabíjecí zbraně také vyhodí nábojnici a nabije další náboj." },
    { id: "nauka-k04", topic: T, front: "Samonabíjecí vs. samočinná zbraň?", back: "Samonabíjecí: jeden stisk spouště = jeden výstřel. Samočinná: při držené spoušti střílí dávkou." },
    { id: "nauka-k05", topic: T, front: "Co je opakovací zbraň?", back: "Zbraň se zásobníkem nebo válcem, kterou přebíjí střelec ruční manipulací (odsuvný závěr, pumpa, revolver)." },
    { id: "nauka-k06", topic: T, front: "Co je jednotlivě nabíjená zbraň?", back: "Každý náboj se vkládá ručně přímo do nábojové komory, zbraň nemá zásobník." },
    { id: "nauka-k07", topic: T, front: "Neuzamčený (dynamický) závěr – čím drží komoru zavřenou?", back: "Jen svou hmotností a silou vratné pružiny. Hodí se pro slabší náboje." },
    { id: "nauka-k08", topic: T, front: "Kdy je potřeba uzamčený závěr?", back: "U výkonnějších nábojů, např. 9 mm Luger. Závěr je při výstřelu pevně spojen s hlavní." },
    { id: "nauka-k09", topic: T, front: "Úderník vs. kohout?", back: "Kohout udeří na zápalník. Úderník je napružený v závěru a na zápalku udeří přímo." },
    { id: "nauka-k10", topic: T, front: "Jednočinný (SA) spoušťový mechanismus?", back: "Spoušť jen uvolní předem napnutý kohout." },
    { id: "nauka-k11", topic: T, front: "Dvojčinný (DA) spoušťový mechanismus?", back: "Stisk spouště kohout napne i uvolní." },
    { id: "nauka-k12", topic: T, front: "Čtyři části náboje?", back: "Nábojnice, zápalka, prachová náplň, střela." },
    { id: "nauka-k13", topic: T, front: "Kde je zápalková slož u okrajového zápalu?", back: "V dutém okraji dna nábojnice (např. .22 LR, Flobert)." },
    { id: "nauka-k14", topic: T, front: "Boxer vs. Berdan?", back: "Boxer: kovadlinka v zápalce, jeden zápalový otvor. Berdan: kovadlinka v nábojnici, obvykle dva otvory." },
    { id: "nauka-k15", topic: T, front: "Která broková ráže je větší: 12, nebo 20?", back: "Ráže 12. U brokovnic platí: vyšší číslo = menší průměr." },
    { id: "nauka-k16", topic: T, front: "Co znamená 9×19 mm?", back: "Ráže 9 mm Luger: průměr střely asi 9 mm, délka nábojnice 19 mm." },
    { id: "nauka-k17", topic: T, front: "FMJ?", back: "Celoplášťová střela: olověné jádro celé pokryté pláštěm. Málo se deformuje." },
    { id: "nauka-k18", topic: T, front: "HP?", back: "Hollow point – střela s dutinou ve špičce, v cíli expanduje." },
    { id: "nauka-k19", topic: T, front: "Co je Brenneke?", back: "Jednotná střela do brokovnice s žebrováním a ucpávkou." },
    { id: "nauka-k20", topic: T, front: "Dostřel vs. účinný dostřel?", back: "Dostřel = kam střela vůbec doletí. Účinný dostřel = kam ještě spolehlivě zasahuje s dostatečným účinkem. Je kratší." },
    { id: "nauka-k21", topic: T, front: "Pravidlo pro dostřel broků?", back: "Průměr broku v mm × 100 = přibližný dostřel v metrech." },
    { id: "nauka-k22", topic: T, front: "Proč vzniká zpětný ráz?", back: "Je to reakce na to, že střela a prachové plyny jsou vrženy dopředu." },
    { id: "nauka-k23", topic: T, front: "Kdo v ČR ověřuje zbraně?", back: "Český úřad pro zkoušení zbraní a střeliva (ČÚZZS)." },
    { id: "nauka-k24", topic: T, front: "Co znamená „X“ přes zkušební značky?", back: "Ověření zbraně již neplatí." },
    { id: "nauka-k25", topic: T, front: "Co je odraz (rikošet)?", back: "Změna směru střely po nárazu na tvrdou nebo plochou plochu (voda, kámen, kov). Střela pak letí nepředvídatelně." },
  ],

  questions: [
    {
      id: "nauka-x01", topic: T,
      question: "Která zbraň vystřelí při jednom stisku spouště pouze jednu ránu a přitom se sama přebije?",
      options: ["Samonabíjecí", "Samočinná", "Jednotlivě nabíjená"],
      correct: 0,
      explanation: "Samonabíjecí zbraň využije energii výstřelu k přebití, ale na další výstřel je nutný nový stisk spouště. Samočinná zbraň střílí dávkou.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x02", topic: T,
      question: "Co je hlavním úkolem závěru palné zbraně?",
      options: ["Chránit spoušť před nechtěným stiskem", "Uzavřít nábojovou komoru zezadu v okamžiku výstřelu", "Roztočit střelu kolem její osy"],
      correct: 1,
      explanation: "Závěr uzavírá komoru, aby plyny tlačily střelu dopředu. Spoušť chrání lučík, rotaci střele dává drážkovaný vývrt.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x03", topic: T,
      question: "Která broková ráže má největší průměr vývrtu?",
      options: ["Ráže 20", "Ráže 16", "Ráže 12"],
      correct: 2,
      explanation: "Číslo brokové ráže udává, kolik koulí o průměru vývrtu se odlije z jedné libry olova. Čím menší číslo, tím větší průměr.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x04", topic: T,
      question: "Jak drží neuzamčený (dynamický) závěr nábojovou komoru zavřenou při výstřelu?",
      options: ["Otočným závorníkem zapadajícím do pouzdra", "Svou hmotností a silou vratné pružiny", "Výkyvnou hlavní, která se zaklesne do závěru"],
      correct: 1,
      explanation: "Neuzamčený závěr není s hlavní mechanicky spojen. Proto se používá jen u slabších nábojů, třeba .22 LR.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x05", topic: T,
      question: "Z jakých částí se skládá náboj do kulové zbraně?",
      options: ["Nábojnice, zápalka, prachová náplň a střela", "Hlaveň, závěr, zápalka a střela", "Zásobník, nábojnice a střela"],
      correct: 0,
      explanation: "Náboj tvoří nábojnice, zápalka, prachová náplň (střelivina) a střela. Hlaveň, závěr a zásobník jsou části zbraně.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x06", topic: T,
      question: "Čím se liší středový zápal typu Boxer od typu Berdan?",
      options: ["Boxer se používá jen u brokových nábojů.", "Berdan má zápalkovou slož v okraji dna nábojnice.", "Boxer má kovadlinku přímo v zápalce a jeden zápalový otvor."],
      correct: 2,
      explanation: "U systému Berdan je kovadlinka součástí nábojnice a otvory jsou zpravidla dva. Boxer se proto snáz přebíjí.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x07", topic: T,
      question: "Co označuje zkratka FMJ u střely?",
      options: ["Střelu s dutinou ve špičce", "Celoplášťovou střelu", "Jednotnou střelu do brokovnice"],
      correct: 1,
      explanation: "FMJ (full metal jacket) má olověné jádro celé kryté pláštěm. Dutinu ve špičce má HP, jednotnou střelou do brokovnice je např. Brenneke.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x08", topic: T,
      question: "Jak se chová střela typu HP (hollow point) po zásahu měkkého cíle?",
      options: ["Rozevře se (expanduje) a předá více energie.", "Projde cílem beze změny tvaru.", "Rozpadne se na broky ještě před cílem."],
      correct: 0,
      explanation: "Dutina ve špičce způsobí, že se střela v cíli rozšíří. Tím se zmenší průstřelnost a zvětší účinek.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x09", topic: T,
      question: "Co je střela Brenneke?",
      options: ["Celoplášťová pistolová střela", "Brok největšího průměru", "Jednotná střela do brokovnice"],
      correct: 2,
      explanation: "Brenneke je masivní olověná jednotná střela s žebrováním a ucpávkou, používaná z brokovnic hlavně na velkou zvěř.",
      source: "nauka o střelivu",
    },
    {
      id: "nauka-x10", topic: T,
      question: "Jaký je vztah mezi dostřelem a účinným dostřelem?",
      options: ["Jsou vždy stejné.", "Účinný dostřel je kratší než dostřel.", "Účinný dostřel je delší než dostřel."],
      correct: 1,
      explanation: "Dostřel je maximální vzdálenost, kam střela doletí. Účinný dostřel je jen ta část, kde střela spolehlivě zasahuje a má dostatečný účinek. Nebezpečná je ale po celé dráze.",
      source: "nauka o zbraních – balistika",
    },
    {
      id: "nauka-x11", topic: T,
      question: "Jaký je podle orientačního pravidla přibližný dostřel broků o průměru 3 mm?",
      options: ["Asi 30 m", "Asi 3 km", "Asi 300 m"],
      correct: 2,
      explanation: "Orientačně platí: průměr broku v milimetrech × 100 = dostřel v metrech.",
      source: "nauka o zbraních – balistika",
    },
    {
      id: "nauka-x12", topic: T,
      question: "Proč vzniká zpětný ráz zbraně?",
      options: ["Jako reakce na pohyb střely a plynů dopředu", "Protože střela narazí do cíle", "Kvůli tření střely o drážky vývrtu, které zbraň brzdí"],
      correct: 0,
      explanation: "Podle zákona akce a reakce se zbraň pohne opačným směrem než střela a prachové plyny.",
      source: "nauka o zbraních – balistika",
    },
    {
      id: "nauka-x13", topic: T,
      question: "Na zbrani je přes zkušební značky vyraženo písmeno „X“. Co to znamená?",
      options: ["Zbraň prošla zesílenou zkouškou.", "Ověření zbraně již neplatí.", "Zbraň je určena jen pro export."],
      correct: 1,
      explanation: "Přeražení značek písmenem „X“ označuje neplatné ověření. Zbraň s neplatným ověřením nelze dál bezpečně a legálně používat.",
      source: "zákon č. 156/2000 Sb.; vyhláška č. 335/2004 Sb.",
    },
    {
      id: "nauka-x14", topic: T,
      question: "Proč Česká republika uznává zkušební značky zbraní ověřených v jiných členských státech C.I.P.?",
      options: ["Protože je sama členem C.I.P. a členové značky vzájemně uznávají", "Protože to vyžaduje každý výrobce", "Neuznává je, každá dovezená zbraň se musí znovu ověřit"],
      correct: 0,
      explanation: "C.I.P. je Stálá mezinárodní komise pro zkoušení ručních palných zbraní. Její členové, včetně ČR, si vzájemně uznávají zkušební značky.",
      source: "zákon č. 156/2000 Sb.",
    },
    {
      id: "nauka-x15", topic: T,
      question: "Jak funguje dvojčinný (DA) spoušťový mechanismus?",
      options: ["Spoušť jen uvolní kohout, který musí být předem napnutý.", "Zbraň po stisku spouště vystřelí dvě rány.", "Stisk spouště kohout nejprve napne a pak uvolní."],
      correct: 2,
      explanation: "Dvojčinný chod je delší a těžší. U jednočinného (SA) chodu spoušť jen uvolní předem napnutý kohout.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x16", topic: T,
      question: "Kterou brokovnici přebíjí střelec posunem předpažbí dozadu a dopředu?",
      options: ["Zlamovací", "Pumpovací", "Samonabíjecí"],
      correct: 1,
      explanation: "Pumpovací brokovnice je opakovací zbraň. Pohybem předpažbí se vyhodí prázdná nábojnice a nabije další náboj.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x17", topic: T,
      question: "Proč nestačí jen vyjmout zásobník, abyste měli pistoli vybitou?",
      options: ["V nábojové komoře může stále zůstat náboj.", "Bez zásobníku pistole vystřelí sama.", "Zásobník se musí nejprve vybít, jinak zůstane zbraň napnutá."],
      correct: 0,
      explanation: "Vyjmutím zásobníku se náboj z komory neodstraní. Je nutné natáhnout závěr a komoru zkontrolovat.",
      source: "nauka o zbraních",
    },
    {
      id: "nauka-x18", topic: T,
      question: "Pod jakým úhlem vystřelená střela doletí nejdál?",
      options: ["Kolmo vzhůru", "Vodorovně", "Šikmo vzhůru, zhruba pod úhlem 30–35°"],
      correct: 2,
      explanation: "Kvůli odporu vzduchu leží úhel největšího dostřelu zhruba mezi 30 a 35°. Výstřel šikmo do vzduchu je proto velmi nebezpečný.",
      source: "nauka o zbraních – balistika",
    },
  ],
};
