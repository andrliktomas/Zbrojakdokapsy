"use client";

import { useActionState } from "react";
import { joinGroup, type JoinFormState } from "@/app/actions/groups";

export function JoinGroupForm({ code, instructorName }: { code: string; instructorName: string }) {
  const [state, action, pending] = useActionState<JoinFormState, FormData>(joinGroup, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="code" value={code} />
      <label className="flex items-start gap-3 rounded-xl bg-stone-50 p-3 text-sm ring-1 ring-stone-200">
        <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0" aria-describedby="consent-scope" />
        <span>
          Souhlasím, aby instruktor <b>{instructorName}</b> viděl můj pokrok v přípravě v rozsahu uvedeném výše.
          Souhlas mohu kdykoli odvolat odchodem ze skupiny.
        </span>
      </label>
      {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button className="btn-primary w-full" disabled={pending}>{pending ? "Připojuji…" : "Připojit se ke skupině"}</button>
    </form>
  );
}
