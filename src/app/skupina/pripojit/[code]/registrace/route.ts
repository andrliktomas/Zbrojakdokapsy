import { NextResponse } from "next/server";
import { AFTER_REGISTER_COOKIE, allowedAfterRegisterPath } from "@/lib/groups";
import { normalizeCode } from "@/lib/codes";

/** Zapamatuje si odkaz na skupinu a pošle na registraci; po ní se uživatel vrátí sem. */
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const target = allowedAfterRegisterPath(`/skupina/pripojit/${normalizeCode(code)}`);
  const res = NextResponse.redirect(new URL("/registrace", req.url));
  if (target) {
    res.cookies.set(AFTER_REGISTER_COOKIE, target, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // hodina na dokončení registrace
    });
  }
  return res;
}
