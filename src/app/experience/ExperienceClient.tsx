"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, ArrowUpRight, Car, Link2, ClipboardList, BookOpen, School, Brain, Bot, MessageSquare, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BlurReveal } from "@/components/TextReveal";

type Accent = "molten" | "signal";

const experiences: {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  accent: Accent;
  icon: LucideIcon;
}[] = [
  {
    title: "Software Developer",
    company: "Jaguar Land Rover",
    location: "India",
    period: "Jul 2023 - Present",
    type: "Full-time",
    description: "On-Board Software Team - Working on embedded automotive software including vehicle communication systems, SOTA updates, and real-time data processing.",
    achievements: [
      "E2E Headlamp usecase: Integrated E2B communication layer increasing vehicle communication by 10%",
      "Built SOTA controller with state-machine architecture in C++ using Boost.Beast",
      "Implemented secure HTTPS server with OpenSSL and SSL/TLS for automotive software updates",
      "Developed UDP serializer/deserializer for VSC-ABS communication using C++ on FreeRTOS",
      "Designed multi-threaded DataReceiver, DataExtractor and DataAssembler modules",
      "Created shared memory IPC mechanism optimizing real-time data flow",
    ],
    technologies: ["C", "C++", "FreeRTOS", "Linux", "Boost.Beast", "OpenSSL"],
    accent: "molten",
    icon: Car,
  },
  {
    title: "Blockchain Developer Intern",
    company: "University of Zurich, Switzerland",
    location: "Zurich, Switzerland",
    period: "Jun 2022 - Jul 2022",
    type: "Internship",
    description: "Blockchain Center, UZH - Explored how decentralized systems can model trust without institutions.",
    achievements: [
      "Implemented asset smart contract in Solidity, deployed on UZHETH test network using Remix",
      "Created a liquidity pool on Uniswap V3 with Ethereum and self-created token",
      "Devised ERC-20 tokens using Solidity for token exchange facilitation",
      "Built front-end application using Next.js for buying, selling and redemption",
      "Implemented user authentication using web hooks from ThirdWebProvider",
      "Prepared thorough report on business, legal and market analysis",
    ],
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3", "Remix", "Marlowe"],
    accent: "signal",
    icon: Link2,
  },
  {
    title: "Research Intern",
    company: "SURGE, IIT Kanpur",
    location: "Kanpur, India",
    period: "Jun 2021 - Aug 2021",
    type: "Internship",
    description: "TaskFlow: Async Task Management Platform - Developed a production-ready task management system.",
    achievements: [
      "Developed task management system using FastAPI (Python) & React",
      "Implemented async/await RESTful APIs achieving 40% better performance with 1000+ concurrent users",
      "Created real-time notification system using WebSocket with Python's asyncio",
      "Achieved 90% test coverage using pytest and React Testing Library with 200+ test cases",
      "Implemented Redis caching strategy, reducing API response times by 45%",
      "Integrated CI/CD pipeline using GitHub Actions for automated testing and deployment",
    ],
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker", "WebSocket"],
    accent: "signal",
    icon: ClipboardList,
  },
];

const education: {
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements: string[];
  icon: LucideIcon;
  accent: Accent;
}[] = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    institution: "Indian Institute of Technology Kanpur",
    period: "2019 - 2023",
    description: "Material Science and Engineering",
    achievements: ["CPI: 8/10", "SURGE Research", "Programming Club"],
    icon: GraduationCap,
    accent: "signal",
  },
  {
    degree: "Class XII (CBSE)",
    institution: "Delhi Public School, Eldeco, Lucknow",
    period: "2018",
    description: "Higher Secondary Education - Science Stream",
    achievements: ["93.6%"],
    icon: BookOpen,
    accent: "signal",
  },
  {
    degree: "Class X (CBSE)",
    institution: "Delhi Public School, Eldeco, Lucknow",
    period: "2016",
    description: "Secondary Education",
    achievements: ["9.8 CGPA"],
    icon: School,
    accent: "signal",
  },
];

const certifications: { name: string; issuer: string; year: string; icon: LucideIcon; accent: Accent }[] = [
  { name: "Deep Learning", issuer: "Coursera", year: "2023", icon: Brain, accent: "signal" },
  { name: "Machine Learning Applications", issuer: "Coursera", year: "2023", icon: Bot, accent: "signal" },
  { name: "Natural Language Processing", issuer: "Coursera", year: "2022", icon: MessageSquare, accent: "signal" },
  { name: "Data Structures & Algorithms", issuer: "Coursera", year: "2021", icon: BarChart3, accent: "signal" },
];

const accentVar = (a: Accent) => (a === "molten" ? "var(--primary)" : "var(--accent)");

function MonoTag({ label, accent }: { label: string; accent: Accent }) {
  return (
    <span
      className="font-mono uppercase text-[10px] tracking-[0.16em] px-2.5 py-1 rounded-md border border-[var(--ink-line)] text-[var(--muted-light)] transition-colors"
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#0a0a0b";
        e.currentTarget.style.background = accentVar(accent);
        e.currentTarget.style.borderColor = accentVar(accent);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.color = "";
      }}
    >
      {label}
    </span>
  );
}

