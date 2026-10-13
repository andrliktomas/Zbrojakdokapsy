import type { TopicContent } from "../types";

const T = "bezpecna-manipulace";
const NV = "příloha č. 2 NV č. 238/2025 Sb.";

export const content: TopicContent = {
  lessons: [
    {
      id: "bezpecna-manipulace-l1",
      topic: T,
      title: "Čtyři základní pravidla bezpečnosti",
      sections: [
        {
          heading: "Pravidla, která platí vždy a všude",
          paragraphs: [
            "Většina nehod se zbraněmi nevzniká technickou závadou, ale lidskou chybou. Čtyři základní pravidla jsou postavená tak, že k neštěstí by musela selhat najednou alespoň dvě z nich.",
          ],
          bullets: [
            "1. Se zbraní vždy zacházej, jako by byla nabitá – i když víš, že není.",
            "2. Nikdy nemiř na nic, co nechceš zasáhnout nebo zničit.",
            "3. Prst drž mimo lučík a spoušť, dokud nemíříš na cíl a nejsi rozhodnut vystřelit.",
            "4. Buď si jistý cílem a tím, co je před ním i za ním.",
          ],
          tip: "„Myslel jsem, že není nabitá“ je nejčastější věta po nehodě. Kontrola zbraně neruší pravidlo č. 1.",
        },
        {
          heading: "Bezpečný směr",
          paragraphs: [
            "Bezpečný směr je směr, kterým by případná vystřelená střela nikoho neohrozila a nezpůsobila škodu. Na střelnici to je obvykle směr k terčům a do záchytného valu, jinde to může být třeba směr do země u měkkého terénu (ne na kámen nebo beton).",
            "Ústí hlavně musí mířit do bezpečného směru po celou dobu manipulace: při nabíjení, vybíjení, kontrole, řešení závady, odkládání i předávání zbraně.",
          ],
          tip: "U zkoušky stačí jednou mávnout ústím přes osoby a praktická část končí neúspěchem.",
        },
        {
          heading: "Prst mimo lučík",
          paragraphs: [
            "Ukazováček leží natažený podél rámu zbraně nad lučíkem. Na spoušť ho položíte až ve chvíli, kdy míříte na cíl a chcete vystřelit. Výjimkou je úkon, který spoušť vyžaduje, např. rána jistoty u zkontrolované a vybité zbraně do bezpečného směru, pokud ji výrobce připouští.",
          ],
          source: NV,
        },
        {
          heading: "Co je za cílem",
          paragraphs: [
            "Střela může cíl minout nebo jím projít. I malorážka .22 LR doletí přes 1,5 km. Nestřílejte, pokud nevidíte, co je za cílem, a nikdy nestřílejte na vodní hladinu, kameny nebo kov – hrozí odraz.",
          ],
        },
      ],
    },
    {
      id: "bezpecna-manipulace-l2",
      topic: T,
      title: "Kontrola zbraně a uvedení do bezpečného stavu",
      sections: [
        {
          heading: "Proč se zbraň kontroluje",
          paragraphs: [
            "Kontrolou zbraně ověříte, že v ní není žádný náboj, a uvedete ji do bezpečného stavu – pro odložení, předání, čištění nebo uložení. Zbraň se kontroluje vždy, když ji berete do ruky nebo ji od někoho přebíráte.",
          ],
        },
        {
          heading: "Samonabíjecí pistole",
          bullets: [
            "Ústí do bezpečného směru, prst mimo lučík.",
            "Vyjměte zásobník (vždy jako první!).",
            "Natáhněte závěr, tím vyhodíte případný náboj z komory, a zajistěte závěr v zadní poloze.",
            "Zrakem (a případně hmatem) zkontrolujte nábojovou komoru a zásobníkovou šachtu.",
            "Zbraň odkládejte se závěrem v zadní poloze, bez zásobníku, ústím do bezpečného směru.",
          ],
          tip: "Pořadí je zásadní: když nejdřív natáhnete závěr a až pak vyjmete zásobník, závěr do komory zasune další náboj.",
          source: NV,
        },
        {
          heading: "Revolver",
          bullets: [
            "Ústí do bezpečného směru, prst mimo lučík.",
            "Vyklopte válec.",
            "Vyhazovačem vyjměte náboje a nábojnice.",
            "Zkontrolujte všechny komory válce.",
            "Revolver odkládejte s vyklopeným válcem.",
          ],
          source: NV,
        },
        {
          heading: "Dlouhé zbraně",
          paragraphs: [
            "U samonabíjecí a opakovací kulovnice se postupuje stejně jako u pistole: nejprve vyjmout zásobník (pokud je vyjímatelný), pak otevřít závěr a vyhodit náboj z komory, zkontrolovat komoru i zásobníkový prostor a zbraň odložit s otevřeným závěrem. U zlamovací brokovnice se hlaveň sklopí a vyjmou se náboje z komor.",
          ],
          source: NV,
        },
        {
          heading: "Přebírání a předávání zbraně",
          paragraphs: [
            "Zbraň se předává vybitá a s otevřeným závěrem (u revolveru s vyklopeným válcem). Kdo zbraň přebírá, sám ji znovu zkontroluje – i kdyby ji před chvílí viděl kontrolovat druhého.",
          ],
        },
      ],
    },
    {
      id: "bezpecna-manipulace-l3",
      topic: T,
      title: "Závady při střelbě: selhač, slabá rána, zádržka",
      sections: [
        {
          heading: "Selhač",
          paragraphs: [
            "Selhač je stav, kdy po stisku spouště a úderu na zápalku náboj nevystřelí. Nebezpečí spočívá v opožděném zážehu: náboj může vystřelit se zpožděním.",
          ],
          bullets: [
            "Zbraň dál držte ústím v bezpečném směru (v cíli), prst mimo spoušť.",
            "Vyčkejte alespoň 10 sekund, případně déle, pokud to stanoví výrobce.",
            "Teprve pak zbraň vybijte, zkontrolujte a prohlédněte zápalku – je na ní otisk zápalníku?",
          ],
          tip: "U zkoušky se na 10 sekund opravdu dbá. Okamžité natažení závěru po selhači je chyba.",
          source: `${NV} (ověřeno: soubor MV, ot. č. 586)`,
        },
        {
          heading: "Slabá rána",
          paragraphs: [
            "Slabá rána zní nezvykle tiše a zpětný ráz je slabší. Častou příčinou je nedostatek prachu. Střela mohla zůstat vězet v hlavni.",
          ],
          bullets: [
            "Okamžitě přestaňte střílet – další výstřel by mohl narazit do uvízlé střely a roztrhnout hlaveň.",
            "Zbraň vybijte a zkontrolujte.",
            "Zkontrolujte průchodnost hlavně.",
          ],
          tip: "Nikdy nestřílejte „ještě jednu pro jistotu“. Slabá rána = konec střelby a kontrola hlavně.",
          source: NV,
        },
        {
          heading: "Zádržka",
          paragraphs: [
            "Zádržka znamená, že se zbraň nepřebila správně: nábojnice nebyla vyhozena, náboj se nedopravil do komory nebo se zasekl mezi závěrem a hlavní.",
          ],
          bullets: [
            "Ústí stále v bezpečném směru, prst mimo lučík.",
            "Vyjměte zásobník.",
            "Natažením a zajištěním závěru odstraňte nábojnici nebo náboj.",
            "Zkontrolujte komoru. Teprve pak smíte pokračovat podle pokynu.",
          ],
          source: NV,
        },
        {
          heading: "Přerušení a ukončení střelby",
          paragraphs: [
            "Na pokyn k přerušení nebo zastavení palby střelec okamžitě přestane střílet, prst dá mimo lučík a zbraň drží v bezpečném směru. Při ukončení střelby zbraň vybije, zkontroluje a nechá zkontrolovat řídícímu střelby nebo komisaři.",
            "Zastavit palbu může zavelet kdokoli, kdo zjistí nebezpečí – například osobu v prostoru terčů.",
          ],
        },
      ],
    },
    {
      id: "bezpecna-manipulace-l4",
      topic: T,
      title: "Praktická zkouška, čištění a každodenní zásady",
      sections: [
        {
          heading: "Co se u praktické části dělá",
          bullets: [
            "Kontrola a uvedení do bezpečného stavu u samonabíjecí pistole, revolveru, samonabíjecí a opakovací dlouhé kulové zbraně.",
            "Řešení závad: selhač, slabá rána, zádržka.",
            "Příprava zbraně k rozebrání a slovní popis čištění.",
            "Střelba: 5 ran z krátké kulové zbraně na 10 m a 5 ran z dlouhé kulové zbraně na 25 m na terč o průměru 500 mm.",
          ],
          source: NV,
        },
        {
          heading: "Za co se u praktické části neprojde",
          paragraphs: [
            "Neúspěch znamená, že jste ohrozili bezpečnost osob, nebo byste ji ohrozili v reálné situaci. Nejde o jemné nedostatky, ale o porušení základních pravidel.",
          ],
          bullets: [
            "Míření na osobu nebo opuštění bezpečného směru.",
            "Prst v lučíku nebo na spoušti bez důvodu.",
            "Nedodržení postupu u závady (např. okamžité otevření zbraně po selhači).",
            "Nerespektování pokynů zkušebního komisaře.",
          ],
          source: NV,
        },
        {
          heading: "Čištění zbraně",
          bullets: [
            "Čistí se jen vybitá a zkontrolovaná zbraň.",
            "Střelivo patří mimo místo, kde se čistí.",
            "Postupuje se podle návodu výrobce, rozebírá se jen v rozsahu, který výrobce určí pro uživatele.",
            "Po čištění zbraň znovu zkontrolujte a ověřte funkci.",
          ],
        },
        {
          heading: "Alkohol, léky a návykové látky",
          paragraphs: [
            "Se zbraní se nesmí nakládat pod vlivem alkoholu nebo jiné návykové látky. Pozor i na léky, které ovlivňují pozornost a reakce – čtěte příbalové informace.",
          ],
          source: "zákon č. 90/2024 Sb.",
        },
        {
          heading: "Uložení a přenášení",
          paragraphs: [
            "Doma má být zbraň zabezpečená proti zneužití, ztrátě a odcizení, mimo dosah dětí a nepovolaných osob. Při přepravě se zbraň obvykle převáží vybitá v pouzdře nebo kufru, odděleně od střeliva.",
          ],
          tip: "Podrobnosti o zabezpečení a přepravě najdete v okruhu „Registrace a nakládání v praxi“.",
        },
      ],
    },
  ],

  glossary: [
    { term: "Bezpečný směr", topic: T, definition: "Směr, ve kterém by případný výstřel nikoho neohrozil a nezpůsobil škodu. Ústí hlavně v něm musí být po celou dobu manipulace." },
    { term: "Kontrola zbraně", topic: T, definition: "Postup, kterým se ověří, že ve zbrani není náboj, a zbraň se uvede do bezpečného stavu (vyjmout zásobník, otevřít závěr, zkontrolovat komoru).", source: NV },
    { term: "Bezpečný stav", topic: T, definition: "Zbraň je vybitá, zkontrolovaná a odložená s otevřeným závěrem (nebo vyklopeným válcem) ústím do bezpečného směru." },
    { term: "Selhač", topic: T, definition: "Náboj po úderu na zápalku nevystřelil. Je nutné vyčkat alespoň 10 s se zbraní v bezpečném směru.", source: NV },
    { term: "Opožděný zážeh", topic: T, definition: "Náboj vystřelí se zpožděním po stisku spouště. Proto se po selhači čeká." },
    { term: "Slabá rána", topic: T, definition: "Nezvykle slabý výstřel s menším zpětným rázem. Střela mohla uvíznout v hlavni, proto se musí přestat střílet a hlaveň zkontrolovat." },
    { term: "Zádržka", topic: T, definition: "Porucha přebití: nábojnice nebyla vyhozena nebo náboj nebyl dopraven do komory." },
    { term: "Rána jistoty", topic: T, definition: "Stisk spouště u vybité a zkontrolované zbraně do bezpečného směru, kterým se uvolní bicí mechanismus. Jen pokud ji výrobce připouští.", source: NV },
    { term: "Lučík", topic: T, definition: "Oblouk kolem spouště. Prst v něm má být jen při záměrném výstřelu." },
    { term: "Záchytný val", topic: T, definition: "Násep nebo stěna za terči na střelnici, která zachycuje střely." },
  ],

  flashcards: [
    { id: "bezpecna-manipulace-k01", topic: T, front: "Pravidlo č. 1?", back: "Se zbraní vždy zacházej, jako by byla nabitá." },
    { id: "bezpecna-manipulace-k02", topic: T, front: "Pravidlo č. 2?", back: "Nikdy nemiř na nic, co nechceš zasáhnout nebo zničit." },
    { id: "bezpecna-manipulace-k03", topic: T, front: "Pravidlo č. 3?", back: "Prst mimo lučík a spoušť, dokud nemíříš na cíl a nejsi rozhodnut vystřelit." },
    { id: "bezpecna-manipulace-k04", topic: T, front: "Pravidlo č. 4?", back: "Buď si jistý cílem a tím, co je před ním a za ním." },
    { id: "bezpecna-manipulace-k05", topic: T, front: "Co je bezpečný směr?", back: "Směr, kde by případný výstřel nikoho neohrozil – na střelnici obvykle k terčům a do záchytného valu." },
    { id: "bezpecna-manipulace-k06", topic: T, front: "Co uděláte s pistolí při kontrole jako první?", back: "Vyjmete zásobník. Teprve pak natáhnete závěr." },
    { id: "bezpecna-manipulace-k07", topic: T, front: "Proč nejdřív zásobník a až pak závěr?", back: "Jinak by závěr při zasunutí dopředu nabil do komory další náboj ze zásobníku." },
    { id: "bezpecna-manipulace-k08", topic: T, front: "Jak se odkládá zkontrolovaná pistole?", back: "Bez zásobníku, se závěrem zajištěným v zadní poloze, ústím do bezpečného směru." },
    { id: "bezpecna-manipulace-k09", topic: T, front: "Jak se kontroluje revolver?", back: "Vyklopit válec, vyjmout náboje a nábojnice, zkontrolovat všechny komory. Odložit s vyklopeným válcem." },
    { id: "bezpecna-manipulace-k10", topic: T, front: "Co je selhač?", back: "Náboj po úderu na zápalku nevystřelil." },
    { id: "bezpecna-manipulace-k11", topic: T, front: "Jak dlouho čekat po selhači?", back: "Alespoň 10 sekund (nebo déle podle výrobce) se zbraní v bezpečném směru." },
    { id: "bezpecna-manipulace-k12", topic: T, front: "Proč se po selhači čeká?", back: "Hrozí opožděný zážeh – náboj může vystřelit se zpožděním." },
    { id: "bezpecna-manipulace-k13", topic: T, front: "Co zkontrolujete na náboji po selhači?", back: "Otisk zápalníku na zápalce." },
    { id: "bezpecna-manipulace-k14", topic: T, front: "Jak poznáte slabou ránu?", back: "Nezvykle tichý výstřel a slabší zpětný ráz." },
    { id: "bezpecna-manipulace-k15", topic: T, front: "Co je největší nebezpečí po slabé ráně?", back: "Střela uvízla v hlavni. Další výstřel by mohl hlaveň roztrhnout." },
    { id: "bezpecna-manipulace-k16", topic: T, front: "Co je zádržka?", back: "Zbraň se správně nepřebila – nábojnice nevyhozena nebo náboj nedopraven do komory." },
    { id: "bezpecna-manipulace-k17", topic: T, front: "Kdo může zavelet zastavení palby?", back: "Kdokoli, kdo zjistí nebezpečí." },
    { id: "bezpecna-manipulace-k18", topic: T, front: "Co dělá střelec na pokyn k zastavení palby?", back: "Ihned přestane střílet, prst mimo lučík, zbraň v bezpečném směru, a čeká na další pokyn." },
    { id: "bezpecna-manipulace-k19", topic: T, front: "Jaká zbraň se smí čistit?", back: "Jen vybitá a zkontrolovaná. Střelivo patří mimo místo čištění." },
    { id: "bezpecna-manipulace-k20", topic: T, front: "Typické důvody neúspěchu v praktické části?", back: "Míření na osobu, opuštění bezpečného směru, prst v lučíku bez důvodu, chybný postup u závady." },
    { id: "bezpecna-manipulace-k21", topic: T, front: "Střelba u praktické zkoušky?", back: "5 ran z krátké zbraně na 10 m a 5 ran z dlouhé zbraně na 25 m, terč o průměru 500 mm." },
    { id: "bezpecna-manipulace-k22", topic: T, front: "Jak se zbraň předává jiné osobě?", back: "Vybitá, s otevřeným závěrem (vyklopeným válcem). Přebírající ji sám znovu zkontroluje." },
  ],

  questions: [
    {
      id: "bezpecna-manipulace-x01", topic: T,
      question: "Kolega vám podává pistoli se slovy „je vybitá, právě jsem ji kontroloval“. Co uděláte?",
      options: ["Sám ji ihned zkontroluji, ústím do bezpečného směru.", "Věřím mu a zbraň rovnou uložím.", "Pro kontrolu jednou stisknu spoušť."],
      correct: 0,
      explanation: "Kdo zbraň přebírá, vždy ji sám zkontroluje. Se zbraní se zachází jako s nabitou, dokud se nepřesvědčíte o opaku.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x02", topic: T,
      question: "Jaké je správné pořadí prvních kroků při kontrole samonabíjecí pistole?",
      options: ["Natáhnout závěr, pak vyjmout zásobník", "Vyjmout zásobník, pak natáhnout závěr a zkontrolovat komoru", "Stisknout spoušť, pak vyjmout zásobník"],
      correct: 1,
      explanation: "Kdybyste natáhli závěr se zásobníkem ve zbrani, závěr by do komory zasunul další náboj.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x03", topic: T,
      question: "Jak se odkládá zkontrolovaná samonabíjecí pistole?",
      options: ["Se zasunutým prázdným zásobníkem a zavřeným závěrem", "S napnutým kohoutem a zajištěná pojistkou", "Bez zásobníku, se závěrem v zadní poloze, ústím do bezpečného směru"],
      correct: 2,
      explanation: "Otevřený závěr a chybějící zásobník umožní každému na první pohled vidět, že je zbraň v bezpečném stavu.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x04", topic: T,
      question: "Při střelbě uslyšíte místo normálního výstřelu jen slabé „lupnutí“ a zpětný ráz je sotva znát. Co uděláte?",
      options: ["Vystřelím znovu, abych ověřil, zda zbraň funguje.", "Přestanu střílet, zbraň vybiji a zkontroluji průchodnost hlavně.", "Vyčkám 10 sekund a pokračuji ve střelbě."],
      correct: 1,
      explanation: "Jde o slabou ránu. Střela mohla zůstat v hlavni a další výstřel by mohl zbraň roztrhnout.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x05", topic: T,
      question: "Proč se po selhači nesmí zbraň hned otevřít?",
      options: ["Mohlo by dojít k opožděnému zážehu náboje.", "Protože by se mohl poškodit zápalník.", "Protože se musí nejprve vychladit hlaveň."],
      correct: 0,
      explanation: "Náboj může vystřelit se zpožděním. Proto se zbraň drží v bezpečném směru alespoň 10 sekund.",
      source: `${NV} (ověřeno: soubor MV, ot. č. 586)`,
    },
    {
      id: "bezpecna-manipulace-x06", topic: T,
      question: "Co po vyčkání u selhače zkontrolujete na vyjmutém náboji?",
      options: ["Délku nábojnice", "Ráži vyraženou na dně", "Zda je na zápalce otisk zápalníku"],
      correct: 2,
      explanation: "Otisk ukáže, zda zápalník na zápalku dopadl. Pokud ne, závada je pravděpodobně ve zbrani, ne v náboji.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x07", topic: T,
      question: "Co znamená zádržka?",
      options: ["Náboj po úderu na zápalku nevystřelil.", "Zbraň se po výstřelu správně nepřebila, např. nevyhodila nábojnici.", "Střela uvízla v hlavni po slabém výstřelu."],
      correct: 1,
      explanation: "Zádržka je porucha přebíjecího cyklu. Selhač je nevystřelený náboj, uvízlá střela je následek slabé rány.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x08", topic: T,
      question: "Kdo smí na střelnici zavelet zastavení palby?",
      options: ["Pouze správce střelnice", "Pouze zkušební komisař", "Kdokoli, kdo zjistí nebezpečí"],
      correct: 2,
      explanation: "Bezpečnost má přednost. Každý, kdo vidí nebezpečí (např. osobu v prostoru terčů), má okamžitě volat zastavení palby.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x09", topic: T,
      question: "Co udělá střelec ihned po pokynu k zastavení palby?",
      options: ["Přestane střílet, dá prst mimo lučík a drží zbraň v bezpečném směru.", "Dostřílí zásobník a pak zbraň odloží.", "Otočí se k řídícímu střelby, aby slyšel další pokyny."],
      correct: 0,
      explanation: "Otočení se zbraní v ruce by porušilo bezpečný směr. Palba se zastavuje okamžitě, ne po dostřílení.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x10", topic: T,
      question: "Která situace u praktické části zkoušky vede k neúspěchu?",
      options: ["Pomalejší, ale správně provedená kontrola zbraně", "Ústí zbraně krátce mine bezpečný směr a míří ke komisaři.", "Dotaz na komisaře, zda může začít"],
      correct: 1,
      explanation: "Neúspěch znamená, že žadatel ohrozil bezpečnost osob, nebo by ji v praxi ohrozil. Míření na osobu je typický případ.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x11", topic: T,
      question: "Kam patří střelivo při čištění zbraně?",
      options: ["Mimo místo, kde se zbraň čistí", "Do zásobníku vedle zbraně, aby bylo po ruce", "Do nábojové komory, aby se nepoškodila při čištění"],
      correct: 0,
      explanation: "Čistí se jen vybitá a zkontrolovaná zbraň. Střelivo na pracovním stole zvyšuje riziko omylu.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x12", topic: T,
      question: "Smíte nakládat se zbraní po dvou pivech, pokud se cítíte v pořádku?",
      options: ["Ano, pokud nestřílíte na veřejném místě.", "Ano, pokud máte rozšířené zbrojní oprávnění.", "Ne, se zbraní se nesmí nakládat pod vlivem alkoholu."],
      correct: 2,
      explanation: "Zákon zakazuje nakládat se zbraní pod vlivem alkoholu nebo jiné návykové látky. Subjektivní pocit nehraje roli.",
      source: "zákon č. 90/2024 Sb.",
    },
    {
      id: "bezpecna-manipulace-x13", topic: T,
      question: "Proč se nesmí střílet na vodní hladinu nebo kamenitý povrch?",
      options: ["Kvůli hluku, který se od nich odráží", "Střela se může odrazit a letět nečekaným směrem.", "Protože střela ztratí rotaci a nezasáhne cíl"],
      correct: 1,
      explanation: "Na tvrdých a plochých površích hrozí odraz (rikošet). Odražená střela může zasáhnout kohokoli v okolí.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x14", topic: T,
      question: "Kdy smíte položit prst na spoušť?",
      options: ["Ihned po nabití zbraně", "Při chůzi se zbraní, abyste byli připraveni", "Až když míříte na cíl a jste rozhodnuti vystřelit"],
      correct: 2,
      explanation: "Do té doby leží prst podél rámu mimo lučík. Výjimkou je např. rána jistoty u zkontrolované zbraně do bezpečného směru.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x15", topic: T,
      question: "Proč nestačí, že má zbraň zajištěnou pojistku?",
      options: ["Pojistka může selhat a pravidla bezpečnosti platí i u zajištěné zbraně.", "Pojistka se po čase sama odjistí.", "Pojistka funguje jen u revolverů."],
      correct: 0,
      explanation: "Pojistka je mechanická součást a nenahrazuje bezpečné chování. I se zajištěnou zbraní se zachází jako s nabitou.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x16", topic: T,
      question: "Při střelbě nastane zádržka. Co uděláte jako první?",
      options: ["Odložím zbraň na stůl a zavolám pomoc.", "Ponechám zbraň v bezpečném směru, prst dám mimo lučík a vyjmu zásobník.", "Podívám se do ústí hlavně, zda tam něco není."],
      correct: 1,
      explanation: "Při řešení jakékoli závady zůstává ústí v bezpečném směru. Pohled do ústí hlavně je vždy hrubé porušení bezpečnosti.",
      source: NV,
    },
    {
      id: "bezpecna-manipulace-x17", topic: T,
      question: "Proč musíte znát, co je za vaším cílem?",
      options: ["Střela může cíl minout nebo jím projít a letět dál.", "Kvůli správnému nastavení mířidel", "Jen kvůli hodnocení zásahů na terči"],
      correct: 0,
      explanation: "Střely letí daleko – i malorážka přes 1,5 km. Zodpovídáte za každou vystřelenou střelu.",
      source: "zásady bezpečného zacházení se zbraní",
    },
    {
      id: "bezpecna-manipulace-x18", topic: T,
      question: "Jak se předává zbraň jiné osobě?",
      options: ["Nabitá a zajištěná, aby byla ihned připravena", "Vybitá, ale se zavřeným závěrem, aby nevnikly nečistoty", "Vybitá, s otevřeným závěrem (u revolveru s vyklopeným válcem)"],
      correct: 2,
      explanation: "Otevřený závěr nebo vyklopený válec jasně ukazuje, že zbraň je v bezpečném stavu. Přebírající ji přesto sám zkontroluje.",
      source: "zásady bezpečného zacházení se zbraní",
    },
  ],
};
