import { CONFIDENCE_LABEL, MODEL, PERMIT_SHORT, STATUS_LABEL, plural, type Prediction, type ReadinessStatus } from "@/lib/plan";

const TONE: Record<ReadinessStatus, { pill: string; band: string; marker: string }> = {
  "na-dobre-ceste": { pill: "bg-brand-50 text-brand-700 ring-brand-200", band: "bg-brand-200", marker: "bg-brand-600" },
  "na-hrane": { pill: "bg-amber-50 text-amber-800 ring-amber-200", band: "bg-amber-200", marker: "bg-amber-600" },
  "pod-hranici": { pill: "bg-red-50 text-red-700 ring-red-200", band: "bg-red-200", marker: "bg-red-600" },
  "malo-dat": { pill: "bg-stone-100 text-stone-700 ring-stone-200", band: "bg-stone-300", marker: "bg-stone-500" },
};

const oneDecimal = (n: number) => n.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const at = (n: number, total: number) => `${(Math.max(0, Math.min(total, n)) / total) * 100}%`;

/** Pás 0–30: rozpětí pravděpodobného výsledku, odhad (značka) a hranice úspěchu (svislá čára). */
function ScoreScale({ p }: { p: Prediction }) {
  const tone = TONE[p.status];
  return (
    <div className="mt-3" role="img" aria-label={`Odhad ${p.score} z ${p.total} bodů, nejspíš ${p.low} až ${p.high}. Hranice úspěchu ${p.passScore}.`}>
      <div className="relative h-3 rounded-full bg-stone-200">
        <div className={`absolute inset-y-0 rounded-full ${tone.band}`} style={{ left: at(p.low, p.total), width: `calc(${at(p.high, p.total)} - ${at(p.low, p.total)})` }} />
        <div className="absolute -inset-y-1.5 w-0.5 -translate-x-1/2 rounded bg-stone-900" style={{ left: at(p.passScore, p.total) }} />
        <div
          className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white ${tone.marker}`}
          style={{ left: at(p.expected, p.total) }}
        />
      </div>
      <div className="relative mt-1.5 h-4 font-mono text-[11px] text-stone-500">
        <span className="absolute left-0">0</span>
        <span className="absolute -translate-x-1/2 font-semibold text-stone-900" style={{ left: at(p.passScore, p.total) }}>
          {p.passScore}
        </span>
      </div>
    </div>
  );
}

export function PredictionPanel({ prediction: p, permitChosen }: { prediction: Prediction; permitChosen: boolean }) {
  const tone = TONE[p.status];
  const missing = MODEL.minAnswers - p.answers;
  const composition = p.groups.map((g) => g.count).join(" + ");

  return (
    <section aria-labelledby="prediction-heading" className="rounded-xl bg-stone-50 p-4 ring-1 ring-stone-200">
      <h3 id="prediction-heading" className="text-lg font-bold">Odhad výsledku testu</h3>

      {p.status === "malo-dat" ? (
        <>
          <p className="mt-2 text-sm text-stone-700">
            Na odhad je zatím málo dat. Odpovězte ještě aspoň na{" "}
            <span className="font-mono tabular-nums">{missing}</span> {plural(missing, "otázku", "otázky", "otázek")} – ideálně z různých okruhů.
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Hranice pro {PERMIT_SHORT[p.permit]}: <span className="font-mono tabular-nums">{p.passScore}/{p.total}</span>
          </p>
        </>
      ) : (
        <>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Odhad</span>
              <span className="font-mono text-4xl font-semibold leading-none tabular-nums">{p.score}</span>
              <span className="font-mono text-lg text-stone-500 tabular-nums">/{p.total}</span>
            </p>
            <p className="text-right">
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Hranice</span>
              <span className="font-mono text-2xl font-semibold leading-none tabular-nums">{p.passScore}</span>
              <span className="block text-xs text-stone-500">{PERMIT_SHORT[p.permit]}{permitChosen ? "" : " (výchozí)"}</span>
            </p>
          </div>

          <ScoreScale p={p} />

          <p className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ring-1 ${tone.pill}`}>{STATUS_LABEL[p.status]}</span>
            <span className="text-xs text-stone-600">{CONFIDENCE_LABEL[p.confidence]}</span>
          </p>
          <p className="mt-2 text-sm text-stone-700">
            Při dnešních znalostech by test nejspíš dopadl mezi{" "}
            <span className="font-mono tabular-nums">{p.low}</span> a <span className="font-mono tabular-nums">{p.high}</span> body.
            {p.unpracticed.length > 0 ? (
              <> Zatím neprocvičeno: {p.unpracticed.map((g) => g.label).join(", ")}. Tam vycházíme jen z opatrného předpokladu.</>
            ) : (
              p.weakestGroup && <> Nejvíc rezerv máte v části {p.weakestGroup.label}.</>
            )}
          </p>

          <dl className="mt-3 divide-y divide-stone-200 border-y border-stone-200 text-sm">
            {p.groups.map((g) => (
              <div key={g.label} className="flex items-center justify-between gap-3 py-1.5">
                <dt className="text-stone-700">
                  {g.label}
                  {g === p.weakestGroup && <> <span className="ml-1 text-xs font-semibold text-red-700">nejslabší</span></>}
                </dt>
                <dd className="shrink-0 whitespace-nowrap font-mono tabular-nums text-stone-900">
                  {oneDecimal(g.expected)} <span className="text-stone-500">/ {g.count}</span>
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}

      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        Jde o orientační odhad, ne o záruku. Vychází z úspěšnosti vašich odpovědí v jednotlivých okruzích (novější odpovědi mají
        větší váhu), přepočtené na skladbu zkoušky {composition} otázek. Kde máte odpovědí málo, počítáme opatrně s úspěšností
        blízko 50&nbsp;%.
      </p>
    </section>
  );
}
