"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type NavItem = { href: string; label: string };

/** Záložky aplikace pod hlavičkou. V mobilu vodorovně posuvné, aktivní položka se posune do zorného pole. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>("[aria-current='page']");
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav aria-label="Aplikace" className="-mx-4 sm:mx-0">
      <ul
        ref={listRef}
        className="flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((n) => {
          const active = isActive(n.href);
          return (
            <li key={n.href} className="shrink-0">
              <Link
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-11 items-center rounded-md px-3 text-[15px] whitespace-nowrap transition-colors focus-visible:outline-offset-[-3px] ${
                  active
                    ? "font-bold text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-sm after:bg-signal"
                    : "font-semibold text-ocel hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
