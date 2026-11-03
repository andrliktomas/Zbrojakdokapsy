import type { ExamPlanData } from "@/lib/progress";
import { EXAM } from "@/content";
import { EXAM_DATE_MAX_DAYS, PERMIT_SHORT, addDays, plural } from "@/lib/plan";
import { ExamDateForm } from "./ExamDateForm";
import { PlanChecklist } from "./PlanChecklist";
import { PredictionPanel } from "./PredictionPanel";

const formatDay = (day: string, weekday = true) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString("cs-CZ", {
    weekday: weekday ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Prague",
  });

function Countdown({ data }: { data: ExamPlanData }) {
  const { daysLeft, examDate, permit } = data;
  if (examDate === null || daysLeft === null) {
    return (
      <>
        <h2 id="plan-heading" className="mt-1 text-2xl font-bold">Kdy jdete ke zkoušce?</h2>
        <p className="mt-1 max-w-prose text-stone-600">
          Zadejte termín a typ oprávnění. Každý den vám pak sestavíme krátký plán podle toho, kolik času zbývá a kde
          chybujete, a odhadneme, jak by dopadl test.
        </p>
      </>
    );
  }
  if (daysLeft < 0) {
    return (
      <>
        <h2 id="plan-heading" className="mt-1 text-2xl font-bold">Termín zkoušky už proběhl</h2>
        <p className="mt-1 max-w-prose text-stone-600">
          Zkouška byla {formatDay(examDate, false)}. Pokud ji skládáte znovu, zadejte nový termín a plán se znovu rozběhne.
        </p>
      </>
    );
  }
  const when = formatDay(examDate);
  const pass = EXAM.passScore(EXAM.questionCount, permit);
  return (
    <>
      <h2 id="plan-heading" className="mt-1 text-2xl font-bold">
        {daysLeft === 0 ? (
          "Zkouška je dnes"
        ) : daysLeft === 1 ? (
          "Zkouška je zítra"
        ) : (
          <>
            Zkouška za <span className="font-mono text-4xl font-semibold tabular-nums">{daysLeft}</span>{" "}
            {plural(daysLeft, "den", "dny", "dní")}
          </>
        )}
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        <span className="first-letter:uppercase inline-block">{when}</span> · {PERMIT_SHORT[permit]}, hranice{" "}
        <span className="font-mono tabular-nums">{pass}/{EXAM.questionCount}</span>
      </p>
    </>
  );
}

export function ExamPlanCard({ data }: { data: ExamPlanData }) {
  const past = data.daysLeft !== null && data.daysLeft < 0;
  return (
    <section aria-labelledby="plan-heading" className="card">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Plán podle termínu zkoušky</p>
          <Countdown data={data} />
        </div>
        <ExamDateForm
          examDate={data.examDate}
          permit={data.permit}
          today={data.today}
          maxDate={addDays(data.today, EXAM_DATE_MAX_DAYS)}
          alwaysOpen={data.examDate === null || past}
        />
      </div>

      {!past && (
        <div className="mt-5 grid gap-6 border-t border-stone-200 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <PlanChecklist plan={data.plan} />
          <PredictionPanel prediction={data.prediction} permitChosen={data.permitChosen} />
        </div>
      )}
    </section>
  );
}
