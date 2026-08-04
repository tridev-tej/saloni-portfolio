"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

/**
 * Floating black-and-white cutout portrait (inspired by dahbiahmed.com).
 * A background-removed PNG that floats free of any frame and tilts toward the
 * pointer in 3D, with a soft drop-shadow that shifts for depth and a subtle
 * molten/signal halo behind. Static on touch / reduced motion.
 *
 * Photo: /public/profile/saloni.png (transparent, B&W). Swap that file to update.
 */
export default function ParallaxPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  const mx = useMotionValue(0); // -0.5..0.5
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.5 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  // drop-shadow follows the alpha silhouette and shifts opposite the tilt
  const shX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const shY = useTransform(sy, [-0.5, 0.5], [-8, 22]);
  const shadow = useMotionTemplate`drop-shadow(${shX}px ${shY}px 26px rgba(0,0,0,0.55))`;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(fine && !reduce);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-[380px] aspect-[4/5] select-none"
      style={{ perspective: 1100 }}
    >
      {/* molten/signal halo that drifts with the tilt */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{
          x: interactive ? glowX : 0,
          y: interactive ? glowY : 0,
          background:
            "radial-gradient(50% 50% at 42% 40%, rgba(0,231,167,0.24), transparent 70%), radial-gradient(48% 48% at 66% 66%, rgba(255,74,23,0.22), transparent 70%)",
        }}
      />

      {/* ground shadow ellipse */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[62%] h-[6%] rounded-[50%] blur-md"
        style={{ x: interactive ? shX : 0, background: "rgba(0,0,0,0.5)" }}
      />

      <motion.div
        className="relative w-full h-full will-change-transform"
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={interactive ? { y: [0, -10, 0] } : undefined}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/profile/saloni.webp"
          alt="Saloni Dabgar"
          className="absolute inset-0 w-full h-full object-contain object-bottom"
          style={{ filter: interactive ? shadow : "drop-shadow(0 14px 26px rgba(0,0,0,0.5))" }}
          draggable={false}
        />

        {/* floating mono tag, parallaxed forward */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ transform: "translateZ(70px)" }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--ink-line)] font-mono text-[0.6rem] tracking-[0.16em] uppercase text-[var(--bone-dim)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" style={{ boxShadow: "0 0 8px var(--primary)" }} />
            Saloni <span className="text-[var(--muted)]">/</span> systems &amp; self
          </span>
        </div>
      </motion.div>
    </div>
  );
}
