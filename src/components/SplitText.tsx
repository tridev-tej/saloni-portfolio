"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-50px" });
  // Reveal immediately if already on-screen at mount, so above-the-fold
  // headings never stay hidden waiting on IntersectionObserver.
  const [mountedInView, setMountedInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) setMountedInView(true);
  }, []);
  const isInView = inView || mountedInView;

  const chars = children.split("");

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            aria-hidden="true"
            initial={{ y: "110%", opacity: 0, rotateX: -80 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "110%", opacity: 0, rotateX: -80 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
