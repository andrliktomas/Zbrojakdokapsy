import { MV_EXCLUDED, MV_META } from "@/content/mv";

/** Povinné uvedení zdroje – zobrazuje se na každé stránce režimu „Oficiální otázky MV“. */
export function MvAttribution() {
  return (
    <aside aria-labelledby="mv-zdroj" className="rounded-2xl bg-stone-100 p-4 text-sm leading-relaxed text-stone-700 ring-1 ring-stone-200">
      <h2 id="mv-zdroj" className="font-semibold text-stone-900">Zdroj otázek</h2>
      <p className="mt-1">
        {MV_META.publisher}: <cite className="not-italic">{MV_META.title}</cite>, verze {MV_META.version} (platná od 1. 1. 2026),
        zveřejněný se správnými odpověďmi podle {MV_META.legalBasis}. Originál najdete na{" "}
        <a className="font-semibold text-brand-700 underline underline-offset-2" href={MV_META.url} target="_blank" rel="noopener noreferrer">
          mv.gov.cz/zbrojni-opravneni
        </a>
        .
      </p>
      <p className="mt-2">
        Znění otázek a odpovědí přebíráme beze změn. Opravili jsme jen {MV_META.fixes.length} chyb vzniklých strojovým převodem
        z PDF (například chybějící diakritiku nebo mezeru po spojovníku na konci řádku). {MV_EXCLUDED.length} otázek
        s fotografiemi zatím neuvádíme.
      </p>
      <p className="mt-2">
        Zbroják do kapsy není oficiálním materiálem Ministerstva vnitra ani Policie ČR. Testy nanečisto sestavuje aplikace
        náhodně z veřejného souboru otázek; nejde o testy sestavené ministerstvem.
      </p>
    </aside>
  );
}
