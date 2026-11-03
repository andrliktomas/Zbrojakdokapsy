"use client";

import Link from "next/link";
import { useActionState } from "react";
import { redeemCode, type RedeemState } from "@/app/actions/groups";

export function RedeemForm({ initialCode = "" }: { initialCode?: string }) {
  const [state, action, pending] = useActionState<RedeemState, FormData>(redeemCode, undefined);

  if (state?.ok) {
    return (
      <div className="space-y-4" role="status">
        <div className="rounded-xl bg-brand-50 p-4 ring-1 ring-brand-200">
          <h2 className="text-lg font-bold">{state.alreadyYours ? "Tento kód už máte uplatněný" : "Kód byl uplatněn"}</h2>
          <p className="mt-1 text-stone-700">
            Přístup na <b>{state.planName}</b> je aktivní
            {state.accessEnd && <> – celkem máte přístup do <b className="font-mono">{state.accessEnd}</b></>}.
          </p>
        </div>
        {!state.group.isMember && (
          <div className="rounded-xl p-4 ring-1 ring-stone-200">
            <h3 className="font-semibold">Kód je od skupiny „{state.group.name}“</h3>
            <p className="mt-1 text-sm text-stone-600">
              Chcete, aby instruktor {state.group.instructorName} viděl, jak se připravujete? Připojení je dobrovolné –
              před připojením uvidíte, jaké údaje se sdílejí.
            </p>
            <Link href={`/skupina/pripojit/${state.group.joinCode}`} className="btn-secondary mt-3">Připojit se ke skupině</Link>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Link href="/prehled" className="btn-primary">Pokračovat k učení</Link>
          <Link href="/procvicovani" className="btn-secondary">Procvičovat otázky</Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="activation-code">Aktivační kód</label>
        <input
          className="input font-mono text-lg uppercase tracking-widest"
          id="activation-code"
          name="code"
          defaultValue={initialCode}
          required
          maxLength={20}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="ABCD-EFGH-JKMN"
          aria-describedby="activation-code-hint"
          aria-invalid={state && !state.ok ? true : undefined}
        />
        <p id="activation-code-hint" className="mt-1 text-xs text-stone-500">12 znaků, pomlčky a mezery můžete vynechat. Kód lze použít jen jednou.</p>
      </div>
      {state && !state.ok && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button className="btn-primary w-full" disabled={pending}>{pending ? "Ověřuji…" : "Uplatnit kód"}</button>
    </form>
  );
}
