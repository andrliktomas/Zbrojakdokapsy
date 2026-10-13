import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "./actions/auth";

export const metadata: Metadata = {
  title: "Zbroják do kapsy – příprava na zkoušku zbrojního oprávnění",
  description:
    "Interaktivní učebnice ke zkoušce odborné způsobilosti podle zákona č. 90/2024 Sb. – výklad, kartičky, náhodné otázky a cvičné testy.",
};

const NAV = [
  { href: "/prehled", label: "Přehled" },
  { href: "/okruhy", label: "Výklad" },
  { href: "/karticky", label: "Kartičky" },
  { href: "/procvicovani", label: "Procvičování" },
  { href: "/test", label: "Test nanečisto" },
  { href: "/slovnicek", label: "Slovníček" },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="cs">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <Link href={user ? "/prehled" : "/"} className="flex items-center gap-2 font-extrabold text-brand-700">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">ZK</span>
              <span className="hidden sm:inline">Zbroják do kapsy</span>
            </Link>
            {user && (
              <nav className="flex flex-1 gap-1 overflow-x-auto text-sm">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-stone-700 hover:bg-stone-100">
                    {n.label}
                  </Link>
                ))}
              </nav>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm">
              {user ? (
                <>
                  <Link href="/ucet" className="hidden rounded-lg px-3 py-1.5 hover:bg-stone-100 md:block">
                    {user.name} · <span className="font-semibold text-brand-700">{user.xp} XP</span>
                  </Link>
                  <form action={logout}>
                    <button className="rounded-lg px-3 py-1.5 text-stone-500 hover:bg-stone-100">Odhlásit</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/cenik" className="rounded-lg px-3 py-1.5 hover:bg-stone-100">Ceník</Link>
                  <Link href="/prihlaseni" className="rounded-lg px-3 py-1.5 hover:bg-stone-100">Přihlásit</Link>
                  <Link href="/registrace" className="btn-primary py-1.5">Začít</Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
          Výukový materiál nenahrazuje znění právních předpisů. Vychází ze zákona č. 90/2024 Sb., o zbraních a střelivu.
        </footer>
      </body>
    </html>
  );
}
