"use client";

import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "Software Over-The-Air Controller",
    description: "A state-machine controller for secure automotive software updates with pause, resume, cancel, and end-to-end encrypted transport.",
    technologies: ["C++", "Boost.Beast", "OpenSSL", "SSL/TLS", "Linux"],
    category: "Embedded systems",
    context: "Jaguar Land Rover",
    github: null,
  },
  {
    title: "Blockchain Currency Exchange Platform",
    description: "A decentralized exchange where smart contracts manage trust and liquidity pools manage flow, built around ERC-20 tokens on Ethereum.",
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3", "Remix"],
    category: "Blockchain",
    context: "University of Zurich",
    github: "https://github.com/salonidabgar",
  },
  {
    title: "TaskFlow",
    description: "Async task orchestration for 1,000+ concurrent users, with real-time notifications and a 40% performance improvement over the baseline.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    category: "Full stack",
    context: "SURGE, IIT Kanpur",
    github: "https://github.com/salonidabgar",
  },
  {
    title: "UDP Serializer-Deserializer",
    description: "Real-time data transfer between Vehicle Stability Control and Automatic Braking systems, designed for deterministic communication.",
    technologies: ["C++", "FreeRTOS", "Socket programming", "IPC"],
    category: "Embedded systems",
    context: "Automotive communication",
    github: null,
  },
  {
    title: "Deep into CNNs",
    description: "ResNet101 and VGG16 implementations in PyTorch, reaching 92.2% accuracy across 275 bird species.",
    technologies: ["Python", "PyTorch", "CNN", "ResNet101", "VGG16"],
    category: "AI/ML",
    context: "Independent project",
    github: "https://github.com/salonidabgar",
  },
  {
    title: "E2E Headlamp Communication System",
    description: "An encrypted communication layer for headlamp actuators that improved vehicle communication efficiency by 10%.",
    technologies: ["C", "Linux", "Embedded systems", "Vehicle communication"],
    category: "Embedded systems",
    context: "Jaguar Land Rover",
    github: null,
  },
];

const categories = ["All", "Embedded systems", "Full stack", "AI/ML", "Blockchain"];

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <header className="site-shell section-space">
        <p className="path-label"><span>~/work</span>/index</p>
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
            return (
              <li key={project.title} className="editorial-row">
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
                  <div className="topic-list mt-5">
                    {project.technologies.map((technology) => <span key={technology} className="topic">{technology}</span>)}
                  </div>
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
