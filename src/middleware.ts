import { NextResponse, type NextRequest } from "next/server";

/** Předá aktuální cestu serverovým komponentám (hlavička x-pathname), aby přihlášení mohlo vrátit uživatele zpět. */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icons|sw.js|manifest.webmanifest|favicon.ico|.*\\.(?:png|svg|jpg|webp|ico|woff2?)$).*)"],
};
