// Trenažér praktické části zkoušky odborné způsobilosti (manipulace se zbraní).
//
// Každý krok, pravidlo i vysvětlení vychází z:
//   - nařízení vlády č. 238/2025 Sb. (§ 17–23, § 43 a příloha č. 2 – přehled základních postupů),
//   - souboru testových otázek MV (verze 15. 12. 2025): ot. č. 562–596 (postupy podle přílohy č. 2),
//     784–799 (zásady bezpečného zacházení), 780 (překážka v hlavni), 117–120 (praktická část).
// Zdroje jsou u dat strukturovaně (SourceRef), aby je šlo zobrazit i ověřit testem (src/lib/trainer.test.ts).
//
// Soubor je čistý (bez přístupu k DB). Za běhu ho importuje jen server (stránka, server action, test);
// klientské komponenty z něj berou jen typy a obsah dostanou přes trainerView() podle přístupu.
// Pomocné funkce pro prohlížeč (míchání, formát zdrojů) jsou v src/components/trainer/util.ts.

import { XP } from "../lib/gamification";

// --- Typy ---

/** Odkaz na zdroj: ustanovení NV č. 238/2025 Sb., nebo čísla otázek ze souboru MV. */
export type SourceRef = { nv: string } | { mv: number[] };

export type WeaponId = "pistole" | "revolver" | "samonabijeci-dlouha" | "opakovaci-dlouha";

export type Weapon = {
  id: WeaponId;
  title: string;
  /** Krátký název do tlačítek a štítků. */
  short: string;
  description: string;
  sources: SourceRef[];
};

export type ProcedureStep = {
  id: string;
  text: string;
  /** Proč je krok právě tady – zobrazí se po vyhodnocení. */
  why: string;
  sources: SourceRef[];
};

export type Note = { text: string; sources: SourceRef[] };

/** Postup kontroly zbraně; kroky jsou uvedené ve správném pořadí. */
export type Procedure = {
  id: string;
  weapon: WeaponId;
  title: string;
  intro: string;
  steps: ProcedureStep[];
  /** „Dobré vědět“ – co předpis u zkoušky nevyžaduje a na co nezapomenout. */
  notes: Note[];
};

export type ChoiceOption = {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
  /** Jednání, které by u zkoušky vedlo k hodnocení „neprospěl“ (§ 19 odst. 2). */
  fatal?: boolean;
  sources: SourceRef[];
};

export type FaultStep = {
  id: string;
  prompt: string;
  options: ChoiceOption[];
  /** Po správné odpovědi je nutné vyčkat tolik sekund, než lze pokračovat (selhač). */
  waitSecondsAfter?: number;
  waitText?: string;
};

export type FaultKind = "selhac" | "slaba-rana" | "zadrzka" | "preruseni";

export type FaultScenario = {
  id: string;
  kind: FaultKind;
  weapon: WeaponId;
  title: string;
  situation: string;
  steps: FaultStep[];
  /** Shrnutí postupu po dokončení. */
  summary: string;
  sources: SourceRef[];
};

export type ViolationAction = {
  id: string;
  text: string;
  /** Právě toto jednání znamená „neprospěl“. */
  violation: boolean;
  explanation: string;
  sources: SourceRef[];
};

export type ViolationScenario = {
  id: string;
  weapon: WeaponId;
  title: string;
  situation: string;
  actions: ViolationAction[];
  /** Proč by žadatel neprospěl – odkaz na § 19 odst. 2. */
  verdict: string;
  sources: SourceRef[];
};

export type TrainerMode = "poradi" | "zavady" | "chyby";

// --- Pomocníci pro zdroje ---

const nv = (ref: string): SourceRef => ({ nv: ref });
const p2 = (ref: string): SourceRef => ({ nv: `příloha č. 2 bod ${ref}` });
const mv = (...questions: number[]): SourceRef => ({ mv: questions });

/** Povolené odkazy – ověřuje je test, aby se do trenažéru nedostal nepodložený krok. */
export const ALLOWED_NV_PARAGRAPHS = [17, 18, 19, 21, 22, 23, 43];
export const ALLOWED_ANNEX_POINTS = ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "2.1", "2.2", "3.1", "3.2", "4"];
export const ALLOWED_MV_QUESTIONS = new Set<number>([
  ...range(117, 120),
  ...range(562, 596),
  780,
  ...range(784, 799),
]);

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

// --- Zbraně (§ 43 odst. 4 a 5) ---

export const WEAPONS: Weapon[] = [
  {
    id: "pistole",
    title: "Samonabíjecí pistole",
    short: "Pistole",
    description: "Krátká kulová zbraň – u zkoušky s bicím kohoutem (DA/SA) nebo s přímoběžným úderníkem.",
    sources: [nv("§ 43 odst. 4 písm. a) a b)")],
  },
  {
    id: "revolver",
    title: "Revolver",
    short: "Revolver",
    description: "Revolver s výklopným válcem a spoušťovým mechanismem DA/SA.",
    sources: [nv("§ 43 odst. 4 písm. c)")],
  },
  {
    id: "samonabijeci-dlouha",
    title: "Samonabíjecí dlouhá kulová zbraň",
    short: "Samonabíjecí dlouhá",
    description: "Dlouhá kulová zbraň s odnímatelným zásobníkem.",
    sources: [nv("§ 43 odst. 5 písm. a)")],
  },
  {
    id: "opakovaci-dlouha",
    title: "Opakovací dlouhá kulová zbraň",
    short: "Opakovací dlouhá",
    description: "S otočným odsuvným závěrem a odnímatelným zásobníkem.",
    sources: [nv("§ 43 odst. 5 písm. b)")],
  },
];

export const weaponById = (id: WeaponId) => WEAPONS.find((w) => w.id === id)!;

/** Ukázka zdarma: vše, co se týká samonabíjecí pistole. Ostatní obsah vyžaduje aktivní balíček. */
export const FREE_WEAPONS: ReadonlySet<WeaponId> = new Set<WeaponId>(["pistole"]);
export const isFreeItem = (item: { weapon: WeaponId }) => FREE_WEAPONS.has(item.weapon);

// --- Jak praktická část probíhá ---

export const PRACTICAL_OVERVIEW: Note[] = [
  {
    text: "Předvedete kontrolu zbraně, přípravu k rozebrání a čištění, přípravu ke střelbě, postup při závadě a ukončení střelby – podle potřeby doplněné slovním popisem.",
    sources: [nv("§ 17 odst. 1"), mv(117)],
  },
  {
    text: "Vše postupně s krátkou i s dlouhou kulovou zbraní. Konkrétní zbraně určí komisař; provozovatel střelnice zveřejní jejich modely nejméně 14 dní předem.",
    sources: [nv("§ 17 odst. 2 a 3"), nv("§ 43 odst. 1")],
  },
  {
    text: "Používají se školní náboje – bez výmetné náplně, nárazové slože i zápalky.",
    sources: [nv("§ 17 odst. 4")],
  },
  {
    text: "Komisař vám určí bezpečný směr a svěří vám zbraň. Zbraň, kterou jste ještě nezkontrolovali, musí vždy směřovat do bezpečného směru.",
    sources: [nv("§ 18 odst. 1"), p2("1.1 odst. 2"), mv(562, 563)],
  },
  {
    text: "Neprospějete, pokud postupy v dostatečném rozsahu nepředvedete nebo porušíte zásady tak, že ohrozíte (nebo byste v praxi ohrozili) bezpečnost osob, případně je porušíte hrubě či opakovaně. Zkouška tím končí a na střelbu na terč už nedojde.",
    sources: [nv("§ 19 odst. 2 a 5"), mv(120)],
  },
];

// --- Režim „Seřaď kroky“: kontrola zbraně (příloha č. 2 bod 2.2) ---

function safeDirectionStep(id: string): ProcedureStep {
  return {
    id,
    text: "Převezměte zbraň a nasměrujte ji do bezpečného směru, který určil komisař. Prst držte mimo spoušť i lučík.",
    why: "Kontrola se dělá vždy při první manipulaci se zbraní. Dokud zbraň není zkontrolovaná, musí při jakékoli manipulaci směřovat do bezpečného směru – a prst na spoušti nebo v lučíku je porušením zásad.",
    sources: [nv("§ 18 odst. 1"), p2("1.1 odst. 2"), p2("1.4"), p2("2.1 odst. 5"), mv(563, 569)],
  };
}

