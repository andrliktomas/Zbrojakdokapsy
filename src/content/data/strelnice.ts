import type { TopicContent } from "../types";

// Zdroj faktů: docs/research/legislativa.md (kap. 2.1, 2.5, 3.1, 5) – lekce 1–2.
// Lekce 3–8: soubor testových otázek MV (verze 15. 12. 2025), ot. č. 228–267 a 555–561,
// ověřeno proti znění zákona č. 90/2024 Sb. k 1. 1. 2026 (§ 59–69, příloha č. 3)
// a § 8 NV č. 187/2025 Sb. Otázky jsou vlastní parafráze, ne doslovné znění MV.

const T = "strelnice";
const MV = (n: string) => `soubor otázek MV (verze 15. 12. 2025), ot. č. ${n}`;
const Z = "zákona č. 90/2024 Sb.";

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
    {
      id: "strelnice-l3",
      topic: T,
      title: "Kde se smí střílet",
      sections: [
        {
          heading: "Čtyři druhy míst, kde smíte střílet",
          paragraphs: [
            "Zákon přesně říká, kde osoba nakládající se zbraní a střelivem smí střílet. Nestačí, že jde o váš pozemek nebo že kolem nikdo není. Zapamatujte si čtyři možnosti:",
          ],
          bullets: [
            "na střelnici provozované podle zákona o zbraních a střelivu,",
            "na střelnici, kterou provozuje vyňatá veřejnoprávní instituce (např. ministerstvo vnitra, ministerstvo obrany, armáda nebo policie),",
            "na místě, kde je zajištěno, že nebude ohrožen život, zdraví, majetek ani veřejný pořádek – ale jen ze zbraně s úsťovou energií střely nejvýše 50 J, ze signální zbraně nebo jde-li o jinou než ostrou střelbu,",
            "na jiném místě, které stanoví jiný zákon (např. zákon o myslivosti nebo veterinární zákon).",
          ],
          tip: "Chyták: „Smíte střílet pouze na střelnici provozované podle zákona o zbraních.“ To neplatí – smíte i na střelnici vyňaté instituce a v dalších případech, které zákon vyjmenovává.",
          source: `§ 59 odst. 1 ${Z}; ${MV("228, 230–232, 234")}`,
        },
        {
          heading: "Střelnice ministerstev, armády a policie",
          paragraphs: [
            "Vyňatými veřejnoprávními institucemi jsou ministerstvo vnitra, ministerstvo obrany, ozbrojené síly ČR, bezpečnostní sbory ČR a Český úřad pro zkoušení zbraní a střeliva. Zákon o zbraních a střelivu se na ně vztahuje jen tam, kde to výslovně stanoví.",
            "Na jejich střelnici smíte střílet i vy, pokud vám to její provozovatel umožní. Souhlas krajského ředitelství policie k tomu nepotřebujete a zákon tu nestanoví ani žádný limit úsťové energie (např. 30 J).",
            "Platí to i obráceně: kdo při plnění úkolů vyňaté instituce (např. policista na výcviku) využívá běžnou střelnici, musí dodržovat její provozní řád.",
          ],
          tip: "Na střelnici MV nebo MO smíte střílet, pokud vám to provozovatel umožní. Předchozí souhlas krajského ředitelství policie se nevyžaduje.",
          source: `§ 1 odst. 3 a 4, § 59 odst. 1 písm. b) ${Z}; ${MV("228, 229")}`,
        },
        {
          heading: "Mimo střelnici: slabé zbraně, signální zbraně, neostrá střelba",
          paragraphs: [
            "Bez střelnice smíte střílet jen ve třech případech: ze zbraně, u které úsťová energie střely není vyšší než 50 J (např. běžná vzduchovka), ze signální zbraně, nebo jde-li o jinou než ostrou střelbu (např. cvičnými náboji bez střely).",
            "I tehdy jen na místě, kde je zajištěno, že nebude ohrožen život, zdraví, majetek ani veřejný pořádek. Za bezpečnost místa odpovídáte vy – žádný úřad ho předem neschvaluje ani neurčuje.",
          ],
          tip: "Chytáky: ani „soukromý pozemek“, ani „souhlas obecního úřadu“, ani „rozhodnutí krajského ředitelství policie“ střelbu mimo střelnici samy nepovolují. A nasazený tlumič hluku výstřelu z výkonné palné zbraně „slabou“ zbraň neudělá.",
          source: `§ 59 odst. 1 písm. c) ${Z}; ${MV("230–232")}`,
        },
        {
          heading: "Zbraně, které nejsou palné ani plynové",
          paragraphs: [
            "Za zbraně zákon považuje i některá zařízení, která nejsou palná ani plynová – například některá laserová zařízení nebo plamenomety. Používat je smíte na místě, kde je zajištěno, že nebude ohrožen život, zdraví, majetek ani veřejný pořádek. Zvlášť schválenou střelnici k tomu nepotřebujete.",
          ],
          source: `§ 59 odst. 2 ${Z}; ${MV("233")}`,
        },
        {
          heading: "Myslivost a další zákony",
          paragraphs: [
            "Zákon o zbraních a střelivu není jediný, který určuje, kde se smí střílet. Jiný zákon může stanovit i jiné místo pro střelbu, a to i z palné zbraně. Zákon o zbraních výslovně odkazuje na zákon o myslivosti (lov v honitbě), veterinární zákon a zákon o nakládání se zbraněmi v některých případech ovlivňujících vnitřní pořádek nebo bezpečnost ČR.",
          ],
          tip: "Odpověď „ano, ale jen z jiné než palné zbraně“ je špatně. Myslivec střílí v honitbě z palné zbraně podle zákona o myslivosti.",
          source: `§ 59 odst. 1 písm. d) ${Z} (zákony č. 449/2001 Sb., 166/1999 Sb., 14/2021 Sb.); ${MV("234")}`,
        },
        {
          heading: "Munice na střelnici",
          paragraphs: [
            "Střelbu munice upravuje samostatný zákon č. 91/2024 Sb., o munici. Na střelnici povolené podle zákona o zbraních a střelivu ale smíte střílet i munici, pokud splní obě podmínky:",
          ],
          bullets: [
            "střela neobsahuje aktivní muniční náplně (např. výbušninu),",
            "kinetická energie střely je srovnatelná se střelivem, jehož použití je na dané střelnici povoleno.",
          ],
          tip: "Munici se střelou obsahující výbušninu na běžné střelnici střílet nesmíte – ani v malém množství, ani kdyby to připouštěl provozní řád.",
          source: `§ 59 odst. 3 ${Z}; ${MV("235, 236")}`,
        },
        {
          heading: "Co může být střelnicí a kdy je potřeba povolení",
          paragraphs: [
            "Jako střelnici lze využít pozemek, stavbu i technické zařízení – vždy za podmínky, že je podle zákona zajištěna bezpečnost provozu.",
            "Povolení krajského ředitelství policie potřebuje provoz střelnice pro střelbu ze zbraní, u kterých je úsťová energie střely vyšší než 50 J. Střelnice jen pro slabší zbraně (pod 50 J) nepotřebuje povolení policie ani souhlas Českého úřadu pro zkoušení zbraní a střeliva.",
          ],
          tip: "Hranice 50 J se v testu opakuje: do 50 J smíte střílet i mimo střelnici na bezpečném místě a střelnice jen pro takové zbraně nepotřebuje povolení. Nad 50 J je třeba povolená střelnice (nebo jiný zákonný důvod).",
          source: `§ 60 odst. 1 a 2 ${Z}; ${MV("237, 238")}`,
        },
      ],
    },
    {
      id: "strelnice-l4",
      topic: T,
      title: "Povolení provozovat střelnici",
      sections: [
        {
          heading: "Kdo povolení vydává a komu",
          paragraphs: [
            "Povolení provozovat střelnici vydává na žádost krajské ředitelství policie. Kdo povolení získá, je provozovatelem střelnice.",
            "Povolení může dostat fyzická i právnická osoba. Žadatel musí splnit čtyři podmínky:",
          ],
          bullets: [
            "je plně svéprávnou zletilou fyzickou osobou, nebo je právnickou osobou,",
            "splňuje podmínku bezúhonnosti a spolehlivosti,",
            "ustanovil správce střelnice,",
            "prokáže, že střelnice splňuje technické a organizační požadavky podle přílohy č. 3 zákona.",
          ],
          tip: "Tvrzení „povolení lze vydat pouze právnické osobě“ je nepravdivé. Zbrojní licenci musí mít jen provozovatel zapsané zkouškové střelnice a střelnice, kde smějí střílet cizinci bez oprávnění k přeshraničnímu přemístění zbraně.",
          source: `§ 60 odst. 4 a 5, § 61 odst. 1 ${Z}; ${MV("244")}`,
        },
        {
          heading: "Co se přikládá k žádosti",
          paragraphs: [
            "Vyjádření hygieny k hluku není nutné u střelnic, které vymezuje nařízení vlády č. 187/2025 Sb. (střelnice se sníženou úrovní hlučnosti). Jde například o střelnici jen pro plynové zbraně, o střelnici, kde se z palných zbraní smí střílet jen s tlumičem hluku výstřelu za stanovených podmínek, nebo o střelnici vzdálenou alespoň 2 000 m od chráněného venkovního prostoru.",
            "K žádosti se přikládá:",
          ],
          bullets: [
            "provozní řád střelnice odpovídající požadavkům zákona,",
            "znalecký posudek od znalce zapsaného v seznamu znalců, nebo projektová, popřípadě technická dokumentace – prokazují bezpečnost provozu,",
            "povolení využít pozemek, stavbu nebo technické zařízení pro střelnici, pokud ho vyžaduje jiný předpis (např. stavební zákon),",
            "vyjádření krajské hygienické stanice k provoznímu řádu z hlediska ochrany veřejného zdraví před hlukem (s výjimkami podle nařízení vlády).",
          ],
          tip: "Vyjádření krajského úřadu k veřejné mravnosti nebo k prevenci sociálně patologických jevů se nepřikládá vůbec. A vyjádření hygieny se netýká jen otevřených střelnic – výjimky stanoví nařízení vlády č. 187/2025 Sb.",
          source: `§ 61 odst. 2 a 3 ${Z}; § 8 NV č. 187/2025 Sb.; ${MV("245, 246")}`,
        },
        {
          heading: "Střelnice na místě dřívější střelnice",
          paragraphs: [
            "Pokud na stejném místě v posledních 24 měsících před podáním žádosti už fungovala střelnice, která se svou povahou v podstatných znacích neliší od té nové, je řízení jednodušší. K žádosti stačí přiložit provozní řád – znalecký posudek, povolení využití pozemku ani vyjádření hygieny se nedokládají.",
            "Úleva neplatí, pokud bylo původní povolení odňato proto, že provozovatel neodstranil nedostatky, kvůli kterým bylo povolení pozastaveno.",
          ],
          tip: "Krajské ředitelství policie v tomto případě neprodlužuje staré povolení – vydává nové, jen s menším počtem povinných příloh.",
          source: `§ 66 odst. 1 ${Z}; ${MV("262")}`,
        },
      ],
    },
    {
      id: "strelnice-l5",
      topic: T,
      title: "Provozní řád, provozní kniha a povinnosti provozovatele",
      sections: [
        {
          heading: "Co musí obsahovat provozní řád",
          paragraphs: [
            "Provozní řád musí odpovídat technickým a organizačním požadavkům přílohy č. 3 zákona. Vymezuje zejména:",
          ],
          bullets: [
            "pravidla bezpečného provozu s ohledem na místní podmínky a používané zbraně a střelivo,",
            "způsob vedení provozní knihy střelnice,",
            "způsob ověření totožnosti osoby, která na střelnici střílí,",
            "způsob ustanovování správce střelnice a jeho úkoly,",
            "pravidla dohledu správce nad nakládáním se zbraněmi a střelivem po celou dobu střelby a způsob, jak je správce viditelně označen,",
            "postup při mimořádné situaci (zranění nebo usmrcení osoby, požár),",
            "jak je provozní řád na střelnici zpřístupněn.",
          ],
          tip: "Provozní řád nevymezuje náležitosti žádosti o povolení provozovat střelnici – ty stanoví zákon.",
          source: `§ 62 ${Z}; ${MV("247")}`,
        },
        {
          heading: "Provozní kniha a ověření totožnosti",
          paragraphs: [
            "Provozní kniha střelnice je seznam osob, které na střelnici střílejí, a zbraní, které k tomu používají. Zapisuje se do ní alespoň jméno, příjmení, druh a číslo dokladu totožnosti střelce, datum a čas užívání střelnice a u cizince i státní příslušnost.",
            "Totožnost každého, kdo na střelnici střílí, se ověřuje – nejen u cizinců. Jak, to stanoví provozní řád. Provozovatel uchovává provozní knihu nejméně 36 měsíců po skončení kalendářního roku.",
          ],
          tip: "Provozní kniha nevymezuje práva a povinnosti správce ani odpovědnost za škodu – je to seznam střelců a jejich zbraní. Lhůta uchování je 36 měsíců, ne 60.",
          source: `§ 62 písm. b) a c), § 63 odst. 1 písm. e) ${Z}; ${MV("248–250")}`,
        },
        {
          heading: "Povinnosti provozovatele střelnice",
          bullets: [
            "seznámit s provozním řádem každého, kdo bude na střelnici střílet, a dohlížet na jeho dodržování,",
            "zpřístupnit aktuální provozní řád na střelnici a bez zbytečného odkladu ho (i každou změnu) předložit krajskému ředitelství policie – jinak je provozní řád neúčinný,",
            "změnit provozní řád, jakmile přestane odpovídat podmínkám provozu nebo zákonu,",
            "ustanovit správce střelnice a bez zbytečného odkladu oznámit krajskému ředitelství policie ustanovení i ukončení funkce každého správce,",
            "vést provozní knihu a uchovat ji nejméně 36 měsíců po skončení kalendářního roku.",
          ],
          tip: "Když se změní podmínky provozu, povolení samo nezaniká – provozovatel musí změnit provozní řád. S provozním řádem se seznamují střelci, ne lidé v ochranném pásmu střelnice.",
          source: `§ 63 odst. 1 ${Z}; ${MV("250, 251")}`,
        },
        {
          heading: "Cizinec bez pobytu v ČR",
          paragraphs: [
            "Na střelnici smí střílet i cizinec, který nemá v ČR místo pobytu a neprokáže se oprávněním k přeshraničnímu přemístění zbraně nebo střeliva (typicky turista). Provozovatel pak musí kromě zápisu do provozní knihy zajistit také zápis do centrálního registru zbraní v obdobném rozsahu – bez zbytečného odkladu, v mimořádných odůvodněných případech nejpozději do 2 pracovních dnů.",
            "Střelnici, jejíž provozní řád takovou střelbu umožňuje, smí provozovat jen držitel zbrojní licence.",
          ],
          tip: "Zákon nevyžaduje řídícího střelby, který mluví jazykem cizince. Klíčová je povinnost zápisu do centrálního registru zbraní.",
          source: `§ 60 odst. 5, § 63 odst. 2 ${Z}; ${MV("252")}`,
        },
      ],
    },
    {
      id: "strelnice-l6",
      topic: T,
      title: "Správce střelnice a řídící střelby",
      sections: [
        {
          heading: "Kdo může být správcem střelnice",
          paragraphs: [
            "Správce ustanovuje žadatel o povolení nebo provozovatel střelnice. Správcem může být jen plně svéprávná zletilá osoba, která je držitelem zbrojního oprávnění. Zároveň musí mít k provozovateli jeden z těchto vztahů:",
          ],
          bullets: [
            "je sám žadatelem nebo provozovatelem,",
            "je členem nebo společníkem provozovatele, nebo členem jeho orgánu,",
            "je odpovědným zástupcem provozovatele,",
            "je k provozovateli v pracovněprávním nebo obdobném vztahu.",
          ],
          tip: "Chyták: „správcem nesmí být člen orgánu ani odpovědný zástupce provozovatele“ – opak je pravdou. Vyžaduje se zbrojní oprávnění; zapsaná autorizace ho nenahradí a zákon nežádá ani praxi v řízení střelby.",
          source: `§ 64 odst. 1 ${Z}; ${MV("253, 254")}`,
        },
        {
          heading: "Co dělá správce",
          paragraphs: [
            "Správce v souladu s provozním řádem dohlíží na jeho dodržování. Aby zajistil bezpečné nakládání se zbraněmi a střelivem, smí osobám na střelnici udělovat pokyny – a vy je musíte respektovat.",
            "Zákon mu neukládá technickou správu areálu ani dohled nad pravidly sportovních federací při závodech. Jeho úkolem je dohled nad dodržováním provozního řádu.",
          ],
          source: `§ 64 odst. 2 ${Z}; ${MV("255, 256")}`,
        },
        {
          heading: "Řídící střelby",
          paragraphs: [
            "Řídící střelby pomáhá správci: poskytuje mu součinnost při dohledu nad dodržováním provozního řádu a při zajišťování bezpečného nakládání se zbraněmi a střelivem.",
            "Určuje ho správce střelnice, ale jen tehdy, stanoví-li to provozní řád. Řídícím střelby může být plně svéprávná zletilá osoba, která je držitelem zbrojního oprávnění. Zbrojní licenci mít nemusí.",
          ],
          tip: "Řídícího střelby neurčuje policie. Správce ho nemůže určit „sám od sebe“, pokud to provozní řád nepřipouští.",
          source: `§ 65 odst. 1 a 2 ${Z}; ${MV("256–258")}`,
        },
        {
          heading: "Písemný záznam o určení řídícího střelby",
          paragraphs: [
            "O určení řídícího střelby musí vzniknout písemný záznam. Podepisuje ho správce střelnice i řídící střelby a vymezuje se v něm rozsah úkolů řídícího. Bez písemného záznamu je určení neplatné – a to automaticky, nikdo se neplatnosti nemusí dovolávat. Záznam se uchovává obdobně jako provozní kniha.",
          ],
          tip: "Policie se o určení řídícího nevyrozumívá a ústní dohoda nestačí, ani za přítomnosti provozovatele. Do provozního řádu se řídící nezapisuje.",
          source: `§ 65 odst. 3 ${Z}; ${MV("259–261")}`,
        },
      ],
    },
    {
      id: "strelnice-l7",
      topic: T,
      title: "Pozastavení, odnětí a zánik povolení",
      sections: [
        {
          heading: "Pozastavení povolení",
          paragraphs: [
            "Z důvodu ochrany vnitřního pořádku nebo bezpečnosti může krajské ředitelství policie povolení provozovat střelnici pozastavit. Rozhodnutí může být prvním úkonem v řízení a odvolání proti němu nemá odkladný účinek. Pozastavit lze na dobu, po kterou:",
          ],
          bullets: [
            "provozovatel nemá žádného správce střelnice, pokud to trvá déle než 60 dnů,",
            "je ohrožen život, zdraví nebo majetek jiné osoby, protože skutečný technický stav střelnice neodpovídá provoznímu řádu nebo příloze č. 3 zákona,",
            "provozovatel přerušil provoz střelnice,",
            "provozní řád vážně neodpovídá zákonu, nebo provozovatel nepřijme účinná opatření proti opakovanému hrubému porušování zákona či provozního řádu.",
          ],
          tip: "Na vážně vadný provozní řád nebo opakované hrubé porušování reaguje policie pozastavením, ne okamžitým zrušením. Nižší vytíženost střelnice ani chybějící řídící střelby důvodem k pozastavení nejsou.",
          source: `§ 67 ${Z}; ${MV("263, 264")}`,
        },
        {
          heading: "Odnětí povolení",
          paragraphs: [
            "Krajské ředitelství policie povolení odejme (nejde o možnost, ale o povinnost), jestliže provozovatel:",
          ],
          bullets: [
            "přestane splňovat podmínku bezúhonnosti nebo spolehlivosti, nebo bylo u fyzické osoby rozhodnuto o omezení svéprávnosti,",
            "ani v přiměřené dodatečné lhůtě neodstraní nedostatky, kvůli kterým bylo povolení pozastaveno. Lhůtu stanoví policie a nesmí být kratší než 60 dnů.",
          ],
          tip: "Ztráta bezúhonnosti nebo spolehlivosti znamená odnětí, ne pozastavení. Odvolání proti odnětí nemá odkladný účinek.",
          source: `§ 68 ${Z}; ${MV("265, 266")}`,
        },
        {
          heading: "Zánik povolení",
          paragraphs: [
            "Povolení provozovat střelnici zaniká dnem:",
          ],
          bullets: [
            "nabytí právní moci rozhodnutí o jeho odnětí,",
            "smrti nebo zániku provozovatele,",
            "nabytí právní moci rozhodnutí o prohlášení provozovatele za mrtvého,",
            "následujícím po dni, kdy se provozovatel povolení vzdal.",
          ],
          tip: "Smrt správce střelnice povolení neukončí – provozovatel ustanoví nového správce. Kdyby zůstal bez správce déle než 60 dnů, hrozí pozastavení povolení.",
          source: `§ 69, § 67 odst. 1 písm. a) ${Z}; ${MV("267")}`,
        },
      ],
    },
    {
      id: "strelnice-l8",
      topic: T,
      title: "Příloha č. 3: jak je zajištěna bezpečnost střelnice",
      sections: [
        {
          heading: "Co obsahují přílohy zákona",
          bullets: [
            "Příloha č. 1 – druhy zbraní (včetně regulovaných součástí) a střeliva (včetně aktivních komponentů).",
            "Příloha č. 2 – zařazení jednotlivých druhů zbraní a střeliva do kategorií.",
            "Příloha č. 3 – technické a organizační požadavky na střelnice.",
          ],
          tip: "Přílohy č. 1 a 2 společně určují druhy zbraní, střeliva a regulovaných součástí a jejich kategorie. Nejsou v nich zásady první pomoci ani seznam prováděcích předpisů.",
          source: `§ 2 odst. 1, § 4 odst. 3 ${Z}, přílohy č. 1–3; ${MV("555, 556")}`,
        },
        {
          heading: "Ohrožený prostor",
          paragraphs: [
            "Ohrožený prostor je prostor, v němž může být život nebo zdraví ohrožen účinkem kinetické energie střel, střepin nebo povýstřelových zplodin – a to i tehdy, když se dodržují pravidla a opatření provozního řádu. Proto se do něj během střelby nesmí dostat nikdo nezúčastněný.",
          ],
          tip: "Klíčová slova: „i při dodržení provozního řádu“. Ohrožený prostor není místo, kde technika vylučuje ohrožení i při porušení pravidel.",
          source: `${Z}, příloha č. 3 bod 1.1; ${MV("557")}`,
        },
        {
          heading: "Technicko-organizační opatření stanoví provozní řád",
          paragraphs: [
            "Přiměřená opatření na ochranu života a zdraví – v ohroženém prostoru, při zacházení se zbraněmi a střelivem na střelnici i mimo ohrožený prostor a při příchodu a odchodu ze střelnice – stanoví provozní řád konkrétní střelnice. Jde o kombinaci technických opatření (ochranné a další technické prvky) a organizačních opatření (zásady a pokyny), přizpůsobenou místním podmínkám, účelu střelnice a používaným zbraním a střelivu.",
            "Opatření mají předcházet zejména:",
          ],
          bullets: [
            "nebezpečnému úniku střel mimo ohrožený prostor (např. přestřelení nebo prostřelení ochranných prvků),",
            "nebezpečným odrazům střel a jejich střepin,",
            "poškození zařízení střelnice, které by mohlo ohrozit život nebo zdraví,",
            "vstupu nezúčastněných osob do ohroženého prostoru během střelby.",
          ],
          tip: "Opatření pro konkrétní střelnici nehledejte ve směrnici ministerstva ani v zákoně o munici – jsou v jejím provozním řádu.",
          source: `${Z}, příloha č. 3 body 2.1–2.3; ${MV("559")}`,
        },
        {
          heading: "Technická opatření",
          paragraphs: [
            "Technická opatření spočívají zejména ve vhodné konstrukci dopadiště a terčových zařízení, v ochranných prvcích a v opatřeních proti vstupu nezúčastněných osob do ohroženého prostoru. Pokud ale střelci nedodržují organizační opatření nebo jsou nekázní, mohou být i ta nejdůkladnější technická opatření zcela neúčinná.",
          ],
          bullets: [
            "dopadiště – musí bezpečně zachytit střely i jejich fragmenty; bývá to val nebo záchytné zařízení,",
            "terče a terčová zařízení – umísťují se tak, aby se minimalizovalo riziko nebezpečných odrazů střel; u pohyblivých terčů se počítá se všemi jejich polohami,",
            "ochranné prvky – brání nebezpečnému úniku střel mimo ohrožený prostor a nebezpečným odrazům,",
            "opatření proti vstupu nezúčastněných osob – na otevřených střelnicích např. stálé výstražné tabulky, zvukové nebo světelné signály začátku a konce střelby, výstražné vlajky, případně oplocení.",
          ],
          tip: "Technická opatření nezaručí bezpečnost „bez ohledu na chování střelců“. Bez kázně na střelnici nefungují.",
          source: `${Z}, příloha č. 3 bod 3; ${MV("558, 560")}`,
        },
        {
          heading: "Organizační opatření",
          paragraphs: [
            "Organizační opatření jsou pravidla a pokyny. Jejich dodržování je základním předpokladem bezpečného provozu střelnice i toho, aby fungovala technická opatření. Při jejich stanovení se vychází z průměrně způsobilého střelce, který dbá zvýšené opatrnosti; s nekázní a hrubými chybami při míření se nepočítá. Patří k nim zejména:",
          ],
          bullets: [
            "zásady bezpečné střelby a bezpečného zacházení se zbraněmi a střelivem,",
            "způsob střelby a vymezení směrů a mezních dálek střelby,",
            "vymezení palebné a terčové čáry (i pohyblivé),",
            "vymezení zbraní a střeliva, se kterými se na střelnici smí střílet.",
          ],
          tip: "Chybná odpověď tvrdí, že organizační opatření jsou „jen doplňková“ k technickým. Ve skutečnosti jsou základem bezpečnosti.",
          source: `${Z}, příloha č. 3 bod 4; ${MV("561")}`,
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
