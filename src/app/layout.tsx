import type { Metadata, Viewport } from "next";
import Link from "next/link";
// Písma jsou self-hostovaná (latin + latin-ext s českou diakritikou, načítají se podle unicode-range).
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/archivo/900.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { displayedStreak, levelFromXp, nextStreak, pragueDay } from "@/lib/gamification";
import { HeaderStats } from "@/components/HeaderStats";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { PwaRegister } from "@/components/PwaRegister";
import { logout } from "./actions/auth";

export const metadata: Metadata = {
  title: "Zbroják do kapsy – příprava na zkoušku zbrojního oprávnění",
  description:
    "Interaktivní učebnice ke zkoušce odborné způsobilosti podle zákona č. 90/2024 Sb. – výklad, kartičky, náhodné otázky a cvičné testy.",
  appleWebApp: { capable: true, title: "Zbroják", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#F3F1EC",
};

const NAV = [
  { href: "/prehled", label: "Přehled" },
  { href: "/okruhy", label: "Výklad" },
  { href: "/karticky", label: "Kartičky" },
  { href: "/procvicovani", label: "Procvičování" },
  { href: "/test", label: "Test nanečisto" },
  { href: "/trenazer", label: "Trenažér" },
  { href: "/otazky-mv", label: "Otázky MV" },
  { href: "/slovnicek", label: "Slovníček" },
  { href: "/ucet", label: "Účet" },
];

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3M12 5l4 4-4 4M16 9H7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const today = pragueDay();
  const streak = user ? displayedStreak(user.lastActiveDay, user.streak, today) : 0;
  const level = user ? levelFromXp(user.xp).level : 0;

  return (
    <html lang="cs">
      <body className="flex min-h-screen flex-col">
        <a
          href="#obsah"
          className="sr-only z-50 rounded-md bg-ink px-4 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Přeskočit na obsah
        </a>

        <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
            <Link href={user ? "/prehled" : "/"} className="-ml-1 flex min-h-11 items-center rounded-md px-1">
              <Logo tagline="sm" />
            </Link>

            {user ? (
              <div className="ml-auto flex items-center gap-1 sm:gap-2">
                <HeaderStats
                  key={`${user.xp}-${user.lastActiveDay}`}
                  xp={user.xp}
                  streak={streak}
                  streakIfActive={nextStreak(user.lastActiveDay, user.streak, today)}
                  level={level}
                />
                <form action={logout}>
                  <button type="submit" className="btn-ghost px-2.5 text-ocel hover:text-ink" aria-label="Odhlásit se">
                    <LogoutIcon />
                    <span className="hidden md:inline">Odhlásit</span>
                  </button>
                </form>
              </div>
            ) : (
              <nav aria-label="Hlavní" className="ml-auto flex items-center gap-0.5 sm:gap-1">
                <Link href="/#rezimy" className="btn-ghost hidden md:inline-flex">Jak to funguje</Link>
                <Link href="/cenik" className="btn-ghost px-2.5 max-[359px]:hidden sm:px-3">Ceník</Link>
                <Link href="/prihlaseni" className="btn-ghost px-2.5 sm:px-3">Přihlásit</Link>
                <Link href="/registrace" className="btn-primary ml-1 gap-0 px-4">
                  Začít<span className="hidden sm:inline">&nbsp;zdarma</span>
                </Link>
              </nav>
            )}
          </div>
          {user && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <NavLinks items={NAV} />
            </div>
          )}
        </header>

        <main id="obsah" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 focus:outline-none sm:px-6 sm:py-10">
          {children}
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6">
            <div className="max-w-xl space-y-3">
              <Logo size="sm" />
              <p className="text-sm font-semibold text-ink">
                Zbroják do kapsy není oficiálním materiálem Ministerstva vnitra ani Policie ČR.
              </p>
              <p className="text-sm text-ocel">
                Výukový materiál nenahrazuje znění právních předpisů. Vychází ze zákona č.&nbsp;90/2024&nbsp;Sb., o
                zbraních a střelivu.
              </p>
            </div>
            <nav aria-label="Patička">
              <ul className="-mx-2 flex flex-wrap gap-x-1 sm:mx-0 sm:-mr-2 sm:justify-end">
                <li><Link href="/cenik" className="btn-ghost px-2 text-sm">Ceník</Link></li>
                {user ? (
                  <>
                    <li><Link href="/slovnicek" className="btn-ghost px-2 text-sm">Slovníček</Link></li>
                    <li><Link href="/ucet" className="btn-ghost px-2 text-sm">Můj účet</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/prihlaseni" className="btn-ghost px-2 text-sm">Přihlášení</Link></li>
                    <li><Link href="/registrace" className="btn-ghost px-2 text-sm">Registrace</Link></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </footer>
        <PwaRegister signedIn={!!user} />
      </body>
    </html>
  );
}
