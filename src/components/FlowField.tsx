"use client";

import { useEffect, useRef } from "react";

/**
 * FlowField — Direction B signature.
 * A living oscilloscope / embedded-systems schematic: signal traces drift across
 * a flow field and bend around the cursor. Reads as "systems", literally.
 *
 * Cheap and self-contained: one canvas, ~particle count scaled to viewport,
 * pauses when off-screen / reduced-motion, cleans up on unmount.
 */
export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; molten: boolean };
    let particles: P[] = [];

    const CELL = 46; // flow-field resolution

    function seed() {
      const target = Math.min(150, Math.floor((width * height) / 15000));
      particles = new Array(target).fill(0).map((_, i) => spawn(i));
    }

    function spawn(i = 0): P {
      const max = 160 + Math.random() * 200;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * max,
        max,
        // ~1 in 7 traces run molten for an ambient dual-accent balance
        molten: i % 7 === 3,
      };
    }

    // Smooth pseudo-noise angle field (no deps).
    function fieldAngle(x: number, y: number, t: number) {
      const nx = x / (CELL * 6);
      const ny = y / (CELL * 6);
      return (
        Math.sin(nx + t * 0.15) * 1.4 +
        Math.cos(ny - t * 0.1) * 1.2 +
        Math.sin((nx + ny) * 0.6) * 0.9
      );
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      // paint an initial frame so there's never a blank hero
      ctx!.fillStyle = "#0a0a0b";
      ctx!.fillRect(0, 0, width, height);
    }

    let t = 0;
    const R = 300; // cursor influence radius
    function frame() {
      if (!running) return;
      t += 0.013; // slightly slower, calmer field

      // trail fade — lower alpha = longer, more elegant traces
      ctx!.fillStyle = "rgba(10,10,11,0.07)";
      ctx!.fillRect(0, 0, width, height);

      for (const p of particles) {
        let a = fieldAngle(p.x, p.y, t);

        // bend / swirl around the cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const swirl = Math.atan2(dy, dx) + Math.PI / 2;
            const w = (1 - d / R) * 2.4;
            a = a * (1 - w * 0.5) + swirl * (w * 0.5);
          }
        }

        p.vx += Math.cos(a) * 0.75;
        p.vy += Math.sin(a) * 0.75;
        p.vx *= 0.88;
        p.vy *= 0.88;

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const near = mouse.active
          ? Math.max(0, 1 - Math.hypot(p.x - mouse.x, p.y - mouse.y) / (R + 40))
          : 0;

        // ambient traces keep their molten/signal identity; everything
        // flares molten (heat) close to the cursor.
        const molten = p.molten || near > 0.4;
        const alpha = (p.molten ? 0.13 : 0.15) + near * 0.55;
        ctx!.strokeStyle = molten
          ? `rgba(255,74,23,${alpha})`
          : `rgba(0,231,167,${alpha})`;
        ctx!.lineWidth = 1 + near * 1.3;
        ctx!.beginPath();
        ctx!.moveTo(px, py);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();

        if (
          p.life > p.max ||
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20
        ) {
          const wasMolten = p.molten;
          Object.assign(p, spawn(), { life: 0, molten: wasMolten });
        }
      }

      raf = requestAnimationFrame(frame);
    }

    resize();

    if (reduce) {
      // single static frame, no animation loop
      ctx.fillStyle = "#0a0a0b";
      ctx.fillRect(0, 0, width, height);
      for (const p of particles) {
        ctx.fillStyle = "rgba(0,231,167,0.12)";
        ctx.fillRect(p.x, p.y, 1.4, 1.4);
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => resize();

    // pause when hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasRunning = running;
        running = entry.isIntersecting && !reduce;
        if (running && !wasRunning) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