export default function ExperienceClient() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="absolute inset-0 pattern-dots opacity-60" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="hero-anim flex items-center gap-4 mb-7 mono-label" style={{ animationDelay: "0.05s" }}>
            <span className="hidden sm:block h-px w-12 bg-[var(--bone-dim)] opacity-50" />
            <span>Career <span className="m">/</span> The Journey</span>
          </div>

          <h1 className="hero-anim font-display font-bold uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(3rem,11vw,9rem)]" style={{ animationDelay: "0.15s" }}>
            <span className="block text-[var(--bone)]">My</span>
            <span className="block text-stroke">Journey</span>
          </h1>

          <p className="hero-anim font-serif italic text-[clamp(1.15rem,2.3vw,1.9rem)] leading-[1.35] max-w-[min(42ch,100%)] mt-8 text-[var(--bone)]" style={{ animationDelay: "0.25s" }}>
            From <span className="hl-signal not-italic">IIT Kanpur</span> to{" "}
            <span className="hl-molten not-italic">Jaguar Land Rover</span>
            &thinsp;&mdash;&thinsp;a path through embedded systems, blockchain, and everything in between.
          </p>
        </div>
      </section>

      {/* ===== WORK EXPERIENCE ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BlurReveal>
            <div className="b-sechead">
              <span className="idx">01</span>
              <h2>Experience</h2>
              <span className="tail mono-label hidden md:block">Roles &amp; Internships</span>
            </div>
          </BlurReveal>

          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-[var(--ink-line)] hidden md:block" />

            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const color = accentVar(exp.accent);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    {/* Timeline node */}
                    <div
                      className="absolute left-4 top-9 w-[18px] h-[18px] rounded-full bg-[var(--background)] hidden md:flex items-center justify-center z-10"
                      style={{ border: `2px solid ${color}` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    </div>

                    <div className="md:ml-16 b-card p-5 sm:p-6 md:p-8 group">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl grid place-items-center border border-[var(--ink-line)] bg-[var(--surface)]"
                            style={{ color }}
                          >
                            <exp.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3
                              className="text-lg font-display font-semibold uppercase tracking-tight transition-colors"
                              style={{ color: "var(--bone)" }}
                            >
                              {exp.title}
                            </h3>
                            <p className="text-sm font-medium" style={{ color }}>
                              {exp.company}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 mono-label text-[0.62rem]">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className="inline-flex self-start font-mono uppercase text-[10px] tracking-[0.16em] px-3 py-1 rounded-md border whitespace-nowrap"
                          style={{ color, borderColor: "var(--ink-line)" }}
                        >
                          {exp.type}
                        </span>
                      </div>

                      <p className="text-[var(--muted-light)] mb-6 text-sm leading-relaxed">{exp.description}</p>

                      <div className="mb-6">
                        <h4 className="mono-label mb-3 flex items-center gap-2">
                          <span className="w-3 h-px" style={{ background: color }} />
                          Key Achievements
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-[var(--muted)] flex items-start gap-2">
                              <ArrowUpRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color }} />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <MonoTag key={tech} label={tech} accent={exp.accent} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--surface)]" />
        <div className="absolute inset-0 pattern-dots" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <BlurReveal>
            <div className="b-sechead">
              <span className="idx">02</span>
              <h2>Education</h2>
              <span className="tail mono-label hidden md:block">Foundations</span>
            </div>
          </BlurReveal>

          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu, index) => {
              const color = accentVar(edu.accent);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <div className="group h-full b-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-lg grid place-items-center border border-[var(--ink-line)] bg-[var(--surface)]"
                        style={{ color }}
                      >
                        <edu.icon className="w-5 h-5" />
                      </div>
                      <span className="mono-label text-[0.62rem]">{edu.period}</span>
                    </div>

                    <h3 className="font-display font-semibold text-sm uppercase tracking-tight mb-1 text-[var(--bone)]">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-medium mb-2" style={{ color }}>
                      {edu.institution}
                    </p>
                    <p className="text-sm text-[var(--muted)] mb-4">{edu.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {edu.achievements.map((achievement, i) => (
                        <MonoTag key={i} label={achievement} accent={edu.accent} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BlurReveal>
            <div className="b-sechead">
              <span className="idx">03</span>
              <h2>Certifications</h2>
              <span className="tail mono-label hidden md:block">Continuous Learning</span>
            </div>
          </BlurReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {certifications.map((cert, index) => {
              const color = accentVar(cert.accent);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="h-full"
                >
                  <div className="group h-full b-card p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-9 h-9 rounded-lg grid place-items-center border border-[var(--ink-line)] bg-[var(--surface)]"
                        style={{ color }}
                      >
                        <cert.icon className="w-4 h-4" />
                      </div>
                      <span className="mono-label text-[0.62rem]" style={{ color }}>
                        {cert.year}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-sm uppercase tracking-tight leading-tight mb-1 text-[var(--bone)]">
                      {cert.name}
                    </h3>
                    <p className="mono-label text-[0.62rem]">{cert.issuer}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="light-flash relative overflow-hidden py-24 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <BlurReveal>
            <div className="mono-label lf-muted mb-6">Next Step</div>
          </BlurReveal>
          <BlurReveal>
            <h2 className="font-display font-bold uppercase tracking-[-0.02em] text-[clamp(2rem,6vw,4rem)] leading-[0.95] mb-5">
              Want to know <span className="font-serif italic normal-case tracking-normal" style={{ color: "var(--primary)" }}>more?</span>
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.1}>
            <p className="lf-muted mb-9 max-w-md mx-auto text-sm md:text-base">
              Download my resume for a complete overview of my experience, skills, and achievements.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.2}>
            <motion.a
              href="/resume.pdf"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#0a0a0b] text-[var(--bone)] font-mono text-xs tracking-[0.1em] uppercase rounded-full"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Resume
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </BlurReveal>
        </div>
      </section>
    </div>
  );
}
