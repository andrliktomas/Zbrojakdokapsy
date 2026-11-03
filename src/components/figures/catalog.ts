// Katalog vlastních schematických obrázků (bez Reactu, aby ho mohly importovat i testy obsahu).
// Kresby jsou vlastní, vznikly nezávisle na obrázcích ze souboru otázek MV.
// Souřadnice `at` (bod na součásti) a `pos` (střed číselné značky) jsou v jednotkách viewBoxu kresby.
// Názvy součástí odpovídají výkladu v src/content/data/nauka.ts.

export type FigurePart = {
  /** Strojový klíč součásti – používá se pro `highlight`. */
  key: string;
  /** Číslo odkazové značky v obrázku. */
  n: number;
  /** Název součásti v legendě. */
  label: string;
  /** Krátké doplnění v legendě (příklad, funkce). */
  note?: string;
  /** Bod na součásti, kam míří odkazová čára. */
  at: readonly [number, number];
  /** Střed číselné značky. */
  pos: readonly [number, number];
};

export type FigureMeta = {
  /** Název obrázku – použije se i pro přístupný popis (aria-label). */
  title: string;
  /** Výchozí popisek pod obrázkem ve výkladu. */
  caption: string;
  width: number;
  height: number;
  parts: readonly FigurePart[];
};

const SHELL_PARTS = (shot: FigurePart): FigurePart[] => [
  { key: "nabojnice", n: 1, label: "Nábojnice", note: "plastová trubka s kovovým dnem", at: [400, 196], pos: [400, 252] },
  { key: "kovani", n: 2, label: "Kování", note: "kovové dno nábojnice, v jeho středu je zápalka", at: [116, 200], pos: [116, 252] },
  { key: "zapalka", n: 3, label: "Zápalka", note: "zažehne prachovou náplň", at: [93, 129], pos: [54, 30] },
  { key: "prach", n: 4, label: "Prachová náplň", at: [177, 112], pos: [177, 30] },
  { key: "ucpavka", n: 5, label: "Ucpávka", note: "odděluje prachovou náplň od střely", at: [238, 112], pos: [250, 30] },
  shot,
];

