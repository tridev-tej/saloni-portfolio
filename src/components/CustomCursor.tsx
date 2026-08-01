"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const velX = useRef(0);
  const velY = useRef(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Stretch based on velocity
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const scaleXSpring = useSpring(scaleX, { damping: 20, stiffness: 300 });
  const scaleYSpring = useSpring(scaleY, { damping: 20, stiffness: 300 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Calculate velocity for stretch effect
      velX.current = e.clientX - prevX.current;
      velY.current = e.clientY - prevY.current;
      prevX.current = e.clientX;
      prevY.current = e.clientY;

      const speed = Math.sqrt(velX.current ** 2 + velY.current ** 2);
      const stretch = Math.min(speed * 0.015, 0.4);

      if (Math.abs(velX.current) > Math.abs(velY.current)) {
        scaleX.set(1 + stretch);
        scaleY.set(1 - stretch * 0.5);
      } else {
        scaleX.set(1 - stretch * 0.5);
        scaleY.set(1 + stretch);
      }
    },
    [cursorX, cursorY, isVisible, scaleX, scaleY]
  );

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute("data-cursor") || "";
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      if (interactive) {
        setIsHovering(false);
        setCursorLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Outer ring — hollow outline, follows with a soft lag */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scaleX: scaleXSpring,
          scaleY: scaleYSpring,
        }}
        animate={{
          width: isHovering ? 56 : 26,
          height: isHovering ? 56 : 26,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", damping: 20, stiffness: 250 },
          height: { type: "spring", damping: 20, stiffness: 250 },
          opacity: { duration: 0.15 },
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: isHovering ? "rgba(245, 240, 235, 0.08)" : "transparent",
            border: "1.5px solid rgba(245, 240, 235, 0.9)",
            mixBlendMode: "difference",
          }}
        >
          {cursorLabel && isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-mono font-medium uppercase tracking-[0.15em]"
              style={{ color: "rgba(245, 240, 235, 0.9)" }}
            >
              {cursorLabel}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Center dot — precise, follows tightly */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isHovering ? 0 : 5,
          height: isHovering ? 0 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.15 },
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ff4a17",
          }}
        />
      </motion.div>
    </>
  );
}
