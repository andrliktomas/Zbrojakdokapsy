import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { appUrl, fakePaymentsAllowed } from "@/lib/billing";
import { getGroupProgress, getInstructorGroup, getSeatSummary } from "@/lib/groups.server";
import { INACTIVE_AFTER_DAYS, PASS_RATIO, czPlural } from "@/lib/groups";
import { formatCode } from "@/lib/codes";
import { regenerateJoinCode } from "@/app/actions/groups";
import { CopyField } from "@/components/referral/CopyField";
import { ConfirmSubmit } from "@/components/groups/ConfirmSubmit";
import { SeatPackages } from "@/components/groups/SeatPackages";
import { StudentProgressList } from "@/components/groups/StudentProgressList";

export const metadata: Metadata = { title: "Skupina – Zbroják do kapsy" };

type Search = { nova?: string; novyOdkaz?: string; odebran?: string; zruseno?: string };

const FLASH: Record<keyof Search, string> = {
  nova: "Skupina je založená. Pošlete studentům odkaz níže.",
  novyOdkaz: "Odkaz pro připojení je nový. Starý odkaz už nefunguje.",
  odebran: "Student byl ze skupiny odebrán.",
  zruseno: "Platba byla zrušena, nic se nestrhlo.",
};

function Tile({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-1 font-mono text-2xl font-bold">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-stone-500">{hint}</div>}
    </div>
  );
}

export default async function GroupDashboardPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Search> }) {
  const user = await requireUser();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  // Autorizace: skupinu vidí jen její instruktor, ostatním 404.
  const group = await getInstructorGroup(id, user.id);
  if (!group) notFound();
  const [students, seats] = await Promise.all([getGroupProgress(group.id), getSeatSummary(group.id)]);

  const joinLink = `${appUrl()}/skupina/pripojit/${group.joinCode}`;
  const active = students.filter((s) => s.inactiveDays !== null && s.inactiveDays < INACTIVE_AFTER_DAYS).length;
  const passed = students.filter((s) => (s.tests.obecne?.passedCount ?? 0) + (s.tests.rozsirene?.passedCount ?? 0) > 0).length;
  const flash = (Object.keys(FLASH) as (keyof Search)[]).find((k) => sp[k]);

  return (
    <div className="space-y-6">
      <nav aria-label="Navigace" className="text-sm">
        <Link href="/skupiny" className="text-stone-600 underline-offset-2 hover:underline">← Moje skupiny</Link>
      </nav>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Skupina instruktora</p>
        <h1 className="mt-1 text-2xl font-bold">{group.name}</h1>
        <p className="mt-1 text-sm text-stone-500">Založeno {group.createdAt.toLocaleDateString("cs-CZ")}</p>
      </header>

      {flash && <p role="status" className="rounded-lg bg-brand-50 px-3 py-2 text-brand-700">{FLASH[flash]}</p>}

      <section aria-label="Souhrn" className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Studentů" value={students.length} />
        <Tile label={`Aktivní za ${INACTIVE_AFTER_DAYS} dní`} value={active} />
        <Tile label="Splnili test nanečisto" value={passed} hint="aspoň jednou" />
        <Tile label="Volné kódy" value={<>{seats.available}<span className="text-base font-normal text-stone-500"> / {seats.total}</span></>} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card space-y-4" aria-labelledby="invite-title">
          <div>
            <h2 id="invite-title" className="text-lg font-bold">Pozvánka pro studenty</h2>
            <p className="mt-1 text-sm text-stone-600">
              Pošlete studentům odkaz. Před připojením uvidí, že budete vidět jejich pokrok, a musí to odsouhlasit.
            </p>
          </div>
          <CopyField label="Odkaz pro připojení" value={joinLink} hint={`Kód skupiny: ${formatCode(group.joinCode)}`} />
          <form action={regenerateJoinCode}>
            <input type="hidden" name="groupId" value={group.id} />
            <ConfirmSubmit
              confirm="Vytvořit nový odkaz? Starý odkaz přestane fungovat. Studenti, kteří už jsou ve skupině, zůstanou."
              className="text-sm font-medium text-stone-600 underline underline-offset-2 hover:text-stone-900"
            >
              Vytvořit nový odkaz (starý přestane platit)
            </ConfirmSubmit>
          </form>
        </section>

        <section className="card space-y-4" aria-labelledby="codes-title">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 id="codes-title" className="text-lg font-bold">Aktivační kódy</h2>
              <p className="mt-1 text-sm text-stone-600">
                {seats.total
                  ? <>Použito <b className="font-mono">{seats.redeemed}</b> z <b className="font-mono">{seats.total}</b>, volných <b className="font-mono">{seats.available}</b>.</>
                  : "Zaplaťte studentům přístup hromadně. Každý kód platí pro jednoho studenta."}
              </p>
            </div>
            {seats.total > 0 && <Link href={`/skupiny/${group.id}/kody`} className="btn-secondary">Zobrazit kódy</Link>}
          </div>
          <SeatPackages groupId={group.id} testMode={fakePaymentsAllowed()} />
        </section>
      </div>

      <section aria-labelledby="students-title" className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="students-title" className="text-lg font-bold">
            Pokrok studentů <span className="font-mono text-stone-500">({students.length})</span>
          </h2>
          <p className="text-xs text-stone-500">
            Úspěšnost: <span className="font-semibold text-brand-700">od {Math.round(PASS_RATIO * 100)} %</span> odpovídá úrovni
            potřebné u zkoušky, <span className="font-semibold text-red-700">pod 70 %</span> je slabé místo. V závorce počet odpovědí.
          </p>
        </div>
        <StudentProgressList students={students} groupId={group.id} />
        <p className="text-xs text-stone-500">
          Vidíte jen studenty, kteří se připojili a odsouhlasili sdílení pokroku. {students.length} {czPlural(students.length, "student", "studenti", "studentů")} ve skupině.
        </p>
      </section>
    </div>
  );
}
