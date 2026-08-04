"use client";

import { motion } from "framer-motion";
import Link from "@/components/TransitionLink";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[var(--accent)] text-sm mb-6 tracking-wider">
            SEGFAULT
          </p>

          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight gradient-text">
            404
          </h1>

          <p className="text-xl md:text-2xl text-[var(--muted-light)] mb-4 leading-relaxed">
            This page returned to the void.
          </p>

          <p className="text-[var(--muted)] text-sm mb-10 max-w-md mx-auto">
            Like an uninitialized pointer, it points to nothing meaningful.
            Let&apos;s get you back to somewhere that exists.
          </p>

          <Link href="/">
            <MagneticButton
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-full text-sm hover:shadow-xl transition-shadow"
              data-cursor="Home"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
