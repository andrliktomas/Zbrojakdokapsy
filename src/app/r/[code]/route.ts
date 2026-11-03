import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findReferrerByCode } from "@/lib/referral.server";
import { REFERRAL } from "@/lib/referral";
import { normalizeCode } from "@/lib/codes";

/**
 * Odkaz pro doporučení /r/<kód>: uloží kód do cookie (30 dní) a pošle na uvítací stránku.
 * Doporučení se přiřadí až při registraci nového účtu – přihlášený uživatel se doporučit nedá.
 */
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeCode((await params).code);
  if (await getCurrentUser()) return NextResponse.redirect(new URL("/r", req.url));

  const referrer = await findReferrerByCode(code);
  if (!referrer) return NextResponse.redirect(new URL("/registrace", req.url));

  const res = NextResponse.redirect(new URL("/r?pozvanka=1", req.url));
  res.cookies.set(REFERRAL.cookieName, code, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: REFERRAL.cookieMaxAgeDays * 86_400,
  });
  return res;
}
