"use client";

import { useState } from "react";

/**
 * Capability Matrix — replaces the decorative node-graph.
 * Encodes REAL information: which skills actually shipped in which flagship
 * projects (derived from each project's true tech stack). A filled cell means
 * "I used this skill to build this project" — a traceability matrix, not
 * arbitrary edges. Molten = machines/embedded, signal = software/systems.
 */

type Accent = "molten" | "signal";

const PROJECTS: { id: string; index: string; short: string; name: string; accent: Accent }[] = [
  { id: "sota", index: "01", short: "SOTA", name: "SOTA Controller · JLR", accent: "molten" },
  { id: "exch", index: "02", short: "EXCH", name: "Currency Exchange · UZH", accent: "signal" },
  { id: "task", index: "03", short: "FLOW", name: "TaskFlow · IIT Kanpur", accent: "signal" },
  { id: "lamp", index: "04", short: "LAMP", name: "E2E Headlamp System · JLR", accent: "molten" },
];

const GROUPS: {
  label: string;
  accent: Accent;
  skills: { name: string; used: string[] }[];
}[] = [
  {
    label: "Systems / Embedded",
    accent: "molten",
    skills: [
      { name: "C", used: ["lamp"] },
      { name: "C++", used: ["sota"] },
      { name: "Linux", used: ["sota", "lamp"] },
      { name: "OpenSSL", used: ["sota"] },
      { name: "Boost.Beast", used: ["sota"] },
      { name: "Vehicle Comms", used: ["lamp"] },
    ],
  },
  {
    label: "Web / Backend",
    accent: "signal",
    skills: [
      { name: "Python", used: ["task"] },
      { name: "FastAPI", used: ["task"] },
      { name: "React", used: ["exch", "task"] },
      { name: "PostgreSQL", used: ["task"] },
      { name: "Redis", used: ["task"] },
    ],
  },
  {
    label: "Blockchain",
    accent: "signal",
    skills: [
      { name: "Solidity", used: ["exch"] },
      { name: "Ethereum", used: ["exch"] },
    ],
  },
];

const accentVar = (a: Accent) => (a === "molten" ? "var(--primary)" : "var(--accent)");

export default function SkillMatrix() {
  const [hoverSkill, setHoverSkill] = useState<string | null>(null);
  const [hoverProject, setHoverProject] = useState<string | null>(null);

  return (
    <div
      className="p-4 sm:p-6 md:p-8"
      style={{ "--cell": "clamp(38px, 9vw, 66px)" } as React.CSSProperties}
    >
      {/* Column header */}
      <div
        className="grid items-end gap-1 mb-3"
        style={{ gridTemplateColumns: "minmax(0,1fr) repeat(4, var(--cell))" }}
      >
        <div className="mono-label text-[0.62rem] sm:text-[0.68rem] pb-2 pr-3">
          Skill <span className="m">→</span> shipped in
        </div>
        {PROJECTS.map((p) => {
          const active = hoverProject === p.id || (hoverSkill && GROUPS.some((g) => g.skills.some((s) => s.name === hoverSkill && s.used.includes(p.id))));
          return (
            <button
              key={p.id}
              type="button"
              title={p.name}
              onMouseEnter={() => setHoverProject(p.id)}
              onMouseLeave={() => setHoverProject(null)}
              onFocus={() => setHoverProject(p.id)}
              onBlur={() => setHoverProject(null)}
              className="flex flex-col items-center gap-1 pb-2 outline-none group"
            >
              <span
                className="font-mono text-[0.7rem] sm:text-[0.8rem] font-semibold transition-colors"
                style={{ color: active ? accentVar(p.accent) : "var(--bone-dim)" }}
              >
                {p.index}
              </span>
              <span
                className="font-mono text-[0.5rem] sm:text-[0.56rem] tracking-[0.12em] transition-colors"
                style={{ color: active ? accentVar(p.accent) : "var(--muted)" }}
              >
                {p.short}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hairline mb-2" />

      {/* Rows grouped by domain */}
      {GROUPS.map((group) => (
        <div key={group.label} className="mb-1">
          <div
            className="mono-label text-[0.6rem] sm:text-[0.64rem] mt-4 mb-2"
            style={{ color: accentVar(group.accent) }}
          >
            {group.label}
          </div>

          {group.skills.map((skill) => {
            const rowActive = hoverSkill === skill.name;
            const rowDim =
              (hoverSkill && hoverSkill !== skill.name) ||
              (hoverProject && !skill.used.includes(hoverProject));
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoverSkill(skill.name)}
                onMouseLeave={() => setHoverSkill(null)}
                className="grid items-center gap-1 py-1.5 transition-opacity duration-300"
                style={{
                  gridTemplateColumns: "minmax(0,1fr) repeat(4, var(--cell))",
                  opacity: rowDim ? 0.32 : 1,
                }}
              >
                <div className="flex items-center gap-2 pr-3 min-w-0">
                  <span
                    className="font-mono text-[0.72rem] sm:text-[0.82rem] truncate transition-colors"
                    style={{ color: rowActive ? "var(--bone)" : "var(--bone-dim)" }}
                  >
                    {skill.name}
                  </span>
                  <span className="hidden sm:block flex-1 h-px bg-[var(--ink-line)]" />
                </div>

                {PROJECTS.map((p) => {
                  const used = skill.used.includes(p.id);
                  const cellHot =
                    used && (rowActive || hoverProject === p.id);
                  return (
                    <div key={p.id} className="flex items-center justify-center">
                      {used ? (
                        <span
                          className="block rounded-[5px] transition-all duration-300"
                          style={{
                            width: cellHot ? 18 : 14,
                            height: cellHot ? 18 : 14,
                            background: accentVar(p.accent),
                            boxShadow: cellHot ? `0 0 14px ${accentVar(p.accent)}` : "none",
                            opacity: cellHot ? 1 : 0.82,
                          }}
                        />
                      ) : (
                        <span className="block w-1 h-1 rounded-full bg-[var(--ink-line)]" />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}

      <div className="hairline mt-4 mb-3" />
      <p className="font-mono text-[0.6rem] sm:text-[0.66rem] tracking-[0.1em] uppercase text-[var(--muted)] leading-relaxed">
        Every filled cell is a skill I actually shipped in that project — not a
        checklist. <span className="hl-molten">Molten</span> = machines,{" "}
        <span className="hl-signal">signal</span> = software.
      </p>
    </div>
  );
}
