import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Command } from "lucide-react";
import Link from "@/components/TransitionLink";
import CommandWorkbench from "@/components/CommandWorkbench";

const projects = [
  {
    category: "Embedded systems",
    title: "Software Over-The-Air Controller",
    context: "Jaguar Land Rover",
    description: "A state-machine controller for secure vehicle software updates, with pause, resume, cancel, and encrypted transport.",
    technologies: ["C++", "Boost.Beast", "OpenSSL", "Linux"],
  },
  {
    category: "Blockchain",
    title: "Currency Exchange Platform",
    context: "University of Zurich",
    description: "An ERC-20 exchange and liquidity-pool prototype built to understand trust, flow, and financial infrastructure from the inside.",
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3"],
  },
  {
    category: "Full stack",
    title: "TaskFlow",
    context: "SURGE, IIT Kanpur",
    description: "Async task orchestration for 1,000+ concurrent users, with real-time notifications and a 40% improvement over the baseline.",
    technologies: ["FastAPI", "React", "PostgreSQL", "Redis"],
  },
  {
    category: "Embedded systems",
    title: "E2E Headlamp Communication",
    context: "Jaguar Land Rover",
    description: "An encrypted communication layer for headlamp actuators that improved vehicle communication efficiency by 10%.",
    technologies: ["C", "Linux", "Vehicle communication"],
  },
];

const reading = [
  ["Sapiens", "Yuval Noah Harari"],
  ["Thinking, Fast and Slow", "Daniel Kahneman"],
  ["The Almanack of Naval Ravikant", "Eric Jorgenson"],
];

