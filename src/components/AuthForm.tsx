"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, register, type FormState } from "@/app/actions/auth";
import { LogoMark } from "./Logo";

export function AuthForm({ mode, next }: { mode: "login" | "register"; next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(mode === "login" ? login : register, undefined);
  const isLogin = mode === "login";
  return (
    <div className="mx-auto w-full max-w-md">
      <form action={action} className="card space-y-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{isLogin ? "Přihlášení" : "Registrace"}</p>
            <h1 className="mt-1.5 text-[28px] leading-tight font-black tracking-[-0.02em]">
              {isLogin ? "Vítejte zpět" : "Založit účet"}
            </h1>
          </div>
          <LogoMark size={44} detail className="shrink-0" />
        </div>
        <p className="-mt-2 text-stone-700">
          {isLogin
            ? "Pokračujte tam, kde jste skončili."
            : "Ukázkové okruhy máte zdarma hned po registraci."}
        </p>

        {mode === "register" && (
          <div>
            <label className="label" htmlFor="name">Jméno</label>
            <input className="input" id="name" name="name" required minLength={2} autoComplete="given-name" />
          </div>
        )}
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input className="input" id="email" name="email" type="email" inputMode="email" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="password">Heslo</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            required
            minLength={isLogin ? undefined : 8}
            autoComplete={isLogin ? "current-password" : "new-password"}
            aria-describedby={isLogin ? undefined : "password-hint"}
          />
          {!isLogin && (
            <p id="password-hint" className="mt-1.5 text-sm text-ocel">
              Alespoň <span className="num">8</span> znaků
            </p>
          )}
        </div>
        {mode === "register" && (
          <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-snug text-stone-700">
            <input type="checkbox" name="terms" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-ink" required />
            <span>Souhlasím s obchodními podmínkami a zpracováním osobních údajů.</span>
          </label>
        )}
        {next && <input type="hidden" name="next" value={next} />}
        {state?.error && (
          <p role="alert" className="flex items-start gap-2 rounded-md border-l-4 border-chyba bg-chyba-50 px-3 py-2.5 text-sm font-semibold text-red-700">
            {state.error}
          </p>
        )}
        <button className="btn-accent min-h-12 w-full text-base" disabled={pending}>
          {pending ? "Moment…" : isLogin ? "Přihlásit se" : "Vytvořit účet"}
        </button>
      </form>
      <p className="mt-5 text-center text-stone-700">
        {isLogin ? (
          <>
            Ještě nemáte účet?{" "}
            <Link className="link inline-flex min-h-11 items-center" href="/registrace">Registrujte se</Link>
          </>
        ) : (
          <>
            Už máte účet?{" "}
            <Link className="link inline-flex min-h-11 items-center" href="/prihlaseni">Přihlaste se</Link>
          </>
        )}
      </p>
    </div>
  );
}
