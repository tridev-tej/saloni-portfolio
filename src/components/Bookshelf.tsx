"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Bookshelf — coverflow browse + 3D inspect (inspired by dahbiahmed.com).
 * SHELF: the front book is pulled out facing you; others lean back. Use ← →
 * (or click a book) to browse. INSPECT: click a book / "Inspect" to peek — the
 * book becomes a real 3D object you can drag to orbit and scroll to zoom, with
 * its description and an Amazon India link. Esc / "Back to shelf" returns.
 *
 * Covers load at runtime from Open Library (plain <img>, no CORS/WebGL issues);
 * a designed cover shows as fallback. Edit BOOKS to change titles/links/notes.
 */

type Accent = "molten" | "signal" | "bone";

interface Book {
  title: string;
  author: string;
  isbn: string;
  topic: string;
  note: string;
  accent: Accent;
  amazon: string;
}

const az = (q: string) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;

const BOOKS: Book[] = [
  { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780099590088", topic: "Human evolution", accent: "signal",
    note: "How one unremarkable ape came to run the planet — through fictions we all agree to believe: money, nations, rights. It reframes what you thought was 'natural.'",
    amazon: az("Sapiens Yuval Noah Harari") },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "9780141033570", topic: "Cognition", accent: "signal",
    note: "The two minds we run on — fast, intuitive System 1 and slow, deliberate System 2 — and the biases that quietly shape every decision.",
    amazon: az("Thinking Fast and Slow Daniel Kahneman") },
  { title: "Thinking in Systems", author: "Donella Meadows", isbn: "9781603580557", topic: "Systems theory", accent: "signal",
    note: "The clearest primer on seeing the world as stocks, flows, and feedback loops. It gave language to how I already think about problems.",
    amazon: az("Thinking in Systems Donella Meadows") },
  { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780199291151", topic: "Evolution", accent: "signal",
    note: "Dawkins flips the lens: we're survival machines built by genes. A cold, beautiful argument that changed how biologists think about life.",
    amazon: az("The Selfish Gene Richard Dawkins") },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", isbn: "9781544514215", topic: "Wealth & judgement", accent: "molten",
    note: "A distilled playbook on wealth, judgement, and happiness. Specific knowledge, leverage, long games — reading it feels like a mentor thinking out loud.",
    amazon: az("The Almanack of Naval Ravikant Eric Jorgenson") },
  { title: "Behave", author: "Robert Sapolsky", isbn: "9780099575061", topic: "Neurobiology", accent: "molten",
    note: "Sapolsky traces a single behaviour back one second, one hour, a lifetime, a million years — the fullest tour of why humans do what they do.",
    amazon: az("Behave Robert Sapolsky") },
  { title: "Meditations", author: "Marcus Aurelius", isbn: "9780140449334", topic: "Stoic philosophy", accent: "bone",
    note: "A Roman emperor's private notes on duty, mortality, and staying steady. Twenty centuries on it still reads like it was written for a hard Monday.",
    amazon: az("Meditations Marcus Aurelius Penguin Classics") },
  { title: "The Yoga Sutras of Patanjali", author: "Patanjali", isbn: "9781590309520", topic: "Yoga philosophy", accent: "bone",
    note: "The foundational text of yoga as a science of the mind. The source I keep returning to for my sutra essays.",
    amazon: az("The Yoga Sutras of Patanjali") },
];

const ACCENT: Record<Accent, string> = { molten: "#ff4a17", signal: "#00e7a7", bone: "#c9c2b4" };
const coverUrl = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

function Fallback({ book }: { book: Book }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3" style={{ background: "linear-gradient(160deg,#1b1b20,#0e0e10)" }}>
      <div className="h-1.5 w-8 rounded" style={{ background: ACCENT[book.accent] }} />
      <span className="font-serif text-sm text-[var(--bone)] leading-tight">{book.title}</span>
      <span className="font-mono text-[0.5rem] tracking-wide" style={{ color: ACCENT[book.accent] }}>{book.author.toUpperCase()}</span>
    </div>
  );
}

