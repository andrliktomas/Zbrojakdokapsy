"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register, type FormState } from "@/app/actions/auth";

export function AuthForm({ mode, next }: { mode: "login" | "register"; next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(mode === "login" ? login : register, undefined);
  return (
    <form action={action} className="card mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">{mode === "login" ? "Přihlášení" : "Založit účet"}</h1>
      {mode === "register" && (
        <div>
          <label className="label" htmlFor="name">Jméno</label>
          <input className="input" id="name" name="name" required autoComplete="given-name" />
        </div>
      )}
      <div>
        <label className="label" htmlFor="email">E-mail</label>
        <input className="input" id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="password">Heslo</label>
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          required
          minLength={mode === "register" ? 8 : undefined}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
      </div>
      {mode === "register" && (
        <label className="flex items-start gap-2 text-sm text-stone-600">
          <input type="checkbox" name="terms" className="mt-1" required />
          Souhlasím s obchodními podmínkami a zpracováním osobních údajů.
        </label>
      )}
      {next && <input type="hidden" name="next" value={next} />}
      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button className="btn-primary w-full" disabled={pending}>
        {pending ? "Moment…" : mode === "login" ? "Přihlásit se" : "Vytvořit účet"}
      </button>
      <p className="text-center text-sm text-stone-600">
        {mode === "login" ? (
          <>Ještě nemáte účet? <Link className="font-semibold text-brand-700" href="/registrace">Registrujte se</Link></>
        ) : (
          <>Už máte účet? <Link className="font-semibold text-brand-700" href="/prihlaseni">Přihlaste se</Link></>
        )}
      </p>
    </form>
  );
}
