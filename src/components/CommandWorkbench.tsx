"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import Link from "@/components/TransitionLink";

type CommandId = "skills" | "whoami" | "work" | "now" | "help";

const skillGroups = [
  {
    label: "embedded + vehicle",
    skills: [
      "C",
      "C++",
      "Embedded Linux",
      "FreeRTOS",
      "State machines",
      "OTA systems",
      "UDP",
      "Socket programming",
      "Shared memory",
      "IPC",
      "Vehicle communication",
      "Boost.Beast",
      "OpenSSL",
      "SSL/TLS",
    ],
  },
  {
    label: "product + web",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "Docker",
      "HTML/CSS",
      "API design",
      "Testing",
    ],
  },
  {
    label: "data + intelligence",
    skills: [
      "PyTorch",
      "CNNs",
      "ResNet101",
      "VGG16",
      "Deep learning",
      "Machine learning",
      "NLP",
      "Computer vision",
      "Data structures",
      "Algorithms",
      "Performance testing",
      "Load testing",
      "Caching",
      "Real-time systems",
    ],
  },
  {
    label: "decentralized + thinking",
    skills: [
      "Solidity",
      "Ethereum",
      "EVM",
      "Smart contracts",
      "ERC-20",
      "Uniswap V3",
      "Liquidity pools",
      "Token design",
      "Blockchain research",
      "Systems thinking",
      "Technical writing",
      "First principles",
      "Product thinking",
      "User research",
    ],
  },
] as const;

const commands: Array<{ id: CommandId; label: string; key: string }> = [
  { id: "skills", label: "skills --all", key: "01" },
  { id: "whoami", label: "whoami", key: "02" },
  { id: "work", label: "work --featured", key: "03" },
  { id: "now", label: "now", key: "04" },
  { id: "help", label: "help", key: "?" },
];

const aliases: Record<string, CommandId> = {
  skills: "skills",
  "skills --all": "skills",
  whoami: "whoami",
  work: "work",
  "work --featured": "work",
  now: "now",
  help: "help",
};

export default function CommandWorkbench() {
  const [active, setActive] = useState<CommandId>("skills");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const activeCommand = useMemo(
    () => commands.find((command) => command.id === active) ?? commands[0],
    [active],
  );

  function run(command: CommandId) {
    setActive(command);
    setError("");
    setInput("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = input.trim().toLowerCase();
    const next = aliases[normalized];

    if (next) {
      run(next);
      return;
    }

    setError(normalized ? `command not found: ${normalized}` : "type a command or choose one below");
  }

  return (
    <div className="command-workbench">
      <div className="command-titlebar">
        <span>saloni@workstation:~</span>
        <span>interactive shell</span>
      </div>

      <form className="command-input-row" onSubmit={submit}>
        <label htmlFor="workbench-command" className="command-prompt" aria-label="Command prompt">$</label>
        <input
          id="workbench-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={activeCommand.label}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" aria-label="Run command">
          run <CornerDownLeft aria-hidden="true" className="h-4 w-4" />
        </button>
      </form>

      <div className="command-buttons" aria-label="Available commands">
        {commands.map((command) => (
          <button
            key={command.id}
            type="button"
            onClick={() => run(command.id)}
            className={active === command.id ? "is-active" : ""}
            aria-pressed={active === command.id}
          >
            <span>{command.key}</span>
            {command.label}
          </button>
        ))}
      </div>

      <div className="command-output" role="status" aria-live="polite">
        <p className="command-echo">&gt; {error || activeCommand.label}</p>
        {error ? (
          <p className="command-message">Try <button type="button" onClick={() => run("help")}>help</button> to list available commands.</p>
        ) : (
          <CommandResponse active={active} onRun={run} />
        )}
      </div>
    </div>
  );
}

function CommandResponse({ active, onRun }: { active: CommandId; onRun: (command: CommandId) => void }) {
  if (active === "skills") {
    return (
      <div>
        <div className="command-summary">
          <strong>56</strong>
          <p>skills + working concepts indexed. Depth varies. Curiosity does not.</p>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group, groupIndex) => (
            <section key={group.label} className="skill-group">
              <p><span>{String(groupIndex + 1).padStart(2, "0")}</span> {group.label}</p>
              <div>
                {group.skills.map((skill) => <span key={skill} className="skill-key">{skill}</span>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (active === "whoami") {
    return (
      <div className="command-copy">
        <p><span>role</span> Software developer, Jaguar Land Rover</p>
        <p><span>base</span> Embedded systems + product engineering</p>
        <p><span>interface</span> CLI first. Fewer screens between intent and output.</p>
        <p><span>outside work</span> Writing, philosophy, strength, yoga, badminton</p>
      </div>
    );
  }

  if (active === "work") {
    return (
      <div className="command-copy command-work-list">
        <p><span>01</span> Software Over-The-Air Controller</p>
        <p><span>02</span> Currency Exchange Platform</p>
        <p><span>03</span> TaskFlow orchestration system</p>
        <p><span>04</span> E2E Headlamp Communication</p>
        <Link href="/projects" className="command-inline-link">open project index <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
    );
  }

  if (active === "now") {
    return (
      <div className="command-copy">
        <p><span>building</span> Reliable software for physical systems</p>
        <p><span>reading</span> Sapiens · Thinking, Fast and Slow</p>
        <p><span>training</span> Strength · yoga · calisthenics · badminton</p>
        <p><span>writing</span> Notes on software, minds, and practice</p>
      </div>
    );
  }

  return (
    <div className="command-copy">
      {commands.filter((command) => command.id !== "help").map((command) => (
        <button key={command.id} type="button" onClick={() => onRun(command.id)}>
          <span>{command.key}</span> {command.label}
        </button>
      ))}
    </div>
  );
}