/** A real 3D book cuboid: front cover, spine, pages. */
function Book3D({ book, w, h, thick }: { book: Book; w: number; h: number; thick: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative" style={{ width: w, height: h, transformStyle: "preserve-3d" }}>
      {/* front cover */}
      <div className="absolute inset-0 overflow-hidden rounded-r-[3px]" style={{ transform: `translateZ(${thick / 2}px)`, boxShadow: "0 18px 30px -14px rgba(0,0,0,0.7)" }}>
        {failed ? <Fallback book={book} /> : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl(book.isbn)} alt={book.title} className="w-full h-full object-cover" onError={() => setFailed(true)} draggable={false} />
        )}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(255,255,255,0.10),transparent 42%)" }} />
      </div>
      {/* back */}
      <div className="absolute inset-0 rounded-l-[3px]" style={{ transform: `rotateY(180deg) translateZ(${thick / 2}px)`, background: "linear-gradient(160deg,#1a1a1e,#0e0e10)" }} />
      {/* spine (left) */}
      <div className="absolute top-0 left-0 h-full flex items-center justify-center" style={{ width: thick, transform: `rotateY(-90deg) translateZ(${thick / 2}px)`, transformOrigin: "left center", background: "linear-gradient(90deg,#050505,#1c1c20)" }}>
        <span className="font-mono tracking-wide text-[var(--bone-dim)] whitespace-nowrap" style={{ transform: "rotate(-90deg)", fontSize: Math.max(7, thick * 0.28) }}>
          {book.title.length > 24 ? book.title.slice(0, 22) + "…" : book.title}
        </span>
      </div>
      {/* pages (right) */}
      <div className="absolute top-0 right-0 h-full" style={{ width: thick, transform: `rotateY(90deg) translateZ(${w - thick / 2}px)`, transformOrigin: "right center", background: "repeating-linear-gradient(90deg,#e8e2d5,#e8e2d5 1px,#cfc8b8 2px,#cfc8b8 3px)" }} />
      {/* top */}
      <div className="absolute top-0 left-0 w-full" style={{ height: thick, transform: `rotateX(90deg) translateZ(${thick / 2}px)`, transformOrigin: "top center", background: "#d8d2c4" }} />
    </div>
  );
}

const BW = 178, BH = 264, BT = 30;

