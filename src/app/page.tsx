import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { EXAM, TOPICS } from "@/content";
import { PLANS } from "@/lib/plans";
import { XP } from "@/lib/gamification";
import { StreakBadge, XpChip } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Příprava na zkoušku zbrojního oprávnění 2026",
  path: "/",
  description:
    "Příprava na zkoušku odborné způsobilosti podle zákona č. 90/2024 Sb.: výklad 10 okruhů, kartičky, procvičování, trenažér praktické části a test nanečisto 30 otázek / 40 minut.",
});

// Ikony režimů (z návrhu A-Web): Grafit + jeden signální tah.
const MODE_ICONS = {
  vyklad: (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path d="M5 5h13a5 5 0 015 5v13H10a5 5 0 01-5-5z" fill="none" stroke="#15181D" strokeWidth="2.4" />
      <path d="M10 11h8M10 16h6" stroke="#E8590C" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  karticky: (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="4" y="7" width="16" height="17" rx="2" fill="none" stroke="#15181D" strokeWidth="2.4" />
      <path d="M9 4h13a2 2 0 012 2v15" fill="none" stroke="#E8590C" strokeWidth="2.4" />
    </svg>
  ),
  procvicovani: (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="10" fill="none" stroke="#15181D" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="4" fill="#E8590C" />
    </svg>
  ),
  test: (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="15" r="10" fill="none" stroke="#15181D" strokeWidth="2.4" />
      <path d="M14 9v6l4 3" fill="none" stroke="#E8590C" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11 3h6" stroke="#15181D" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
};

// Zkratky skupin otázek ve skladbě testu (pořadí odpovídá EXAM.groups).
const GROUP_LABELS = ["Právo", "Nauka", "Bezpeč.", "Zdraví"];

export default async function Home() {
  if (await getCurrentUser()) redirect("/prehled");

  const minPrice = Math.min(...PLANS.map((p) => p.priceCzk));
  const passGeneral = EXAM.questionCount - EXAM.maxErrors.obecne;
  const passExtended = EXAM.questionCount - EXAM.maxErrors.rozsirene;
  const composition = EXAM.groups.map((g) => g.count).join("·");
  const shortestPlan = PLANS.reduce((a, b) => (a.days <= b.days ? a : b));
  const longestPlan = PLANS.reduce((a, b) => (a.days >= b.days ? a : b));

  // Ukázkové vyhodnocení (ilustrace obrazovky výsledku, ne statistika uživatelů).
  const sampleScores = [EXAM.groups[0].count - 2, EXAM.groups[1].count, EXAM.groups[2].count - 1, EXAM.groups[3].count];
  const sampleTotal = sampleScores.reduce((a, b) => a + b, 0);
  const circumference = 2 * Math.PI * 56;

  const modes = [
    { key: "vyklad", title: "Výklad", text: "Každé téma srozumitelně, s odkazem na paragraf a s chytáky, na které se u zkoušky ptají." },
    { key: "karticky", title: "Kartičky", text: "Lhůty, čísla a pojmy, které se vracejí přesně ve chvíli, kdy je začínáte zapomínat." },
    { key: "procvicovani", title: "Procvičování", text: "Náhodné otázky s okamžitým vysvětlením. Chyby se vám vracejí, dokud je nezvládnete." },
    {
      key: "test",
      title: "Test nanečisto",
      text: `${EXAM.questionCount} otázek na ${EXAM.timeLimitMin} minut a hranice ${passGeneral} nebo ${passExtended} bodů – přesně jako u skutečné zkoušky.`,
    },
  ] as const;

  return (
    <div className="-my-6 sm:-my-10">
      {/* ---------- Hero ---------- */}
      <section className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <span className="chip-outline text-ink">Zákon č. 90/2024 Sb.</span>
            <span className="chip-outline text-ink">Platné od 1. 1. 2026</span>
          </div>
          <h1 className="text-[clamp(2.4rem,7vw,4.25rem)] leading-[1] font-black tracking-[-0.03em] text-balance">
            Zkouška na zbrojní oprávnění. Trefa na první pokus.
          </h1>
          <p className="max-w-[34em] text-lg leading-relaxed text-stone-700 sm:text-[19px]">
            Výklad všech okruhů, kartičky, procvičování chyb a testy nanečisto přesně podle nové zkoušky. V mobilu,
            kdykoli máte pět minut.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/registrace" className="btn-accent min-h-13 px-6 text-[17px]">Vyzkoušet zdarma</Link>
            <Link href="/cenik" className="btn-secondary min-h-13 px-6 text-[17px]">Ceník od {minPrice} Kč</Link>
          </div>
        </div>

        {/* Ukázka obrazovky výsledku testu */}
        <figure className="flex flex-col gap-4 rounded-[10px] bg-ink p-5 text-paper sm:p-7" aria-label="Ukázka vyhodnocení testu nanečisto">
          <div className="flex justify-between gap-3 font-mono text-xs font-semibold tracking-[0.08em] text-ocel-light">
            <span>TEST NANEČISTO · UKÁZKA</span>
            <span>32:14 / {EXAM.timeLimitMin}:00</span>
          </div>
          <div className="flex items-center gap-5">
            <svg width="112" height="112" viewBox="0 0 128 128" className="shrink-0" role="img" aria-label={`Výsledek ${sampleTotal} z ${EXAM.questionCount}`}>
              <circle cx="64" cy="64" r="56" fill="none" stroke="#3A4049" strokeWidth="12" />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#E8590C"
                strokeWidth="12"
                strokeDasharray={`${(sampleTotal / EXAM.questionCount) * circumference} ${circumference}`}
                transform="rotate(-90 64 64)"
              />
              <text x="64" y="74" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="30" fontWeight="900" fill="#F3F1EC">
                {sampleTotal}/{EXAM.questionCount}
              </text>
            </svg>
            <figcaption className="flex flex-col gap-1.5">
              <span className="text-[26px] leading-none font-black">Prospěl</span>
              <span className="text-[15px] leading-snug text-[#C9CED5]">
                Hranice obecného oprávnění je <span className="num">{passGeneral}</span> z{" "}
                <span className="num">{EXAM.questionCount}</span>.
              </span>
            </figcaption>
          </div>
          <dl className="grid grid-cols-4 gap-2 font-mono text-xs">
            {EXAM.groups.map((g, i) => (
              <div key={i} className="flex flex-col gap-1 rounded-md bg-ink-2 p-2.5">
                <dt className="truncate text-ocel-light uppercase">{GROUP_LABELS[i]}</dt>
                <dd className="text-base font-semibold">
                  {sampleScores[i]}/{g.count}
                </dd>
              </div>
            ))}
          </dl>
        </figure>
      </section>

      {/* ---------- Fakta o zkoušce ---------- */}
      <section aria-label="Fakta o zkoušce" className="bleed-band py-7">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
          {[
            { value: `${EXAM.questionCount} / ${EXAM.timeLimitMin}`, label: "otázek / minut – jako u zkoušky" },
            { value: composition, label: "skladba testu podle nařízení" },
            { value: String(TOPICS.length), label: "okruhů s výkladem a kartičkami" },
            { value: `od ${minPrice} Kč`, label: "jednorázově, bez předplatného" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm leading-snug text-ocel sm:text-base">{f.label}</dt>
              <dd className="font-mono text-2xl font-semibold whitespace-nowrap sm:text-[30px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Režimy ---------- */}
      <section id="rezimy" className="flex flex-col gap-7 py-14 sm:py-16">
        <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Čtyři režimy, jeden cíl</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modes.map((m) => (
            <div key={m.key} className="flex flex-col gap-2.5 rounded-lg bg-white p-5 ring-1 ring-line sm:p-6">
              {MODE_ICONS[m.key]}
              <h3 className="text-[19px] font-extrabold">{m.title}</h3>
              <p className="leading-relaxed text-stone-700">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-lg border-2 border-dashed border-line-strong p-5 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex shrink-0 items-center gap-2">
            <XpChip xp={XP.correctAnswer} gain />
            <StreakBadge days={5} />
          </div>
          <p className="leading-relaxed text-stone-700">
            Za každou správnou odpověď <span className="num">+{XP.correctAnswer}&nbsp;XP</span>. Držte sérii dní v
            řadě, postupujte po levelech a sbírejte odznaky – i pět minut denně se počítá.
          </p>
        </div>
      </section>

      {/* ---------- Okruhy ---------- */}
      <section className="flex flex-col gap-6 pb-14 sm:pb-16">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">{TOPICS.length} okruhů podle zkoušky</h2>
          <p className="max-w-2xl text-stone-700">
            Okruhy odpovídají oddílům souboru testových otázek. Ukázkové okruhy můžete projít zdarma hned po registraci.
          </p>
        </div>
        <ol className="grid overflow-hidden rounded-lg bg-white ring-1 ring-line sm:grid-cols-2">
          {TOPICS.map((t, i) => (
            <li key={t.slug} className="flex items-center gap-4 border-b border-line px-5 py-4 sm:[&:nth-last-child(-n+2)]:border-b-0 max-sm:last:border-b-0 sm:odd:border-r">
              <span className="w-7 shrink-0 font-mono text-sm font-semibold text-ocel">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-semibold">{t.title}</span>
              {t.free && <span className="chip-outline ml-auto shrink-0 text-zasah">Zdarma</span>}
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Závěrečná výzva ---------- */}
      <section className="bleed-ink py-12 text-paper sm:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
              Přístup na {shortestPlan.name} až {longestPlan.name}
            </h2>
            <p className="max-w-xl text-[#C9CED5]">
              Jednorázová platba od {minPrice}&nbsp;Kč, bez automatického obnovování. Ukázkové okruhy zdarma.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/registrace" className="btn-accent min-h-13 px-6 text-[17px]">Vyzkoušet zdarma</Link>
            <Link href="/cenik" className="btn min-h-13 border-paper px-6 text-[17px] text-paper hover:bg-paper/10">Ceník</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
