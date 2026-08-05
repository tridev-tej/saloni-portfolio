"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, SVGProps, ElementType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BatteryMedium,
  BookOpenText,
  Boxes,
  ChevronRight,
  Command,
  FileText,
  FolderKanban,
  Github,
  HardDrive,
  Mail,
  Maximize2,
  Minus,
  Search,
  Settings2,
  SquareTerminal,
  UserRound,
  Wifi,
  X,
} from "lucide-react";
import Link from "@/components/TransitionLink";
import CommandWorkbench, { skillGroups } from "@/components/CommandWorkbench";

type AppId = "about" | "work" | "terminal" | "notes" | "skills" | "system";

type AppConfig = {
  id: AppId;
  label: string;
  path: string;
  description: string;
  icon: LucideIcon;
};

type DragState = {
  id: AppId;
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const apps: AppConfig[] = [
  { id: "about", label: "About Saloni", path: "~/profile/saloni.app", description: "Start here", icon: UserRound },
  { id: "work", label: "Selected work", path: "~/work", description: "Projects with real constraints", icon: FolderKanban },
  { id: "terminal", label: "Terminal", path: "~/bin/terminal", description: "CLI-first command surface", icon: SquareTerminal },
  { id: "notes", label: "Field notes", path: "~/thinking", description: "Engineering, practice, and systems", icon: BookOpenText },
  { id: "skills", label: "Capabilities", path: "~/system/skills", description: "56 indexed skills", icon: Boxes },
  { id: "system", label: "System info", path: "~/system/about", description: "How this machine thinks", icon: Settings2 },
];

const projects = [
  {
    title: "Software Over-The-Air Controller",
    context: "Jaguar Land Rover",
    kind: "embedded",
    description: "A secure, resumable state machine for vehicle software updates.",
    stack: ["C++", "Boost.Beast", "OpenSSL", "Linux"],
  },
  {
    title: "TaskFlow",
    context: "SURGE, IIT Kanpur",
    kind: "distributed",
    description: "Async orchestration for 1,000+ concurrent users, 40% faster than baseline.",
    stack: ["FastAPI", "React", "PostgreSQL", "Redis"],
  },
  {
    title: "Currency Exchange Platform",
    context: "University of Zurich",
    kind: "blockchain",
    description: "ERC-20 exchange infrastructure with smart-contract liquidity pools.",
    stack: ["Solidity", "Next.js", "Ethereum", "Uniswap V3"],
  },
  {
    title: "E2E Headlamp Communication",
    context: "Jaguar Land Rover",
    kind: "embedded",
    description: "Encrypted actuator communication with a measured 10% efficiency gain.",
    stack: ["C", "Linux", "Vehicle communication"],
  },
];

const notes = [
  {
    title: "Inside Saarthi",
    detail: "An assurance-gated driver-monitoring proof of concept.",
    href: "/blog/inside-saarthi-assurance-gated-driver-monitoring",
    meta: "04 Aug 2026 · engineering",
  },
  {
    title: "Listing Intelligence",
    detail: "The agent fleet I built to rewrite Amazon listings.",
    href: "/blog/an-agent-fleet-for-amazon-listings",
    meta: "01 Aug 2026 · agents",
  },
  {
    title: "The Ripples You Keep Making",
    detail: "Yoga Sutra 1.2, attention, and the movements of mind.",
    href: "/blog/yoga-sutra-2-yogah-chittavritti-nirodhah",
    meta: "09 Jun 2026 · practice",
  },
];

const initialOffsets: Record<AppId, { x: number; y: number }> = {
  about: { x: 0, y: 0 },
  work: { x: 0, y: 0 },
  terminal: { x: 0, y: 0 },
  notes: { x: 0, y: 0 },
  skills: { x: 0, y: 0 },
  system: { x: 0, y: 0 },
};

const appById = (id: AppId) => apps.find((app) => app.id === id) ?? apps[0];

// Claude's orange sunburst mark (for the "56 skills" tile).
function ClaudeSunburst(props: SVGProps<SVGSVGElement>) {
  const rays = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...props}>
      {rays.map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const long = i % 2 === 0;
        const r1 = long ? 10.6 : 7.2;
        const r0 = 2.6;
        return (
          <line
            key={i}
            x1={12 + r0 * Math.cos(a)}
            y1={12 + r0 * Math.sin(a)}
            x2={12 + r1 * Math.cos(a)}
            y2={12 + r1 * Math.sin(a)}
            stroke="#ff5a2a"
            strokeWidth={long ? 2 : 1.6}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export default function DesktopPortfolio() {
  const [booting, setBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState<AppId[]>(["terminal", "about"]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [maximized, setMaximized] = useState<AppId[]>([]);
  const [zOrder, setZOrder] = useState<AppId[]>(["terminal", "about"]);
  const [activeId, setActiveId] = useState<AppId>("about");
  const [offsets, setOffsets] = useState(initialOffsets);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [clock, setClock] = useState("");
  const spotlightInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setBooting(false), reducedMotion ? 80 : 1050);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    updateClock();
    const timer = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSpotlightOpen(true);
      }
      if (event.key === "Escape") {
        setSpotlightOpen(false);
        setSpotlightQuery("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (spotlightOpen) {
      window.setTimeout(() => spotlightInput.current?.focus(), 20);
    }
  }, [spotlightOpen]);

  function closeSpotlight() {
    setSpotlightOpen(false);
    setSpotlightQuery("");
  }

  function bringToFront(id: AppId) {
    setZOrder((current) => [...current.filter((item) => item !== id), id]);
    setActiveId(id);
  }

  function openApp(id: AppId) {
    setOpenWindows((current) => (current.includes(id) ? current : [...current, id]));
    setMinimized((current) => current.filter((item) => item !== id));
    bringToFront(id);
  }

  function closeApp(id: AppId) {
    setOpenWindows((current) => current.filter((item) => item !== id));
    setMinimized((current) => current.filter((item) => item !== id));
    setMaximized((current) => current.filter((item) => item !== id));
    setZOrder((current) => {
      const next = current.filter((item) => item !== id);
      if (activeId === id) {
        setActiveId(next[next.length - 1] ?? "about");
      }
      return next;
    });
  }

  function minimizeApp(id: AppId) {
    setMinimized((current) => (current.includes(id) ? current : [...current, id]));
    const visible = zOrder.filter((item) => item !== id && openWindows.includes(item) && !minimized.includes(item));
    setActiveId(visible[visible.length - 1] ?? "about");
  }

  function toggleMaximize(id: AppId) {
    setMaximized((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    bringToFront(id);
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>, id: AppId) {
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input") || maximized.includes(id) || window.innerWidth < 760) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    bringToFront(id);
    setDrag({
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offsets[id].x,
      originY: offsets[id].y,
    });
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    const nextX = drag.originX + event.clientX - drag.startX;
    const nextY = drag.originY + event.clientY - drag.startY;
    setOffsets((current) => ({
      ...current,
      [drag.id]: {
        x: Math.max(-160, Math.min(nextX, window.innerWidth - 320)),
        y: Math.max(-36, Math.min(nextY, window.innerHeight - 160)),
      },
    }));
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag?.pointerId === event.pointerId) {
      setDrag(null);
    }
  }

  const spotlightResults = useMemo(() => {
    const normalized = spotlightQuery.trim().toLowerCase();
    return apps.filter((app) => !normalized || [app.label, app.path, app.description].some((value) => value.toLowerCase().includes(normalized)));
  }, [spotlightQuery]);

  return (
    <div className="desktop-shell">
      {booting && <BootScreen onSkip={() => setBooting(false)} />}

      <header className="os-menu-bar">
        <button type="button" className="os-wordmark" onClick={() => openApp("system")} aria-label="Open Saloni OS system information">
          <span aria-hidden="true">S</span>
          Saloni OS
        </button>
        <nav aria-label="Desktop menu">
          <button type="button" onClick={() => openApp("about")}>Profile</button>
          <button type="button" onClick={() => openApp("work")}>Work</button>
          <button type="button" onClick={() => openApp("terminal")}>Terminal</button>
          <button type="button" onClick={() => openApp("notes")}>Notes</button>
        </nav>
        <div className="os-menu-spacer" />
        <button type="button" className="os-command-key" onClick={() => setSpotlightOpen(true)}>
          <Search aria-hidden="true" />
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="os-status" aria-label="System status">
          <span className="os-cli-preference"><Command aria-hidden="true" /> 10x engineer</span>
          <Wifi aria-hidden="true" />
          <BatteryMedium aria-hidden="true" />
          <time>{clock}</time>
        </div>
      </header>

      <main className="os-desktop" aria-label="Saloni OS desktop">
        <div className="os-wallpaper-copy" aria-hidden="true">
          <span>build</span>
          <strong>systems</strong>
          <span>that survive reality.</span>
        </div>

        <div className="os-desktop-icons" aria-label="Desktop shortcuts">
          <DesktopIcon appId="about" label="Saloni.app" icon={HardDrive} onOpen={openApp} />
          <DesktopIcon appId="work" label="Work" icon={FolderKanban} onOpen={openApp} />
          <DesktopIcon appId="notes" label="Thinking" icon={FileText} onOpen={openApp} />
          <DesktopIcon appId="skills" label="56 skills" icon={ClaudeSunburst} onOpen={openApp} />
        </div>

        <section className="os-window-layer" aria-label="Open applications">
          {openWindows.map((id) => {
            if (minimized.includes(id)) {
              return null;
            }
            const app = appById(id);
            const Icon = app.icon;
            const isActive = activeId === id;
            const isMaximized = maximized.includes(id);
            const style = {
              "--drag-x": String(offsets[id].x) + "px",
              "--drag-y": String(offsets[id].y) + "px",
              zIndex: 20 + zOrder.indexOf(id),
            } as CSSProperties;

            return (
              <article
                key={id}
                className={"os-window os-window-" + id + (isActive ? " is-active" : "") + (isMaximized ? " is-maximized" : "")}
                style={style}
                onPointerDown={() => bringToFront(id)}
                aria-label={app.label + " window"}
              >
                <div
                  className="os-window-titlebar"
                  onPointerDown={(event) => startDrag(event, id)}
                  onPointerMove={moveDrag}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                >
                  <div className="os-window-identity">
                    <Icon aria-hidden="true" />
                    <span>{app.path}</span>
                  </div>
                  <div className="os-window-controls" aria-label={app.label + " window controls"}>
                    <button type="button" onClick={() => minimizeApp(id)} aria-label={"Minimize " + app.label}>
                      <Minus aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => toggleMaximize(id)} aria-label={(isMaximized ? "Restore " : "Maximize ") + app.label}>
                      <Maximize2 aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => closeApp(id)} aria-label={"Close " + app.label}>
                      <X aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="os-window-body">{renderApp(id, openApp)}</div>
                <footer className="os-window-statusbar">
                  <span>{app.description}</span>
                  <span>{isActive ? "active" : "background"} · s/os</span>
                </footer>
              </article>
            );
          })}
        </section>
      </main>

      <nav className="os-dock" aria-label="Applications">
        {apps.map((app) => {
          const Icon = app.icon;
          const isOpen = openWindows.includes(app.id);
          const isActive = activeId === app.id && !minimized.includes(app.id);
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => openApp(app.id)}
              className={isActive ? "is-active" : ""}
              aria-label={"Open " + app.label}
              aria-pressed={isActive}
              title={app.label}
            >
              <Icon aria-hidden="true" />
              <span>{app.label}</span>
              {isOpen && <i aria-hidden="true" />}
            </button>
          );
        })}
        <div className="os-dock-divider" />
        <a href="mailto:dabgarsaloni11@gmail.com" aria-label="Email Saloni" title="Email Saloni">
          <Mail aria-hidden="true" />
          <span>Email</span>
        </a>
      </nav>

      {spotlightOpen && (
        <div className="os-spotlight-backdrop" onMouseDown={closeSpotlight}>
          <section
            className="os-spotlight"
            role="dialog"
            aria-modal="true"
            aria-label="Search Saloni OS"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <label>
              <Search aria-hidden="true" />
              <span className="sr-only">Search apps and files</span>
              <input
                ref={spotlightInput}
                value={spotlightQuery}
                onChange={(event) => setSpotlightQuery(event.target.value)}
                placeholder="Open an app or file"
              />
              <kbd>esc</kbd>
            </label>
            <div className="os-spotlight-results">
              {spotlightResults.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    type="button"
                    key={app.id}
                    onClick={() => {
                      openApp(app.id);
                      closeSpotlight();
                    }}
                  >
                    <span className="os-result-icon"><Icon aria-hidden="true" /></span>
                    <span><strong>{app.label}</strong><small>{app.description}</small></span>
                    <ChevronRight aria-hidden="true" />
                  </button>
                );
              })}
              {spotlightResults.length === 0 && <p>No local result. Try “work”, “terminal”, or “skills”.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function BootScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="os-boot" role="status" aria-live="polite">
      <div className="os-boot-mark" aria-hidden="true">S</div>
      <div className="os-boot-copy">
        <p>Saloni OS / portfolio kernel 3.7</p>
        <ol>
          <li>mounting profile</li>
          <li>indexing 56 capabilities</li>
          <li>restoring workspace</li>
        </ol>
        <div className="os-boot-progress"><span /></div>
      </div>
      <button type="button" onClick={onSkip}>Skip startup</button>
    </div>
  );
}

