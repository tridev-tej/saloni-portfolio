"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "@/components/TransitionLink";

const navItems = [
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Thinking", href: "/blog" },
  { name: "Bookshelf", href: "/bookshelf" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--ink)]/95 backdrop-blur-sm">
      <div className="site-shell flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold tracking-[-0.02em]">
          Saloni Dabgar
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
          <a
            href="https://calendly.com/dabgarsaloni11/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-small"
          >
            Let&apos;s talk <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </nav>

        <button
          type="button"
          className="icon-button md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-[var(--line)] bg-[var(--ink)] md:hidden">
          <div className="site-shell flex flex-col py-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-[var(--line)] py-4 text-lg last:border-0">
                {item.name}
              </Link>
            ))}
            <a
              href="https://calendly.com/dabgarsaloni11/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 py-2 text-[var(--orange)]"
            >
              Book a call <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
