"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "@/components/TransitionLink";

const navItems = [
  { name: "experience", href: "/experience", key: "01" },
  { name: "projects", href: "/projects", key: "02" },
  { name: "thinking", href: "/blog", key: "03" },
  { name: "bookshelf", href: "/bookshelf", key: "04" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--ink)]/95 backdrop-blur-sm">
      <div className="site-shell flex h-20 items-center justify-between">
        <Link href="/" className="nav-brand" aria-label="Saloni Dabgar, home">
          <span>saloni@portfolio</span><span>:~</span>
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
                <span>{item.key}</span>{item.name}
              </Link>
            );
          })}
          <a
            href="https://calendly.com/dabgarsaloni11/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="command-button command-button-primary command-button-small"
          >
            contact <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
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
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="mobile-command-link">
                <span>{item.key}</span> ./<span className="text-[var(--paper)]">{item.name}</span>
              </Link>
            ))}
            <a
              href="https://calendly.com/dabgarsaloni11/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="command-button command-button-primary mt-4"
            >
              contact --30m <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