function DesktopIcon({
  appId,
  label,
  icon: Icon,
  onOpen,
}: {
  appId: AppId;
  label: string;
  icon: ElementType;
  onOpen: (id: AppId) => void;
}) {
  return (
    <button type="button" className="os-desktop-icon" onDoubleClick={() => onOpen(appId)} onClick={() => onOpen(appId)}>
      <span><Icon aria-hidden="true" /></span>
      <strong>{label}</strong>
    </button>
  );
}

function renderApp(id: AppId, openApp: (id: AppId) => void) {
  if (id === "about") {
    return <AboutApp openApp={openApp} />;
  }
  if (id === "work") {
    return <WorkApp />;
  }
  if (id === "terminal") {
    return <TerminalApp />;
  }
  if (id === "notes") {
    return <NotesApp />;
  }
  if (id === "skills") {
    return <SkillsApp />;
  }
  return <SystemApp openApp={openApp} />;
}

function AboutApp({ openApp }: { openApp: (id: AppId) => void }) {
  return (
    <div className="os-about-app">
      <div className="os-about-copy">
        <p className="os-kicker">welcome.txt</p>
        <h1>Saloni<br /><em>Dabgar</em></h1>
        <p className="os-role">10x engineer, builder, and shipper.</p>
        <p className="os-about-creds">
          Jaguar Land Rover <span aria-hidden="true">|</span> IIT Kanpur
        </p>
        <div className="os-about-actions">
          <button type="button" className="os-primary-action" onClick={() => openApp("work")}>
            Open work <ArrowUpRight aria-hidden="true" />
          </button>
          <button type="button" onClick={() => openApp("terminal")}>
            Launch terminal
          </button>
        </div>
        <dl className="os-about-facts">
          <div><dt>Current system</dt><dd>Jaguar Land Rover</dd></div>
          <div><dt>Interface</dt><dd>CLI first</dd></div>
          <div><dt>Operating modes</dt><dd>Build · study · write</dd></div>
          <div><dt>Capability index</dt><dd>56 skills</dd></div>
        </dl>
      </div>
      <figure className="os-portrait-file">
        <div className="os-image-toolbar"><span>saloni.webp</span><span>1132 × 1389</span></div>
        <div className="os-image-canvas">
          <Image
            src="/profile/saloni.webp"
            alt="Saloni Dabgar"
            width={1132}
            height={1389}
            priority
            sizes="(max-width: 760px) 80vw, 360px"
          />
          <span aria-hidden="true">selected</span>
        </div>
        <figcaption>10x engineer / reader / student of movement</figcaption>
      </figure>
    </div>
  );
}

