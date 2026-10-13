import type { Question, TopicContent } from "../types";
import research from "./research-questions.json";
import { content as zaklady } from "./zaklady";
import { content as kategorie } from "./kategorie";
import { content as opravneni } from "./opravneni";
import { content as zkouska } from "./zkouska";
import { content as nakladani } from "./nakladani";
import { content as strelnice } from "./strelnice";
import { content as nauka } from "./nauka";
import { content as bezpecnaManipulace } from "./bezpecna-manipulace";
import { content as trestniPravo } from "./trestni-pravo";
import { content as zdravoveda } from "./zdravoveda";

const ALL: TopicContent[] = [
  zaklady, kategorie, opravneni, zkouska, nakladani, strelnice, nauka, bezpecnaManipulace, trestniPravo, zdravoveda,
];

export const LESSONS = ALL.flatMap((c) => c.lessons);
export const GLOSSARY = ALL.flatMap((c) => c.glossary);
export const FLASHCARDS = ALL.flatMap((c) => c.flashcards);
/** Otázky z rešerše (docs/research/sample-questions.json) + otázky jednotlivých okruhů. */
export const QUESTIONS: Question[] = [...(research as Question[]), ...ALL.flatMap((c) => c.questions)];
