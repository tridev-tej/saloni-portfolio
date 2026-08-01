"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Car, Link2, CheckSquare, Radio, Brain, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlurReveal } from "@/components/TextReveal";

const projects: {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github: string | null;
  live: string | null;
  featured: boolean;
  gradient: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Software Over-The-Air (SOTA) Controller",
    description: "When your Jaguar downloads a software update at 2am, this is the system I built. State-machine architecture for secure OTA updates with pause/resume/cancel — encrypted end-to-end.",
    technologies: ["C++", "Boost.Beast", "OpenSSL", "SSL/TLS", "Linux"],
    category: "Embedded Systems",
    github: null,
    live: null,
    featured: true,
    gradient: "from-[var(--primary-dark)] to-[var(--primary)]",
    icon: Car,
  },
  {
    title: "Blockchain Currency Exchange Platform",
    description: "A decentralized exchange where smart contracts handle the trust and liquidity pools handle the flow. ERC-20 tokens on Ethereum — built to understand how financial systems work from the inside.",
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3", "Remix"],
    category: "Blockchain",
    github: "https://github.com/salonidabgar",
    live: null,
    featured: true,
    gradient: "from-[var(--accent)] to-amber-600",
    icon: Link2,
  },
  {
    title: "TaskFlow - Async Task Management",
    description: "Built for 1000+ concurrent users and 40% faster than baseline. Async task orchestration with real-time notifications — the kind of system that teaches you how systems actually work under load.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    category: "Full Stack",
    github: "https://github.com/salonidabgar",
    live: null,
    featured: true,
    gradient: "from-[var(--secondary)] to-[var(--secondary-dark)]",
    icon: CheckSquare,
  },
  {
    title: "UDP Serializer-Deserializer",
    description: "Real-time data flow between Vehicle Stability Control and Automatic Braking — the kind of communication that has to work every single time, because the alternative is a car that doesn't stop.",
    technologies: ["C++", "FreeRTOS", "Socket Programming", "IPC"],
    category: "Embedded Systems",
    github: null,
    live: null,
    featured: false,
    gradient: "from-stone-600 to-stone-800",
    icon: Radio,
  },
  {
    title: "Deep into CNNs",
    description: "ResNet101 and VGG16 from scratch in PyTorch. 92.2% accuracy classifying 275 bird species — a lesson in how pattern recognition works, whether in silicon or in the human visual cortex.",
    technologies: ["Python", "PyTorch", "CNN", "ResNet101", "VGG16"],
    category: "AI/ML",
    github: "https://github.com/salonidabgar",
    live: null,
    featured: false,
    gradient: "from-[var(--primary-light)] to-emerald-700",
    icon: Brain,
  },
  {
    title: "E2E Headlamp Communication System",
    description: "End-to-end encrypted communication layer for headlamp actuators. 10% efficiency gain in vehicle communication — small number, massive scale when multiplied across every vehicle on the road.",
    technologies: ["C", "Linux", "Embedded Systems", "Vehicle Communication"],
    category: "Embedded Systems",
    github: null,
    live: null,
    featured: false,
    gradient: "from-[var(--accent-warm)] to-[var(--accent)]",
    icon: Lightbulb,
  },
];

const categories = ["All", "Full Stack", "Embedded Systems", "AI/ML", "Blockchain"];

