// Obrázky k obrázkovým otázkám pro klientské komponenty (Practice, MockTest).
//
// Proč kopie: otázky se klientovi posílají přes `toPublic` (src/lib/content-access.ts), které
// pole `figure` zatím nepředává, a celou banku otázek do prohlížeče posílat nechceme
// (obsahuje správné odpovědi). Mapa je proto malý samostatný modul bez odpovědí.
// Zdrojem pravdy jsou pole `figure` u otázek v src/content/data/nauka.ts – test
// src/lib/content.test.ts hlídá, že se mapa s obsahem shoduje.

import type { FigureRef } from "../../content/types";

export const QUESTION_FIGURES: Record<string, FigureRef> = {
  "nauka-x100": { id: "brokovy-naboj" },
  "nauka-x101": { id: "brokovy-naboj", highlight: "zapalka", callouts: "highlight" },
  "nauka-x102": { id: "brokovy-naboj", highlight: "ucpavka", callouts: "highlight" },
  "nauka-x103": { id: "brokovy-naboj-brenneke", callouts: "none" },
  "nauka-x104": { id: "kulovy-naboj" },
  "nauka-x105": { id: "kulovy-naboj", highlight: "strela", callouts: "highlight" },
  "nauka-x106": { id: "kulovy-naboj", callouts: "none" },
  "nauka-x107": { id: "dna-nabojnic" },
  "nauka-x108": { id: "dna-nabojnic", highlight: "drazka", callouts: "highlight" },
  "nauka-x109": { id: "pistole" },
  "nauka-x110": { id: "pistole" },
  "nauka-x111": { id: "pistole" },
  "nauka-x112": { id: "pistole-rozlozena" },
  "nauka-x113": { id: "pistole-rozlozena", highlight: "pruzina", callouts: "highlight" },
  "nauka-x114": { id: "pistole-rozlozena", highlight: "hlaven", callouts: "highlight" },
  "nauka-x115": { id: "revolver" },
  "nauka-x116": { id: "revolver", highlight: "valec", callouts: "highlight" },
  "nauka-x117": { id: "kozlice-dvojka", highlight: "kozlice", callouts: "highlight" },
  "nauka-x118": { id: "brokovnice", highlight: "klicka", callouts: "highlight" },
  "nauka-x119": { id: "brokovnice" },
  "nauka-x120": { id: "kulovnice-stred" },
  "nauka-x121": { id: "kulovnice-stred", highlight: "dno", callouts: "highlight" },
};

/** Obrázek k otázce: přednost má pole `figure` přímo na otázce, jinak mapa výše. */
export function questionFigure(q: { id: string; figure?: FigureRef }): FigureRef | undefined {
  return q.figure ?? QUESTION_FIGURES[q.id];
}