const NOTE_MAGAZINE_ROUNDS: Note = {
  text: "Náboje z vyjmutého zásobníku u zkoušky vybíjet nemusíte.",
  sources: [p2("2.1 odst. 6"), mv(575)],
};
const NOTE_EXTRA_SAFETY: Note = {
  text: "Dodatečné bezpečnostní prvky konkrétní zbraně k uvedení do bezpečného stavu použít nemusíte.",
  sources: [p2("2.1 odst. 3"), mv(574)],
};
const NOTE_NO_TECH_CHECK: Note = {
  text: "Kontrola technického stavu mechanismu, funkčnosti nebo průchodnosti hlavně do kontroly zbraně nepatří.",
  sources: [p2("2.1 odst. 4")],
};
const NOTE_AIMED_SAFETY_SHOT: Note = {
  text: "Mířenou ránu jistoty (s využitím mířidel) provedete jen tehdy, když ji určí komisař – a způsobem, který určí.",
  sources: [p2("1.2 odst. 2")],
};
const NOTE_END_OF_SHOOTING: Note = {
  text: "Při ukončení střelby provedete stejnou kontrolu a zbraň předložíte komisaři ústím do bezpečného směru tak, aby zrakem viděl do nábojové komory (komor) nebo zásobníkové šachty.",
  sources: [p2("1.6"), nv("§ 22 odst. 5"), mv(571)],
};
const NOTE_NO_AIMING: Note = {
  text: "Ani se zkontrolovanou, vybitou nebo nekompletní zbraní nesmíte mířit na osoby.",
  sources: [p2("2.1 odst. 1"), mv(573, 784)],
};

export const PROCEDURES: Procedure[] = [
  {
    id: "kontrola-pistole",
    weapon: "pistole",
    title: "Kontrola samonabíjecí pistole",
    intro: "Komisař vám podá samonabíjecí pistoli a určí bezpečný směr. Seřaďte kroky kontroly zbraně.",
    steps: [
      safeDirectionStep("kontrola-pistole-smer"),
      {
        id: "kontrola-pistole-zasobnik",
        text: "Vyjměte zásobník.",
        why: "Postup začíná vyjmutím zásobníku. Kdybyste nejdřív stáhli závěr, mohl by při pohybu vpřed dopravit do komory další náboj ze zásobníku.",
        sources: [p2("2.2 písm. a) odst. 1"), mv(576)],
      },
      {
        id: "kontrola-pistole-komora",
        text: "Stáhněte závěr do zadní polohy a přes výhozné okénko zrakem zkontrolujte nábojovou komoru.",
        why: "Teprve se zásobníkem venku stáhnete závěr a vizuálně ověříte, že v komoře nic není.",
        sources: [p2("2.2 písm. a) odst. 1"), mv(576)],
      },
      {
        id: "kontrola-pistole-sachta",
        text: "Zkontrolujte, že v zásobníkové šachtě není zásobník – pohledem přes výhozné okénko, nebo pohmatem prsty ruky, která nedrží zbraň.",
        why: "Šachta se kontroluje při staženém závěru přes výhozné okénko, nebo hmatem volnou rukou přes ústí šachty.",
        sources: [p2("2.2 písm. a) odst. 2"), mv(577)],
      },
      {
        id: "kontrola-pistole-zaver",
        text: "Závěr ponechte v zadní poloze (umožňuje-li to konstrukce), nebo ho vypusťte vpřed a do bezpečného směru proveďte ránu jistoty.",
        why: "Po kontrole máte dvě možnosti. Rána jistoty se dělá až u zkontrolované zbraně, v přední poloze závěru a vždy do bezpečného směru.",
        sources: [p2("2.2 písm. a) odst. 3"), p2("1.2 odst. 1"), mv(566, 578)],
      },
    ],
    notes: [NOTE_MAGAZINE_ROUNDS, NOTE_EXTRA_SAFETY, NOTE_AIMED_SAFETY_SHOT, NOTE_END_OF_SHOOTING, NOTE_NO_AIMING],
  },
  {
    id: "kontrola-revolver",
    weapon: "revolver",
    title: "Kontrola revolveru",
    intro: "Komisař vám podá revolver s výklopným válcem a určí bezpečný směr. Seřaďte kroky kontroly zbraně.",
    steps: [
      safeDirectionStep("kontrola-revolver-smer"),
      {
        id: "kontrola-revolver-valec",
        text: "Vyklopte nábojový válec.",
        why: "U revolveru se kontrola provádí vyklopením válce – závěr ani zásobníkovou šachtu revolver nemá.",
        sources: [p2("2.2 písm. b) odst. 1"), mv(579)],
      },
      {
        id: "kontrola-revolver-komory",
        text: "Zrakem zkontrolujte všechny nábojové komory válce.",
        why: "Vizuální kontrola všech komor vyklopeného válce ověří, že ve zbrani není náboj.",
        sources: [p2("2.2 písm. b) odst. 1"), mv(579)],
      },
      {
        id: "kontrola-revolver-odlozeni",
        text: "Zkontrolovaný revolver odložte s vyklopeným válcem.",
        why: "Revolver se odkládá vždy s vyklopeným válcem – ne se zavřeným válcem po ranách jistoty.",
        sources: [p2("2.2 písm. b) odst. 2"), mv(580)],
      },
    ],
    notes: [NOTE_EXTRA_SAFETY, NOTE_NO_TECH_CHECK, NOTE_END_OF_SHOOTING, NOTE_NO_AIMING],
  },
  {
    id: "kontrola-samonabijeci-dlouha",
    weapon: "samonabijeci-dlouha",
    title: "Kontrola samonabíjecí dlouhé kulové zbraně",
    intro: "Komisař vám podá samonabíjecí dlouhou kulovou zbraň s odnímatelným zásobníkem. Seřaďte kroky kontroly zbraně.",
    steps: [
      safeDirectionStep("kontrola-samonabijeci-dlouha-smer"),
      {
        id: "kontrola-samonabijeci-dlouha-zasobnik",
        text: "Vyjměte zásobník.",
        why: "Stejně jako u pistole jde zásobník ven jako první – teprve potom se manipuluje se závěrem.",
        sources: [p2("2.2 písm. c) odst. 1"), mv(581)],
      },
      {
        id: "kontrola-samonabijeci-dlouha-komora",
        text: "Stáhněte závěr do zadní polohy a přes výhozné okénko zkontrolujte nábojovou komoru. Nedovoluje-li to konstrukce, opakovaně stáhněte závěr vzad a vypusťte ho vpřed.",
        why: "Vizuální kontrola komory přes výhozné okénko má přednost. Jen když ji konstrukce neumožňuje, nahrazuje ji opakované stažení a vypuštění závěru.",
        sources: [p2("2.2 písm. c) odst. 1"), mv(581)],
      },
      {
        id: "kontrola-samonabijeci-dlouha-sachta",
        text: "Zkontrolujte, že v zásobníkové šachtě není zásobník – pohledem přes výhozné okénko, nebo pohmatem prsty ruky, která nedrží zbraň.",
        why: "Šachtu nekontrolujete vkládáním zásobníku ani zvláštním nástrojem – stačí pohled nebo hmat volnou rukou.",
        sources: [p2("2.2 písm. c) odst. 2"), mv(577, 582)],
      },
      {
        id: "kontrola-samonabijeci-dlouha-zaver",
        text: "Závěr ponechte v zadní poloze (umožňuje-li to konstrukce), nebo ho vypusťte vpřed a do bezpečného směru proveďte ránu jistoty.",
        why: "Stejné zakončení jako u pistole: závěr vzadu, nebo vpřed s ranou jistoty do bezpečného směru.",
        sources: [p2("2.2 písm. c) odst. 3"), p2("1.2 odst. 1"), mv(566, 583)],
      },
    ],
    notes: [NOTE_MAGAZINE_ROUNDS, NOTE_EXTRA_SAFETY, NOTE_AIMED_SAFETY_SHOT, NOTE_END_OF_SHOOTING, NOTE_NO_AIMING],
  },
  {
    id: "kontrola-opakovaci-dlouha",
    weapon: "opakovaci-dlouha",
    title: "Kontrola opakovací dlouhé kulové zbraně",
    intro: "Komisař vám podá opakovací dlouhou kulovou zbraň s otočným odsuvným závěrem. Seřaďte kroky kontroly zbraně.",
    steps: [
      safeDirectionStep("kontrola-opakovaci-dlouha-smer"),
      {
        id: "kontrola-opakovaci-dlouha-zasobnik",
        text: "Vyjměte zásobník.",
        why: "I u opakovací zbraně je prvním úkonem vyjmutí zásobníku, teprve potom otevření závěru.",
        sources: [p2("2.2 písm. d) odst. 1"), mv(584)],
      },
      {
        id: "kontrola-opakovaci-dlouha-otevreni",
        text: "Otevřete závěr.",
        why: "Otevřením otočného odsuvného závěru zpřístupníte nábojovou komoru i zásobníkovou šachtu ke kontrole.",
        sources: [p2("2.2 písm. d) odst. 1"), mv(584)],
      },
      {
        id: "kontrola-opakovaci-dlouha-komora",
        text: "Zrakem zkontrolujte nábojovou komoru a zásobníkovou šachtu.",
        why: "U opakovací zbraně se po otevření závěru vizuálně kontroluje komora i šachta najednou.",
        sources: [p2("2.2 písm. d) odst. 1"), mv(584)],
      },
      {
        id: "kontrola-opakovaci-dlouha-odlozeni",
        text: "Zbraň odložte se závěrem v otevřené poloze. Pokud závěr zkontrolované zbraně uzavíráte, vypusťte bicí mechanismus ranou jistoty do bezpečného směru.",
        why: "Zbraň se odkládá s otevřeným závěrem. Rána jistoty přichází na řadu jen při uzamčení nenabité zkontrolované zbraně.",
        sources: [p2("2.2 písm. d) odst. 2"), p2("1.2 odst. 1"), mv(566, 585)],
      },
    ],
    notes: [NOTE_MAGAZINE_ROUNDS, NOTE_EXTRA_SAFETY, NOTE_AIMED_SAFETY_SHOT, NOTE_END_OF_SHOOTING, NOTE_NO_AIMING],
  },
];

