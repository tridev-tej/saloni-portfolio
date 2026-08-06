"use client";

import { useState } from "react";
import { ArrowUpRight, Github, ChevronDown, FileText, PlayCircle } from "lucide-react";
import Link from "@/components/TransitionLink";

const projects = [
  {
    title: "Listing Intelligence",
    description: "A Chrome extension that sends a fleet of Claude agents at a live Amazon listing and hands back a compliant, ready-to-publish title.",
    summary:
      "Amazon caps product titles at 75 characters, and if yours is longer its own model quietly rewrites it — dropping the details a seller was careful about, while the seller stays legally responsible for the result. Listing Intelligence reads the live page and runs four narrow research agents in parallel (competitors, keywords, reviews, compliance rules), then a synthesiser writes the title and a separate adversarial agent red-teams the draft before anyone sees it. Every agent is handed a schema instead of being asked to reply in JSON, cheap models do the legwork while the strong one writes the output that ships, and character counting happens in plain code — so the tool cannot do the one thing it exists to prevent.",
    technologies: ["TypeScript", "Chrome MV3", "Node", "Claude API", "Multi-agent", "Structured output"],
    category: "AI & agents",
    context: "Independent build",
    github: null,
    writeup: "/blog/an-agent-fleet-for-amazon-listings",
    demo: "https://www.loom.com/share/4454fb1b4c1842e7bcd7f80f94bf17ff",
    poster: null,
  },
  {
    title: "Saarthi — Assurance-Gated Driver Monitoring",
    description: "A driver-monitoring POC that asks a second question before it speaks: does it currently have enough evidence to support this prediction?",
    summary:
      "Most driver-monitoring systems answer one question — is the driver drowsy right now. Saarthi answers that with a deterministic reactive lane, then adds a predictive lane that forecasts at +2, +5, and +10 seconds and refuses to speak unless the evidence supports it. Face landmarks become a small, interpretable time series; a causal buffer keeps the model honest about not seeing the future; Shift-Gated Conformal Abstention and explicit sensor-health checks decide whether a forecast is supportable, and every meaningful decision is written to an audit log. It ships behind a virtual CAN seam so the integration path is real without touching a vehicle. A research POC, not a homologated safety component — and it says so.",
    technologies: ["Python", "PyTorch", "MediaPipe", "Conformal prediction", "Edge AI", "CAN"],
    category: "AI & agents",
    context: "Tata InnFuze · JLR",
    github: null,
    writeup: "/blog/inside-saarthi-assurance-gated-driver-monitoring",
    demo: "/video/saarthi-demo.mp4",
    poster: "/video/saarthi-demo-poster.jpg",
  },
  {
    title: "Software Over-The-Air Controller",
    description: "A state-machine controller for secure automotive software updates with pause, resume, cancel, and end-to-end encrypted transport.",
    summary:
      "When a vehicle downloads a software update, the process has to survive dropped connections, low battery, and interrupted power without ever leaving the car in a broken state. I designed a state-machine controller that makes secure OTA updates resumable and cancellable at any point, with the transport encrypted end to end. It runs on production Jaguar Land Rover systems.",
    technologies: ["C++", "Boost.Beast", "OpenSSL", "SSL/TLS", "Linux"],
    category: "Embedded systems",
    context: "Jaguar Land Rover",
    github: null,
    writeup: null,
    demo: null,
    poster: null,
  },
  {
    title: "Blockchain Currency Exchange Platform",
    description: "A decentralized exchange where smart contracts manage trust and liquidity pools manage flow, built around ERC-20 tokens on Ethereum.",
    summary:
      "A decentralized exchange built to understand how financial infrastructure works from the inside. Smart contracts hold the trust and enforce the rules; automated liquidity pools set prices and handle the flow. Users swap ERC-20 tokens on Ethereum with no intermediary — the contract itself is the counterparty.",
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3", "Remix"],
    category: "Blockchain",
    context: "University of Zurich",
    github: "https://github.com/salonidabgar",
    writeup: null,
    demo: null,
    poster: null,
  },
  {
    title: "TaskFlow",
    description: "Async task orchestration for 1,000+ concurrent users, with real-time notifications and a 40% performance improvement over the baseline.",
    summary:
      "An async task-orchestration service built for scale. It sustains 1,000+ concurrent users with real-time notifications and runs 40% faster than the baseline it replaced. Building it was a lesson in how systems actually behave under load — where queues back up, where latency hides, and how to design for graceful degradation.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    category: "Full stack",
    context: "SURGE, IIT Kanpur",
    github: "https://github.com/salonidabgar",
    writeup: null,
    demo: null,
    poster: null,
  },
  {
    title: "UDP Serializer-Deserializer",
    description: "Real-time data transfer between Vehicle Stability Control and Automatic Braking systems, designed for deterministic communication.",
    summary:
      "A serialization layer for real-time data flowing between Vehicle Stability Control and Automatic Braking. This is communication that has to be deterministic and correct every single time — the failure mode is a car that doesn't stop. Built on FreeRTOS with raw sockets and IPC for predictable, low-latency transfer.",
    technologies: ["C++", "FreeRTOS", "Socket programming", "IPC"],
    category: "Embedded systems",
    context: "Automotive communication",
    github: null,
    writeup: null,
    demo: null,
    poster: null,
  },
  {
    title: "Deep into CNNs",
    description: "ResNet101 and VGG16 implementations in PyTorch, reaching 92.2% accuracy across 275 bird species.",
    summary:
      "ResNet101 and VGG16 implemented from scratch in PyTorch, reaching 92.2% accuracy classifying 275 bird species. Beyond the numbers, it was a study in how pattern recognition works — how stacked convolutions learn edges, then textures, then whole concepts, whether in silicon or in the visual cortex.",
    technologies: ["Python", "PyTorch", "CNN", "ResNet101", "VGG16"],
    category: "AI & agents",
    context: "Independent project",
    github: "https://github.com/salonidabgar",
    writeup: null,
    demo: null,
    poster: null,
  },
  {
    title: "E2E Headlamp Communication System",
    description: "An encrypted communication layer for headlamp actuators that improved vehicle communication efficiency by 10%.",
    summary:
      "An end-to-end encrypted communication layer for headlamp actuators that improved communication efficiency by 10%. A small percentage that compounds into real impact when multiplied across every vehicle on the road — the kind of low-level optimisation that never shows up in a spec sheet but matters at scale.",
    technologies: ["C", "Linux", "Embedded systems", "Vehicle communication"],
    category: "Embedded systems",
    context: "Jaguar Land Rover",
    github: null,
    writeup: null,
    demo: null,
    poster: null,
  },
];

