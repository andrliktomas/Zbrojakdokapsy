"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/otazky-mv", label: "Přehled" },
  { href: "/otazky-mv/prochazet", label: "Procházet" },
  { href: "/otazky-mv/procvicovani", label: "Procvičovat" },
  { href: "/otazky-mv/test", label: "Test" },
];

export function MvSubnav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Oficiální otázky MV" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-1 rounded-xl bg-stone-100 p-1 text-sm ring-1 ring-stone-200 sm:inline-flex sm:min-w-0">
        {ITEMS.map((item) => {
          const active = item.href === "/otazky-mv" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1 sm:flex-none">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-3 font-semibold transition sm:px-5 ${
                  active ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:bg-white/60 hover:text-stone-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