// --- Režim „Závady“: rozhodovací postupy (příloha č. 2 bod 3, bod 1.5, § 23) ---

export const FAULT_SCENARIOS: FaultScenario[] = [
  {
    id: "selhac-pistole",
    kind: "selhac",
    weapon: "pistole",
    title: "Selhač",
    situation: "Na pokyn komisaře stisknete spoušť samonabíjecí pistole, ale k iniciaci náboje nedojde – zbraň nevystřelí.",
    steps: [
      {
        id: "selhac-pistole-1",
        prompt: "Co uděláte hned teď?",
        waitSecondsAfter: 10,
        waitText: "Držte zbraň ústím v bezpečném směru a vyčkejte. Náboj může být iniciován se zpožděním.",
        options: [
          {
            id: "selhac-pistole-1-hned",
            text: "Okamžitě stáhnu závěr a selhaný náboj vyhodím, ať mohu pokračovat.",
            correct: false,
            fatal: true,
            explanation: "Okamžité otevření zbraně je chyba – náboj se může iniciovat se zpožděním. Nejdřív je nutné vyčkat nejméně 10 sekund se zbraní v bezpečném směru.",
            sources: [p2("3.2 písm. a) odst. 1"), mv(586), nv("§ 19 odst. 2")],
          },
          {
            id: "selhac-pistole-1-cekat",
            text: "Zbraň dál držím ústím v bezpečném směru a vyčkám nejméně 10 sekund.",
            correct: true,
            explanation: "Nedojde-li k iniciaci náboje, vyčká se minimálně 10 sekund se zbraní v bezpečném směru. Předepisuje-li výrobce zbraně nebo střeliva delší dobu, seznámí vás s ní komisař.",
            sources: [p2("3.2 písm. a) odst. 1"), mv(586)],
          },
          {
            id: "selhac-pistole-1-usti",
            text: "Zbraň sklopím a podívám se do ústí hlavně, jestli je náboj v pořádku.",
            correct: false,
            fatal: true,
            explanation: "Nezkontrolovaná zbraň musí při manipulaci vždy směřovat do bezpečného směru. Pohled do ústí hlavně je přesný opak – ohrožujete sami sebe.",
            sources: [p2("1.1 odst. 2 a 3"), mv(563, 564), nv("§ 19 odst. 2")],
          },
        ],
      },
      {
        id: "selhac-pistole-2",
        prompt: "Uplynulo 10 sekund a zbraň nevystřelila. Jak budete pokračovat?",
        options: [
          {
            id: "selhac-pistole-2-odevzdat",
            text: "Bez další manipulace odevzdám zbraň se selhaným nábojem správci střelnice.",
            correct: false,
            explanation: "Odevzdání správci střelnice předpis nepředepisuje. Po uplynutí čekací doby se provede kontrola zbraně.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(587)],
          },
          {
            id: "selhac-pistole-2-kontrola",
            text: "Provedu kontrolu zbraně: vyjmu zásobník, stáhnu závěr, zkontroluji komoru a zásobníkovou šachtu.",
            correct: true,
            explanation: "Po uplynutí příslušné doby se provede kontrola zbraně podle bodu 2 přílohy č. 2 – u pistole stejně jako v režimu Seřaď kroky.",
            sources: [p2("3.2 písm. a) odst. 2"), p2("2.2 písm. a)"), mv(587)],
          },
          {
            id: "selhac-pistole-2-znovu-cekat",
            text: "Teprve teď náboj vyjmu, položím ho stranou a znovu počkám 10 sekund, zda nevystřelí.",
            correct: false,
            explanation: "Čeká se se zbraní v bezpečném směru ještě před kontrolou – ne s vyjmutým nábojem po ní. Teď je na řadě kontrola zbraně.",
            sources: [p2("3.2 písm. a)"), mv(587, 590)],
          },
        ],
      },
      {
        id: "selhac-pistole-3",
        prompt: "Zbraň je zkontrolovaná a selhaný náboj vyhozený. Co ještě zkontrolujete?",
        options: [
          {
            id: "selhac-pistole-3-zapalnik",
            text: "Zda na zápalníku nezůstal otisk zápalky.",
            correct: false,
            explanation: "Je to obráceně – kontroluje se otisk zápalníku na zápalce náboje.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(590)],
          },
          {
            id: "selhac-pistole-3-nic",
            text: "Nic dalšího – po kontrole zbraně je postup u konce.",
            correct: false,
            explanation: "K postupu u selhače patří ještě kontrola otisku zápalníku na zápalce.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(587)],
          },
          {
            id: "selhac-pistole-3-otisk",
            text: "Otisk zápalníku na zápalce – podle něj poznám, zda závadu způsobila zbraň, nebo střelivo.",
            correct: true,
            explanation: "Otisk zápalníku na zápalce ukáže, zda je závada zapříčiněna zbraní, nebo střelivem.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(587, 590)],
          },
        ],
      },
    ],
    summary: "Selhač: vyčkat nejméně 10 s se zbraní v bezpečném směru → kontrola zbraně → otisk zápalníku na zápalce.",
    sources: [p2("3.2 písm. a)"), mv(586, 587, 590)],
  },
  {
    id: "selhac-revolver",
    kind: "selhac",
    weapon: "revolver",
    title: "Selhač u revolveru",
    situation: "Při střelbě z revolveru stisknete spoušť, ale k iniciaci náboje nedojde.",
    steps: [
      {
        id: "selhac-revolver-1",
        prompt: "Co uděláte hned teď?",
        waitSecondsAfter: 10,
        waitText: "Revolver držte ústím v bezpečném směru a vyčkejte. Náboj může být iniciován se zpožděním.",
        options: [
          {
            id: "selhac-revolver-1-vyrobce",
            text: "Počkám 10 sekund, ale jen pokud to předepisuje výrobce střeliva.",
            correct: false,
            explanation: "10 sekund je minimum vždy. Výrobce zbraně nebo střeliva může předepsat jen delší dobu – s tou vás seznámí komisař.",
            sources: [p2("3.2 písm. a) odst. 1"), mv(586)],
          },
          {
            id: "selhac-revolver-1-vyklopit",
            text: "Hned vyklopím válec a náboj vyjmu – opožděná iniciace by mohla zbraň poškodit.",
            correct: false,
            fatal: true,
            explanation: "Okamžité otevření zbraně je chyba. Náboj se může iniciovat se zpožděním, proto se nejdřív vyčká nejméně 10 sekund se zbraní v bezpečném směru.",
            sources: [p2("3.2 písm. a) odst. 1"), mv(586), nv("§ 19 odst. 2")],
          },
          {
            id: "selhac-revolver-1-cekat",
            text: "Revolver dál držím ústím v bezpečném směru a vyčkám nejméně 10 sekund.",
            correct: true,
            explanation: "Po selhači se vyčká minimálně 10 sekund se zbraní v bezpečném směru.",
            sources: [p2("3.2 písm. a) odst. 1"), mv(586)],
          },
        ],
      },
      {
        id: "selhac-revolver-2",
        prompt: "Uplynulo 10 sekund. Jak provedete kontrolu revolveru?",
        options: [
          {
            id: "selhac-revolver-2-svazek",
            text: "Vyklopím válec, sklopím hlavňový svazek a zkontroluji komory válce i svazku.",
            correct: false,
            explanation: "Revolver hlavňový svazek nemá. Kontrola revolveru = vyklopení válce a vizuální kontrola jeho nábojových komor.",
            sources: [p2("2.2 písm. b) odst. 1"), mv(579)],
          },
          {
            id: "selhac-revolver-2-valec",
            text: "Vyklopím nábojový válec a zrakem zkontroluji jeho nábojové komory.",
            correct: true,
            explanation: "Po vyčkání následuje kontrola zbraně – u revolveru vyklopení válce a vizuální kontrola komor.",
            sources: [p2("3.2 písm. a) odst. 2"), p2("2.2 písm. b) odst. 1"), mv(579, 587)],
          },
          {
            id: "selhac-revolver-2-zaver",
            text: "Stáhnu závěr vzad a zkontroluji komory a zásobníkovou šachtu.",
            correct: false,
            explanation: "To je postup pro zbraně se závěrem. Revolver se kontroluje vyklopením válce.",
            sources: [p2("2.2 písm. b) odst. 1"), mv(579)],
          },
        ],
      },
      {
        id: "selhac-revolver-3",
        prompt: "Komory jsou zkontrolované. Co zbývá?",
        options: [
          {
            id: "selhac-revolver-3-otisk",
            text: "Zkontroluji otisk zápalníku na zápalce selhaného náboje.",
            correct: true,
            explanation: "Otisk zápalníku na zápalce ukáže, zda závadu způsobila zbraň, nebo střelivo.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(587)],
          },
          {
            id: "selhac-revolver-3-zavrit",
            text: "Válec zavřu a revolver odložím – rány jistoty udělám za každou komoru.",
            correct: false,
            explanation: "Zkontrolovaný revolver se odkládá s vyklopeným válcem. A u selhače nesmíte vynechat kontrolu otisku zápalníku.",
            sources: [p2("2.2 písm. b) odst. 2"), mv(580)],
          },
          {
            id: "selhac-revolver-3-spravce",
            text: "Selhaný náboj ihned odevzdám správci střelnice.",
            correct: false,
            explanation: "Odevzdání náboje správci předpis nevyžaduje. Po kontrole zbraně se kontroluje otisk zápalníku na zápalce.",
            sources: [p2("3.2 písm. a) odst. 2"), mv(587)],
          },
        ],
      },
    ],
    summary: "Selhač u revolveru: vyčkat nejméně 10 s v bezpečném směru → vyklopit válec a zkontrolovat komory → otisk zápalníku na zápalce.",
    sources: [p2("3.2 písm. a)"), p2("2.2 písm. b)"), mv(579, 586, 587)],
  },
  {
    id: "slaba-rana-dlouha",
    kind: "slaba-rana",
    weapon: "samonabijeci-dlouha",
    title: "Slabá rána",
    situation: "Při střelbě ze samonabíjecí dlouhé kulové zbraně dojde k závadě typu slabá rána. Střela mohla zůstat uvízlá v hlavni.",
    steps: [
      {
        id: "slaba-rana-dlouha-1",
        prompt: "Co uděláte nejdřív?",
        options: [
          {
            id: "slaba-rana-dlouha-1-vystrel",
            text: "Vystřelím znovu, abych ověřil, že zbraň funguje.",
            correct: false,
            fatal: true,
            explanation: "Po slabé ráně může být v hlavni uvízlá střela. Výstřel do hlavně s překážkou hrozí jejím vydutím nebo roztržením a vážným zraněním střelce i okolí.",
            sources: [p2("3.2 písm. b) odst. 1"), mv(780), nv("§ 19 odst. 2")],
          },
          {
            id: "slaba-rana-dlouha-1-kontrola",
            text: "Provedu kontrolu zbraně: vyjmu zásobník, stáhnu závěr, zkontroluji komoru a šachtu.",
            correct: true,
            explanation: "Po slabé ráně se nejprve provede kontrola zbraně podle bodu 2 přílohy č. 2.",
            sources: [p2("3.2 písm. b) odst. 1"), p2("2.2 písm. c)"), mv(588)],
          },
          {
            id: "slaba-rana-dlouha-1-cekat",
            text: "Nesmím nic dělat – povinně čekám 10 sekund na pokyn komisaře.",
            correct: false,
            explanation: "Vyčkat po slabé ráně obdobně jako u selhače můžete, ale nevyžaduje se. Prvním krokem postupu je kontrola zbraně.",
            sources: [p2("3.2 písm. b) odst. 2"), mv(591)],
          },
        ],
      },
      {
        id: "slaba-rana-dlouha-2",
        prompt: "Zbraň je zkontrolovaná. Kvůli rozebrání potřebujete uvolnit spoušťový a bicí mechanismus. Smíte provést ránu jistoty?",
        options: [
          {
            id: "slaba-rana-dlouha-2-nikdy",
            text: "Ne – po slabé ráně je rána jistoty vždy porušením zásad.",
            correct: false,
            explanation: "Neplatí. Rána jistoty po kontrole zbraně, u které došlo ke slabé ráně, porušením zásad není.",
            sources: [p2("3.2 písm. b) odst. 1"), mv(589)],
          },
          {
            id: "slaba-rana-dlouha-2-po-10",
            text: "Ano, ale až po 10 sekundách – rána jistoty vyvolá opožděnou iniciaci a pak postupuji jako u selhače.",
            correct: false,
            explanation: "Rána jistoty se provádí až po kontrole zbraně – ve zbrani žádný náboj není a nic se neiniciuje. Rána jistoty po kontrole zbraně se slabou ranou porušením zásad není.",
            sources: [p2("3.2 písm. b) odst. 1"), mv(589)],
          },
          {
            id: "slaba-rana-dlouha-2-ano",
            text: "Ano – do bezpečného směru. Po kontrole zbraně to porušením zásad není.",
            correct: true,
            explanation: "Rána jistoty po kontrole zbraně se slabou ranou není porušením zásad, zejména je-li nutná k rozebrání. Vždy do bezpečného směru.",
            sources: [p2("3.2 písm. b) odst. 1"), p2("1.2 odst. 1"), mv(566, 589)],
          },
        ],
      },
      {
        id: "slaba-rana-dlouha-3",
        prompt: "Při kontrole průchodnosti vývrtu hlavně zjistíte uvízlou střelu. Co uděláte?",
        options: [
          {
            id: "slaba-rana-dlouha-3-popis",
            text: "Pouze slovně popíšu správný postup jejího odstranění.",
            correct: true,
            explanation: "Je-li střela uvízlá v hlavni, u zkoušky se postup jejího odstranění pouze slovně popíše.",
            sources: [p2("3.2 písm. b) odst. 1"), mv(588)],
          },
          {
            id: "slaba-rana-dlouha-3-vystrelit",
            text: "Pokusím se ji vystřelit dalším nábojem.",
            correct: false,
            fatal: true,
            explanation: "Výstřel do hlavně s uvízlou střelou hrozí vydutím nebo roztržením hlavně a zraněním osob.",
            sources: [mv(780), nv("§ 19 odst. 2")],
          },
          {
            id: "slaba-rana-dlouha-3-pokracovat",
            text: "Zbraň složím a pokračuji ve střelbě – střela se uvolní sama.",
            correct: false,
            fatal: true,
            explanation: "Se střelou v hlavni se střílet nesmí – hrozí vydutí nebo roztržení hlavně. U zkoušky se odstranění uvízlé střely jen slovně popíše.",
            sources: [p2("3.2 písm. b) odst. 1"), mv(780), nv("§ 19 odst. 2")],
          },
        ],
      },
    ],
    summary: "Slabá rána: kontrola zbraně → kontrola průchodnosti vývrtu (zpravidla po rozebrání; rána jistoty je přípustná) → uvízlou střelu jen slovně popsat.",
    sources: [p2("3.2 písm. b)"), mv(588, 589, 591)],
  },
  {
    id: "zadrzka-dlouha",
    kind: "zadrzka",
    weapon: "samonabijeci-dlouha",
    title: "Zádržka",
    situation: "Při střelbě ze samonabíjecí dlouhé kulové zbraně dojde k zádržce – zbraň přestane fungovat.",
    steps: [
      {
        id: "zadrzka-dlouha-1",
        prompt: "Jak zpravidla začnete?",
        options: [
          {
            id: "zadrzka-dlouha-1-vratit",
            text: "Vyjmu zásobník a hned ho zasunu zpět – se školními náboji to k odstranění závady stačí.",
            correct: false,
            explanation: "Druh střeliva na postupu nic nemění. Závada se řeší podle jejího konkrétního charakteru, který musíte nejdřív zjistit.",
            sources: [p2("3.2 písm. c) odst. 1"), mv(592)],
          },
          {
            id: "zadrzka-dlouha-1-zjistit",
            text: "Vyjmu zásobník, zbraň zvenku zrakem prohlédnu a zjistím, o jakou závadu jde.",
            correct: true,
            explanation: "Zpravidla se nejprve vyjme zásobník (je-li odnímatelný), provede se vnější vizuální kontrola zbraně a zjistí se druh závady.",
            sources: [p2("3.2 písm. c) odst. 1"), mv(592)],
          },
          {
            id: "zadrzka-dlouha-1-selhac",
            text: "Vyčkám 10 sekund a zkontroluji otisk zápalníku na zápalce.",
            correct: false,
            explanation: "To je postup u selhače. U zádržky se nejdřív zjišťuje druh závady.",
            sources: [p2("3.2 písm. a)"), p2("3.2 písm. c) odst. 1"), mv(592, 593)],
          },
        ],
      },
      {
        id: "zadrzka-dlouha-2",
        prompt: "Zjistili jste vzpříčenou nábojnici. Jak závadu odstraníte?",
        options: [
          {
            id: "zadrzka-dlouha-2-vytirak",
            text: "Nejdřív zkontroluji průchodnost hlavně vytěrákem zasunutým do ústí.",
            correct: false,
            explanation: "Kontrola průchodnosti vývrtu patří k postupu po slabé ráně. U zádržky se odstraňuje vzpříčený nebo zaseklý náboj či nábojnice.",
            sources: [p2("3.2 písm. c) odst. 2"), mv(588, 593)],
          },
          {
            id: "zadrzka-dlouha-2-zasobnik",
            text: "Vyměním zásobník za jiný s lepšími kluznými vlastnostmi.",
            correct: false,
            explanation: "Takový postup předpis neuvádí. Odstraňuje se příčina – vzpříčená nábojnice; nejčastěji stačí opakované stažení a vypuštění závěru.",
            sources: [mv(593)],
          },
          {
            id: "zadrzka-dlouha-2-zaver",
            text: "Odstraním vzpříčenou nábojnici – obvykle stačí opakovaně stáhnout závěr a vypustit ho vpřed.",
            correct: true,
            explanation: "Následuje odstranění příčiny zádržky. Nejčastěji po vyjmutí zásobníku postačí opakované stažení a vypuštění závěru.",
            sources: [p2("3.2 písm. c) odst. 2"), mv(593)],
          },
        ],
      },
      {
        id: "zadrzka-dlouha-3",
        prompt: "Závada je odstraněná. Co dál?",
        options: [
          {
            id: "zadrzka-dlouha-3-pokyn",
            text: "Řídím se pokynem komisaře – nařídí pokračování, nebo znovuprovedení střelby.",
            correct: true,
            explanation: "Po odstranění závady komisař nařídí pokračování ve střelbě, nebo její znovuprovedení. Doba odstraňování závady se do časového limitu nepočítá.",
            sources: [nv("§ 23 odst. 1")],
          },
          {
            id: "zadrzka-dlouha-3-dostrilet",
            text: "Hned sám dostřílím zbývající rány – čas mi pořád běží.",
            correct: false,
            explanation: "O pokračování rozhoduje komisař. Doba, po kterou se závada odstraňuje, se do časového limitu nezapočítává.",
            sources: [nv("§ 23 odst. 1"), nv("§ 21 odst. 3")],
          },
          {
            id: "zadrzka-dlouha-3-jina",
            text: "Požádám o jinou zbraň – s touto už střílet nesmím.",
            correct: false,
            explanation: "Jinou zbraň zajistí komisař jen tehdy, když se závadu nepodaří odstranit.",
            sources: [nv("§ 23 odst. 1")],
          },
        ],
      },
    ],
    summary: "Zádržka: vyjmout zásobník, vnější vizuální kontrola a zjištění druhu závady → odstranit příčinu → pokračovat podle pokynu komisaře.",
    sources: [p2("3.2 písm. c)"), nv("§ 23 odst. 1"), mv(592, 593)],
  },
  {
    id: "zadrzka-zasobnik-pistole",
    kind: "zadrzka",
    weapon: "pistole",
    title: "Zádržka: zásobník nejde vysunout",
    situation: "Při zádržce se snažíte vyjmout zásobník z pistole, ale nejde vysunout – náboj je vzpříčený ve vývodkách zásobníku.",
    steps: [
      {
        id: "zadrzka-zasobnik-pistole-1",
        prompt: "Jak budete postupovat?",
        options: [
          {
            id: "zadrzka-zasobnik-pistole-1-rana",
            text: "Stisknu spoušť a provedu ránu jistoty, aby se mechanismus uvolnil.",
            correct: false,
            fatal: true,
            explanation: "Ránu jistoty lze provést jen u zkontrolované nenabité zbraně. Tahle zbraň zkontrolovaná není – prst na spoušti tu je porušením zásad.",
            sources: [p2("1.4"), p2("2.2 písm. a) odst. 3"), mv(569), nv("§ 19 odst. 2")],
          },
          {
            id: "zadrzka-zasobnik-pistole-1-okenko",
            text: "Pokud to jde, zachytím závěr v zadní poloze a příčinu zádržky odstraním přes výhozné okénko.",
            correct: true,
            explanation: "Nelze-li vysunout zásobník, je třeba pokud možno zachytit závěr v zadní poloze a příčinu zádržky odstranit přes výhozné okénko.",
            sources: [p2("3.2 písm. c) odst. 3"), mv(594)],
          },
          {
            id: "zadrzka-zasobnik-pistole-1-schranka",
            text: "Místo zásobníku použiji jiný zásobovací mechanismus zbraně, např. pevnou nábojovou schránku.",
            correct: false,
            explanation: "Takový postup předpis neuvádí. Správně se zachytí závěr v zadní poloze a příčina se odstraní přes výhozné okénko.",
            sources: [p2("3.2 písm. c) odst. 3"), mv(594)],
          },
        ],
      },
      {
        id: "zadrzka-zasobnik-pistole-2",
        prompt: "Abyste do výhozného okénka lépe viděli, potřebujete zbraň natočit. Co je správně?",
        options: [
          {
            id: "zadrzka-zasobnik-pistole-2-k-sobe",
            text: "Na chvíli ji natočím ústím k sobě – jinak do okénka nevidím.",
            correct: false,
            fatal: true,
            explanation: "Nezkontrolovaná zbraň musí stále směřovat do bezpečného směru. Ústí k sobě znamená ohrožení osob.",
            sources: [p2("1.1 odst. 2 a 3"), p2("2.1 odst. 1"), mv(563, 564), nv("§ 19 odst. 2")],
          },
          {
            id: "zadrzka-zasobnik-pistole-2-prst",
            text: "Ukazováček si opřu o spoušť, ať zbraň držím pevněji.",
            correct: false,
            fatal: true,
            explanation: "Prst na spoušti nebo v prostoru lučíku je porušením zásad – výjimkou je jen záměrný výstřel nebo manipulace se zkontrolovanou nenabitou zbraní.",
            sources: [p2("1.4"), mv(569, 790), nv("§ 19 odst. 2")],
          },
          {
            id: "zadrzka-zasobnik-pistole-2-smer",
            text: "Natočím ji jen tak, aby ústí stále mířilo do bezpečného směru, a prst držím mimo lučík.",
            correct: true,
            explanation: "Zbraň, která není uvedena do bezpečného stavu, musí vždy směřovat do bezpečného směru – a prst patří mimo lučík.",
            sources: [p2("2.1 odst. 1"), p2("1.4"), mv(563, 569)],
          },
        ],
      },
    ],
    summary: "Zásobník nejde vysunout: zachytit závěr v zadní poloze, příčinu odstranit přes výhozné okénko – stále v bezpečném směru a s prstem mimo lučík.",
    sources: [p2("3.2 písm. c) odst. 3"), p2("1.1"), p2("1.4"), mv(594)],
  },
  {
    id: "preruseni-opakovaci",
    kind: "preruseni",
    weapon: "opakovaci-dlouha",
    title: "Přerušení střelby",
    situation: "Střílíte z opakovací dlouhé kulové zbraně, když do prostoru ohroženého střelbou vstoupí osoba.",
    steps: [
      {
        id: "preruseni-opakovaci-1",
        prompt: "Jak zareagujete?",
        options: [
          {
            id: "preruseni-opakovaci-1-dostrilet",
            text: "Rychle dostřílím zbývající náboje, než osoba dojde blíž.",
            correct: false,
            fatal: true,
            explanation: "Vstup osoby do prostoru ohroženého střelbou je typický důvod k přerušení střelby. Pokračovat ve střelbě by osobu přímo ohrozilo.",
            sources: [p2("1.5"), mv(570), nv("§ 19 odst. 2")],
          },
          {
            id: "preruseni-opakovaci-1-prerusit",
            text: "Přeruším střelbu a zbraň směruji do prostoru, kde by náhodný výstřel nezpůsobil škody.",
            correct: true,
            explanation: "Střelba se přeruší s ohledem na konkrétní situaci a zbraň musí směřovat do prostoru, kde by náhodný výstřel nezpůsobil škody.",
            sources: [p2("1.5"), mv(570)],
          },
          {
            id: "preruseni-opakovaci-1-otocit",
            text: "Otočím se se zbraní k osobě, abych ji upozornil.",
            correct: false,
            fatal: true,
            explanation: "Mířit na osoby se nesmí – ani se zbraní vybitou nebo zkontrolovanou, natož s nabitou.",
            sources: [p2("2.1 odst. 1"), mv(573, 789), nv("§ 19 odst. 2")],
          },
        ],
      },
      {
        id: "preruseni-opakovaci-2",
        prompt: "Přerušení potrvá déle. Co můžete se zbraní udělat?",
        options: [
          {
            id: "preruseni-opakovaci-2-mirena",
            text: "Vždy provedu mířenou ránu jistoty do bezpečného směru.",
            correct: false,
            explanation: "Mířená rána jistoty se dělá jen tehdy, když ji určí komisař. Při přerušení se zpravidla provede kontrola zbraně nebo se zbraň zajistí pojistkou.",
            sources: [p2("1.2 odst. 2"), p2("1.5"), mv(570)],
          },
          {
            id: "preruseni-opakovaci-2-kontrola",
            text: "Podle situace provedu kontrolu zbraně, nebo ji zajistím vnější manuální pojistkou, pokud to konstrukce umožňuje.",
            correct: true,
            explanation: "Při přerušení střelby lze zejména provést kontrolu zbraně nebo ji zajistit vnější manuální pojistkou, pokud ji zbraň má.",
            sources: [p2("1.5")],
          },
          {
            id: "preruseni-opakovaci-2-odlozit",
            text: "Zbraň nabitou odložím se zavřeným závěrem.",
            correct: false,
            explanation: "Opakovací zbraň se odkládá zkontrolovaná a se závěrem v otevřené poloze.",
            sources: [p2("2.2 písm. d) odst. 2"), mv(585)],
          },
        ],
      },
      {
        id: "preruseni-opakovaci-3",
        prompt: "Osoba odešla a komisař vás vyzve k nabití. Na co dbáte, dokud nezazní pokyn ke střelbě?",
        options: [
          {
            id: "preruseni-opakovaci-3-ovladace",
            text: "Prst držím mimo všechny ovládací prvky a nedotýkám se zařízení střelnice.",
            correct: false,
            explanation: "Takové pravidlo předpis nestanoví. Rozhodující je prst mimo lučík a zbraň stále v bezpečném směru.",
            sources: [p2("1.3 odst. 2"), mv(568)],
          },
          {
            id: "preruseni-opakovaci-3-pripraven",
            text: "Prst mám na spoušti, abych byl připravený.",
            correct: false,
            fatal: true,
            explanation: "Dokud není vydán pokyn ke střelbě, musí být prst mimo lučík. Prst na spoušti bez důvodu je porušením zásad.",
            sources: [p2("1.3 odst. 2"), p2("1.4"), mv(568, 569), nv("§ 19 odst. 2")],
          },
          {
            id: "preruseni-opakovaci-3-lucik",
            text: "Prst mám mimo lučík a zbraň neustále směřuje do bezpečného směru.",
            correct: true,
            explanation: "Není-li vydán pokyn ke střelbě, musí být prst mimo lučík a zbraň neustále směřuje do bezpečného směru.",
            sources: [p2("1.3 odst. 2"), mv(568)],
          },
        ],
      },
    ],
    summary: "Přerušení střelby: přestat střílet, zbraň do prostoru bez rizika škod → kontrola zbraně nebo pojistka → před pokynem ke střelbě prst mimo lučík.",
    sources: [p2("1.5"), p2("1.3 odst. 2"), mv(568, 570)],
  },
];

