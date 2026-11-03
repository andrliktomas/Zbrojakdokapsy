import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { findGroupByJoinCode } from "@/lib/groups.server";
import { JoinGroupForm } from "@/components/groups/JoinGroupForm";
import { SharedDataNotice } from "@/components/groups/SharedDataNotice";

export const metadata: Metadata = { title: "Připojení ke skupině – Zbroják do kapsy" };

export default async function JoinGroupPage({ params }: { params: Promise<{ code: string }> }) {
  const [{ code }, user] = await Promise.all([params, getCurrentUser()]);
  const group = await findGroupByJoinCode(code);

  if (!group) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <h1 className="text-xl font-bold">Odkaz na skupinu neplatí</h1>
        <p className="mt-2 text-stone-600">Odkaz je chybný, nebo ho instruktor mezitím změnil. Požádejte ho prosím o aktuální odkaz.</p>
        <Link href={user ? "/prehled" : "/"} className="btn-secondary mt-4">Zpět</Link>
      </div>
    );
  }

  const here = `/skupina/pripojit/${group.joinCode}`;
  const isInstructor = user?.id === group.instructorId;
  const isMember = user && !isInstructor
    ? !!(await db.groupMember.findUnique({ where: { groupId_userId: { groupId: group.id, userId: user.id } }, select: { userId: true } }))
    : false;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="card space-y-4">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Pozvánka do skupiny</p>
          <h1 className="mt-1 text-2xl font-bold">{group.name}</h1>
          <p className="mt-1 text-stone-600">Instruktor: <b>{group.instructor.name}</b></p>
        </header>

        {isInstructor ? (
          <>
            <p className="text-stone-700">Toto je vaše skupina. Odkaz pošlete studentům – sami se připojovat nemusíte.</p>
            <Link href={`/skupiny/${group.id}`} className="btn-primary w-full">Otevřít přehled skupiny</Link>
          </>
        ) : isMember ? (
          <>
            <p className="text-stone-700">Už jste členem této skupiny.</p>
            <Link href="/skupina" className="btn-primary w-full">Moje skupiny</Link>
          </>
        ) : (
          <>
            <p className="text-stone-700">
              Ve skupině instruktor vidí, jak se připravujete, a může vám lépe pomoci se slabými místy.
              Než se připojíte, přečtěte si prosím, co přesně uvidí.
            </p>
            <SharedDataNotice instructorName={group.instructor.name} id="consent-scope" />
            {user ? (
              <JoinGroupForm code={group.joinCode} instructorName={group.instructor.name} />
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-stone-600">Pro připojení potřebujete účet. Souhlas se sdílením potvrdíte po přihlášení.</p>
                <a href={`${here}/registrace`} className="btn-primary w-full">Založit účet a připojit se</a>
                <Link href={`/prihlaseni?next=${encodeURIComponent(here)}`} className="btn-secondary w-full">Mám účet – přihlásit se</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
