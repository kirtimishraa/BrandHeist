"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BsCupHot } from "react-icons/bs";

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect reduced motion: hold the video on its first frame.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  return (
    <section id="home" className="dark-background relative flex min-h-screen items-center overflow-hidden">
      {/* Background video: fills the screen at the smallest scale that leaves no gaps, slightly dimmed */}
      <video
        ref={videoRef}
        src="/assets/video/hero-bg.mp4"
        poster="/assets/img/hero-bg.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
      />

      {/* Content — above the background */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div className="max-w-3xl" variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="font-heading text-4xl font-extrabold leading-[1.05] text-heading sm:text-5xl md:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
          >
            You&apos;re not<br />
            <span className="text-accent">Underrated</span><br />
            You&apos;re<br />
            <span className="text-accent">Under-seen</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-base text-[#fffaf0]/90 md:text-lg [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
            <span className="font-semibold text-accent">
              <BsCupHot className="mb-1 inline" /> Relax.
            </span>{" "}
            We&apos;ll fix your <span className="font-semibold text-accent">digital glow-up</span>
            <br />
            Before your competitors steal your{" "}
            <span className="font-semibold text-accent">spotlight</span>
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#get-free-audit"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5"
            >
              Get Free Audit
            </Link>
            <Link
              href="#menu"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-extrabold text-heading backdrop-blur transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              The Menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
