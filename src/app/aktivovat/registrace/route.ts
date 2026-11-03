import { NextResponse } from "next/server";
import { AFTER_REGISTER_COOKIE, allowedAfterRegisterPath } from "@/lib/groups";
import { normalizeCode } from "@/lib/codes";

/** Zapamatuje si kód a pošle na registraci; po ní se uživatel vrátí na /aktivovat s předvyplněným kódem. */
export async function GET(req: Request) {
  const raw = new URL(req.url).searchParams.get("kod");
  const code = raw ? normalizeCode(raw).slice(0, 20) : "";
  const target = allowedAfterRegisterPath(code ? `/aktivovat?kod=${code}` : "/aktivovat");
  const res = NextResponse.redirect(new URL("/registrace", req.url));
  if (target) {
    res.cookies.set(AFTER_REGISTER_COOKIE, target, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });
  }
  return res;
}
