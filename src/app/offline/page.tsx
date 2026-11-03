import type { Metadata } from "next";
import { OnlineReload } from "./OnlineReload";

export const metadata: Metadata = {
  title: "Jste offline – Zbroják do kapsy",
  robots: { index: false, follow: false },
};

// Vyrenderuje se při buildu bez cookies a bez přístupu k DB – stránka tak neobsahuje údaje žádného uživatele.
export const dynamic = "force-static";

/**
 * Náhradní stránka, kterou service worker (public/sw.js) ukáže, když síť nefunguje a stránka není v mezipaměti.
 * Odkazy jsou obyčejné <a>, aby šly přes service worker i bez JavaScriptu.
 * Id „zk-offline-page“ používá PwaRegister, aby na této stránce nemazal uložené stránky.
 */
export default function OfflinePage() {
  return (
    <div id="zk-offline-page" className="mx-auto max-w-lg space-y-6 py-4 text-center">
      <TargetMark className="mx-auto h-16 w-16" />
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold">Jste offline</h1>
        <p className="text-stone-600">
          Nepodařilo se spojit se serverem. Zkontrolujte mobilní data nebo Wi-Fi a zkuste to znovu.
        </p>
      </div>

      <div className="card space-y-4 text-left">
        <section>
          <h2 className="font-bold">Co funguje i bez připojení</h2>
          <p className="mt-1 text-sm text-stone-600">
            Přehled, okruhy výkladu a slovníček, které jste na tomto zařízení už dříve otevřeli, se mohou načíst
            z paměti zařízení. Zkuste se k nim vrátit přes <a href="/prehled" className="font-semibold underline">Přehled</a>{" "}
            nebo <a href="/okruhy" className="font-semibold underline">Výklad</a>.
          </p>
        </section>
        <section>
          <h2 className="font-bold">Co potřebuje připojení</h2>
          <p className="mt-1 text-sm text-stone-600">
            Procvičování otázek, kartičky a test nanečisto – odpovědi se vyhodnocují a ukládají na serveru.
            Bez internetu nejde ani přihlášení, platba a ukládání pokroku.
          </p>
        </section>
      </div>

      <div className="space-y-2">
        {/* Prázdné href = znovu načíst aktuální adresu (funguje i bez JavaScriptu). */}
        <a href="" className="btn-primary">Zkusit znovu</a>
        <p className="text-xs text-stone-500">Jakmile se připojení obnoví, stránka se načte sama.</p>
      </div>
      <OnlineReload />
    </div>
  );
}

/** Logo – terč. Grafitové části přebírají barvu textu (currentColor), aby fungovaly ve světlém i tmavém tématu. */
function TargetMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="5" fill="none">
        <circle cx="48" cy="48" r="44" />
        <circle cx="48" cy="48" r="29" />
        <line x1="48" y1="0" x2="48" y2="10" />
        <line x1="48" y1="86" x2="48" y2="96" />
        <line x1="0" y1="48" x2="10" y2="48" />
        <line x1="86" y1="48" x2="96" y2="48" />
      </g>
      <circle cx="48" cy="48" r="14" fill="currentColor" />
      <circle cx="57" cy="40" r="9" fill="#E8590C" stroke="#F3F1EC" strokeWidth="3" />
    </svg>
  );
}