// --- Režim „Co je špatně?“: které jednání znamená „neprospěl“ ---

const VERDICT_ENDANGER =
  "Porušení zásad, které ohrozí nebo by v praxi ohrozilo bezpečnost osob, hodnotí komisař stupněm „neprospěl“ a zkoušku ukončí (§ 19 odst. 2 písm. b) a odst. 3).";

export const VIOLATION_SCENARIOS: ViolationScenario[] = [
  {
    id: "chyba-poradi-pistole",
    weapon: "pistole",
    title: "Kontrola pistole",
    situation: "Žadatel předvádí kontrolu samonabíjecí pistole.",
    actions: [
      {
        id: "chyba-poradi-pistole-smer",
        text: "Pistoli převezme a hned ji nasměruje do bezpečného směru, který určil komisař.",
        violation: false,
        explanation: "Nezkontrolovaná zbraň musí při manipulaci směřovat do bezpečného směru.",
        sources: [nv("§ 18 odst. 1"), p2("1.1 odst. 2"), mv(563)],
      },
      {
        id: "chyba-poradi-pistole-poradi",
        text: "Nejdřív stáhne závěr do zadní polohy a teprve potom vyjme zásobník.",
        violation: true,
        explanation: "Chyba v pořadí. Kontrola pistole začíná vyjmutím zásobníku, teprve potom se stahuje závěr. Se zásobníkem ve zbrani může závěr dopravit do komory další náboj.",
        sources: [p2("2.2 písm. a) odst. 1"), mv(576)],
      },
      {
        id: "chyba-poradi-pistole-zaver",
        text: "Po kontrole nechá závěr zachycený v zadní poloze.",
        violation: false,
        explanation: "Umožňuje-li to konstrukce, závěr může zůstat v zadní poloze.",
        sources: [p2("2.2 písm. a) odst. 3"), mv(578)],
      },
      {
        id: "chyba-poradi-pistole-naboje",
        text: "Náboje z vyjmutého zásobníku nevybíjí.",
        violation: false,
        explanation: "Vybití nábojů z vyjmutého zásobníku není povinnou součástí zkoušky.",
        sources: [p2("2.1 odst. 6"), mv(575)],
      },
    ],
    verdict: "Kdo v dostatečném rozsahu nepředvede zvládnutí postupů bezpečného nakládání se zbraní, je hodnocen stupněm „neprospěl“ (§ 19 odst. 2 písm. a).",
    sources: [nv("§ 19 odst. 2 písm. a)"), p2("2.2 písm. a)"), mv(576)],
  },
  {
    id: "chyba-prst-pistole",
    weapon: "pistole",
    title: "Prst a spoušť",
    situation: "Žadatel kontroluje samonabíjecí pistoli a uvádí ji do bezpečného stavu.",
    actions: [
      {
        id: "chyba-prst-pistole-pohmat",
        text: "Zásobníkovou šachtu zkontroluje pohmatem prsty ruky, která nedrží zbraň.",
        violation: false,
        explanation: "Šachtu lze zkontrolovat pohledem přes výhozné okénko nebo pohmatem volnou rukou.",
        sources: [p2("2.2 písm. a) odst. 2"), mv(577)],
      },
      {
        id: "chyba-prst-pistole-lucik",
        text: "Při stahování závěru má ukazováček v lučíku, aby zbraň lépe držel.",
        violation: true,
        explanation: "Prst na spoušti nebo v prostoru lučíku je porušením zásad. Výjimkou je jen záměrný výstřel, manipulace se zkontrolovanou nenabitou zbraní (např. rána jistoty) nebo úkon předepsaný výrobcem.",
        sources: [p2("1.4"), mv(569, 790)],
      },
      {
        id: "chyba-prst-pistole-rana",
        text: "Po kontrole vypustí závěr vpřed a s prstem na spoušti provede do bezpečného směru ránu jistoty.",
        violation: false,
        explanation: "U zkontrolované nenabité zbraně je stisk spouště pro ránu jistoty výslovnou výjimkou.",
        sources: [p2("1.4"), p2("2.2 písm. a) odst. 3"), p2("1.2 odst. 1"), mv(569, 578)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("1.4"), mv(569)],
  },
  {
    id: "chyba-smer-revolver",
    weapon: "revolver",
    title: "Bezpečný směr",
    situation: "Žadatel dostane od komisaře revolver ke kontrole.",
    actions: [
      {
        id: "chyba-smer-revolver-ukazat",
        text: "Než vyklopí válec, otočí se s revolverem k ostatním žadatelům, aby jim ho ukázal.",
        violation: true,
        explanation: "Revolver ještě není zkontrolovaný, a přesto opustí bezpečný směr a míří na lidi. Nezkontrolovaná zbraň musí při manipulaci vždy směřovat do bezpečného směru.",
        sources: [p2("1.1 odst. 2 a 3"), p2("2.1 odst. 1"), mv(563, 564)],
      },
      {
        id: "chyba-smer-revolver-komory",
        text: "Vyklopí válec a zrakem zkontroluje všechny nábojové komory.",
        violation: false,
        explanation: "Přesně tak vypadá kontrola revolveru.",
        sources: [p2("2.2 písm. b) odst. 1"), mv(579)],
      },
      {
        id: "chyba-smer-revolver-odlozeni",
        text: "Zkontrolovaný revolver odloží s vyklopeným válcem.",
        violation: false,
        explanation: "Revolver se odkládá s vyklopeným válcem.",
        sources: [p2("2.2 písm. b) odst. 2"), mv(580)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("1.1"), mv(563, 564)],
  },
  {
    id: "chyba-mireni-dlouha",
    weapon: "samonabijeci-dlouha",
    title: "Míření na osoby",
    situation: "Žadatel kontroluje samonabíjecí dlouhou kulovou zbraň.",
    actions: [
      {
        id: "chyba-mireni-dlouha-opakovane",
        text: "Komoru přes výhozné okénko nevidí, proto opakovaně stáhne závěr vzad a vypustí ho vpřed.",
        violation: false,
        explanation: "Neumožňuje-li konstrukce vizuální kontrolu komory, provede se opakované stažení a vypuštění závěru.",
        sources: [p2("2.2 písm. c) odst. 1"), mv(581)],
      },
      {
        id: "chyba-mireni-dlouha-prvky",
        text: "Dodatečné bezpečnostní prvky zbraně k uvedení do bezpečného stavu nepoužije.",
        violation: false,
        explanation: "Jejich použití není povinnou součástí zkoušky.",
        sources: [p2("2.1 odst. 3"), mv(574)],
      },
      {
        id: "chyba-mireni-dlouha-kolega",
        text: "Zkontrolovanou zbraň v žertu namíří na kolegu – vždyť je vybitá.",
        violation: true,
        explanation: "Mířit na osoby není přípustné ani se zbraní vybitou, zkontrolovanou nebo nekompletní. Úmyslné míření na osoby je porušením zásad.",
        sources: [p2("2.1 odst. 1"), mv(573, 784, 789)],
      },
      {
        id: "chyba-mireni-dlouha-rana",
        text: "Po kontrole vypustí závěr vpřed a do bezpečného směru provede ránu jistoty.",
        violation: false,
        explanation: "V přední poloze závěru se provede rána jistoty do bezpečného směru.",
        sources: [p2("2.2 písm. c) odst. 3"), mv(583)],
      },
    ],
    verdict: "Úmyslné míření na osoby je porušením zásad bezpečného nakládání se zbraní. Komisař hodnotí „neprospěl“, pokud žadatel zásady poruší tak, že ohrozí nebo by v praxi ohrozil bezpečnost osob, nebo je poruší hrubě či opakovaně (§ 19 odst. 2 písm. b) a c).",
    sources: [nv("§ 19 odst. 2 a 3"), p2("2.1 odst. 1"), mv(573)],
  },
  {
    id: "chyba-rana-opakovaci",
    weapon: "opakovaci-dlouha",
    title: "Rána jistoty",
    situation: "Žadatel uvádí opakovací dlouhou kulovou zbraň do bezpečného stavu.",
    actions: [
      {
        id: "chyba-rana-opakovaci-kontrola",
        text: "Vyjme zásobník, otevře závěr a zrakem zkontroluje komoru i zásobníkovou šachtu.",
        violation: false,
        explanation: "Přesně podle postupu pro opakovací zbraň.",
        sources: [p2("2.2 písm. d) odst. 1"), mv(584)],
      },
      {
        id: "chyba-rana-opakovaci-podlaha",
        text: "Před uzamčením závěru skloní zbraň k podlaze vedle sebe, mimo určený bezpečný směr, a provede ránu jistoty.",
        violation: true,
        explanation: "Rána jistoty se provádí vždy tak, aby zbraň směřovala do bezpečného směru – ne kamkoli „k zemi“.",
        sources: [p2("1.2 odst. 1"), mv(566)],
      },
      {
        id: "chyba-rana-opakovaci-odlozeni",
        text: "Zbraň odloží se závěrem v otevřené poloze.",
        violation: false,
        explanation: "Opakovací zbraň se odkládá s otevřeným závěrem.",
        sources: [p2("2.2 písm. d) odst. 2"), mv(585)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("1.2 odst. 1"), mv(566)],
  },
  {
    id: "chyba-selhac-revolver",
    weapon: "revolver",
    title: "Selhač",
    situation: "Při střelbě z revolveru dojde k selhači.",
    actions: [
      {
        id: "chyba-selhac-revolver-3s",
        text: "Zbraň drží v bezpečném směru, ale už po 3 sekundách vyklopí válec.",
        violation: true,
        explanation: "Po selhači je nutné vyčkat minimálně 10 sekund se zbraní v bezpečném směru – náboj se může iniciovat se zpožděním.",
        sources: [p2("3.2 písm. a) odst. 1"), mv(586)],
      },
      {
        id: "chyba-selhac-revolver-otisk",
        text: "Po vyčkání provede kontrolu zbraně a prohlédne otisk zápalníku na zápalce.",
        violation: false,
        explanation: "Tak postup u selhače pokračuje.",
        sources: [p2("3.2 písm. a) odst. 2"), mv(587)],
      },
      {
        id: "chyba-selhac-revolver-dele",
        text: "Komisař ho upozorní, že výrobce střeliva předepisuje delší čekání, a žadatel proto čeká déle než 10 sekund.",
        violation: false,
        explanation: "Výrobce může předepsat delší dobu a komisař vás s ní seznámí.",
        sources: [p2("3.2 písm. a) odst. 1"), mv(586)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("3.2 písm. a)"), mv(586)],
  },
  {
    id: "chyba-slaba-dlouha",
    weapon: "samonabijeci-dlouha",
    title: "Slabá rána",
    situation: "Při střelbě ze samonabíjecí dlouhé kulové zbraně dojde ke slabé ráně.",
    actions: [
      {
        id: "chyba-slaba-dlouha-ceka",
        text: "Před dalším postupem vyčká 10 sekund se zbraní v bezpečném směru.",
        violation: false,
        explanation: "Vyčkání po slabé ráně je možné, i když se nevyžaduje.",
        sources: [p2("3.2 písm. b) odst. 2"), mv(591)],
      },
      {
        id: "chyba-slaba-dlouha-vystrel",
        text: "Ihned vystřelí další ránu, aby zjistil, zda zbraň funguje.",
        violation: true,
        explanation: "Po slabé ráně může být v hlavni uvízlá střela. Další výstřel hrozí vydutím nebo roztržením hlavně. Postup je kontrola zbraně a kontrola průchodnosti vývrtu.",
        sources: [p2("3.2 písm. b) odst. 1"), mv(588, 780)],
      },
      {
        id: "chyba-slaba-dlouha-rana",
        text: "Po kontrole zbraně provede do bezpečného směru ránu jistoty, aby ji mohl rozebrat.",
        violation: false,
        explanation: "Rána jistoty po kontrole zbraně se slabou ranou porušením zásad není.",
        sources: [p2("3.2 písm. b) odst. 1"), mv(589)],
      },
      {
        id: "chyba-slaba-dlouha-popis",
        text: "Uvízlou střelu z hlavně neodstraňuje, jen slovně popíše správný postup.",
        violation: false,
        explanation: "Přesně to předpis u zkoušky požaduje.",
        sources: [p2("3.2 písm. b) odst. 1"), mv(588)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("3.2 písm. b)"), mv(588, 780)],
  },
  {
    id: "chyba-nabiti-opakovaci",
    weapon: "opakovaci-dlouha",
    title: "Pokyn ke střelbě",
    situation: "Žadatel nabil opakovací dlouhou kulovou zbraň a čeká na pokyn ke střelbě.",
    actions: [
      {
        id: "chyba-nabiti-opakovaci-ceka",
        text: "Nabitou zbraň drží ústím v bezpečném směru a prst má mimo lučík.",
        violation: false,
        explanation: "Dokud není vydán pokyn ke střelbě, prst je mimo lučík a zbraň míří do bezpečného směru.",
        sources: [p2("1.3 odst. 2"), mv(568)],
      },
      {
        id: "chyba-nabiti-opakovaci-spoust",
        text: "Ještě před pokynem ke střelbě položí prst na spoušť, aby byl připravený.",
        violation: true,
        explanation: "Není-li vydán pokyn ke střelbě, musí být prst mimo lučík. Prst na spoušti bez důvodu je porušením zásad.",
        sources: [p2("1.3 odst. 2"), p2("1.4"), mv(568, 569, 790)],
      },
      {
        id: "chyba-nabiti-opakovaci-pojistka",
        text: "Když komisař střelbu přeruší, zajistí zbraň vnější manuální pojistkou.",
        violation: false,
        explanation: "Při přerušení střelby lze zbraň zajistit vnější manuální pojistkou, pokud ji má.",
        sources: [p2("1.5"), mv(570)],
      },
    ],
    verdict: VERDICT_ENDANGER,
    sources: [nv("§ 19 odst. 2 a 3"), p2("1.3 odst. 2"), mv(568)],
  },
];

// --- XP ---

/**
 * Body za trenažér. XP se připisují přes existující recordActivity (src/lib/progress.ts),
 * takže se počítá i série dní a odznaky. Hodnoty navazují na XP z gamifikace.
 */
export const TRAINER_XP = {
  orderPerfect: XP.lessonRead, // celý postup napoprvé bez chyby
  orderDone: XP.cardKnown,
  faultPerfect: XP.lessonRead, // všechny kroky závady napoprvé správně
  faultDone: XP.cardKnown,
  violationCorrect: XP.correctAnswer,
  violationWrong: XP.wrongAnswer,
} as const;

// --- Vyhodnocení (sdílí klient i server) ---

export const procedureById = new Map(PROCEDURES.map((p) => [p.id, p]));
export const faultById = new Map(FAULT_SCENARIOS.map((s) => [s.id, s]));
export const violationById = new Map(VIOLATION_SCENARIOS.map((s) => [s.id, s]));

export type OrderGrade = {
  valid: boolean;
  positions: { stepId: string; expectedId: string; correct: boolean }[];
  correctCount: number;
  total: number;
  perfect: boolean;
};

/** Porovná pořadí kroků s předpisem. Neplatné je pořadí, které není permutací kroků postupu. */
export function gradeOrder(procedure: Procedure, orderedIds: string[]): OrderGrade {
  const expected = procedure.steps.map((s) => s.id);
  const valid =
    orderedIds.length === expected.length &&
    new Set(orderedIds).size === orderedIds.length &&
    orderedIds.every((id) => expected.includes(id));
  const positions = valid
    ? orderedIds.map((stepId, i) => ({ stepId, expectedId: expected[i], correct: stepId === expected[i] }))
    : [];
  const correctCount = positions.filter((p) => p.correct).length;
  return { valid, positions, correctCount, total: expected.length, perfect: valid && correctCount === expected.length };
}

export function orderXp(grade: OrderGrade) {
  if (!grade.valid) return 0;
  return grade.perfect ? TRAINER_XP.orderPerfect : TRAINER_XP.orderDone;
}

/** Vyhodnotí první volby v jednotlivých krocích závady. */
export function gradeFault(scenario: FaultScenario, firstChoices: string[]) {
  const valid =
    firstChoices.length === scenario.steps.length &&
    scenario.steps.every((step, i) => step.options.some((o) => o.id === firstChoices[i]));
  const correctSteps = valid
    ? scenario.steps.filter((step, i) => step.options.find((o) => o.id === firstChoices[i])?.correct).length
    : 0;
  const perfect = valid && correctSteps === scenario.steps.length;
  return { valid, correctSteps, total: scenario.steps.length, perfect };
}

export function faultXp(grade: ReturnType<typeof gradeFault>) {
  if (!grade.valid) return 0;
  return grade.perfect ? TRAINER_XP.faultPerfect : TRAINER_XP.faultDone;
}

export function gradeViolation(scenario: ViolationScenario, actionId: string) {
  const action = scenario.actions.find((a) => a.id === actionId);
  return { valid: !!action, correct: !!action?.violation };
}

export function violationXp(grade: ReturnType<typeof gradeViolation>) {
  if (!grade.valid) return 0;
  return grade.correct ? TRAINER_XP.violationCorrect : TRAINER_XP.violationWrong;
}

// --- Data pro klienta podle přístupu ---

export type LockedItem = { locked: true; free: false; id: string; weapon: WeaponId; title: string };
export type Unlocked<T> = T & { locked: false; free: boolean };
export type MaybeLocked<T> = Unlocked<T> | LockedItem;

function gate<T extends { id: string; weapon: WeaponId; title: string }>(item: T, paid: boolean): MaybeLocked<T> {
  const free = isFreeItem(item);
  if (paid || free) return { ...item, locked: false, free };
  return { locked: true, free: false, id: item.id, weapon: item.weapon, title: item.title };
}

/** Obsah trenažéru pro klienta: zamčené položky nesou jen název a zbraň, ne kroky ani odpovědi. */
export function trainerView(paid: boolean) {
  return {
    weapons: WEAPONS,
    procedures: PROCEDURES.map((p) => gate(p, paid)),
    faults: FAULT_SCENARIOS.map((s) => gate(s, paid)),
    violations: VIOLATION_SCENARIOS.map((s) => gate(s, paid)),
  };
}

export type TrainerView = ReturnType<typeof trainerView>;
