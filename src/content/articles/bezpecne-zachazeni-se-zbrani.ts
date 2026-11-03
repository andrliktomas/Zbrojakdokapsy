import type { Article } from "./types";

// Fakta: NV č. 238/2025 Sb. § 16–24, § 43 a příloha č. 2; soubor MV ot. č. 72, 562–596 (pravidla zkoušky)
// a 784–799 (zásady bezpečného zacházení); zákon č. 90/2024 Sb. § 20 odst. 3, § 79.

export const article: Article = {
  slug: "bezpecne-zachazeni-se-zbrani",
  title: "Bezpečné zacházení se zbraní a praktická část zkoušky",
  metaTitle: "Bezpečné zacházení se zbraní a praktická zkouška",
  description:
    "Čtyři pravidla bezpečnosti, kontrola pistole, revolveru a pušky, selhač (10 s), slabá rána a zádržka podle NV č. 238/2025 Sb. – co se předvádí u praktické zkoušky.",
  perex:
    "Praktická část zkoušky ověřuje hlavně jedno: že se zbraní zacházíte bezpečně. Postupy stanoví nařízení vlády č. 238/2025 Sb. a jeho příloha č. 2, zásady bezpečného zacházení obsahuje i oficiální soubor otázek MV. Projděte si, co se u zkoušky předvádí a kde se nejčastěji chybuje.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["bezpecna-manipulace", "zkouska"],
  summary: [
    "Čtyři pravidla: zbraň je vždy nabitá, nemiřte na nic, na co nechcete vystřelit, prst mimo lučík, znejte cíl i prostor za ním.",
    "Kontrola pistole: nejdřív vyjmout zásobník, pak stáhnout závěr a zkontrolovat komoru i zásobníkovou šachtu.",
    "Selhač: vyčkat alespoň 10 sekund se zbraní v bezpečném směru (soubor MV, ot. č. 586).",
    "Slabá rána: přestat střílet, zkontrolovat zbraň a průchodnost hlavně.",
    "Neprospějete, když bezprostředně ohrozíte bezpečnost osob nebo hrubě či opakovaně porušíte zásady (§ 19 odst. 2 NV).",
  ],
  sections: [
    {
      id: "ctyri-pravidla",
      heading: "Čtyři základní pravidla",
      blocks: [
        {
          type: "p",
          text: "Zásady bezpečného zacházení ze souboru MV (ot. č. 784–799) lze shrnout do čtyř obecně používaných pravidel. Jsou postavená tak, aby k neštěstí muselo selhat více z nich najednou.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Se zbraní zacházejte vždy, jako by byla nabitá – i když jste přesvědčeni, že není (ot. č. 784).",
            "Nemiřte na nic, na co by nebylo možné vystřelit, a to ani mimoděk při manipulaci (ot. č. 789).",
            "Prst držte mimo lučík a spoušť, dokud nechcete vystřelit (ot. č. 790).",
            "Buďte si jistí cílem i tím, co je za ním: musíte vědět, kde střela skončí, a počítat s průstřelem i odrazem (ot. č. 785, 791–794).",
          ],
        },
        {
          type: "p",
          text: "Soubor MV přidává další zásady. Manipulace zpravidla začíná a končí kontrolou stavu zbraně (ot. č. 795). Žádnou zbraň, ani nenabitou, nenechávejte bez dozoru na místě přístupném jiným osobám (ot. č. 796). Střílí se jen ze zbraně v dobrém technickém stavu (ot. č. 786) a s ochranou sluchu a zraku, pokud je to možné (ot. č. 787).",
        },
        {
          type: "note",
          tone: "warning",
          text: "Nikdo nesmí střílet nebo nosit zbraň pod vlivem alkoholu nebo jiné návykové látky, ani když jeho schopnost bezpečně zacházet se zbraní snižují léky nebo zdravotní stav (soubor MV, ot. č. 72).",
        },
      ],
    },
    {
      id: "bezpecny-smer",
      heading: "Bezpečný směr",
      blocks: [
        {
          type: "p",
          text: "U zkoušky určí bezpečný směr zkušební komisař (§ 18 odst. 1 NV), typicky směrem k dopadišti střel podle provozního řádu střelnice (ot. č. 562). Zbraň, která nebyla kontrolou uvedena do bezpečného stavu, musí při manipulaci vždy mířit do bezpečného směru (ot. č. 563). Bezpečný směr musí respektovat všichni přítomní a nikdo do něj nesmí vstupovat (ot. č. 565).",
        },
        {
          type: "p",
          text: "Mimo zákonné podmínky nutné obrany a krajní nouze není přípustné mířit na osoby, a to ani vybitou, zkontrolovanou nebo nekompletní zbraní (ot. č. 573).",
        },
      ],
    },
    {
      id: "kontrola",
      heading: "Kontrola zbraně krok za krokem",
      blocks: [
        {
          type: "p",
          text: "Účelem kontroly je zbraň vybít a uvést do stavu bezpečného pro odložení nebo další manipulaci, například rozebrání (ot. č. 572). U zkoušky ji předvádíte s krátkou i dlouhou kulovou zbraní (§ 17 odst. 2 NV).",
        },
        {
          type: "steps",
          title: "Samonabíjecí pistole",
          items: [
            { title: "Bezpečný směr, prst mimo lučík", text: "Ústí celou dobu míří do určeného bezpečného směru." },
            { title: "Vyjměte zásobník", text: "Vždy jako první. Kdybyste nejdřív stáhli závěr, zasune do komory další náboj ze zásobníku." },
            { title: "Stáhněte závěr a zkontrolujte komoru", text: "Přes výhozné okénko vizuálně zkontrolujte nábojovou komoru (ot. č. 576)." },
            { title: "Zkontrolujte zásobníkovou šachtu", text: "Pohledem přes výhozné okénko nebo pohmatem prsty ruky, která nedrží zbraň (ot. č. 577)." },
            { title: "Odložení", text: "Závěr můžete nechat v zadní poloze, pokud to konstrukce umožňuje, nebo ho vypustit dopředu a provést ránu jistoty do bezpečného směru (ot. č. 566, 578)." },
          ],
        },
        {
          type: "p",
          text: [
            { strong: "Revolver:" },
            " vyklopte nábojový válec, vizuálně zkontrolujte všechny nábojové komory a revolver odložte s vyklopeným válcem (ot. č. 579, 580).",
          ],
        },
        {
          type: "p",
          text: [
            { strong: "Dlouhé zbraně:" },
            " u samonabíjecí zbraně vyjmete zásobník, stáhnete závěr a zkontrolujete komoru i šachtu; závěr pak můžete nechat vzadu, nebo ho vypustit a provést ránu jistoty (ot. č. 581–583). U opakovací zbraně s otočně-odsuvným závěrem vyjmete zásobník, otevřete závěr, zkontrolujete komoru i šachtu a zbraň odložíte s otevřeným závěrem (ot. č. 584, 585).",
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "Vybíjet náboje z vyjmutého zásobníku u zkoušky povinné není (ot. č. 575). Úkony nad rámec povinných postupů vám komisař zadat může, ale jejich nezvládnutí není důvodem k neúspěchu (§ 18 odst. 2 NV).",
        },
      ],
    },
    {
      id: "zavady",
      heading: "Závady: selhač, slabá rána, zádržka",
      blocks: [
        {
          type: "table",
          caption: "Řešení závad podle přílohy č. 2 NV č. 238/2025 Sb. a souboru MV",
          head: ["Závada", "Co se stalo", "Postup"],
          rows: [
            [
              "Selhač",
              "náboj po úderu na zápalku nevystřelil; hrozí opožděný výstřel",
              "vyčkat alespoň 10 sekund se zbraní v bezpečném směru (výrobce může stanovit déle), pak zbraň zkontrolovat a prohlédnout otisk zápalníku na zápalce (ot. č. 586, 587)",
            ],
            [
              "Slabá rána",
              "nezvykle tichý výstřel se slabým zpětným rázem; střela mohla uvíznout v hlavni",
              "přestat střílet, zkontrolovat zbraň a průchodnost vývrtu hlavně; vyčkat 10 s jako u selhače lze, ale nevyžaduje se (ot. č. 588, 591)",
            ],
            [
              "Zádržka",
              "zbraň se správně nepřebila – nábojnice nebyla vyhozena nebo náboj uvízl",
              "vyjmout zásobník, prohlédnout zbraň a zjistit druh závady; nejčastěji stačí opakovaně stáhnout a vypustit závěr (ot. č. 592, 593)",
            ],
          ],
        },
        {
          type: "note",
          tone: "warning",
          text: "Okamžité otevření zbraně po selhači je chyba. Po slabé ráně nikdy nestřílejte „ještě jednou“ – další střela by mohla narazit do střely uvízlé v hlavni.",
        },
      ],
    },
    {
      id: "prakticka-cast",
      heading: "Jak probíhá praktická část",
      blocks: [
        {
          type: "p",
          text: "Praktickou část konáte jen tehdy, když jste prošli teorií (§ 16 odst. 1 NV). Komisař vás seznámí se zásadami, pokyny a povely, určí bezpečný směr a svěří vám zbraň (§ 16 odst. 2, § 18 odst. 1 NV). Podle jeho pokynů předvedete kontrolu zbraně, přípravu k rozebrání se slovním popisem čištění, přípravu ke střelbě, řešení závad a ukončení střelby (§ 17 odst. 1 NV). Používají se školní náboje bez výmetné náplně a zápalkové slože (§ 17 odst. 4 NV).",
        },
        {
          type: "p",
          text: [
            "Teprve když v této části prospějete, následuje střelba: 5 ran z krátké kulové zbraně na 10 m a 5 ran z dlouhé na 25 m na kruhový terč o průměru 500 mm, celkem do 5 minut (§ 20 odst. 3 písm. c) zákona; § 20 NV). Po ukončení střelby zbraň zkontrolujete a předložíte komisaři ke kontrole nábojové komory, ústím do bezpečného směru (§ 22 odst. 5 NV). Celý průběh zkoušky popisuje článek ",
            { text: "Jak probíhá zkouška odborné způsobilosti", href: "/clanky/zkouska-odborne-zpusobilosti" },
            ".",
          ],
        },
        {
          type: "note",
          tone: "warning",
          title: "Za co se neprojde",
          text: "Neprospějete, pokud postupy v dostatečném rozsahu nepředvedete, pokud porušíte zásady bezpečného nakládání tak, že bezprostředně ohrozíte nebo byste v praxi ohrozili bezpečnost osob, nebo pokud je porušíte hrubě či opakovaně (§ 19 odst. 2 NV). Typicky jde o ústí mimo bezpečný směr, prst na spoušti bez důvodu (ot. č. 569) nebo předčasné otevření zbraně po selhači.",
        },
      ],
    },
    {
      id: "trenink",
      heading: "Jak se na praktickou část připravit",
      blocks: [
        {
          type: "p",
          text: "Před manipulací s jakoukoli zbraní se musíte seznámit s její funkcí a ovládacími prvky (ot. č. 797). Provozovatel zkouškové střelnice zveřejňuje konkrétní modely zbraní nejméně 14 dní před termínem (§ 43 odst. 1 NV): u krátkých zbraní pistoli DA/SA s vnějším kohoutem, pistoli s přímoběžným úderníkem a revolver DA/SA, u dlouhých samonabíjecí zbraň a opakovací zbraň s otočně-odsuvným závěrem (§ 43 odst. 4 a 5 NV).",
        },
        {
          type: "p",
          text: "Manipulaci si můžete vyzkoušet pod dohledem oprávněné osoby – zákon umožňuje, aby vám oprávněný držitel zbraň svěřil pod svým dohledem (§ 79). Teorii, tedy postupy, pojmy a zásady, si mezitím procvičte v otázkách.",
        },
        {
          type: "topic",
          topic: "bezpecna-manipulace",
          text: "Pravidla bezpečnosti, kontrola zbraně, závady a postupy z praktické části v lekcích, kartičkách a otázkách.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Jak dlouho čekat při selhači?",
      a: "Alespoň 10 sekund se zbraní v bezpečném směru; výrobce zbraně nebo střeliva může v návodu stanovit delší dobu (soubor otázek MV, ot. č. 586).",
    },
    {
      q: "Co se u praktické zkoušky předvádí?",
      a: "Kontrola zbraně, příprava k částečnému rozebrání se slovním popisem čištění, příprava ke střelbě, řešení závad a ukončení střelby, a to s krátkou i dlouhou kulovou zbraní (§ 17 nařízení vlády č. 238/2025 Sb.). Pak následuje střelba na terč.",
    },
    {
      q: "Jaké zbraně jsou u zkoušky?",
      a: "Střelnice musí mít připravenou samonabíjecí pistoli DA/SA s vnějším kohoutem, samonabíjecí pistoli s přímoběžným úderníkem, revolver DA/SA, samonabíjecí dlouhou kulovou zbraň a opakovací zbraň s otočně-odsuvným závěrem. Konkrétní modely zveřejní nejméně 14 dní předem (§ 43 nařízení vlády č. 238/2025 Sb.).",
    },
    {
      q: "Mohu po kontrole pistole nechat závěr vpředu?",
      a: "Ano. Závěr můžete nechat v zadní poloze, pokud to konstrukce umožňuje, nebo ho vypustit do přední polohy a provést ránu jistoty do bezpečného směru (soubor otázek MV, ot. č. 578).",
    },
    {
      q: "Je prst na spoušti vždy chyba?",
      a: "Prst na spoušti nebo v lučíku je porušením zásad, s výjimkou záměrného výstřelu, manipulace s nenabitou zkontrolovanou zbraní, která to vyžaduje (například rány jistoty), nebo postupu, který stanoví výrobce (soubor otázek MV, ot. č. 569).",
    },
  ],
  sources: [
    "Nařízení vlády č. 238/2025 Sb., o provádění zkoušek (§ 16–24, § 43, příloha č. 2)",
    "Zákon č. 90/2024 Sb., o zbraních a střelivu (§ 20 odst. 3, § 79)",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025 (ot. č. 72, 562–596, 784–799)",
  ],
  related: ["zkouska-odborne-zpusobilosti", "nutna-obrana-a-krajni-nouze", "lhuty-a-cisla-ke-zkousce"],
};
