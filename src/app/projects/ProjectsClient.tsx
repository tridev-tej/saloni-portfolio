"use client";

import { useState } from "react";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";

const projects = [
  {
    title: "Software Over-The-Air Controller",
    description: "A state-machine controller for secure automotive software updates with pause, resume, cancel, and end-to-end encrypted transport.",
    summary:
      "When a vehicle downloads a software update, the process has to survive dropped connections, low battery, and interrupted power without ever leaving the car in a broken state. I designed a state-machine controller that makes secure OTA updates resumable and cancellable at any point, with the transport encrypted end to end. It runs on production Jaguar Land Rover systems.",
    technologies: ["C++", "Boost.Beast", "OpenSSL", "SSL/TLS", "Linux"],
    category: "Embedded systems",
    context: "Jaguar Land Rover",
    github: null,
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
  },
  {
    title: "Deep into CNNs",
    description: "ResNet101 and VGG16 implementations in PyTorch, reaching 92.2% accuracy across 275 bird species.",
    summary:
      "ResNet101 and VGG16 implemented from scratch in PyTorch, reaching 92.2% accuracy classifying 275 bird species. Beyond the numbers, it was a study in how pattern recognition works — how stacked convolutions learn edges, then textures, then whole concepts, whether in silicon or in the visual cortex.",
    technologies: ["Python", "PyTorch", "CNN", "ResNet101", "VGG16"],
    category: "AI/ML",
    context: "Independent project",
    github: "https://github.com/salonidabgar",
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
  },
];

const categories = ["All", "Embedded systems", "Full stack", "AI/ML", "Blockchain"];

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [open, setOpen] = useState(false);

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
          {open ? "Show less" : "Read the full summary"}
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </article>
      <div className="mt-4 md:mt-0">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">
            <Github aria-hidden="true" className="h-4 w-4" /> Source
          </a>
        ) : (
          <span className="text-sm text-[var(--muted)]">Proprietary</span>
        )}
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
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title mt-5">Built for real constraints.</h1>
        <p className="lead mt-8">
          Embedded firmware, distributed applications, and experiments that made difficult systems easier to understand.
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
          <a href="https://github.com/salonidabgar" target="_blank" rel="noopener noreferrer" className="button">
            Open GitHub <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