export default function Home() {
  return (
    <div>
      <section className="site-shell workstation-hero">
        <div className="hero-copy">
          <p className="path-label"><span>~/profile</span>/saloni.md</p>
          <h1 className="hero-title mt-6">
            Saloni <span className="display-serif italic text-[var(--orange)]">Dabgar</span>
          </h1>
          <p className="lead mt-8">
            I build software that runs inside vehicles, then write about the systems that run inside people.
          </p>

          <div className="hero-actions mt-9">
            <Link href="/projects" className="command-button command-button-primary">
              <span>01</span> ./open-work <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="command-button">
              <span>02</span> ./read-notes
            </Link>
          </div>

          <dl className="hero-ledger mt-12">
            <div><dt>role</dt><dd>Embedded engineer</dd></div>
            <div><dt>interface</dt><dd>CLI first</dd></div>
            <div><dt>index</dt><dd>56 skills</dd></div>
            <div><dt>mode</dt><dd>Build · study · write</dd></div>
          </dl>
        </div>

        <figure className="portrait-inspector">
          <div className="inspector-titlebar">
            <span>preview</span>
            <span>saloni.webp</span>
            <span>100%</span>
          </div>
          <div className="portrait-canvas">
            <span className="canvas-coordinate canvas-coordinate-top">x: 720</span>
            <span className="canvas-coordinate canvas-coordinate-side">y: 880</span>
            <Image
              src="/profile/saloni.webp"
              alt="Saloni Dabgar"
              width={720}
              height={880}
              priority
              className="aspect-[4/5] w-full object-cover object-top grayscale"
            />
          </div>
          <figcaption>
            <span>Engineer · reader · student of movement</span>
            <span>RGB / portrait</span>
          </figcaption>
        </figure>
      </section>

      <section className="workbench-section border-y border-[var(--line)]">
        <div className="site-shell grid gap-12 py-16 lg:grid-cols-[0.52fr_1.48fr] lg:py-24">
          <div className="workbench-intro">
            <div className="command-mark"><Command aria-hidden="true" className="h-5 w-5" /></div>
            <p className="path-label mt-8">~/workbench</p>
            <h2 className="section-heading mt-4">Terminal, first.</h2>
            <p className="section-intro mt-6">
              I prefer the CLI because the shortest path from intent to output usually has fewer screens.
            </p>
            <div className="workbench-count mt-10">
              <strong>56</strong>
              <span>skills and working concepts, indexed across four operating modes.</span>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-[var(--muted)]">
              Try a command <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </p>
          </div>
          <CommandWorkbench />
        </div>
      </section>

      <section className="paper-section section-space">
        <div className="narrow-shell">
          <p className="path-label text-[var(--orange-dark)]">~/principles/why-i-build.txt</p>
          <blockquote className="mt-7 font-serif text-[clamp(2.35rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em]">
            Software can simulate nature, model minds, and move metal, sometimes all at once.
          </blockquote>
        </div>
      </section>

      <section className="site-shell section-space">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div>
            <p className="path-label">~/profile/about.md</p>
            <h2 className="section-heading mt-4">Systems, in code and beyond it.</h2>
            <div className="mt-8 max-w-2xl space-y-6 text-lg text-[var(--paper-dim)]">
              <p>
                I work on embedded automotive software at Jaguar Land Rover, where small decisions have to remain correct inside large, physical systems. IIT Kanpur taught me to reason from first principles; production software taught me to respect every edge case.
              </p>
              <p>
                Outside engineering, I study philosophy, evolution, psychology, and the body. The same ideas keep resurfacing: feedback, adaptation, restraint, and knowing which signal matters.
              </p>
              <p>
                I train for strength, stillness, control, and play through the gym, yoga, calisthenics, and badminton.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/experience" className="command-button"><span>↳</span> experience.log</Link>
              <Link href="/blog" className="command-button"><span>↳</span> thinking/</Link>
            </div>
          </div>

          <aside className="reading-index">
            <div className="reading-index-title"><span>reading.queue</span><span>{reading.length} items</span></div>
            <ol>
              {reading.map(([title, author], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><p>{title}</p><p>{author}</p></div>
                </li>
              ))}
            </ol>
            <div className="reading-index-footer">
              <span>recurring processes</span>
              <p>philosophy / evolution / psychology / nature / strength / stillness</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--ink-soft)]">
        <div className="site-shell section-space">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="path-label">~/work/selected</p>
              <h2 className="section-heading mt-4">Systems with real constraints.</h2>
            </div>
            <p className="section-intro md:justify-self-end">
              Automotive firmware, distributed systems, and software built to hold up under load.
            </p>
          </div>

          <ol className="editorial-list mt-14">
            {projects.map((project, index) => (
              <li key={project.title} className="editorial-row">
                <span className="editorial-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="meta-line">
                    <span>{project.category}</span>
                    <span>{project.context}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em]">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-[var(--paper-dim)]">{project.description}</p>
                  <div className="topic-list mt-5">
                    {project.technologies.map((technology) => <span key={technology} className="topic">{technology}</span>)}
                  </div>
                </div>
                <Link href="/projects" className="command-button command-button-small mt-4 md:mt-0">
                  inspect <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-shell section-space grid gap-14 md:grid-cols-2">
        <div>
          <p className="path-label">~/toolchain</p>
          <h2 className="section-heading mt-4">Four modes. One system.</h2>
          <dl className="mode-index mt-8">
            <div><dt>01 / embedded</dt><dd>Code that touches metal and survives reality.</dd></div>
            <div><dt>02 / product</dt><dd>Interfaces, APIs, and software people can use.</dd></div>
            <div><dt>03 / intelligence</dt><dd>Models, data, performance, and feedback loops.</dd></div>
            <div><dt>04 / thinking</dt><dd>Writing and research that make the system legible.</dd></div>
          </dl>
        </div>

        <div className="bookshelf-callout">
          <p className="path-label">~/library</p>
          <h2 className="section-heading mt-4">Ideas worth returning to.</h2>
          <p className="section-intro mt-6">
            Notes on books that shaped how I think about cognition, systems, evolution, judgment, and practice.
          </p>
          <Link href="/bookshelf" className="command-button mt-8"><span>↳</span> open bookshelf/</Link>
        </div>
      </section>

      <section className="paper-section section-space">
        <div className="site-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="path-label text-[var(--orange-dark)]">~/contact</p>
            <h2 className="section-heading mt-4 max-w-3xl">Have a hard systems problem or an interesting idea?</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:dabgarsaloni11@gmail.com" className="command-button command-button-on-paper command-button-primary">email --open</a>
            <a href="https://calendly.com/dabgarsaloni11/30min" target="_blank" rel="noopener noreferrer" className="command-button command-button-on-paper">calendar --30m</a>
          </div>
        </div>
      </section>
    </div>
  );
}
