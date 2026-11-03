import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { EXAM, PERMIT_LABEL, type PermitType } from "@/content";
import { MV_GROUPS, MV_QUESTIONS, buildMvTest, mvPassScore, toPublicMv } from "@/content/mv";
import { MvMockTest } from "@/components/mv/MvMockTest";
import { MvLocked } from "@/components/mv/MvLocked";
import { param, type SearchParams } from "../lib";

export const metadata: Metadata = { title: "Test nanečisto z otázek MV – Zbroják do kapsy" };
export const dynamic = "force-dynamic";

export default async function MvTestPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) {
    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Test nanečisto z otázek MV</h1>
        <MvLocked title="Test nanečisto je v placeném balíčku" loggedIn>
          <p>
            Test má {EXAM.questionCount} náhodných otázek z {MV_QUESTIONS.length} otázek souboru MV ve skladbě skutečné zkoušky
            a vyhodnocení podle částí. Ukázku otázek si mezitím můžete procházet a procvičovat zdarma.
          </p>
        </MvLocked>
      </div>
    );
  }
  const permitType: PermitType = param((await searchParams).typ) === "rozsirene" ? "rozsirene" : "obecne";
  // Nová náhodná sada při každém načtení – aplikace nikdy nepoužívá testy sestavené ministerstvem.
  const questions = buildMvTest().map((q) => ({ ...toPublicMv(q), group: q.group }));
  return (
    <MvMockTest
      key={permitType}
      questions={questions}
      groups={MV_GROUPS.map(({ key, title, count }) => ({ key, title, count }))}
      permitType={permitType}
      permitLabel={PERMIT_LABEL[permitType]}
      timeLimitMin={EXAM.timeLimitMin}
      passScore={mvPassScore(permitType)}
    />
  );
}