const categories = ["All", "AI & agents", "Embedded systems", "Full stack", "Blockchain"];

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  // A self-hosted demo plays inline inside the expanded panel; an external one is just a link.
  const inlineVideo = project.demo?.endsWith(".mp4") ? project.demo : null;

  return (
    <li className="editorial-row">
      <span className="editorial-index">{String(index).padStart(2, "0")}</span>
      <article>
        <div className="meta-line">
          <span>{project.category}</span>
          <span>{project.context}</span>
        </div>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em]">
          {project.title}
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--paper-dim)]">{project.description}</p>

        {/* Expandable full summary — animates height via grid-rows */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="mt-4 max-w-3xl text-[var(--paper)]">{project.summary}</p>
            {inlineVideo ? (
              <figure className="mt-6 max-w-3xl">
                <video
                  controls
                  preload="none"
                  playsInline
                  poster={project.poster ?? undefined}
                  className="w-full border border-[var(--line)] bg-black"
                >
                  <source src={inlineVideo} type="video/mp4" />
                </video>
                <figcaption className="mt-2 font-mono text-xs text-[var(--muted)]">
                  Demo — the Saarthi cockpit running live.
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>

        <div className="topic-list mt-5">
          {project.technologies.map((technology) => (
            <span key={technology} className="topic">{technology}</span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--orange)] transition-colors hover:text-[var(--primary-light)]"
        >
          {open ? "Show less" : inlineVideo ? "Read the full summary + watch the demo" : "Read the full summary"}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </article>
      <div className="mt-4 flex flex-col items-start gap-2 md:mt-0 md:items-end">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
            <Github aria-hidden="true" className="h-4 w-4" /> Source
          </a>
        ) : (
          <span className="text-sm text-[var(--muted)]">Proprietary</span>
        )}
        {project.writeup ? (
          <Link href={project.writeup} className="text-link">
            <FileText aria-hidden="true" className="h-4 w-4" /> Write-up
          </Link>
        ) : null}
        {inlineVideo ? (
          <button type="button" onClick={() => setOpen(true)} className="text-link">
            <PlayCircle aria-hidden="true" className="h-4 w-4" /> Demo video
          </button>
        ) : project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-link">
            <PlayCircle aria-hidden="true" className="h-4 w-4" /> Demo video
          </a>
        ) : null}
      </div>
    </li>
  );
}

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <header className="site-shell section-space">
        <p className="path-label"><span>~/work</span>/index</p>
        <h1 className="page-title mt-5">Built for real constraints.</h1>
        <p className="lead mt-8">
          Agent systems that know their own limits, embedded firmware that cannot afford to be wrong, and distributed
          applications built to hold up under load.
        </p>
      </header>

      <section className="border-y border-[var(--line)] bg-[var(--ink-soft)] py-6">
        <div className="site-shell filter-row" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${activeCategory === category ? "filter-button-active" : ""}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="site-shell section-space">
        <ol className="editorial-list">
          {filtered.map((project) => {
            const index = projects.findIndex((item) => item.title === project.title) + 1;
            return <ProjectRow key={project.title} project={project} index={index} />;
          })}
        </ol>
      </section>

      <section className="paper-section section-space">
        <div className="site-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">More on GitHub</p>
            <h2 className="section-heading mt-4 max-w-3xl">Code, experiments, and work in progress.</h2>
          </div>
          <a href="https://github.com/salonidabgar" target="_blank" rel="noopener noreferrer" className="command-button command-button-on-paper command-button-primary">
            github --open <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
