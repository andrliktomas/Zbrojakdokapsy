import Link from "next/link";

/** Výzva k odemčení placené části režimu (bez přihlášení vede na registraci). */
export function MvLocked({ title, children, loggedIn }: { title: string; children?: React.ReactNode; loggedIn: boolean }) {
  return (
    <section className="card border-l-4 border-accent-400">
      <h2 className="text-lg font-bold">{title}</h2>
      {children && <div className="mt-1 text-stone-700">{children}</div>}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {loggedIn ? (
          <Link href="/cenik" className="btn-primary">Vybrat balíček</Link>
        ) : (
          <>
            <Link href="/registrace" className="btn-primary">Založit účet</Link>
            <Link href="/prihlaseni" className="btn-secondary">Přihlásit se</Link>
          </>
        )}
      </div>
    </section>
  );
}

/** Malý štítek u položek, které jsou v placeném balíčku. */
export function MvBadge({ children, tone = "stone" }: { children: React.ReactNode; tone?: "stone" | "brand" | "accent" }) {
  const cls =
    tone === "brand" ? "bg-brand-100 text-brand-700" : tone === "accent" ? "bg-accent-400/25 text-stone-900" : "bg-stone-200 text-stone-700";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}
