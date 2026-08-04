"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * System-boot loader (first visit per session). Direction B: near-black,
 * mono boot log, molten counter, signal→molten progress line, then an upward
 * wipe that hands off to the hero — matching the page-transition curtain.
 * Skips instantly on reduced-motion or if already shown this session.
 */

const BOOT_LINES = [
  { at: 0, text: "› booting saloni.dabgar // systems" },
  { at: 22, text: "› loading embedded modules ........ ok" },
  { at: 46, text: "› mounting interface // direction-b" },
  { at: 70, text: "› calibrating flow-field + matrix" },
  { at: 92, text: "› ready" },
];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      typeof window !== "undefined" &&
      (sessionStorage.getItem("preloaded") || reduce)
    ) {
      setDone(true);
      if (typeof window !== "undefined") sessionStorage.setItem("preloaded", "true");
      return;
    }

    let current = 0;
    intervalRef.current = setInterval(() => {
      const increment =
        current < 70
          ? Math.floor(Math.random() * 8) + 3
          : Math.floor(Math.random() * 4) + 1;
      current = Math.min(100, current + increment);
      setCount(current);

      if (current >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setExit(true), 450);
        setTimeout(() => {
          setDone(true);
          if (typeof window !== "undefined")
            sessionStorage.setItem("preloaded", "true");
        }, 1250);
      }
    }, 55);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (done) return null;

  const pad = String(count).padStart(3, "0");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0a0a0b] overflow-hidden"
          animate={exit ? { y: "-100%" } : { y: 0 }}
          transition={exit ? { duration: 0.7, ease: [0.76, 0, 0.24, 1] } : {}}
        >
          {/* top molten edge */}
          <div
            className="absolute top-0 left-0 h-[2px] bg-[var(--primary)]"
            style={{ width: `${count}%`, boxShadow: "0 0 16px var(--primary)", transition: "width 0.15s linear" }}
          />

          {/* boot log */}
          <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 max-w-[90vw]">
            <div className="overflow-hidden mb-6">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: exit ? "-110%" : "0%" }}
                transition={{ duration: exit ? 0.5 : 0.7, ease: [0.76, 0, 0.24, 1], delay: exit ? 0 : 0.1 }}
                className="font-display font-bold uppercase tracking-[-0.02em] text-[clamp(2.2rem,7vw,4.5rem)] leading-none"
              >
                <span className="text-[var(--bone)]">Saloni</span>{" "}
                <span className="text-stroke">Dabgar</span>
              </motion.div>
            </div>

            <div className="space-y-1.5 font-mono text-[0.72rem] sm:text-[0.8rem] text-[var(--bone-dim)]">
              {BOOT_LINES.map((line) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: count >= line.at ? (exit ? 0 : 1) : 0, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={line.text.includes("ready") ? "text-[var(--accent)]" : ""}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* counter */}
          <motion.div
            className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 flex items-end gap-1.5 font-mono"
            animate={{ opacity: exit ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[clamp(3.5rem,12vw,8rem)] font-bold tabular-nums leading-[0.85] text-[var(--primary)]">
              {pad}
            </span>
            <span className="text-lg sm:text-2xl text-[var(--bone-dim)] mb-2 sm:mb-3">%</span>
          </motion.div>

          {/* bottom progress line (signal→molten) */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--surface)]">
            <div
              className="h-full"
              style={{
                width: `${count}%`,
                background: "linear-gradient(90deg, var(--accent), var(--primary))",
                transition: "width 0.12s linear",
              }}
            />
          </div>

          {/* corner tag */}
          <motion.p
            className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 font-mono text-[0.62rem] tracking-[0.2em] uppercase text-[var(--muted)]"
            animate={{ opacity: exit ? 0 : 0.7 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Engineer <span className="text-[var(--primary)]">/</span> Builder{" "}
            <span className="text-[var(--accent)]">/</span> Thinker
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