function WorkApp() {
  return (
    <div className="os-files-app">
      <aside>
        <p>Favorites</p>
        <button type="button" className="is-selected"><FolderKanban aria-hidden="true" /> Selected work</button>
        <Link href="/experience"><FileText aria-hidden="true" /> Experience.log</Link>
        <a href="https://github.com/salonidabgar" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /> GitHub</a>
        <p>Locations</p>
        <span><HardDrive aria-hidden="true" /> portfolio</span>
      </aside>
      <div className="os-file-view">
        <header>
          <div><button type="button" disabled>‹</button><button type="button" disabled>›</button></div>
          <span>portfolio / work / selected</span>
          <small>{projects.length} objects</small>
        </header>
        <ol>
          {projects.map((project, index) => (
            <li key={project.title}>
              <span className="os-file-icon"><FileText aria-hidden="true" /><i>{String(index + 1).padStart(2, "0")}</i></span>
              <div>
                <div className="os-file-meta"><span>{project.kind}</span><span>{project.context}</span></div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="os-file-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/projects" className="os-open-archive">Open full project archive <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  );
}

function TerminalApp() {
  return (
    <div className="os-terminal-app">
      <div className="os-terminal-banner">
        <span>last login: now on portfolio</span>
        <span>type a command or use the keys</span>
      </div>
      <CommandWorkbench />
    </div>
  );
}

function NotesApp() {
  return (
    <div className="os-notes-app">
      <aside>
        <p>Notebook</p>
        <button type="button" className="is-selected">All notes <span>12</span></button>
        <button type="button">Engineering <span>7</span></button>
        <button type="button">Practice <span>3</span></button>
        <button type="button">Fitness <span>2</span></button>
      </aside>
      <div className="os-notes-list">
        <header>
          <p>Field notes</p>
          <span>Ideas that survived the first draft.</span>
        </header>
        {notes.map((note) => (
          <Link href={note.href} key={note.title}>
            <span>{note.meta}</span>
            <strong>{note.title}</strong>
            <p>{note.detail}</p>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
        <Link href="/blog" className="os-all-notes">Browse all writing</Link>
      </div>
    </div>
  );
}

function SkillsApp() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visibleGroups = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.toLowerCase().includes(normalized)) }))
    .filter((group) => group.skills.length > 0);
  const visibleCount = visibleGroups.reduce((count, group) => count + group.skills.length, 0);

  return (
    <div className="os-skills-app">
      <header>
        <div>
          <p>Capability index</p>
          <strong>{visibleCount}<span>/56</span></strong>
        </div>
        <label>
          <Search aria-hidden="true" />
          <span className="sr-only">Search skills</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter capabilities" />
        </label>
      </header>
      <div className="os-skill-groups">
        {visibleGroups.map((group, index) => (
          <section key={group.label}>
            <p><span>{String(index + 1).padStart(2, "0")}</span>{group.label}</p>
            <div>{group.skills.map((skill) => <span key={skill} className="skill-key">{skill}</span>)}</div>
          </section>
        ))}
        {visibleGroups.length === 0 && <p className="os-empty-state">No capability matches “{query}”.</p>}
      </div>
    </div>
  );
}

function SystemApp({ openApp }: { openApp: (id: AppId) => void }) {
  return (
    <div className="os-system-app">
      <div className="os-system-mark">S</div>
      <div>
        <p className="os-kicker">about this system</p>
        <h2>Saloni OS</h2>
        <p>Portfolio kernel 3.7 · human build</p>
      </div>
      <dl>
        <div><dt>Processor</dt><dd>First-principles reasoning</dd></div>
        <div><dt>Primary interface</dt><dd>Command line</dd></div>
        <div><dt>Working memory</dt><dd>Systems, nature, cognition</dd></div>
        <div><dt>Input devices</dt><dd>Code, books, movement, questions</dd></div>
      </dl>
      <blockquote>
        “Software can simulate nature, model minds, and move metal, sometimes all at once.”
      </blockquote>
      <div className="os-system-links">
        <button type="button" onClick={() => openApp("skills")}>Inspect 56 capabilities</button>
        <a href="mailto:dabgarsaloni11@gmail.com">Start a conversation <Mail aria-hidden="true" /></a>
      </div>
    </div>
  );
}