// Dual-accent by meaning: machines/embedded lean molten, minds/systems/flow lean signal.
const isMolten = (category: string) => category === "Embedded Systems";
const accentVar = (category: string) => (isMolten(category) ? "var(--primary)" : "var(--accent)");
const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-60" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="hero-anim" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4 mb-7 mono-label">
              <span className="hidden sm:block h-px w-12 bg-[var(--bone-dim)] opacity-50" />
              <span>Selected Work <span className="m">/</span> Index 01&ndash;{pad(projects.length)}</span>
            </div>
          </div>

          <div className="hero-anim" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(2.8rem,10vw,7.5rem)] text-[var(--bone)]">
              Things I&apos;ve<br />
              <span className="text-stroke">Built</span>
            </h1>
          </div>

          <div className="hero-anim" style={{ animationDelay: "0.3s" }}>
            <p className="font-serif italic text-[clamp(1.1rem,2.2vw,1.8rem)] leading-[1.35] max-w-[min(42ch,100%)] mt-8 text-[var(--bone)]">
              Systems that <span className="hl-molten not-italic">move metal</span>, platforms that{" "}
              <span className="hl-signal not-italic">model flow</span> — embedded firmware,
              blockchain rails, and full-stack machines.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <BlurReveal>
            <div className="b-sechead">
              <span className="idx">01</span>
              <h2>Featured</h2>
              <span className="tail mono-label hidden sm:block">
                <span className="n">{featuredProjects.length}</span> Highlighted
              </span>
            </div>
          </BlurReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 1, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group b-card h-full flex flex-col overflow-hidden"
              >
                {/* Card top: molten index + icon + tag */}
                <div className="flex items-start justify-between p-5 border-b border-[var(--ink-line)]">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-3xl font-bold leading-none"
                      style={{ color: accentVar(project.category) }}
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--ink-line)]"
                      style={{ color: accentVar(project.category) }}
                    >
                      <project.icon className="w-5 h-5" />
                    </span>
                  </div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded border border-[var(--ink-line)]"
                    style={{ color: accentVar(project.category) }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-display font-semibold mb-3 leading-snug text-[var(--bone)] transition-colors group-hover:text-[var(--bone)]">
                    {project.title}
                  </h3>

                  <p className="text-[var(--foreground-muted)] text-sm mb-5 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded border border-[var(--ink-line)] text-[var(--muted-light)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded border border-[var(--ink-line)] text-[var(--muted-light)]">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--ink-line)]">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-light)] hover:text-[var(--bone)] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-light)] hover:text-[var(--bone)] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                      </a>
                    )}
                    {!project.github && !project.live && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                        Proprietary <span className="m" style={{ color: "var(--primary)" }}>/</span> JLR
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL PROJECTS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <BlurReveal>
            <div className="b-sechead">
              <span className="idx">02</span>
              <h2>All Projects</h2>
            </div>
          </BlurReveal>

          {/* Filter — mono uppercase pills */}
          <motion.div
            initial={{ opacity: 1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((category) => {
              const active = activeCategory === category;
              const molten = isMolten(category);
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-full border transition-all"
                  style={{
                    borderColor: active ? accentVar(category === "All" ? "AI/ML" : category) : "var(--ink-line)",
                    color: active
                      ? category === "All"
                        ? "var(--bone)"
                        : accentVar(category)
                      : "var(--muted-light)",
                    background: active
                      ? category === "All"
                        ? "var(--bone)"
                        : molten
                          ? "rgba(255,74,23,0.08)"
                          : "rgba(0,231,167,0.08)"
                      : "transparent",
                    ...(active && category === "All" ? { color: "var(--background)", borderColor: "var(--bone)" } : {}),
                  }}
                >
                  {category}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-3 md:gap-4"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 1, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="group b-card h-full p-5"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono text-2xl font-bold leading-none pt-0.5 flex-shrink-0"
                      style={{ color: accentVar(project.category) }}
                    >
                      {pad(projects.indexOf(project) + 1)}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold leading-snug text-[var(--bone)] line-clamp-1">
                            {project.title}
                          </h3>
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.16em]"
                            style={{ color: accentVar(project.category) }}
                          >
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--muted-light)] hover:text-[var(--bone)] transition-colors"
                              aria-label="Source"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--muted-light)] hover:text-[var(--bone)] transition-colors"
                              aria-label="Live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-[var(--foreground-muted)] mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded border border-[var(--ink-line)] text-[var(--muted-light)]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded border border-[var(--ink-line)] text-[var(--muted-light)]">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="mono-label">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== GITHUB CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--surface)]" />
        <div className="absolute inset-0 pattern-dots" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="hairline mb-14" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <BlurReveal>
                <div className="mono-label mb-5">
                  <span className="n">/</span> Open Source
                </div>
              </BlurReveal>
              <BlurReveal delay={0.1}>
                <h2 className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.2rem,7vw,4.5rem)] text-[var(--bone)]">
                  More on<br />
                  <span className="text-stroke">GitHub</span>
                </h2>
              </BlurReveal>
              <BlurReveal delay={0.2}>
                <p className="font-serif italic text-[var(--foreground-muted)] text-lg mt-6 max-w-md">
                  Explore more projects, contributions, and open-source work.
                </p>
              </BlurReveal>
            </div>

            <BlurReveal delay={0.3}>
              <a
                href="https://github.com/salonidabgar"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.12em] border border-[var(--ink-line)] text-[var(--bone)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <Github className="w-4 h-4" />
                View Profile
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </BlurReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
