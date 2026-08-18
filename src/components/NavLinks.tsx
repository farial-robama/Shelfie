"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About us" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-1">
      {LINKS.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
              active
                ? "bg-ink text-paper"
                : "text-muted hover:text-ink hover:bg-surface"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}