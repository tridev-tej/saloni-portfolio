import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/TransitionLink";

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
      <section className="site-shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:py-24">
        <div>
          <p className="eyebrow">Software developer at Jaguar Land Rover</p>
          <h1 className="hero-title mt-5">
            Saloni <span className="display-serif italic text-[var(--orange)]">Dabgar</span>
          </h1>
          <p className="lead mt-8">
            I build software that runs inside vehicles, then write about the systems that run inside people.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="button">
              See my work <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="button button-secondary">Read my essays</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            <a className="touch-link hover:text-[var(--paper)]" href="https://github.com/salonidabgar" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="touch-link hover:text-[var(--paper)]" href="https://www.linkedin.com/in/saloni-dabgar-695864194/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="touch-link hover:text-[var(--paper)]" href="mailto:dabgarsaloni11@gmail.com">Email</a>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="absolute -left-4 top-6 h-[calc(100%-1.5rem)] w-full border border-[var(--orange)]" aria-hidden="true" />
          <Image
            src="/profile/saloni.webp"
            alt="Saloni Dabgar"
            width={720}
            height={880}
            priority
            className="relative aspect-[4/5] w-full object-cover object-top grayscale"
          />
          <figcaption className="mt-4 text-sm text-[var(--muted)]">Engineer, reader, and student of movement.</figcaption>
        </figure>
      </section>

      <section className="paper-section section-space">
        <div className="narrow-shell">
          <p className="eyebrow">Why I build</p>
          <blockquote className="mt-6 font-serif text-[clamp(2.35rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em]">
            Software can simulate nature, model minds, and move metal, sometimes all at once.
          </blockquote>
        </div>
      </section>

      <section className="site-shell section-space">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div>
            <p className="eyebrow">About</p>
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
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/experience" className="text-link">View my experience <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link href="/blog" className="text-link">Read my thinking <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </div>

          <aside className="section-rule pt-6">
            <p className="font-medium">Currently reading</p>
            <ul className="mt-5 space-y-5">
              {reading.map(([title, author]) => (
                <li key={title}>
                  <p>{title}</p>
                  <p className="text-sm text-[var(--muted)]">{author}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 font-medium">Recurring interests</p>
            <p className="mt-4 text-sm leading-7 text-[var(--paper-dim)]">
              Embedded systems, philosophy, evolution, psychology, nature, yoga, calisthenics, AI, and blockchain.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--ink-soft)]">
        <div className="site-shell section-space">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="eyebrow">Selected work</p>
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
                <Link href="/projects" className="mt-4 text-link md:mt-0">Details <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-shell section-space grid gap-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2 className="section-heading mt-4">What I build with.</h2>
          <dl className="mt-8 space-y-6">
            <div className="section-rule pt-4">
              <dt className="font-medium">Embedded</dt>
              <dd className="mt-2 text-[var(--paper-dim)]">C, C++, FreeRTOS, Linux, Boost.Beast, OpenSSL</dd>
            </div>
            <div className="section-rule pt-4">
              <dt className="font-medium">Applications</dt>
              <dd className="mt-2 text-[var(--paper-dim)]">Python, FastAPI, React, Next.js, PostgreSQL, Redis</dd>
            </div>
            <div className="section-rule pt-4">
              <dt className="font-medium">Decentralized systems</dt>
              <dd className="mt-2 text-[var(--paper-dim)]">Solidity, Ethereum, ERC-20, Uniswap</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="eyebrow">Bookshelf</p>
          <h2 className="section-heading mt-4">Ideas worth returning to.</h2>
          <p className="section-intro mt-6">
            Notes on the books that shaped how I think about cognition, systems, evolution, judgment, and practice.
          </p>
          <Link href="/bookshelf" className="button button-secondary mt-8">Browse the shelf</Link>
        </div>
      </section>

      <section className="paper-section section-space">
        <div className="site-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="section-heading mt-4 max-w-3xl">Have a hard systems problem or an interesting idea?</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:dabgarsaloni11@gmail.com" className="button">Email me</a>
            <a href="https://calendly.com/dabgarsaloni11/30min" target="_blank" rel="noopener noreferrer" className="button button-secondary border-black text-black hover:border-black">Book a call</a>
          </div>
        </div>
      </section>
    </div>
  );
}
