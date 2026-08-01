"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Reveal-on-scroll helpers. IMPORTANT: content must never stay hidden on
 * initial render. `useInViewSafe` reveals immediately if the element is
 * already in the viewport on mount (above-the-fold heroes) — so it does not
 * depend on IntersectionObserver firing — while keeping the scroll reveal for
 * below-the-fold content.
 */
function useInViewSafe(ref: React.RefObject<HTMLElement | null>, margin: `${number}px`) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref as any, { once: true, margin });
  const [mountedInView, setMountedInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) setMountedInView(true);
  }, [ref]);

  return isInView || mountedInView;
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reveal = useInViewSafe(ref, "-50px");

  const words = children.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={reveal ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function BlurReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useInViewSafe(ref, "-80px");

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={
        reveal
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(10px)", y: 20 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