export const FIGURE_CATALOG = {
  "kulovy-naboj": {
    title: "Kulový náboj v řezu",
    caption: "Kulový náboj s lahvovitou nábojnicí – horní polovina v řezu, dolní polovina zvenku.",
    width: 600,
    height: 240,
    parts: [
      { key: "strela", n: 1, label: "Střela (projektil)", note: "jediná část, která opouští hlaveň", at: [478, 104], pos: [478, 32] },
      { key: "krcek", n: 2, label: "Krček nábojnice", note: "zúžení, které drží střelu", at: [381, 144], pos: [381, 208] },
      { key: "nabojnice", n: 3, label: "Nábojnice", note: "lahvovitá – za střelou se zužuje do krčku", at: [220, 150], pos: [220, 208] },
      { key: "prach", n: 4, label: "Prachová (výmetná) náplň", at: [210, 104], pos: [210, 32] },
      { key: "zapalka", n: 5, label: "Zápalka", note: "středový zápal", at: [63, 110], pos: [63, 32] },
      { key: "drazka", n: 6, label: "Drážka pro vytahovač", at: [63, 157], pos: [63, 208] },
    ],
  },
  "brokovy-naboj": {
    title: "Brokový náboj v řezu",
    caption: "Brokový náboj s hromadnou střelou – horní polovina v řezu, dolní polovina zvenku.",
    width: 600,
    height: 280,
    parts: SHELL_PARTS({ key: "broky", n: 6, label: "Broky", note: "hromadná střela", at: [380, 108], pos: [380, 30] }),
  },
  "brokovy-naboj-brenneke": {
    title: "Brokový náboj s jednotnou střelou v řezu",
    caption: "Brokový náboj s jednotnou střelou typu Brenneke – horní polovina v řezu.",
    width: 600,
    height: 280,
    parts: SHELL_PARTS({ key: "brenneke", n: 6, label: "Jednotná střela Brenneke", note: "žebrovaná olověná střela", at: [404, 110], pos: [404, 30] }),
  },
  "dna-nabojnic": {
    title: "Provedení dna nábojnice",
    caption: "Zadní části tří nábojnic zboku (zvětšeno). Čárkovaně je vyznačen průměr těla nábojnice.",
    width: 600,
    height: 288,
    parts: [
      { key: "okraj", n: 1, label: "Nábojnice s okrajem", note: "dno přesahuje průměr těla; např. .22 LR, 7,62×54 R", at: [178, 217], pos: [178, 262] },
      { key: "polookraj", n: 2, label: "Polookraj (semi-rim)", note: "drážka i mírně přesahující okraj; např. 7,65 mm Browning", at: [362, 218], pos: [362, 262] },
      { key: "drazka", n: 3, label: "Nábojnice s drážkou", note: "vybrání pro vytahovač, dno nepřesahuje tělo; např. 9 mm Luger", at: [542, 205], pos: [560, 262] },
    ],
  },
  pistole: {
    title: "Samonabíjecí pistole zprava",
    caption: "Samonabíjecí pistole s úderníkovým bicím mechanismem, pohled zprava.",
    width: 640,
    height: 450,
    parts: [
      { key: "zaver", n: 1, label: "Kluzný pistolový závěr", at: [262, 116], pos: [262, 30] },
      { key: "vyhozne", n: 2, label: "Výhozné okénko", at: [336, 102], pos: [330, 30] },
      { key: "hlaven", n: 3, label: "Hlaveň", note: "ve výhozném okénku je vidět její nábojová komora", at: [384, 99], pos: [404, 30] },
      { key: "muska", n: 4, label: "Muška", at: [555, 72], pos: [540, 30] },
      { key: "usti", n: 5, label: "Ústí hlavně", at: [599, 120], pos: [614, 46] },
      { key: "hledi", n: 6, label: "Hledí", at: [182, 72], pos: [180, 30] },
      { key: "telo", n: 7, label: "Tělo zbraně", note: "hlavní část zbraně", at: [162, 296], pos: [40, 262] },
      { key: "lucik", n: 8, label: "Lučík", note: "kryje spoušť", at: [366, 246], pos: [384, 306] },
      { key: "spoust", n: 9, label: "Spoušť", at: [354, 220], pos: [470, 244] },
      { key: "zasobnik", n: 10, label: "Zásobník", note: "zasunutý v rukojeti, vidět je jeho dno", at: [176, 409], pos: [40, 408] },
    ],
  },
  "pistole-rozlozena": {
    title: "Samonabíjecí pistole rozložená na pět dílů",
    caption: "Základní rozložení samonabíjecí pistole. Hlavními částmi zbraně jsou závěr, hlaveň a tělo.",
    width: 640,
    height: 500,
    parts: [
      { key: "zaver", n: 1, label: "Kluzný pistolový závěr", note: "hlavní část zbraně", at: [238, 66], pos: [150, 66] },
      { key: "hlaven", n: 2, label: "Hlaveň", note: "hlavní část zbraně", at: [530, 172], pos: [604, 172] },
      { key: "ozuby", n: 3, label: "Uzamykací ozuby", note: "na hlavni", at: [423, 155], pos: [470, 124] },
      { key: "kulisa", n: 4, label: "Odemykací kulisa", note: "na hlavni", at: [362, 203], pos: [290, 222] },
      { key: "pruzina", n: 5, label: "Vratná (předsuvná) pružina s vodítkem", at: [548, 250], pos: [604, 250] },
      { key: "telo", n: 6, label: "Tělo zbraně", note: "hlavní část zbraně", at: [120, 400], pos: [40, 350] },
      { key: "zasobnik", n: 7, label: "Zásobník", at: [545, 410], pos: [612, 430] },
    ],
  },
  revolver: {
    title: "Revolver zleva",
    caption: "Revolver s výklopným válcem, pohled zleva.",
    width: 640,
    height: 390,
    parts: [
      { key: "hlaven", n: 1, label: "Hlaveň", at: [160, 138], pos: [160, 40] },
      { key: "valec", n: 2, label: "Revolverový válec", note: "nese nábojové komory; hlavní část zbraně", at: [346, 164], pos: [330, 40] },
      { key: "konzole", n: 3, label: "Výklopná konzole", note: "válec se na ní vyklápí do strany", at: [271, 196], pos: [240, 300] },
      { key: "ram", n: 4, label: "Rám", note: "nosná část; zákon ho řadí k tělu zbraně", at: [404, 114], pos: [426, 40] },
      { key: "kohout", n: 5, label: "Kohout", at: [486, 88], pos: [556, 40] },
      { key: "spoust", n: 6, label: "Spoušť", at: [390, 248], pos: [398, 350] },
      { key: "lucik", n: 7, label: "Lučík", at: [356, 268], pos: [318, 350] },
      { key: "pazbicka", n: 8, label: "Pažbička (rukojeť)", at: [508, 300], pos: [612, 300] },
    ],
  },
  "kozlice-dvojka": {
    title: "Dvouhlavňové brokovnice: kozlice a dvojka",
    caption: "Vlevo zboku, vpravo pohled na ústí hlavní.",
    width: 640,
    height: 320,
    parts: [
      { key: "kozlice", n: 1, label: "Kozlice", note: "hlavně nad sebou", at: [380, 75], pos: [380, 22] },
      { key: "dvojka", n: 2, label: "Dvojka", note: "hlavně vedle sebe", at: [380, 237], pos: [380, 184] },
    ],
  },
  brokovnice: {
    title: "Brokovnice s lůžkovým závěrem",
    caption: "Střední část brokové kozlice zprava. Čárkovaně je naznačen sklopený hlavňový svazek.",
    width: 640,
    height: 320,
    parts: [
      { key: "svazek", n: 1, label: "Sklopný hlavňový svazek", at: [540, 100], pos: [540, 30] },
      { key: "predpazbi", n: 2, label: "Předpažbí", at: [500, 152], pos: [520, 290] },
      { key: "zaver", n: 3, label: "Lůžkový závěr", at: [384, 128], pos: [412, 290] },
      { key: "klicka", n: 4, label: "Temenní klička", note: "odjišťuje a sklápí hlavňový svazek", at: [296, 77], pos: [322, 26] },
      { key: "pojistka", n: 5, label: "Ovladač pojistky", note: "na hřbetě krku pažby", at: [256, 86], pos: [236, 26] },
      { key: "pazba", n: 6, label: "Pažba", at: [150, 160], pos: [120, 290] },
      { key: "spoust", n: 7, label: "Spoušť", at: [340, 174], pos: [336, 290] },
      { key: "lucik", n: 8, label: "Lučík", at: [318, 187], pos: [256, 290] },
    ],
  },
  "kulovnice-stred": {
    title: "Opakovací kulovnice – střední část",
    caption: "Střední část opakovací malorážky s odsuvným závěrem, pohled zprava.",
    width: 640,
    height: 284,
    parts: [
      { key: "hlaven", n: 1, label: "Hlaveň", at: [586, 115], pos: [600, 40] },
      { key: "hledi", n: 2, label: "Hledí", at: [499, 96], pos: [526, 40] },
      { key: "vyhozne", n: 3, label: "Výhozné okénko", at: [365, 117], pos: [372, 40] },
      { key: "pouzdro", n: 4, label: "Pouzdro závěru", at: [420, 118], pos: [446, 40] },
      { key: "zaver", n: 5, label: "Závěr", at: [228, 117], pos: [262, 40] },
      { key: "klika", n: 6, label: "Klika závěru", at: [238, 162], pos: [170, 258] },
      { key: "pojistka", n: 7, label: "Hmatník pojistky", at: [194, 134], pos: [180, 40] },
      { key: "pazba", n: 8, label: "Pažba", at: [140, 165], pos: [100, 258] },
      { key: "spoust", n: 9, label: "Spoušť", at: [305, 182], pos: [330, 258] },
      { key: "lucik", n: 10, label: "Lučík", at: [290, 192], pos: [250, 258] },
      { key: "dno", n: 11, label: "Dno zásobníku", at: [384, 170], pos: [410, 258] },
    ],
  },
} satisfies Record<string, FigureMeta>;

export type FigureId = keyof typeof FIGURE_CATALOG;

/** Seznam všech ID obrázků v registru. */
export const FIGURE_IDS = Object.keys(FIGURE_CATALOG) as FigureId[];

export function isFigureId(id: string): id is FigureId {
  return Object.prototype.hasOwnProperty.call(FIGURE_CATALOG, id);
}

export function figureMeta(id: string): FigureMeta | undefined {
  return isFigureId(id) ? FIGURE_CATALOG[id] : undefined;
}
