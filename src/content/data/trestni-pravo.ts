import type { TopicContent } from "../types";

// Zdroj faktů: docs/research/legislativa.md (kap. 1.1, 1.8, 3.2).
// § 28 a § 29 trestního zákoníku – obsah ověřen souborem MV (ot. č. 632–648).
// U nedovoleného ozbrojování a u článku Listiny rešerše číslo neověřila, proto ho neuvádíme.

const T = "trestni-pravo";
const TZ = "zákona č. 40/2009 Sb., trestní zákoník";

export const content: TopicContent = {
  lessons: [
    {
      id: "trestni-pravo-l1",
      topic: T,
      title: "Nutná obrana",
      sections: [
        {
          heading: "O co jde",
          paragraphs: [
            "Čin jinak trestný, kterým někdo odvrací přímo hrozící nebo trvající útok na zájem chráněný trestním zákonem, není trestným činem. Jednoduše: když se bráníte útoku člověka, nejste za obranu trestáni, i když byste jinak spáchali trestný čin (např. ublížení na zdraví).",
            "Právo bránit život svůj i jiného člověka, a to i se zbraní, je navíc zaručeno přímo Listinou základních práv a svobod.",
          ],
          source: `§ 29 ${TZ}; soubor MV ot. č. 610, 611, 637–648`,
        },
        {
          heading: "Útok musí přímo hrozit nebo trvat",
          bullets: [
            "přímo hrozící útok – útočník se k útoku bezprostředně chystá (např. se s nožem rozbíhá proti vám),",
            "trvající útok – útok právě probíhá,",
            "útok, který už skončil (útočník utíká, leží bezbranný), už odvracet nelze – další „obrana“ by byla trestná,",
            "útok, který může nastat někdy v budoucnu, také ne.",
          ],
          tip: "Nutná obrana se týká útoku, tedy jednání člověka. Nebezpečí od přírody nebo zvířete, které nikdo nepoštval, se řeší jako krajní nouze.",
          source: `§ 29 ${TZ}`,
        },
        {
          heading: "Jak silná smí obrana být",
          paragraphs: [
            "Obrana smí být intenzivnější než útok – obránce nemusí volit stejně slabý prostředek jako útočník. Nutnou obranou ale není obrana, která je zcela zjevně nepřiměřená způsobu útoku.",
          ],
          tip: "Chyták: „obrana musí být stejně silná jako útok“ je ŠPATNĚ. Hranicí je až „zcela zjevná nepřiměřenost“.",
          source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
        },
        {
          heading: "Co podmínkou NENÍ",
          bullets: [
            "výzva útočníkovi, aby přestal, není povinná,",
            "obránce nemusí utíkat ani se jinak vyhýbat útoku,",
            "při více útočnících může obrana směřovat proti kterémukoli z nich,",
            "bránit můžete i jiného člověka – pomoc v nutné obraně je možná.",
          ],
          source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
        },
        {
          heading: "Překročení mezí (exces)",
          paragraphs: [
            "Pokud obránce meze nutné obrany překročí (obrana je zcela zjevně nepřiměřená, nebo „bránil“ ještě po skončení útoku), nejde o nutnou obranu a čin může být trestný. Soud k tomu ale přihlédne jako k polehčující okolnosti.",
          ],
          source: `${TZ}; soubor MV ot. č. 648`,
        },
      ],
    },
    {
      id: "trestni-pravo-l2",
      topic: T,
      title: "Krajní nouze a srovnání s nutnou obranou",
      sections: [
        {
          heading: "O co jde",
          paragraphs: [
            "Čin jinak trestný, kterým někdo odvrací nebezpečí přímo hrozící zájmu chráněnému trestním zákonem, není trestným činem. Nebezpečí přitom nemusí způsobit člověk útokem – může jít o požár, povodeň, zvíře nebo technickou poruchu.",
            "Příklad: abyste zachránili člověka z hořícího auta, rozbijete cizí okno. Poškození věci je menší zlo než ztráta života.",
          ],
          source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
        },
        {
          heading: "Kdy o krajní nouzi NEJDE",
          bullets: [
            "nebezpečí bylo možné za daných okolností odvrátit jinak (krajní nouze je až poslední možnost),",
            "způsobený následek je zřejmě stejně závažný nebo dokonce závažnější než ten, který hrozil,",
            "ten, komu nebezpečí hrozilo, byl povinen je snášet (např. kvůli svému povolání).",
          ],
          tip: "Zapamatujte si: krajní nouze = jen když to jinak nejde A způsobíte menší zlo, než jaké hrozilo.",
          source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
        },
        {
          heading: "Kdo může jednat",
          paragraphs: [
            "Pomoc v krajní nouzi může poskytnout kdokoli – nejen ten, komu nebezpečí hrozí.",
          ],
          source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
        },
        {
          heading: "Nutná obrana vs. krajní nouze",
          bullets: [
            "zdroj: nutná obrana – útok člověka; krajní nouze – jakékoli nebezpečí,",
            "proti komu: nutná obrana – jen proti útočníkovi; krajní nouze – zásah může postihnout i nezúčastněného (např. cizí věc),",
            "jiné řešení: u nutné obrany nemusíte utíkat; u krajní nouze nesmí existovat jiný způsob odvrácení,",
            "přiměřenost: nutná obrana nesmí být zcela zjevně nepřiměřená; u krajní nouze nesmí být následek zřejmě stejně závažný nebo závažnější.",
          ],
          tip: "V testu se často prohazují podmínky obou institutů. Podmínka „nešlo to odvrátit jinak“ patří ke krajní nouzi, ne k nutné obraně.",
          source: `§ 28 a § 29 ${TZ}`,
        },
      ],
    },
    {
      id: "trestni-pravo-l3",
      topic: T,
      title: "Modelové situace",
      sections: [
        {
          heading: "Situace 1: Útok nožem",
          paragraphs: [
            "Muž s nožem se na vás na ulici rozběhne a křičí, že vás zabije. Nemáte kam utéct. Vytáhnete zbraň a vystřelíte.",
            "Rozbor: útok přímo hrozí, jde o útok na život. Obrana zbraní může být intenzivnější než útok nožem a výzva nebyla nutná. Za těchto okolností jde typicky o nutnou obranu.",
          ],
        },
        {
          heading: "Situace 2: Útočník utíká",
          paragraphs: [
            "Zloděj vám vytrhne tašku a utíká pryč. Nikoho neohrožuje. Vystřelíte mu do zad.",
            "Rozbor: útok na život ani zdraví nehrozí a útočník neútočí na vás. Střelba na utíkajícího člověka kvůli tašce je zcela zjevně nepřiměřená. Nejde o nutnou obranu – hrozí trestní stíhání.",
          ],
          tip: "Když útok skončil, skončilo i právo na nutnou obranu. Volejte policii.",
        },
        {
          heading: "Situace 3: Obrana po skončení útoku",
          paragraphs: [
            "Útočníka jste odrazili, leží na zemi a dál se nebrání. Vy do něj ze vzteku dál kopete.",
            "Rozbor: útok už netrvá, další násilí není obranou. Jde o překročení mezí nutné obrany – soud to může zohlednit jako polehčující okolnost, ale čin může být trestný.",
          ],
        },
        {
          heading: "Situace 4: Utržený pes",
          paragraphs: [
            "Na dětském hřišti se na děti řítí agresivní pes bez majitele, nikdo ho nepoštval. Zastřelíte ho.",
            "Rozbor: nejde o útok člověka, ale o nebezpečí – posuzuje se jako krajní nouze. Musí platit, že nebezpečí nešlo odvrátit jinak a že způsobený následek (smrt psa) je méně závažný než hrozící (zranění dětí). Pokud by psa poštval člověk, šlo by o útok tohoto člověka a mohla by přicházet v úvahu nutná obrana.",
          ],
        },
        {
          heading: "Situace 5: Majetek vs. život",
          paragraphs: [
            "Hoří vám chata a jediná cesta k hasicímu přístroji vede přes člověka, kterého byste museli zranit.",
            "Rozbor: zranění člověka je zřejmě závažnější následek než škoda na majetku. Podmínky krajní nouze nejsou splněny.",
          ],
        },
      ],
    },
    {
      id: "trestni-pravo-l4",
      topic: T,
      title: "Po použití zbraně a související předpisy",
      sections: [
        {
          heading: "Co dělat hned po použití zbraně",
          bullets: [
            "zajistěte vlastní bezpečí – ujistěte se, že útok skončil,",
            "zbraň uveďte do bezpečného stavu a nemiřte jí na nikoho,",
            "neprodleně ohlaste použití zbraně Policii ČR (tísňová linka 158 nebo 112) – je to zákonná povinnost,",
            "pokud je to pro vás bezpečné, poskytněte zraněným první pomoc a volejte záchrannou službu 155,",
            "na místě nic neměňte a počkejte na příjezd policie.",
          ],
          tip: "Povinnost neprodleně ohlásit Policii ČR použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi má každý – nejen držitel zbrojního oprávnění.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 58–60",
        },
        {
          heading: "Povinnost poskytnout pomoc",
          paragraphs: [
            "Trestní zákoník trestá neposkytnutí pomoci (§ 150 a § 151). Povinnost poskytnout první pomoc platí, pokud ji můžete poskytnout bez nebezpečí pro sebe nebo jiného. Pomoc se týká i zraněného útočníka, jakmile už nehrozí nebezpečí.",
          ],
          source: `§ 150 a § 151 ${TZ}; soubor MV ot. č. 817`,
        },
        {
          heading: "Nedovolené ozbrojování",
          paragraphs: [
            "Trestní zákoník zná trestný čin nedovoleného ozbrojování. Spáchá ho například ten, kdo bez povolení vyrobí nebo přechovává zbraň, nebo kdo odstraní označení zbraně.",
          ],
          source: `${TZ}; soubor MV ot. č. 629`,
        },
        {
          heading: "Další předpisy, které musíte znát",
          bullets: [
            "Listina základních práv a svobod – právo bránit život svůj i jiného i se zbraní; právo nabývat, držet a nosit zbraně za podmínek zákona,",
            "zákon č. 14/2021 Sb. – nakládání se zbraněmi v případech ovlivňujících vnitřní pořádek a bezpečnost: zákaz ozbrojených skupin, systém střelecké přípravy, stanovená záloha státu, dobrovolné kurzy,",
            "zákon č. 91/2024 Sb., o munici – samostatný zákon pro civilní nakládání s municí,",
            "zákon č. 156/2000 Sb. a vyhl. č. 335/2004 Sb. – ověřování zbraní a střeliva; ověřuje Český úřad pro zkoušení zbraní a střeliva (ČÚZZS),",
            "zákon č. 38/1994 Sb. a č. 228/2005 Sb. – zahraniční obchod s vojenským materiálem a kontrola obchodu se zbraněmi.",
          ],
          source: "soubor MV ot. č. 1, 610–628",
        },
        {
          heading: "Zkušební značky",
          paragraphs: [
            "Ověřená zbraň nese zkušební značky (v ČR uznávané značky C.I.P.). Písmeno „X“ vyražené přes zkušební značky znamená, že ověření je neplatné.",
          ],
          source: "zákon č. 156/2000 Sb.; soubor MV ot. č. 624–628",
        },
      ],
    },
  ],

  glossary: [
    { term: "Nutná obrana", topic: T, definition: "Odvracení přímo hrozícího nebo trvajícího útoku na zájem chráněný trestním zákonem. Není trestným činem, pokud obrana nebyla zcela zjevně nepřiměřená způsobu útoku.", source: `§ 29 ${TZ}` },
    { term: "Krajní nouze", topic: T, definition: "Odvracení nebezpečí přímo hrozícího zájmu chráněnému trestním zákonem, které nešlo odvrátit jinak, a to tak, že způsobený následek není zřejmě stejně závažný nebo závažnější.", source: `§ 28 ${TZ}` },
    { term: "Čin jinak trestný", topic: T, definition: "Jednání, které by bylo trestným činem, kdyby nešlo o nutnou obranu nebo krajní nouzi.", source: `§ 28 a § 29 ${TZ}` },
    { term: "Přímo hrozící útok", topic: T, definition: "Útok, který bezprostředně nastane; obrana proti němu je přípustná, ještě než útočník udeří.", source: `§ 29 ${TZ}` },
    { term: "Zcela zjevná nepřiměřenost", topic: T, definition: "Hranice nutné obrany. Obrana smí být silnější než útok, ale nesmí být zcela zjevně nepřiměřená jeho způsobu.", source: `§ 29 ${TZ}` },
    { term: "Subsidiarita", topic: T, definition: "Podmínka krajní nouze: nebezpečí nešlo za daných okolností odvrátit jinak.", source: `§ 28 ${TZ}` },
    { term: "Exces (překročení mezí)", topic: T, definition: "Situace, kdy obránce překročí meze nutné obrany. Nejde o nutnou obranu, ale soud to zohlední jako polehčující okolnost.", source: "soubor MV ot. č. 648" },
    { term: "Nedovolené ozbrojování", topic: T, definition: "Trestný čin, např. výroba nebo přechovávání zbraně bez povolení nebo odstranění označení zbraně.", source: "soubor MV ot. č. 629" },
    { term: "Neposkytnutí pomoci", topic: T, definition: "Trestný čin podle § 150 a § 151 trestního zákoníku – nesplnění povinnosti poskytnout potřebnou pomoc.", source: `§ 150 a § 151 ${TZ}` },
    { term: "ČÚZZS", topic: T, definition: "Český úřad pro zkoušení zbraní a střeliva – ověřuje zbraně a střelivo a stanoví nejasnou kategorii zbraně.", source: "zákon č. 156/2000 Sb.; soubor MV ot. č. 420, 624–628" },
  ],

  flashcards: [
    { id: "trestni-pravo-k01", topic: T, front: "Který § trestního zákoníku upravuje nutnou obranu?", back: "§ 29." },
    { id: "trestni-pravo-k02", topic: T, front: "Který § trestního zákoníku upravuje krajní nouzi?", back: "§ 28." },
    { id: "trestni-pravo-k03", topic: T, front: "Proti jakému útoku je nutná obrana přípustná?", back: "Proti přímo hrozícímu nebo trvajícímu útoku na zájem chráněný trestním zákonem." },
    { id: "trestni-pravo-k04", topic: T, front: "Kdy NENÍ obrana nutnou obranou?", back: "Když byla zcela zjevně nepřiměřená způsobu útoku." },
    { id: "trestni-pravo-k05", topic: T, front: "Smí být obrana silnější než útok?", back: "Ano. Nesmí být jen zcela zjevně nepřiměřená." },
    { id: "trestni-pravo-k06", topic: T, front: "Musíte útočníka před obranou vyzvat?", back: "Ne, výzva není podmínkou nutné obrany." },
    { id: "trestni-pravo-k07", topic: T, front: "Více útočníků – proti komu obrana?", back: "Proti kterémukoli z nich." },
    { id: "trestni-pravo-k08", topic: T, front: "Smíte bránit jiného člověka?", back: "Ano, pomoc v nutné obraně je možná." },
    { id: "trestni-pravo-k09", topic: T, front: "Překročení mezí nutné obrany", back: "Nejde o nutnou obranu; soud to zohlední jako polehčující okolnost." },
    { id: "trestni-pravo-k10", topic: T, front: "Krajní nouze – 3 situace, kdy o ni NEJDE", back: "1) šlo to odvrátit jinak, 2) následek zřejmě stejně závažný nebo závažnější, 3) ohrožený byl povinen nebezpečí snášet." },
    { id: "trestni-pravo-k11", topic: T, front: "Kdo smí jednat v krajní nouzi?", back: "Kdokoli – nejen ohrožená osoba." },
    { id: "trestni-pravo-k12", topic: T, front: "Útok člověka, nebo nebezpečí od zvířete či přírody?", back: "Útok člověka = nutná obrana. Jiné nebezpečí (zvíře nepoštvané člověkem, požár…) = krajní nouze." },
    { id: "trestni-pravo-k13", topic: T, front: "Povinnost po výstřelu v nutné obraně nebo krajní nouzi", back: "Neprodleně ohlásit použití zbraně Policii ČR." },
    { id: "trestni-pravo-k14", topic: T, front: "Neposkytnutí pomoci – kde je upraveno?", back: "§ 150 a § 151 trestního zákoníku." },
    { id: "trestni-pravo-k15", topic: T, front: "Nedovolené ozbrojování – příklady", back: "Výroba nebo přechovávání zbraně bez povolení, odstranění označení zbraně." },
    { id: "trestni-pravo-k16", topic: T, front: "Kde je zaručeno právo bránit život i se zbraní?", back: "V Listině základních práv a svobod." },
    { id: "trestni-pravo-k17", topic: T, front: "Zákon č. 14/2021 Sb.", back: "Zbraně v situacích ovlivňujících vnitřní pořádek a bezpečnost: zákaz ozbrojených skupin, střelecká příprava, stanovená záloha státu." },
    { id: "trestni-pravo-k18", topic: T, front: "Zákon č. 91/2024 Sb.", back: "Zákon o munici – samostatný režim pro civilní nakládání s municí." },
    { id: "trestni-pravo-k19", topic: T, front: "Kdo ověřuje zbraně a střelivo?", back: "Český úřad pro zkoušení zbraní a střeliva (ČÚZZS)." },
    { id: "trestni-pravo-k20", topic: T, front: "Písmeno „X“ přes zkušební značky", back: "Ověření zbraně je neplatné." },
  ],

  questions: [
    {
      id: "trestni-pravo-x01", topic: T,
      question: "Útočník vás udeří, pak se otočí a utíká pryč. Vystřelíte za ním. Jde o nutnou obranu?",
      options: [
        "Ne, útok už nehrozil ani netrval.",
        "Ano, protože útok předtím skutečně proběhl.",
        "Ano, pokud jste útočníka předtím vyzvali, aby se zastavil.",
      ],
      correct: 0,
      explanation: "Nutná obrana odvrací jen přímo hrozící nebo trvající útok. Útok, který skončil, už odvracet nelze – střelba za utíkajícím je odplata, ne obrana.",
      source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
    },
    {
      id: "trestni-pravo-x02", topic: T,
      question: "Musíte útočníka před použitím zbraně v nutné obraně vyzvat, aby od útoku upustil?",
      options: [
        "Ano, výzva je vždy podmínkou nutné obrany.",
        "Ne, výzva není podmínkou nutné obrany.",
        "Ano, a navíc musíte vypálit varovný výstřel.",
      ],
      correct: 1,
      explanation: "Zákon výzvu útočníkovi nevyžaduje. Může být vhodná, pokud na ni je čas a neohrozí vás, ale její absence nutnou obranu nevylučuje.",
      source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
    },
    {
      id: "trestni-pravo-x03", topic: T,
      question: "Smí být nutná obrana intenzivnější než útok?",
      options: [
        "Ne, obrana musí být přesně stejně silná jako útok.",
        "Jen pokud je útočník ozbrojen.",
        "Ano, nesmí však být zcela zjevně nepřiměřená způsobu útoku.",
      ],
      correct: 2,
      explanation: "Obránce má mít šanci útok spolehlivě odvrátit, proto smí použít i silnější prostředek. Hranicí je až zcela zjevná nepřiměřenost.",
      source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
    },
    {
      id: "trestni-pravo-x04", topic: T,
      question: "Na ulici vidíte, jak muž surově napadá cizí ženu. Smíte ji v rámci nutné obrany bránit?",
      options: [
        "Ano, nutnou obranou lze odvracet útok i na jinou osobu.",
        "Ne, nutnou obranu smí použít jen napadený.",
        "Ne, zasahovat smí jen policista.",
      ],
      correct: 0,
      explanation: "Nutná obrana chrání jakýkoli zájem chráněný trestním zákonem, tedy i život a zdraví jiného člověka. Pomoc v nutné obraně je možná.",
      source: `§ 29 ${TZ}; soubor MV ot. č. 637–648`,
    },
    {
      id: "trestni-pravo-x05", topic: T,
      question: "Na vás se řítí agresivní toulavý pes, kterého nikdo nepoštval. Podle jakého institutu se posoudí vaše obrana?",
      options: [
        "Jako nutná obrana",
        "Jako krajní nouze",
        "Nijak, zvíře nelze zranit bez trestu",
      ],
      correct: 1,
      explanation: "Nutná obrana odvrací útok, tedy jednání člověka. Nebezpečí od zvířete, které nikdo nepoštval, se posuzuje podle pravidel krajní nouze.",
      source: `§ 28 a § 29 ${TZ}`,
    },
    {
      id: "trestni-pravo-x06", topic: T,
      question: "Kdo smí odvracet nebezpečí v krajní nouzi?",
      options: [
        "Jen osoba, které nebezpečí přímo hrozí.",
        "Jen příslušníci policie a hasiči.",
        "Kdokoli.",
      ],
      correct: 2,
      explanation: "Pomoc v krajní nouzi může poskytnout kdokoli, nejen ohrožený.",
      source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
    },
    {
      id: "trestni-pravo-x07", topic: T,
      question: "Ve kterém případě se nelze dovolávat krajní nouze?",
      options: [
        "Když osoba, které nebezpečí hrozilo, byla povinna je snášet.",
        "Když nebezpečí způsobila přírodní událost.",
        "Když nebezpečí neodvracel sám ohrožený, ale jiná osoba.",
      ],
      correct: 0,
      explanation: "Krajní nouze nepřichází v úvahu, pokud byl ohrožený povinen nebezpečí snášet. Původ nebezpečí ani to, kdo jedná, krajní nouzi nevylučuje.",
      source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
    },
    {
      id: "trestni-pravo-x08", topic: T,
      question: "Hrozí vám nebezpečí, ze kterého můžete snadno a bezpečně odejít. Místo toho poškodíte cizí majetek. Jde o krajní nouzi?",
      options: [
        "Ano, protože nebezpečí skutečně hrozilo.",
        "Ne, protože nebezpečí šlo za daných okolností odvrátit jinak.",
        "Ano, protože jde o nutnou obranu.",
      ],
      correct: 1,
      explanation: "Krajní nouze je až poslední možností. Pokud šlo nebezpečí odvrátit jinak (např. odejít), podmínky krajní nouze nejsou splněny.",
      source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
    },
    {
      id: "trestni-pravo-x09", topic: T,
      question: "Abyste zachránili svůj majetek před požárem, vážně zraníte jiného člověka. Jak se to posoudí?",
      options: [
        "Jako krajní nouze, protože jste chránili majetek.",
        "Jako nutná obrana.",
        "Nejde o krajní nouzi, protože způsobený následek je zřejmě závažnější než ten, který hrozil.",
      ],
      correct: 2,
      explanation: "V krajní nouzi nesmí být způsobený následek zřejmě stejně závažný nebo závažnější než hrozící. Zdraví člověka má větší hodnotu než majetek.",
      source: `§ 28 ${TZ}; soubor MV ot. č. 632–636`,
    },
    {
      id: "trestni-pravo-x10", topic: T,
      question: "V nutné obraně jste vystřelili na útočníka. Jakou povinnost máte vůči policii?",
      options: [
        "Neprodleně ohlásit použití zbraně Policii ČR.",
        "Do 10 pracovních dnů to ohlásit krajskému ředitelství policie.",
        "Žádnou, pokud nikdo nebyl zraněn.",
      ],
      correct: 0,
      explanation: "Použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi musí každý ohlásit Policii ČR neprodleně, bez ohledu na následky.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 58–60",
    },
    {
      id: "trestni-pravo-x11", topic: T,
      question: "Které jednání naplňuje znaky nedovoleného ozbrojování?",
      options: [
        "Skryté nošení registrované pistole držitelem rozšířeného zbrojního oprávnění.",
        "Přechovávání zbraně bez povolení nebo odstranění označení zbraně.",
        "Uložení zbraně v trezoru u známého, který má zbrojní oprávnění.",
      ],
      correct: 1,
      explanation: "Nedovoleného ozbrojování se dopustí např. ten, kdo bez povolení vyrábí nebo přechovává zbraň, nebo kdo odstraní její označení.",
      source: `${TZ}, nedovolené ozbrojování; soubor MV ot. č. 629`,
    },
    {
      id: "trestni-pravo-x12", topic: T,
      question: "Kde je zaručeno právo bránit život svůj i jiného člověka i se zbraní?",
      options: [
        "Jen v zákoně o zbraních a střelivu.",
        "V trestním řádu.",
        "V Listině základních práv a svobod.",
      ],
      correct: 2,
      explanation: "Toto právo je základním právem zakotveným v Listině základních práv a svobod, tedy na ústavní úrovni.",
      source: "Listina základních práv a svobod; soubor MV ot. č. 610, 611",
    },
    {
      id: "trestni-pravo-x13", topic: T,
      question: "Který zákon upravuje mimo jiné zákaz ozbrojených skupin a stanovenou zálohu státu?",
      options: [
        "Zákon č. 14/2021 Sb.",
        "Zákon č. 91/2024 Sb., o munici",
        "Zákon č. 40/2009 Sb., trestní zákoník",
      ],
      correct: 0,
      explanation: "Zákon č. 14/2021 Sb. upravuje nakládání se zbraněmi v případech ovlivňujících vnitřní pořádek a bezpečnost – zákaz ozbrojených skupin, střeleckou přípravu a stanovenou zálohu státu.",
      source: "zákon č. 14/2021 Sb.; soubor MV ot. č. 612–618",
    },
    {
      id: "trestni-pravo-x14", topic: T,
      question: "Kdo v České republice ověřuje zbraně a střelivo?",
      options: [
        "Krajské ředitelství policie",
        "Český úřad pro zkoušení zbraní a střeliva",
        "Výrobce zbraně bez další kontroly",
      ],
      correct: 1,
      explanation: "Ověřování zbraní a střeliva provádí Český úřad pro zkoušení zbraní a střeliva (ČÚZZS) podle zákona č. 156/2000 Sb.",
      source: "zákon č. 156/2000 Sb.; soubor MV ot. č. 624–628",
    },
    {
      id: "trestni-pravo-x15", topic: T,
      question: "Co znamená písmeno „X“ vyražené přes zkušební značky na zbrani?",
      options: [
        "Zbraň je určena pro vývoz.",
        "Zbraň prošla zesílenou zkouškou.",
        "Ověření zbraně je neplatné.",
      ],
      correct: 2,
      explanation: "Písmeno „X“ přes zkušební značky vyjadřuje, že ověření zbraně je neplatné.",
      source: "zákon č. 156/2000 Sb., vyhl. č. 335/2004 Sb.; soubor MV ot. č. 624–628",
    },
    {
      id: "trestni-pravo-x16", topic: T,
      question: "Který předpis upravuje trestný čin neposkytnutí pomoci?",
      options: [
        "Trestní zákoník (§ 150 a § 151)",
        "Zákon o zbraních a střelivu",
        "Zákon o odpovědnosti za přestupky",
      ],
      correct: 0,
      explanation: "Neposkytnutí pomoci je trestný čin podle § 150 a § 151 trestního zákoníku. Povinnost pomoci se vztahuje i na situaci po použití zbraně, pokud ji lze poskytnout bez nebezpečí.",
      source: `§ 150 a § 151 ${TZ}; soubor MV ot. č. 817`,
    },
    {
      id: "trestni-pravo-x17", topic: T,
      question: "Jakým předpisem se řídí civilní nakládání s municí?",
      options: [
        "Výhradně zákonem o zbraních a střelivu",
        "Samostatným zákonem č. 91/2024 Sb., o munici",
        "Zákonem č. 14/2021 Sb.",
      ],
      correct: 1,
      explanation: "Souběžně se zákonem o zbraních a střelivu platí samostatný zákon č. 91/2024 Sb., o munici.",
      source: "zákon č. 91/2024 Sb.; soubor MV ot. č. 236, 620",
    },
  ],
};
