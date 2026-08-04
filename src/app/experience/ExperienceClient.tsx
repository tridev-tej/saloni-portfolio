import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "Jaguar Land Rover",
    location: "India",
    period: "July 2023 – present",
    description: "On-board software for vehicle communication, secure over-the-air updates, and real-time data processing.",
    achievements: [
      "Integrated an end-to-end communication layer for headlamp control, improving vehicle communication efficiency by 10%.",
      "Built a C++ state-machine controller for secure software updates using Boost.Beast and OpenSSL.",
      "Designed UDP serialization, multi-threaded receiver pipelines, and shared-memory IPC for real-time vehicle data.",
    ],
    technologies: ["C", "C++", "FreeRTOS", "Linux", "Boost.Beast", "OpenSSL"],
  },
  {
    title: "Blockchain Developer Intern",
    company: "University of Zurich",
    location: "Zurich, Switzerland",
    period: "June – July 2022",
    description: "Research and prototyping at the UZH Blockchain Center, focused on decentralized exchange infrastructure.",
    achievements: [
      "Implemented and deployed ERC-20 asset contracts on the UZH test network.",
      "Created a Uniswap V3 liquidity pool and a Next.js interface for buying, selling, and redemption.",
      "Studied the business, legal, and market constraints around token exchange.",
    ],
    technologies: ["Solidity", "Next.js", "Ethereum", "Uniswap V3", "Remix"],
  },
  {
    title: "Research Intern",
    company: "SURGE, IIT Kanpur",
    location: "Kanpur, India",
    period: "June – August 2021",
    description: "A production-oriented async task management platform built with FastAPI and React.",
    achievements: [
      "Improved API performance by 40% under 1,000+ concurrent users.",
      "Built real-time WebSocket notifications and a Redis caching strategy that cut response times by 45%.",
      "Reached 90% test coverage across more than 200 backend and frontend tests.",
    ],
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
  },
];

const education = [
  {
    degree: "Bachelor of Technology, Materials Science and Engineering",
    institution: "Indian Institute of Technology Kanpur",
    period: "2019 – 2023",
    detail: "CPI 8/10 · SURGE Research · Programming Club",
  },
  {
    degree: "Class XII, Science",
    institution: "Delhi Public School, Eldeco, Lucknow",
    period: "2018",
    detail: "93.6%",
  },
  {
    degree: "Class X",
    institution: "Delhi Public School, Eldeco, Lucknow",
    period: "2016",
    detail: "9.8 CGPA",
  },
];

const certifications = [
  ["Deep Learning", "Coursera · 2023"],
  ["Machine Learning Applications", "Coursera · 2023"],
  ["Natural Language Processing", "Coursera · 2022"],
  ["Data Structures & Algorithms", "Coursera · 2021"],
];

export default function ExperienceClient() {
  return (
    <div>
      <header className="site-shell section-space">
        <p className="path-label"><span>~/profile</span>/experience.log</p>
        <h1 className="page-title mt-5">A path through systems.</h1>
        <p className="lead mt-8">
          From embedded automotive software to distributed applications and decentralized infrastructure.
        </p>
      </header>

      <section className="border-y border-[var(--line)] bg-[var(--ink-soft)]">
        <div className="site-shell section-space">
          <p className="eyebrow">Work</p>
          <ol className="editorial-list mt-10">
            {experiences.map((experience, index) => (
              <li key={experience.company} className="editorial-row">
                <span className="editorial-index">{String(index + 1).padStart(2, "0")}</span>
                <article>
                  <div className="meta-line">
                    <span>{experience.period}</span>
                    <span>{experience.location}</span>
                  </div>
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.035em]">
                    {experience.title}
                  </h2>
                  <p className="mt-1 text-[var(--orange)]">{experience.company}</p>
                  <p className="mt-4 max-w-3xl text-[var(--paper-dim)]">{experience.description}</p>
                  <ul className="mt-6 max-w-3xl space-y-3 text-[var(--paper-dim)]">
                    {experience.achievements.map((achievement) => (
                      <li key={achievement} className="grid grid-cols-[1rem_1fr] gap-2">
                        <span aria-hidden="true" className="text-[var(--orange)]">—</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="topic-list mt-6">
                    {experience.technologies.map((technology) => <span key={technology} className="topic">{technology}</span>)}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-shell section-space">
        <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="eyebrow">Education</p>
            <div className="editorial-list mt-8">
              {education.map((item) => (
                <article key={item.degree} className="border-b border-[var(--line)] py-6">
                  <div className="meta-line"><span>{item.period}</span></div>
                  <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em]">{item.degree}</h2>
                  <p className="mt-1 text-[var(--paper-dim)]">{item.institution}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Further study</p>
            <ul className="mt-8 border-t border-[var(--line)]">
              {certifications.map(([name, detail]) => (
                <li key={name} className="border-b border-[var(--line)] py-5">
                  <p>{name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="paper-section section-space">
        <div className="site-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Next conversation</p>
            <h2 className="section-heading mt-4 max-w-3xl">Want to compare notes on engineering, systems, or research?</h2>
          </div>
          <a href="mailto:dabgarsaloni11@gmail.com" className="command-button command-button-on-paper command-button-primary">
            contact --open <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
