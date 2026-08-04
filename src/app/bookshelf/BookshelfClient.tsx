"use client";

import dynamic from "next/dynamic";
import { BlurReveal } from "@/components/TextReveal";

const Bookshelf = dynamic(() => import("@/components/Bookshelf"), {
  ssr: false,
  loading: () => (
    <div className="h-[440px] md:h-[560px] flex items-center justify-center mono-label text-[var(--muted)]">
      assembling volumes…
    </div>
  ),
});

const CURRENTLY = [
  { title: "Sapiens", author: "Yuval Noah Harari" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
];

export default function BookshelfClient() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-10">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="hero-anim flex items-center gap-4 mb-7 mono-label" style={{ animationDelay: "0.05s" }}>
            <span className="hidden sm:block h-px w-12 bg-[var(--bone-dim)] opacity-50" />
            <span>Bookshelf <span className="n">/</span> what shaped the thinking</span>
          </div>

          <h1 className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(3rem,10vw,7.5rem)]">
            <span className="text-[var(--bone)]">The </span>
            <span className="text-stroke">Shelf</span>
          </h1>

          <p
            className="hero-anim font-serif italic text-[clamp(1.15rem,2.3vw,1.9rem)] leading-[1.35] max-w-[min(46ch,100%)] mt-8 text-[var(--bone)]"
            style={{ animationDelay: "0.2s" }}
          >
            The books I keep returning to — <span className="hl-signal not-italic">evolution</span>,{" "}
            <span className="hl-signal not-italic">systems</span>, and{" "}
            <span className="hl-molten not-italic">philosophy</span>, with the odd Roman emperor.
            Drag to browse; click a cover to open it on Amazon.
          </p>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <BlurReveal>
            <div className="rounded-2xl overflow-hidden border border-[var(--ink-line)] bg-[#0b0b0c]">
              <Bookshelf />
            </div>
          </BlurReveal>
        </div>
      </section>

      <section className="pb-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="b-sechead">
            <span className="idx">02</span>
            <h2>On the nightstand</h2>
            <span className="tail mono-label hidden sm:inline">right now</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {CURRENTLY.map((b) => (
              <div key={b.title} className="b-card p-5">
                <p className="font-mono text-sm text-[var(--bone)]">{b.title}</p>
                <p className="font-mono text-[0.7rem] text-[var(--muted-light)] mt-1">{b.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