export default function Bookshelf() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [inspecting, setInspecting] = useState(false);
  const [orbit, setOrbit] = useState({ x: -8, y: 22 });
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const go = useCallback((d: number) => setActive((a) => Math.max(0, Math.min(BOOKS.length - 1, a + d))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (inspecting) { if (e.key === "Escape") setInspecting(false); return; }
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Enter") setInspecting(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspecting, go]);

  // inspect orbit
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, ox: orbit.x, oy: orbit.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setOrbit({
      x: Math.max(-40, Math.min(40, drag.current.ox - (e.clientY - drag.current.y) * 0.3)),
      y: drag.current.oy + (e.clientX - drag.current.x) * 0.4,
    });
  };
  const onUp = (e: React.PointerEvent) => { drag.current = null; (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId); };
  const onWheel = (e: React.WheelEvent) => setZoom((z) => Math.max(0.7, Math.min(1.8, z - e.deltaY * 0.0012)));

  // Reduced motion → simple cover grid
  if (reduce) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {BOOKS.map((b) => (
          <a key={b.title} href={b.amazon} target="_blank" rel="noopener noreferrer" className="block">
            <div className="aspect-[2/3] rounded-md overflow-hidden border border-[var(--ink-line)] bg-[var(--card)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl(b.isbn)} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <p className="font-mono text-[0.7rem] text-[var(--bone)] mt-2">{b.title}</p>
          </a>
        ))}
      </div>
    );
  }

  const book = BOOKS[active];

  return (
    <div className="relative w-full h-[540px] md:h-[600px] overflow-hidden select-none">
      {/* ================= SHELF (coverflow) ================= */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${inspecting ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="absolute left-0 right-0 top-[42%] -translate-y-1/2" style={{ perspective: 1500, height: BH }}>
          <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
            {BOOKS.map((b, i) => {
              const off = i - active;
              if (Math.abs(off) > 4) return null;
              const center = off === 0;
              const sign = Math.sign(off);
              const style: React.CSSProperties = center
                ? { transform: `translate(-50%,-50%) translateX(60px) translateZ(180px) rotateY(-6deg) scale(1.02)`, zIndex: 60, opacity: 1 }
                : {
                    transform: `translate(-50%,-50%) translateX(${off * 92 - 60}px) translateZ(${-Math.abs(off) * 80}px) rotateY(${-sign * 46}deg) scale(${Math.max(0.72, 1 - Math.abs(off) * 0.07)})`,
                    zIndex: 40 - Math.abs(off),
                    opacity: Math.max(0.4, 1 - Math.abs(off) * 0.2),
                    filter: `brightness(${Math.max(0.55, 1 - Math.abs(off) * 0.16)})`,
                  };
              return (
                <button
                  key={b.title}
                  aria-label={center ? `Inspect ${b.title}` : `Select ${b.title}`}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{ transformStyle: "preserve-3d", transition: "transform 0.5s cubic-bezier(0.2,0.9,0.2,1), opacity 0.5s, filter 0.5s", ...style }}
                  onClick={() => (center ? setInspecting(true) : setActive(i))}
                >
                  <Book3D book={b} w={BW} h={BH} thick={BT} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ground shadow */}
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 w-[220px] h-6 rounded-[50%] blur-lg" style={{ marginTop: BH / 2 - 10, background: "rgba(0,0,0,0.55)" }} />

        {/* arrows */}
        <button onClick={() => go(-1)} disabled={active === 0} aria-label="Previous book"
          className="absolute left-4 top-[42%] -translate-y-1/2 z-[70] w-11 h-11 rounded-full border border-[var(--ink-line)] flex items-center justify-center text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--primary)] disabled:opacity-25 disabled:pointer-events-none transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={() => go(1)} disabled={active === BOOKS.length - 1} aria-label="Next book"
          className="absolute right-4 top-[42%] -translate-y-1/2 z-[70] w-11 h-11 rounded-full border border-[var(--ink-line)] flex items-center justify-center text-[var(--bone-dim)] hover:text-[var(--bone)] hover:border-[var(--primary)] disabled:opacity-25 disabled:pointer-events-none transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* info under active book */}
        <div className="absolute left-0 right-0 bottom-6 px-8 flex flex-col items-center text-center">
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--muted)] mb-2">
            <span className="text-[var(--primary)]">{String(active + 1).padStart(2, "0")}</span> / {String(BOOKS.length).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[var(--bone)] leading-tight">{book.title}</h3>
          <p className="font-mono text-[0.72rem] text-[var(--muted-light)] mt-1">{book.author}</p>
          <button onClick={() => setInspecting(true)}
            className="group mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--ink-line)] font-mono text-[0.68rem] tracking-[0.1em] uppercase text-[var(--bone)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
            Inspect <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ================= INSPECT ================= */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${inspecting ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="grid md:grid-cols-2 h-full">
          {/* orbitable book */}
          <div
            className="relative flex items-center justify-center touch-none"
            style={{ perspective: 1400, cursor: drag.current ? "grabbing" : "grab" }}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onWheel={onWheel}
          >
            <div style={{ transformStyle: "preserve-3d", transform: `rotateX(${orbit.x}deg) rotateY(${orbit.y}deg) scale(${zoom})`, transition: drag.current ? "none" : "transform 0.4s ease" }}>
              {inspecting && <Book3D book={book} w={230} h={340} thick={44} />}
            </div>
          </div>

          {/* info panel */}
          <div className="relative flex flex-col justify-center px-8 md:px-10 border-t md:border-t-0 md:border-l border-[var(--ink-line)]">
            <button onClick={() => setInspecting(false)} className="self-start font-mono text-[0.72rem] text-[var(--muted-light)] hover:text-[var(--bone)] mb-5 transition-colors">
              &larr; Back to shelf
            </button>
            <div className="mono-label text-[0.58rem] mb-2" style={{ color: ACCENT[book.accent] }}>{book.topic}</div>
            <h3 className="font-serif text-3xl text-[var(--bone)] leading-tight">{book.title}</h3>
            <p className="font-mono text-[0.75rem] text-[var(--muted-light)] mt-1.5">{book.author}</p>
            <p className="text-sm text-[var(--muted-light)] leading-relaxed mt-5 max-w-sm">{book.note}</p>
            <a href={book.amazon} target="_blank" rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-[var(--primary)] w-fit">
              View on Amazon.in <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <span className="mono-label text-[0.56rem] text-[var(--muted)] mt-8">drag to orbit · scroll to zoom · esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
