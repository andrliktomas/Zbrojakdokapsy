import { removeMember } from "@/app/actions/groups";
import { pct } from "@/components/ui";
import type { StudentProgress } from "@/lib/groups.server";
import {
  EXAM_SECTIONS,
  INACTIVE_AFTER_DAYS,
  PERMIT_SHORT,
  PERMIT_TYPES,
  accuracyTone,
  activityLabel,
  type BestTest,
  type SectionStat,
  type Tone,
} from "@/lib/groups";
import { ConfirmSubmit } from "./ConfirmSubmit";

const TONE_CLASS: Record<Tone, string> = {
  none: "text-stone-500",
  good: "text-brand-700",
  ok: "text-amber-700",
  weak: "text-red-700",
};

function Accuracy({ stat }: { stat: SectionStat }) {
  const tone = accuracyTone(stat.accuracy, stat.answered);
  return (
    <span className="whitespace-nowrap">
      <span className={`font-mono font-semibold ${TONE_CLASS[tone]}`}>{pct(stat.accuracy)}</span>
      {stat.answered > 0 && <span className="ml-1 font-mono text-xs text-stone-500">({stat.answered})</span>}
      <span className="sr-only">, počet odpovědí {stat.answered}</span>
    </span>
  );
}

function TestResultCell({ test }: { test: BestTest | null }) {
  if (!test) return <span className="text-stone-500">–</span>;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 whitespace-nowrap">
      <span className="font-mono font-semibold">{test.score}/{test.total}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${test.passed ? "bg-brand-100 text-brand-700" : "bg-red-50 text-red-700"}`}
      >
        {test.passed ? "splněno" : "nesplněno"}
      </span>
    </span>
  );
}

function Activity({ s }: { s: StudentProgress }) {
  const inactive = s.inactiveDays === null || s.inactiveDays >= INACTIVE_AFTER_DAYS;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span>{activityLabel(s.lastActivity)}</span>
      {inactive && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">neaktivní</span>}
    </span>
  );
}

function RemoveForm({ s, groupId }: { s: StudentProgress; groupId: string }) {
  return (
    <form action={removeMember}>
      <input type="hidden" name="groupId" value={groupId} />
      <input type="hidden" name="userId" value={s.userId} />
      <ConfirmSubmit
        confirm={`Odebrat studenta ${s.name} ze skupiny? Přestanete vidět jeho pokrok.`}
        className="text-xs font-medium text-stone-500 underline underline-offset-2 hover:text-red-700"
        pendingLabel="Odebírám…"
      >
        Odebrat<span className="sr-only"> studenta {s.name}</span>
      </ConfirmSubmit>
    </form>
  );
}

export function StudentProgressList({ students, groupId }: { students: StudentProgress[]; groupId: string }) {
  if (!students.length) {
    return (
      <div className="card text-center text-stone-600">
        <p className="font-semibold text-stone-900">Zatím se nikdo nepřipojil.</p>
        <p className="mt-1 text-sm">Pošlete studentům odkaz pro připojení. Jakmile se připojí a odsouhlasí sdílení, uvidíte tu jejich pokrok.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobil: karty */}
      <ul className="space-y-3 md:hidden">
        {students.map((s) => (
          <li key={s.userId} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold">{s.name}</div>
                <div className="break-all text-xs text-stone-500">{s.email}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-lg font-bold">{s.xp}</div>
                <div className="text-xs text-stone-500">XP</div>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-xs text-stone-500">Zodpovězené otázky</dt>
                <dd className="font-mono font-semibold">{s.answered}</dd>
              </div>
              <div>
                <dt className="text-xs text-stone-500">Celková úspěšnost</dt>
                <dd><Accuracy stat={{ answered: s.answered, correct: 0, accuracy: s.accuracy }} /></dd>
              </div>
              {EXAM_SECTIONS.map((sec) => (
                <div key={sec.key}>
                  <dt className="text-xs text-stone-500">{sec.short}</dt>
                  <dd><Accuracy stat={s.sections[sec.key]} /></dd>
                </div>
              ))}
              {PERMIT_TYPES.map((t) => (
                <div key={t}>
                  <dt className="text-xs text-stone-500">Test – {PERMIT_SHORT[t]}</dt>
                  <dd><TestResultCell test={s.tests[t]} /></dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="text-xs text-stone-500">Poslední aktivita</dt>
                <dd><Activity s={s} /></dd>
              </div>
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
              <span>
                Lekce {s.lessonsRead}/{s.lessonsTotal} · kartičky {s.cardReviews}
                {s.hasGroupCode && " · kód ze skupiny"}
              </span>
              <RemoveForm s={s} groupId={groupId} />
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: tabulka */}
      <div className="card hidden overflow-x-auto p-0 md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">Pokrok studentů ve skupině</caption>
          <thead className="border-b border-stone-200 text-left text-xs text-stone-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Student</th>
              <th scope="col" className="px-2 py-3 text-right font-medium">XP</th>
              <th scope="col" className="px-2 py-3 text-right font-medium">Otázky</th>
              {EXAM_SECTIONS.map((sec) => (
                <th key={sec.key} scope="col" className="px-2 py-3 font-medium" title={sec.label}>{sec.short}</th>
              ))}
              {PERMIT_TYPES.map((t) => (
                <th key={t} scope="col" className="px-2 py-3 font-medium">Test {PERMIT_SHORT[t]}</th>
              ))}
              <th scope="col" className="px-2 py-3 font-medium">Aktivita</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Akce</span></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.userId} className="border-t border-stone-100 align-top">
                <th scope="row" className="px-4 py-3 text-left font-normal">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-stone-500">{s.email}</div>
                  <div className="mt-0.5 text-xs text-stone-500">
                    Lekce {s.lessonsRead}/{s.lessonsTotal} · kartičky {s.cardReviews}
                    {s.hasGroupCode && " · kód ze skupiny"}
                  </div>
                </th>
                <td className="px-2 py-3 text-right font-mono font-semibold">{s.xp}</td>
                <td className="px-2 py-3 text-right font-mono">{s.answered}</td>
                {EXAM_SECTIONS.map((sec) => (
                  <td key={sec.key} className="px-2 py-3"><Accuracy stat={s.sections[sec.key]} /></td>
                ))}
                {PERMIT_TYPES.map((t) => (
                  <td key={t} className="px-2 py-3"><TestResultCell test={s.tests[t]} /></td>
                ))}
                <td className="px-2 py-3"><Activity s={s} /></td>
                <td className="px-4 py-3 text-right"><RemoveForm s={s} groupId={groupId} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
