"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Page transition system — an overlay "curtain" that slides UP to cover the
 * screen, swaps the route while covered, then continues up and off to reveal.
 * App Router unmounts the old page instantly, so we don't animate the page
 * itself; we own a route-independent overlay and drive the router from a small
 * state machine (idle → cover → reveal).
 */

type Phase = "idle" | "cover" | "reveal";

interface Ctx {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<Ctx>({ navigate: () => {} });

export function useTransitionNav() {
  return useContext(TransitionContext);
}

const EASE = [0.76, 0, 0.24, 1] as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Short, mono label for the destination, shown while covered.
function labelFor(href: string) {
  const seg = href.replace(/^\/+/, "").split("/")[0];
  if (!seg) return "Home";
  if (seg === "blog") return "Thinking";
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pendingRef = useRef<string | null>(null);
  const targetPathRef = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const targetPath = href.split(/[?#]/)[0];
      // Same page or reduced motion → just navigate.
      if (targetPath === pathname || prefersReducedMotion()) {
        router.push(href);
        return;
      }
      // Ignore if a transition is already running.
      if (pendingRef.current) return;
      pendingRef.current = href;
      targetPathRef.current = targetPath;
      setLabel(labelFor(href));
      setPhase("cover");
    },
    [pathname, router]
  );

  // When the route actually changes to our target, lift the curtain.
  useEffect(() => {
    if (
      phase === "cover" &&
      targetPathRef.current &&
      pathname === targetPathRef.current
    ) {
      window.scrollTo(0, 0);
      setPhase("reveal");
    }
  }, [pathname, phase]);

  // Safety: never let the curtain get stuck.
  useEffect(() => {
    if (phase === "idle") return;
    const t = setTimeout(() => {
      if (pendingRef.current) {
        pendingRef.current = null;
        targetPathRef.current = null;
        setPhase("idle");
      }
    }, 2600);
    return () => clearTimeout(t);
  }, [phase]);

  const onCoverComplete = () => {
    const href = pendingRef.current;
    if (phase === "cover" && href) {
      router.push(href);
    }
  };

  const onRevealComplete = () => {
    if (phase === "reveal") {
      pendingRef.current = null;
      targetPathRef.current = null;
      setPhase("idle");
    }
  };

  const covering = phase === "cover" || phase === "reveal";

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <AnimatePresence>
        {covering && (
          <motion.div
            key="page-curtain"
            aria-hidden="true"
            className="fixed inset-0 z-[9990] flex items-center justify-center overflow-hidden"
            style={{ pointerEvents: phase === "reveal" ? "none" : "auto" }}
            initial={{ y: "100%" }}
            animate={{ y: phase === "reveal" ? "-100%" : "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: phase === "reveal" ? 0.6 : 0.5, ease: EASE }}
            onAnimationComplete={
              phase === "cover" ? onCoverComplete : onRevealComplete
            }
          >
            {/* panel */}
            <div className="absolute inset-0 bg-[#0a0a0b]" />
            {/* leading (top) molten edge + trailing (bottom) signal edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--primary)]" style={{ boxShadow: "0 0 16px var(--primary)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" style={{ boxShadow: "0 0 16px var(--accent)" }} />

            {/* destination readout */}
            <motion.div
              className="relative flex items-center gap-3 font-mono text-[0.8rem] tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "cover" ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-[var(--primary)]">&rarr;</span>
              <span className="text-[var(--bone)]">{label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
