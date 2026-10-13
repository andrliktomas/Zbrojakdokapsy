import type { TopicContent } from "../types";

const T = "zdravoveda";
const ERC = "Doporučení ERC 2021";

export const content: TopicContent = {
  lessons: [
    {
      id: "zdravoveda-l1",
      topic: T,
      title: "Základy první pomoci a tísňové volání",
      sections: [
        {
          heading: "Nejdřív vlastní bezpečí",
          paragraphs: [
            "Zachránce, který se sám zraní, nikomu nepomůže a z jednoho postiženého jsou dva. Než přistoupíte k postiženému, rozhlédněte se: hrozí střelba, doprava, elektrický proud, oheň, plyn?",
            "Pokud je to bezpečné, chraňte se i před krví a tělesnými tekutinami – rukavice by měly být součástí každé lékárničky, i té ve střelecké tašce.",
          ],
          tip: "Na střelnici je prvním krokem zastavení palby. Teprve pak se jde k raněnému.",
        },
        {
          heading: "Tísňové linky",
          bullets: [
            "155 – zdravotnická záchranná služba (ZZS)",
            "112 – jednotné evropské číslo tísňového volání",
            "150 – hasiči, 158 – Policie ČR",
          ],
          paragraphs: [
            "Při volání buďte klidní, řekněte co se stalo, kde (co nejpřesněji) a kolik je zraněných. Hovor neukončujte jako první – operátor vám může radit, třeba jak resuscitovat.",
          ],
        },
        {
          heading: "Povinnost poskytnout pomoc",
          paragraphs: [
            "Trestní zákoník trestá toho, kdo osobě v nebezpečí smrti nebo s vážnou poruchou zdraví neposkytne potřebnou pomoc, ač tak může učinit bez nebezpečí pro sebe nebo jiného (§ 150). Zvlášť je postižen řidič, který se účastnil dopravní nehody a neposkytne pomoc (§ 151).",
            "Pomocí je i přivolání odborné pomoci. Nikdo po vás nechce, abyste riskovali život.",
          ],
          source: "§ 150 a § 151 zákona č. 40/2009 Sb., trestní zákoník",
        },
        {
          heading: "Pořadí priorit",
          bullets: [
            "Zajistit bezpečí.",
            "Zastavit masivní krvácení – to zabíjí za několik minut.",
            "Zkontrolovat vědomí a dýchání, při nenormálním dýchání zahájit resuscitaci.",
            "Volat 155 (nebo nechat volat jiného).",
            "Ošetřit další poranění a chránit postiženého před prochladnutím.",
          ],
        },
      ],
    },
    {
      id: "zdravoveda-l2",
      topic: T,
      title: "Masivní krvácení a střelná poranění",
      sections: [
        {
          heading: "Přímý tlak a tlakový obvaz",
          paragraphs: [
            "Většinu krvácení zastavíte silným přímým tlakem na ránu – přes gázu, kus látky, nebo i jen rukou v rukavici. Hlubokou ránu je možné vyplnit (natamponovat) obvazem a tlačit dál.",
            "Tlakový obvaz vznikne tak, že na krytí rány přiložíte tlakovou vrstvu (např. srolované obinadlo) a pevně ji obvážete. Pokud prosakuje, přidejte další vrstvu, původní nesundávejte.",
          ],
        },
        {
          heading: "Zaškrcovadlo (turniket)",
          paragraphs: [
            "Pokud končetina krvácí tak silně, že přímý tlak nestačí (nebo nejde provést – více zraněných, amputace), použijte zaškrcovadlo.",
          ],
          bullets: [
            "Přiložte ho nad ránu (blíže k srdci), na paži nebo stehno, ne přes kloub.",
            "Utahujte, dokud krvácení nepřestane.",
            "Zapište čas přiložení (třeba fixem na zaškrcovadlo nebo na čelo).",
            "Zaškrcovadlo už nepovolujte – sundá ho až lékař.",
          ],
          tip: "Zaškrcovadlo nepatří pod ránu ani na ni. A nikdy se „pro jistotu“ pravidelně nepovoluje.",
          source: ERC,
        },
        {
          heading: "Střelné poranění končetiny a hledání výstřelu",
          paragraphs: [
            "Střela může tělem projít a vytvořit výstřel, který bývá větší než vstřel. Prohlédněte celé tělo včetně zad. Krvácení ošetřete tlakem nebo zaškrcovadlem.",
          ],
        },
        {
          heading: "Střelné poranění hrudníku",
          paragraphs: [
            "Rána na hrudníku může nasávat vzduch – při nádechu je slyšet syčení nebo se tvoří bubliny. Ránu co nejdříve překryjte neprodyšným (okluzivním) krytím, ideálně speciálním hrudním krytím s ventilem, jinak třeba fólií přilepenou k okolí.",
            "Postižený při vědomí bývá nejvíc úlevy v poloze v polosedě. Sledujte dýchání: když se po překrytí rány výrazně zhorší, krytí na chvíli odklopte, aby mohl vzduch uniknout.",
          ],
        },
        {
          heading: "Poranění břicha",
          bullets: [
            "Zaklíněné předměty z rány nevytahujte, jen je obložte a zafixujte.",
            "Vyhřezlé orgány nezasouvejte zpět, překryjte je vlhkým čistým krytím.",
            "Postižený nesmí jíst ani pít.",
            "Úlevová poloha: vleže na zádech s pokrčenými koleny.",
          ],
        },
      ],
    },
    {
      id: "zdravoveda-l3",
      topic: T,
      title: "Bezvědomí, resuscitace a AED",
      sections: [
        {
          heading: "Kontrola vědomí a dýchání",
          bullets: [
            "Oslovte postiženého a jemně jím zatřeste za ramena.",
            "Když nereaguje, uvolněte dýchací cesty záklonem hlavy a zvednutím brady.",
            "Nejvýše 10 sekund sledujte, zda normálně dýchá (pohled na hrudník, poslech, pocit dechu na tváři).",
            "Ojedinělé lapavé vdechy nejsou normální dýchání – to je znamení zástavy oběhu.",
          ],
          source: ERC,
        },
        {
          heading: "Resuscitace (KPR)",
          paragraphs: [
            "Pokud postižený nereaguje a nedýchá normálně, volejte 155 a ihned začněte se stlačováním hrudníku.",
          ],
          bullets: [
            "Ruce na střed hrudníku (dolní polovina hrudní kosti).",
            "Hloubka stlačení 5–6 cm u dospělého.",
            "Frekvence 100–120 stlačení za minutu.",
            "Po každém stlačení nechte hrudník úplně povolit.",
            "Pokud umíte a chcete dýchat z úst do úst: 30 stlačení : 2 vdechy. Laik může provádět i jen nepřerušované stlačování.",
            "Nepřerušujte, dokud nepřevezme péči ZZS, postižený nezačne normálně dýchat, nebo nebudete úplně vyčerpáni.",
          ],
          tip: "Bojíte se, že ublížíte? Bez resuscitace postižený v zástavě oběhu zemře jistě. Zlomené žebro je menší zlo.",
          source: ERC,
        },
        {
          heading: "AED – automatizovaný externí defibrilátor",
          paragraphs: [
            "AED najdete na nádražích, v obchodních centrech, na úřadech i některých střelnicích. Zapněte ho a dělejte, co říká. Elektrody nalepte na odhalený hrudník podle obrázku. Přístroj sám vyhodnotí, zda je výboj potřeba. Při analýze a výboji se postiženého nikdo nedotýká.",
            "Resuscitaci přerušujte jen na nezbytně nutnou dobu.",
          ],
          source: ERC,
        },
        {
          heading: "Zotavovací poloha",
          paragraphs: [
            "Postiženého v bezvědomí, který normálně dýchá, můžete otočit do zotavovací (stabilizované) polohy na boku, aby mu případné zvratky nevtekly do dýchacích cest. Dýchání kontrolujte pravidelně – a když přestane normálně dýchat, otočte ho na záda a resuscitujte.",
          ],
          tip: "Jazyk se rukou nevytahuje. Dýchací cesty uvolní záklon hlavy.",
          source: ERC,
        },
      ],
    },
    {
      id: "zdravoveda-l4",
      topic: T,
      title: "Další úrazy a náhlé stavy",
      sections: [
        {
          heading: "Šok",
          paragraphs: [
            "Šok je selhání krevního oběhu, nejčastěji po velké ztrátě krve. Projevuje se bledou, studenou a opocenou kůží, rychlým slabým tepem, neklidem, žízní a zmateností.",
          ],
          bullets: [
            "Zastavte krvácení.",
            "Uložte postiženého vleže. Pokud nemá poranění dolních končetin, pánve ani páteře, můžete mu zvednout nohy.",
            "Chraňte ho před chladem (deka, izotermická fólie), uklidňujte ho.",
            "Nedávejte mu jíst ani pít a volejte 155.",
          ],
        },
        {
          heading: "Zlomeniny a popáleniny",
          bullets: [
            "Zlomeninu znehybněte v poloze, ve které ji najdete, včetně sousedních kloubů. Nenapravujte ji.",
            "U otevřené zlomeniny zastavte krvácení a ránu sterilně překryjte. Kosti nezasouvejte.",
            "Popáleninu chlaďte co nejdříve chladnou až vlažnou čistou vodou (ne ledem ani ledovou vodou), alespoň 20 minut (doporučení ERC 2021).",
            "U rozsáhlých popálenin a u dětí hlídejte podchlazení. Puchýře nepropichujte, přiškvařený oděv nestrhávejte.",
          ],
        },
        {
          heading: "Cévní mozková příhoda (FAST)",
          bullets: [
            "F (face) – pokleslý koutek, nesouměrný obličej.",
            "A (arm) – slabost nebo necitlivost jedné ruky.",
            "S (speech) – porucha řeči, nesrozumitelná slova.",
            "T (time) – čas! Ihned volejte 155 a zapamatujte si, kdy potíže začaly.",
          ],
          tip: "Při CMP rozhoduje každá minuta. Postiženému nedávejte jíst ani pít.",
        },
        {
          heading: "Epileptický záchvat",
          bullets: [
            "Chraňte postiženého před poraněním – odstraňte okolní předměty, podložte hlavu.",
            "Nic mu nevkládejte do úst a násilím ho nedržte.",
            "Po záchvatu zkontrolujte dýchání. Pokud dýchá normálně, dejte ho do zotavovací polohy.",
            "Volejte 155, pokud záchvat trvá déle než 5 minut, opakuje se, došlo ke zranění, nebo jde o první záchvat.",
          ],
        },
        {
          heading: "Cukrovka a otravy",
          paragraphs: [
            "Při nízké hladině cukru (hypoglykemii) bývá postižený opocený, třese se, je zmatený nebo agresivní – může působit jako opilý. Pokud je při vědomí a umí polykat, dejte mu sladký nápoj nebo cukr. V bezvědomí mu nic do úst nedávejte a postupujte jako u bezvědomí.",
            "U otrav myslete hlavně na vlastní bezpečí (oxid uhelnatý, plyny – nevstupujte, větrejte). Volejte 155, zjistěte, co a kolik postižený požil, a schovejte obal. Zvracení nevyvolávejte. Radu poskytne i Toxikologické informační středisko.",
          ],
        },
      ],
    },
  ],

  glossary: [
    { term: "Zaškrcovadlo (turniket)", topic: T, definition: "Pomůcka k zastavení masivního krvácení z končetiny. Přikládá se nad ránu, utáhne se do zástavy krvácení, zapíše se čas a nepovoluje se.", source: ERC },
    { term: "Tlakový obvaz", topic: T, definition: "Obvaz s tlakovou vrstvou přes krytí rány. Při prosakování se přidává další vrstva." },
    { term: "KPR", topic: T, definition: "Kardiopulmonální resuscitace: stlačování hrudníku 100–120/min do hloubky 5–6 cm, případně s vdechy v poměru 30 : 2.", source: ERC },
    { term: "AED", topic: T, definition: "Automatizovaný externí defibrilátor. Sám vyhodnotí srdeční rytmus a hlasem vede zachránce.", source: ERC },
    { term: "Lapavé dechy", topic: T, definition: "Ojedinělé, nepravidelné vdechy při zástavě oběhu. Nejsou normálním dýcháním – je nutné zahájit KPR." },
    { term: "Zotavovací poloha", topic: T, definition: "Stabilizovaná poloha na boku pro postiženého v bezvědomí, který normálně dýchá." },
    { term: "Okluzivní krytí", topic: T, definition: "Neprodyšné krytí rány na hrudníku, které brání nasávání vzduchu do hrudníku." },
    { term: "Šok", topic: T, definition: "Selhání krevního oběhu, typicky po velké ztrátě krve: bledost, studený pot, rychlý slabý tep, neklid." },
    { term: "FAST", topic: T, definition: "Pomůcka k rozpoznání cévní mozkové příhody: obličej (Face), paže (Arm), řeč (Speech), čas (Time)." },
    { term: "Hypoglykemie", topic: T, definition: "Nízká hladina cukru v krvi, typicky u diabetika. Při vědomí pomůže sladký nápoj nebo cukr." },
    { term: "Neposkytnutí pomoci", topic: T, definition: "Trestný čin toho, kdo osobě v nebezpečí smrti nebo s vážnou poruchou zdraví neposkytne potřebnou pomoc, ač to může učinit bez nebezpečí pro sebe nebo jiného.", source: "§ 150 zákona č. 40/2009 Sb." },
  ],

  flashcards: [
    { id: "zdravoveda-k01", topic: T, front: "Co je při první pomoci na prvním místě?", back: "Vlastní bezpečí zachránce." },
    { id: "zdravoveda-k02", topic: T, front: "Číslo zdravotnické záchranné služby?", back: "155 (jednotné evropské číslo 112)." },
    { id: "zdravoveda-k03", topic: T, front: "Co říct operátorovi?", back: "Co se stalo, kde přesně, kolik je zraněných. Hovor neukončovat jako první." },
    { id: "zdravoveda-k04", topic: T, front: "§ 150 trestního zákoníku?", back: "Neposkytnutí pomoci osobě v nebezpečí smrti nebo s vážnou poruchou zdraví, ač to lze bez nebezpečí pro sebe nebo jiného." },
    { id: "zdravoveda-k05", topic: T, front: "§ 151 trestního zákoníku?", back: "Neposkytnutí pomoci řidičem, který se účastnil dopravní nehody." },
    { id: "zdravoveda-k06", topic: T, front: "První krok u silného krvácení?", back: "Silný přímý tlak na ránu." },
    { id: "zdravoveda-k07", topic: T, front: "Kam přiložit zaškrcovadlo?", back: "Nad ránu (blíže k srdci), na paži nebo stehno, ne přes kloub." },
    { id: "zdravoveda-k08", topic: T, front: "Co po přiložení zaškrcovadla?", back: "Zapsat čas přiložení a už ho nepovolovat." },
    { id: "zdravoveda-k09", topic: T, front: "Tlakový obvaz prosakuje – co dělat?", back: "Přidat další vrstvu. Původní obvaz nesundávat." },
    { id: "zdravoveda-k10", topic: T, front: "Rána na hrudníku nasává vzduch?", back: "Překrýt neprodyšným (okluzivním) krytím, postižený v polosedě, sledovat dýchání." },
    { id: "zdravoveda-k11", topic: T, front: "Předmět zaklíněný v ráně?", back: "Nevytahovat, obložit a zafixovat." },
    { id: "zdravoveda-k12", topic: T, front: "Poranění břicha – jídlo a pití?", back: "Nic jíst ani pít." },
    { id: "zdravoveda-k13", topic: T, front: "Jak uvolnit dýchací cesty?", back: "Záklonem hlavy a zvednutím brady. Jazyk se nevytahuje." },
    { id: "zdravoveda-k14", topic: T, front: "Jak dlouho nejvýše kontrolovat dýchání?", back: "Nejvýše 10 sekund." },
    { id: "zdravoveda-k15", topic: T, front: "Lapavé dechy – co to znamená?", back: "Nejde o normální dýchání. Zahájit resuscitaci." },
    { id: "zdravoveda-k16", topic: T, front: "Frekvence a hloubka stlačení hrudníku?", back: "100–120 za minutu, hloubka 5–6 cm." },
    { id: "zdravoveda-k17", topic: T, front: "Poměr stlačení a vdechů?", back: "30 : 2. Laik může jen stlačovat bez vdechů." },
    { id: "zdravoveda-k18", topic: T, front: "Co dělat s AED?", back: "Zapnout a řídit se hlasovými pokyny. Při analýze a výboji se postiženého nedotýkat." },
    { id: "zdravoveda-k19", topic: T, front: "Kdy použít zotavovací polohu?", back: "U bezvědomí s normálním dýcháním. Dýchání dál pravidelně kontrolovat." },
    { id: "zdravoveda-k20", topic: T, front: "Příznaky šoku?", back: "Bledá studená opocená kůže, rychlý slabý tep, neklid, žízeň, zmatenost." },
    { id: "zdravoveda-k21", topic: T, front: "Protišoková opatření?", back: "Zastavit krvácení, uložit vleže (nohy nahoru, pokud nejsou poraněné), chránit před chladem, uklidnit, nic pít, volat 155." },
    { id: "zdravoveda-k22", topic: T, front: "Jak ošetřit zlomeninu?", back: "Znehybnit v nalezené poloze včetně sousedních kloubů. Nenapravovat." },
    { id: "zdravoveda-k23", topic: T, front: "Jak chladit popáleninu?", back: "Chladnou až vlažnou čistou vodou, ne ledem. Hlídat podchlazení." },
    { id: "zdravoveda-k24", topic: T, front: "Co znamená FAST?", back: "Face (obličej), Arm (paže), Speech (řeč), Time (čas – volat 155)." },
    { id: "zdravoveda-k25", topic: T, front: "Epileptický záchvat – co nedělat?", back: "Nic nevkládat do úst a postiženého násilím nedržet." },
    { id: "zdravoveda-k26", topic: T, front: "Diabetik zmatený, opocený, při vědomí?", back: "Pravděpodobně hypoglykemie – dát sladký nápoj nebo cukr, pokud umí polykat." },
    { id: "zdravoveda-k27", topic: T, front: "Otrava – vyvolat zvracení?", back: "Ne. Volat 155, zjistit co a kolik, schovat obal." },
  ],

  questions: [
    {
      id: "zdravoveda-x01", topic: T,
      question: "Které telefonní číslo je linkou zdravotnické záchranné služby?",
      options: ["155", "158", "150"],
      correct: 0,
      explanation: "155 je ZZS, 158 Policie ČR, 150 hasiči. Použít lze i jednotné evropské číslo 112.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x02", topic: T,
      question: "Co je obvykle prvním krokem při silném krvácení z rány na předloktí?",
      options: ["Okamžité přiložení zaškrcovadla na zápěstí", "Silný přímý tlak na ránu", "Zvednutí končetiny a čekání na záchranku"],
      correct: 1,
      explanation: "Přímý tlak zastaví většinu krvácení. Zaškrcovadlo přichází na řadu, když tlak nestačí nebo ho nejde provést – a přikládá se nad ránu, ne pod ni.",
      source: ERC,
    },
    {
      id: "zdravoveda-x03", topic: T,
      question: "Tlakový obvaz na ráně prosakuje krví. Co uděláte?",
      options: ["Obvaz sundám a přiložím nový.", "Obvaz povolím, aby se obnovil krevní oběh.", "Přiložím na něj další tlakovou vrstvu a pevně obvážu."],
      correct: 2,
      explanation: "Původní obvaz se nesnímá, aby se neporušila tvořící se sraženina. Když ani to nepomáhá u končetiny, použije se zaškrcovadlo.",
      source: ERC,
    },
    {
      id: "zdravoveda-x04", topic: T,
      question: "Co je po přiložení zaškrcovadla důležité zaznamenat?",
      options: ["Čas přiložení", "Krevní skupinu postiženého", "Teplotu postižené končetiny"],
      correct: 0,
      explanation: "Čas přiložení potřebují zdravotníci. Zaškrcovadlo se pak už nepovoluje.",
      source: ERC,
    },
    {
      id: "zdravoveda-x05", topic: T,
      question: "Postižený nereaguje a místo dýchání jen občas lapavě vdechne. Jak postupujete?",
      options: ["Dám ho do zotavovací polohy a čekám.", "Volám 155 a zahájím stlačování hrudníku.", "Počkám, zda se dýchání samo upraví."],
      correct: 1,
      explanation: "Lapavé dechy nejsou normální dýchání. Jde o známku zástavy oběhu a je nutné okamžitě resuscitovat.",
      source: ERC,
    },
    {
      id: "zdravoveda-x06", topic: T,
      question: "Do jaké hloubky stlačujete hrudník dospělého při resuscitaci?",
      options: ["1–2 cm", "8–10 cm", "5–6 cm"],
      correct: 2,
      explanation: "Doporučená hloubka je 5–6 cm a frekvence 100–120 stlačení za minutu. Mezi stlačeními se hrudník nechá úplně povolit.",
      source: ERC,
    },
    {
      id: "zdravoveda-x07", topic: T,
      question: "Nejste vyškolení v dýchání z úst do úst a máte z něj obavy. Co při resuscitaci uděláte?",
      options: ["Budu nepřetržitě stlačovat hrudník.", "Resuscitaci nezahájím, protože ji neumím celou.", "Budu jen dýchat do postiženého bez stlačování."],
      correct: 0,
      explanation: "Laik může provádět jen stlačování hrudníku. Je mnohem lepší než nedělat nic. Operátor 155 vás může navigovat.",
      source: ERC,
    },
    {
      id: "zdravoveda-x08", topic: T,
      question: "Jak se používá AED (automatizovaný externí defibrilátor)?",
      options: ["Smí ho použít jen lékař nebo zdravotník.", "Zapnu ho a řídím se jeho hlasovými pokyny.", "Použije se až po 30 minutách neúspěšné resuscitace."],
      correct: 1,
      explanation: "AED je určen i pro laiky. Sám vyhodnotí rytmus a hlasem vede zachránce. Čím dřív se použije, tím lépe.",
      source: ERC,
    },
    {
      id: "zdravoveda-x09", topic: T,
      question: "Kdy uložíte postiženého do zotavovací polohy?",
      options: ["Když nedýchá a nemáte AED", "Vždy, když krvácí z končetiny", "Když je v bezvědomí, ale normálně dýchá"],
      correct: 2,
      explanation: "Zotavovací poloha chrání dýchací cesty. Dýchání je nutné dál pravidelně kontrolovat.",
      source: ERC,
    },
    {
      id: "zdravoveda-x10", topic: T,
      question: "Po střelném poranění hrudníku rána při nádechu „syčí“ a nasává vzduch. Co uděláte?",
      options: ["Ránu překryji neprodyšným krytím a postiženého při vědomí posadím do polosedu.", "Ránu nechám volně otevřenou a postiženého položím na břicho.", "Ránu vypláchnu vodou a dám postiženému napít."],
      correct: 0,
      explanation: "Neprodyšné (okluzivní) krytí brání nasávání vzduchu do hrudníku. Polosed usnadňuje dýchání. Pokud se dýchání po překrytí zhorší, krytí se na chvíli odklopí.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x11", topic: T,
      question: "V ráně na břiše je zaklíněný kus kovu. Jak postupujete?",
      options: ["Předmět opatrně vytáhnu a ránu stlačím.", "Předmět ponechám v ráně, obložím ho a zafixuji.", "Předmět zatlačím hlouběji, aby nevypadl."],
      correct: 1,
      explanation: "Vytažením předmětu by se mohlo obnovit nebo zhoršit vnitřní krvácení. Postižený navíc nesmí jíst ani pít.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x12", topic: T,
      question: "Jak ošetříte zavřenou zlomeninu bérce?",
      options: ["Zkusím kost narovnat do správné polohy.", "Nechám postiženého chodit, aby nohu rozhýbal.", "Znehybním ji v nalezené poloze včetně sousedních kloubů."],
      correct: 2,
      explanation: "Napravování zlomeniny patří lékaři. Laik zlomeninu fixuje tak, jak ji našel, a volá pomoc.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x13", topic: T,
      question: "Jak správně chladit popáleninu?",
      options: ["Chladnou až vlažnou čistou vodou, ne ledem", "Ledem přiloženým přímo na kůži", "Vůbec nechladit, jen namazat krémem"],
      correct: 0,
      explanation: "Led může tkáň dál poškodit. Chladí se co nejdříve vodou, u rozsáhlých popálenin a u dětí je potřeba hlídat podchlazení.",
      source: ERC,
    },
    {
      id: "zdravoveda-x14", topic: T,
      question: "Který soubor příznaků ukazuje na šok po velké ztrátě krve?",
      options: ["Zarudlá horká kůže a pomalý silný tep", "Bledá studená opocená kůže, rychlý slabý tep a neklid", "Svědění kůže a kýchání"],
      correct: 1,
      explanation: "Při šoku tělo omezuje prokrvení kůže ve prospěch životně důležitých orgánů. Proto je kůže bledá a studená a tep rychlý a slabý.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x15", topic: T,
      question: "Co nepatří mezi protišoková opatření prováděná laikem?",
      options: ["Ochrana postiženého před chladem", "Zastavení krvácení", "Podání většího množství tekutin k pití"],
      correct: 2,
      explanation: "Postižený v šoku nemá nic pít ani jíst – může potřebovat operaci. Laik zastaví krvácení, uloží ho, chrání před chladem a volá 155.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x16", topic: T,
      question: "Muž má náhle pokleslý koutek úst, nemůže zvednout jednu ruku a mluví nesrozumitelně. Co uděláte?",
      options: ["Ihned volám 155 a zapamatuji si, kdy potíže začaly.", "Dám mu sladký nápoj a počkám hodinu.", "Uložím ho ke spánku, ráno to bude lepší."],
      correct: 0,
      explanation: "Jde o typické příznaky cévní mozkové příhody (FAST). Rozhoduje čas od začátku potíží, proto je nutné ihned volat pomoc.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x17", topic: T,
      question: "Jak pomůžete člověku během epileptického záchvatu?",
      options: ["Vložím mu do úst kolík, aby si neprokousl jazyk.", "Chráním ho před poraněním a nic mu nedávám do úst.", "Pevně ho držím, aby se netřásl."],
      correct: 1,
      explanation: "Předmět v ústech může poranit zuby nebo ucpat dýchací cesty a násilné držení může způsobit zranění. Po záchvatu se kontroluje dýchání.",
      source: "zdravotnické minimum",
    },
    {
      id: "zdravoveda-x18", topic: T,
      question: "Diabetik je opocený, třese se a je zmatený, ale je při vědomí a umí polykat. Co mu podáte?",
      options: ["Nic, musí počkat na záchranku.", "Svou dávku inzulinu", "Sladký nápoj nebo cukr"],
      correct: 2,
      explanation: "Příznaky ukazují na nízkou hladinu cukru (hypoglykemii). Pokud je postižený v bezvědomí, nedává se mu nic do úst.",
      source: "zdravotnické minimum",
    },
  ],
};
