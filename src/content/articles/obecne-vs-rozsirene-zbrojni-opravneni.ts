import type { Article } from "./types";

// Fakta: docs/research/legislativa.md kap. 1.2, 1.3, 1.5, 1.8; zákon č. 90/2024 Sb. § 3, § 12, § 14, § 20, § 21, § 50, § 80, § 81, § 150.

export const article: Article = {
  slug: "obecne-vs-rozsirene-zbrojni-opravneni",
  title: "Obecné vs. rozšířené zbrojní oprávnění: v čem se liší",
  metaTitle: "Obecné vs. rozšířené zbrojní oprávnění: rozdíly",
  description:
    "Obecné a rozšířené zbrojní oprávnění podle § 12 zákona č. 90/2024 Sb.: věk 18/21/15 let, skryté nošení, přísnější zkouška a přechod skupin A–E.",
  perex:
    "Zákon č. 90/2024 Sb. nahradil skupiny zbrojního průkazu dvěma druhy zbrojního oprávnění: obecným a rozšířeným. Které potřebujete, záleží hlavně na tom, zda chcete zbraň skrytě nosit. Podívejte se, v čem se liší a co se stalo se starými skupinami A až E.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  topics: ["opravneni", "nakladani"],
  summary: [
    "Součástí rozšířeného oprávnění je vždy i obecné (§ 12 odst. 2).",
    "Rozšířené potřebujete hlavně ke skrytému nošení zbraně podléhající registraci (§ 12 odst. 2 písm. c), § 80 odst. 2).",
    "Věk: obecné od zletilosti (18 let), výjimečně od 15 let; rozšířené od 21 let (§ 14).",
    "U zkoušky má rozšířené přísnější hranici: 28 z 30 otázek a 8 zásahů z 10.",
    "Průkazy skupin A, B a C se považují za obecné oprávnění, skupin D a E za rozšířené (§ 150 odst. 8).",
  ],
  sections: [
    {
      id: "dva-druhy",
      heading: "Dva druhy oprávnění místo skupin",
      blocks: [
        {
          type: "p",
          text: "Zbrojní oprávnění je podle § 12 odst. 1 obecné nebo rozšířené. Pokud zákon nebo jiný předpis vyžaduje zbrojní oprávnění a neříká, že musí jít o rozšířené, stačí obecné. Součástí rozšířeného oprávnění je vždy i obecné (§ 12 odst. 2). Držitel rozšířeného tedy smí vše, co držitel obecného, a navíc činnosti, pro které zákon rozšířené výslovně vyžaduje.",
        },
        {
          type: "p",
          text: "Pro nabývání a držení zbraní rozhoduje kategorie zbraně, ne druh oprávnění. Zbraň kategorie R4 smí mít držitel obecného i rozšířeného oprávnění bez dalšího povolení; pro každou zbraň R3 potřebují oba povolení R3 (§ 7, § 50).",
        },
      ],
    },
    {
      id: "kdy-rozsirene",
      heading: "Kdy potřebujete rozšířené oprávnění",
      blocks: [
        {
          type: "p",
          text: "Paragraf 12 odst. 2 vyjmenovává čtyři případy, kdy obecné oprávnění nestačí:",
        },
        {
          type: "list",
          items: [
            "skryté nošení zbraně podléhající registraci (písm. c)),",
            "výkon činnosti zkušebního komisaře (písm. a)),",
            "výkon činnosti hlavního zbrojíře u držitele zbrojní licence skupiny ZL1 nebo ZL3 (písm. b)),",
            "osoby, které plní některé úkoly držitele zbrojní licence a o kterých tak stanoví § 90 (písm. d)).",
          ],
        },
        {
          type: "p",
          text: "Pro většinu žadatelů je podstatné první písmeno. Zbraň se podle § 80 odst. 1 nosí skrytě a zbraň podléhající registraci smí nosit jen držitel rozšířeného oprávnění (§ 80 odst. 2). Výjimkou je nošení při akcích a činnostech podle § 81: při lovu, sportovní střelbě, výuce a výcviku nebo při kulturní akci smíte zbraň nosit i viditelně a stačí obecné oprávnění.",
        },
        {
          type: "note",
          tone: "tip",
          text: "„Nošením“ zákon rozumí mít zbraň na místě veřejnosti přístupném při sobě nabitou nebo viditelně (§ 3 písm. b)). Nenabitou zbraň v neprůhledném pouzdře tedy podle této definice nenosíte.",
        },
        {
          type: "p",
          text: "Pokud vám jde o sport, lov nebo sběratelství, obecné oprávnění zpravidla stačí. Jakmile chcete mít zbraň u sebe kvůli ochraně života, zdraví a majetku, potřebujete rozšířené.",
        },
      ],
    },
    {
      id: "srovnani",
      heading: "Srovnání v tabulce",
      blocks: [
        {
          type: "table",
          caption: "Obecné a rozšířené zbrojní oprávnění",
          head: ["", "Obecné ZO", "Rozšířené ZO"],
          rows: [
            ["Minimální věk", "zletilost (zpravidla 18 let); výjimečně 15 let", "21 let"],
            ["Skryté nošení zbraně podléhající registraci", "ne", "ano"],
            ["Nošení při lovu, sportu, výcviku nebo kulturní akci", "ano (§ 81)", "ano (§ 81)"],
            ["Teoretický test (30 otázek, 40 minut)", "alespoň 26 správně", "alespoň 28 správně"],
            ["Střelba (10 ran)", "alespoň 6 zásahů", "alespoň 8 zásahů"],
            ["Zkušební komisař, hlavní zbrojíř ZL1 nebo ZL3", "ne", "ano"],
            ["Zdravotní způsobilost, bezúhonnost, spolehlivost", "stejné podmínky", "stejné podmínky"],
          ],
        },
        {
          type: "p",
          text: "Zdravotní způsobilost, bezúhonnost a spolehlivost se pro oba druhy posuzují stejně (§ 15 až 19). Liší se jen věk a nároky na odbornou způsobilost (§ 14, § 20 odst. 3).",
        },
      ],
    },
    {
      id: "vek",
      heading: "Věk: 18, 21 a výjimečně 15 let",
      blocks: [
        {
          type: "p",
          text: "Obecné oprávnění lze vydat zletilé osobě, rozšířené až od 21 let (§ 14 odst. 1 písm. b) a c)). Výjimečně lze obecné oprávnění vydat už od 15 let (§ 14 odst. 1 písm. a)), a to:",
        },
        {
          type: "list",
          items: [
            "žákovi střední školy v oboru s výukou myslivosti, puškařství, sportovní střelby, v bezpečnostně-právní oblasti nebo vojenství, případně žákovi školy, která mu zajišťuje sportovně-střeleckou činnost mimo vyučování,",
            "členovi spolku zaměřeného na sportovní střelbu nebo obdobnou zájmovou činnost, který je držitelem zbrojní licence.",
          ],
        },
        {
          type: "p",
          text: "K žádosti 15letého je nutný písemný souhlas zákonného zástupce (případně opatrovníka nebo poručníka) a školy či spolku (§ 14 odst. 2). Lékařský posudek mu může vydat i praktický lékař pro děti a dorost (§ 15 odst. 5). Pokud zákonný zástupce, škola nebo spolek souhlas odvolá, může KŘP oprávnění pozastavit (§ 21 odst. 1 písm. c)).",
        },
      ],
    },
    {
      id: "prechod",
      heading: "Co se stalo se starými zbrojními průkazy",
      blocks: [
        {
          type: "p",
          text: "Dosavadní zbrojní průkazy se podle přechodného ustanovení § 150 odst. 8 považují za zbrojní oprávnění takto:",
        },
        {
          type: "table",
          caption: "Přechod skupin zbrojního průkazu na zbrojní oprávnění",
          head: ["Skupina ZP", "Účel podle zákona č. 119/2002 Sb.", "Nyní"],
          rows: [
            ["A", "sběratelské účely", "obecné ZO"],
            ["B", "sportovní účely", "obecné ZO"],
            ["C", "lovecké účely", "obecné ZO"],
            ["D", "výkon zaměstnání nebo povolání", "rozšířené ZO"],
            ["E", "ochrana života, zdraví a majetku", "rozšířené ZO"],
          ],
        },
        {
          type: "p",
          text: "Skupina F (pyrotechnický průzkum) se týkala munice, nikoli zbraní. KŘP podle § 150 odst. 9 vyzve dosavadní držitele zbrojních průkazů k předložení lékařského posudku podle nového zákona. Oprávnění se nově vede v centrálním registru zbraní a prokazuje se například zbrojním listem (§ 146, § 147).",
        },
        {
          type: "note",
          tone: "tip",
          text: "Na přechod starých skupin se oficiální soubor testových otázek MV neptá. U zkoušky jsou podstatné nové pojmy: obecné a rozšířené zbrojní oprávnění.",
        },
      ],
    },
    {
      id: "z-obecneho-na-rozsirene",
      heading: "Z obecného na rozšířené",
      blocks: [
        {
          type: "p",
          text: "Sazebník správních poplatků samostatnou položku pro přechod z obecného na rozšířené oprávnění nezná. Jak přesně postupovat, si proto ověřte na svém krajském ředitelství policie. Pro rozšířené oprávnění ale vždy platí věk 21 let a přísnější hranice u zkoušky: 28 správných odpovědí a 8 zásahů (§ 14, § 20 odst. 3).",
        },
        {
          type: "p",
          text: [
            "Celý postup od lékařského posudku po zápis do registru popisuje článek ",
            { text: "Jak získat zbrojní oprávnění v roce 2026", href: "/clanky/jak-ziskat-zbrojni-opravneni" },
            ".",
          ],
        },
        {
          type: "topic",
          topic: "opravneni",
          text: "Obecné a rozšířené oprávnění, podmínky, pozastavení a odnětí, výjimky a povolení – výklad, kartičky a otázky.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Potřebuji rozšířené zbrojní oprávnění, abych mohl mít doma pistoli?",
      a: "Ne. Pro nabytí a držení zbraně rozhoduje její kategorie. Běžná pistole patří do kategorie R3 a držitel obecného i rozšířeného oprávnění k ní potřebuje povolení R3 (§ 50 zákona č. 90/2024 Sb.). Rozšířené oprávnění je potřeba ke skrytému nošení zbraně podléhající registraci.",
    },
    {
      q: "Od kolika let lze získat rozšířené zbrojní oprávnění?",
      a: "Od 21 let (§ 14 odst. 1 písm. c) zákona č. 90/2024 Sb.). Obecné oprávnění lze získat od zletilosti, výjimečně už od 15 let.",
    },
    {
      q: "Je zkouška na rozšířené oprávnění těžší?",
      a: "Test i střelba jsou stejné, liší se hranice úspěchu: pro rozšířené oprávnění potřebujete alespoň 28 správných odpovědí z 30 a alespoň 8 zásahů z 10, pro obecné 26 a 6 (§ 20 odst. 3 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Mám zbrojní průkaz skupiny E. Jaké oprávnění mám teď?",
      a: "Zbrojní průkaz skupiny D nebo E se považuje za rozšířené zbrojní oprávnění, průkaz skupiny A, B nebo C za obecné (§ 150 odst. 8 zákona č. 90/2024 Sb.).",
    },
    {
      q: "Smí držitel obecného oprávnění nosit zbraň na lov nebo na střelnici?",
      a: "Ano. Při lovu, sportovní střelbě, výuce a výcviku nebo kulturní akci lze zbraň nosit i viditelně (§ 81) a nenabitou ji tam lze viditelně přepravovat, pokud je to obvyklé nebo přiměřené (§ 81 odst. 2). Na střelnici se povinnost skrytého nošení neuplatní (§ 80 odst. 1 písm. a)).",
    },
  ],
  sources: [
    "Zákon č. 90/2024 Sb., o zbraních a střelivu (§ 3, § 12–21, § 50, § 80, § 81, § 146, § 147, § 150)",
    "Soubor testových otázek MV ČR, verze 15. 12. 2025",
  ],
  related: ["jak-ziskat-zbrojni-opravneni", "zkouska-odborne-zpusobilosti", "kategorie-zbrani-a-streliva"],
};
