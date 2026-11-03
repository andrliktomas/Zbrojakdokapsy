import type { Article } from "./types";

// Fakta: § 28 a § 29 zákona č. 40/2009 Sb. (doslovné znění ověřeno v konsolidovaném textu), § 150 a 151 TZ;
// soubor MV ot. č. 59, 60, 610, 611, 632–648, 817; docs/research/legislativa.md kap. 3.2.
// Článek je výukový: vysvětluje pojmy pro zkoušku, nedává rady k použití síly.

export const article: Article = {
  slug: "nutna-obrana-a-krajni-nouze",
  title: "Nutná obrana a krajní nouze se zbraní: co říká zákon",
  metaTitle: "Nutná obrana a krajní nouze (§ 28, § 29 TZ) ke zkoušce",
  description:
    "Nutná obrana a krajní nouze podle § 28 a § 29 trestního zákoníku srozumitelně: podmínky, přiměřenost, rozdíly a modelové situace ke zkoušce na zbrojní oprávnění.",
  perex:
    "Otázky na nutnou obranu a krajní nouzi patří k trestněprávní části testu. Vysvětlíme, co říká trestní zákoník, v čem se oba instituty liší a jak se posuzují typové situace ze souboru otázek. Článek je výukový: nejde o právní radu ani o návod k použití zbraně.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["trestni-pravo"],
  summary: [
    "Nutná obrana (§ 29 TZ) odvrací přímo hrozící nebo trvající útok; nesmí být zcela zjevně nepřiměřená způsobu útoku.",
    "Krajní nouze (§ 28 TZ) odvrací nebezpečí; nesmí jít odvrátit jinak a následek nesmí být stejně závažný nebo závažnější.",
    "Obrana smí být intenzivnější než útok; výzva útočníkovi ani útěk nejsou podmínkou.",
    "Použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi je nutné neprodleně ohlásit policii.",
    "Konkrétní případ vždy posuzují orgány činné v trestním řízení a soud podle všech okolností.",
  ],
  sections: [
    {
      id: "pravni-zaklad",
      heading: "Právní základ",
      blocks: [
        {
          type: "p",
          text: "Listina základních práv a svobod zaručuje právo bránit život svůj i jiného člověka i se zbraní, a to za podmínek, které stanoví zákon (soubor MV, ot. č. 610). Tím zákonem je podle souboru MV zejména trestní zákoník, který vymezuje nutnou obranu a krajní nouzi, a zákon o zbraních (ot. č. 611). Trestní zákoník (zákon č. 40/2009 Sb.) říká doslova:",
        },
        {
          type: "list",
          items: [
            [
              { strong: "§ 29 – nutná obrana:" },
              " „Čin jinak trestný, kterým někdo odvrací přímo hrozící nebo trvající útok na zájem chráněný trestním zákonem, není trestným činem. Nejde o nutnou obranu, byla-li obrana zcela zjevně nepřiměřená způsobu útoku.“",
            ],
            [
              { strong: "§ 28 – krajní nouze:" },
              " „Čin jinak trestný, kterým někdo odvrací nebezpečí přímo hrozící zájmu chráněnému trestním zákonem, není trestným činem. Nejde o krajní nouzi, jestliže bylo možno toto nebezpečí za daných okolností odvrátit jinak anebo způsobený následek je zřejmě stejně závažný nebo ještě závažnější než ten, který hrozil, anebo byl ten, komu nebezpečí hrozilo, povinen je snášet.“",
            ],
          ],
        },
        {
          type: "note",
          tone: "warning",
          title: "Výukový text, ne právní rada",
          text: "Článek vysvětluje zákonné pojmy pro účely zkoušky. Zda v konkrétní situaci šlo o nutnou obranu nebo krajní nouzi, vždy posuzují policie, státní zastupitelství a soud podle všech okolností. Pokud to jde, nebezpečí se vyhněte a volejte policii.",
        },
      ],
    },
    {
      id: "nutna-obrana",
      heading: "Nutná obrana: podmínky",
      blocks: [
        {
          type: "list",
          items: [
            "Útok musí přímo hrozit nebo trvat. Útok, který už skončil, ani útok, který může nastat někdy v budoucnu, odvracet nelze.",
            "Útokem je protiprávní jednání člověka, případně i jeho protiprávní opomenutí (soubor MV, ot. č. 642).",
            "Obrana směřuje proti útočníkovi; je-li útočníků více, proti kterémukoli z nich (ot. č. 644, 645).",
            "Bránit lze i jiného člověka – jde o pomoc v nutné obraně (ot. č. 643).",
            "Obrana nesmí být zcela zjevně nepřiměřená způsobu útoku (§ 29 odst. 2; ot. č. 638).",
          ],
        },
        {
          type: "p",
          text: "Podle souboru MV může být obrana intenzivnější než útok, aby ho spolehlivě odvrátila – nesmí však být zcela zjevně nepřiměřená (ot. č. 640). Proto soubor MV uvádí, že čelit útoku nožem nebo teleskopickým obuškem lze i střelnou zbraní, pokud obrana není zcela zjevně nepřiměřená (ot. č. 647). Obránce také není povinen útočníka předem vyzvat, aby od útoku upustil (ot. č. 639).",
        },
        {
          type: "p",
          text: "Kdo si zbraň připraví na očekávaný útok, splňuje podmínky nutné obrany jen tehdy, pokud ji použije až ve chvíli, kdy útok skutečně nastane, a jsou splněny i ostatní podmínky (ot. č. 646).",
        },
        {
          type: "note",
          tone: "tip",
          text: "Chyták z testu: „obrana musí být stejně silná jako útok“ je nesprávná odpověď. Hranicí je až zcela zjevná nepřiměřenost.",
        },
      ],
    },
    {
      id: "krajni-nouze",
      heading: "Krajní nouze: podmínky",
      blocks: [
        {
          type: "list",
          items: [
            "Nebezpečí musí hrozit přímo, tedy bezprostředně (soubor MV, ot. č. 635).",
            "Zdrojem nebezpečí může být přírodní síla, člověk nebo fyziologické a biologické procesy, například zvíře (ot. č. 636).",
            "Nebezpečí nešlo za daných okolností odvrátit jinak – krajní nouze je až poslední možnost.",
            "Způsobený následek nesmí být zřejmě stejně závažný nebo závažnější než ten, který hrozil (ot. č. 634).",
            "Kdo byl povinen nebezpečí snášet, se na krajní nouzi odvolat nemůže.",
            "Jednat v krajní nouzi může kdokoli, nejen ten, komu nebezpečí hrozí (ot. č. 633).",
          ],
        },
      ],
    },
    {
      id: "srovnani",
      heading: "Nutná obrana a krajní nouze v porovnání",
      blocks: [
        {
          type: "table",
          caption: "Rozdíly mezi nutnou obranou a krajní nouzí",
          head: ["", "Nutná obrana (§ 29 TZ)", "Krajní nouze (§ 28 TZ)"],
          rows: [
            ["Zdroj ohrožení", "útok člověka", "jakékoli nebezpečí"],
            ["Proti komu se jedná", "jen proti útočníkovi", "zásah může postihnout i nezúčastněného, například cizí věc"],
            ["Jiné řešení", "není podmínkou, útěk se nevyžaduje", "nesmí existovat jiný způsob odvrácení"],
            ["Přiměřenost", "obrana nesmí být zcela zjevně nepřiměřená způsobu útoku", "následek nesmí být zřejmě stejně závažný nebo závažnější než hrozící"],
          ],
        },
        {
          type: "note",
          tone: "tip",
          text: "V testu se podmínky obou institutů často prohazují. Podmínka „nešlo to odvrátit jinak“ patří ke krajní nouzi, ne k nutné obraně.",
        },
      ],
    },
    {
      id: "modelove-situace",
      heading: "Modelové situace",
      blocks: [
        {
          type: "p",
          text: "Následující zjednodušené příklady vycházejí z výkladu v aplikaci a ze souboru MV. Slouží k pochopení pojmů, ne k hodnocení skutečných událostí.",
        },
        {
          type: "p",
          text: [
            { strong: "Útok nožem." },
            " Útočník se s nožem rozběhne proti člověku a vyhrožuje mu smrtí. Útok přímo hrozí a směřuje proti životu. Obrana může být intenzivnější než útok a výzva není podmínkou (ot. č. 639, 647). Za takových okolností může jít o nutnou obranu; rozhodující je, zda obrana nebyla zcela zjevně nepřiměřená.",
          ],
        },
        {
          type: "p",
          text: [
            { strong: "Zloděj utíká." },
            " Zloděj vytrhne tašku a utíká pryč, nikoho neohrožuje. Výstřel do zad kvůli tašce by byl zcela zjevně nepřiměřený způsobu útoku – o nutnou obranu nejde a hrozí trestní stíhání. Správným postupem je volat policii.",
          ],
        },
        {
          type: "p",
          text: [
            { strong: "Útok skončil." },
            " Útočník leží na zemi a dál neútočí. Další násilí už není obranou, protože útok netrvá. Kdo spáchá trestný čin při odvracení útoku, aniž by byly zcela splněny podmínky nutné obrany, tomu soud tuto okolnost zohlední jen jako polehčující (ot. č. 648).",
          ],
        },
        {
          type: "p",
          text: [
            { strong: "Utržený pes." },
            " Na děti se řítí agresivní pes bez majitele, kterého nikdo nepoštval. Nejde o útok člověka, ale o nebezpečí – posuzuje se jako krajní nouze. Musí platit, že nebezpečí nešlo odvrátit jinak a že způsobený následek je méně závažný než hrozící zranění dětí. Kdyby psa na někoho poštval člověk, šlo by o útok tohoto člověka.",
          ],
        },
        {
          type: "topic",
          topic: "trestni-pravo",
          text: "Výklad § 28 a § 29 trestního zákoníku, další modelové situace a otázky k procvičení.",
        },
      ],
    },
    {
      id: "po-pouziti",
      heading: "Povinnosti po použití zbraně",
      blocks: [
        {
          type: "list",
          items: [
            "Použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi je každý povinen neprodleně ohlásit Policii ČR (soubor MV, ot. č. 59, 60).",
            "Zbraň uveďte do bezpečného stavu a nemiřte jí na nikoho.",
            "Pokud to jde bez nebezpečí pro vás nebo jiné, poskytněte první pomoc a volejte záchrannou službu 155. Neposkytnutí pomoci je trestným činem (§ 150 a 151 TZ; ot. č. 817) a povinnost se týká i zraněného útočníka, jakmile nebezpečí pominulo.",
          ],
        },
        {
          type: "p",
          text: [
            "Tísňová linka policie má číslo 158, jednotné evropské číslo tísňového volání 112. Jak se zbraní zacházet bezpečně, popisuje článek ",
            { text: "Bezpečné zacházení se zbraní a praktická část zkoušky", href: "/clanky/bezpecne-zachazeni-se-zbrani" },
            ".",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Musím útočníka před použitím zbraně vyzvat, aby přestal?",
      a: "Podle souboru otázek MV (ot. č. 639) obránce není povinen útočníka vyzvat, aby od útoku upustil. Rozhodující je, zda obrana nebyla zcela zjevně nepřiměřená způsobu útoku (§ 29 odst. 2 trestního zákoníku).",
    },
    {
      q: "Smí být obrana silnější než útok?",
      a: "Ano. Podle souboru otázek MV (ot. č. 640) může být obrana intenzivnější než útok, nesmí však být zcela zjevně nepřiměřená jeho způsobu.",
    },
    {
      q: "Jaký je hlavní rozdíl mezi nutnou obranou a krajní nouzí?",
      a: "Nutná obrana odvrací útok člověka a nevyžaduje, aby neexistovalo jiné řešení. Krajní nouze odvrací jakékoli nebezpečí, ale jen tehdy, když ho nešlo odvrátit jinak a způsobený následek není stejně závažný nebo závažnější než hrozící.",
    },
    {
      q: "Musím použití zbraně v nutné obraně hlásit?",
      a: "Ano. Použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi je každý povinen neprodleně ohlásit Policii České republiky.",
    },
    {
      q: "Co když obránce meze nutné obrany překročí?",
      a: "Pak nejde o nutnou obranu a čin může být trestný. Soud k tomu přihlédne jen jako k polehčující okolnosti (soubor otázek MV, ot. č. 648).",
    },
  ],
  sources: [
    "Zákon č. 40/2009 Sb., trestní zákoník (§ 28, § 29, § 150, § 151)",
    "Listina základních práv a svobod (čl. 6 odst. 4)",
    "Zákon č. 90/2024 Sb., o zbraních a střelivu",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025 (ot. č. 59, 60, 610, 611, 632–648, 817)",
  ],
  related: ["bezpecne-zachazeni-se-zbrani", "obecne-vs-rozsirene-zbrojni-opravneni", "zkouska-odborne-zpusobilosti"],
};
