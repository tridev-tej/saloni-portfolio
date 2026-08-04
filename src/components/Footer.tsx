import { ArrowUpRight } from "lucide-react";
import Link from "@/components/TransitionLink";

const links = [
  { label: "GitHub", href: "https://github.com/salonidabgar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saloni-dabgar-695864194/" },
  { label: "Twitter", href: "https://twitter.com/salonidabgar" },
  { label: "Email", href: "mailto:dabgarsaloni11@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink-soft)]">
      <div className="site-shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="touch-link nav-brand" aria-label="Saloni Dabgar, home"><span>saloni@portfolio</span><span>:~$</span></Link>
          <p className="mt-3 max-w-lg text-sm text-[var(--muted)]">
            Engineer by training. Builder by instinct. CLI by preference. Human by practice.
          </p>
          <p className="mt-8 font-mono text-[0.64rem] text-[var(--muted)]">© {new Date().getFullYear()} · process completed successfully</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
          {links.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="footer-command-link"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label.toLowerCase()} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
