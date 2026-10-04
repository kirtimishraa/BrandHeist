"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsCupHot } from "react-icons/bs";
import { menuNav } from "@/content/site-data";
import { Arrow, EASE, MONO } from "./ui";

const LINES = [
  { text: "You're not", gold: false },
  { text: "Underrated", gold: true },
  { text: "You're", gold: false },
  { text: "Under-seen", gold: true },
];
const TICKER = menuNav.flatMap((c) => c.items);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0907]">
      {/* Photo with scroll parallax; darkened on the text side only */}
      <motion.div style={{ y: photoY, scale: photoScale }} className="absolute inset-0 -z-10">
        <Image
          src="/assets/img/hero-bg.webp"
          alt="BrandHeist digital growth team workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0a0907_0%,rgba(10,9,7,0.9)_30%,rgba(10,9,7,0.5)_60%,rgba(10,9,7,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/80 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-end px-5 pb-28 pt-32 md:px-8 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`${MONO} mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#f6efe1]/60`}
        >
          <span className="h-px w-8 bg-[#f4b63d]" aria-hidden="true" />
          Digital marketing agency · Mumbai
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="font-heading text-[clamp(3.1rem,9.2vw,7.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-[#f6efe1] min-w-0 lg:col-span-8">
            {LINES.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-[0.07em]">
                <motion.span
                  className={`block ${l.gold ? "text-[#f4b63d]" : ""}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 1, ease: EASE }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="min-w-0 lg:col-span-4 lg:pb-4"
          >
            <p className="max-w-[36ch] text-[17px] leading-relaxed text-[#f6efe1]/75">
              <span className="font-semibold text-[#f4b63d]">
                <BsCupHot className="mb-1 mr-1 inline" aria-hidden="true" />
                Relax.
              </span>{" "}
              We&apos;ll fix your <span className="font-semibold text-[#f4b63d]">digital glow-up</span>
              <br className="hidden md:block" /> Before your competitors steal your{" "}
              <span className="font-semibold text-[#f4b63d]">spotlight</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#get-free-audit"
                className="group inline-flex h-14 items-center gap-4 rounded-full bg-[#f4b63d] pl-7 pr-2 text-[15px] font-bold text-[#0a0907] transition-[background-color,transform] duration-200 hover:bg-[#ffc757] active:scale-[0.97]"
              >
                Get Free Audit
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0907] text-[#f4b63d] transition-transform duration-300 group-hover:-rotate-45">
                  <Arrow />
                </span>
              </a>
              <a href="#menu" className="group inline-flex h-14 items-center gap-2 text-[15px] font-semibold text-[#f6efe1]">
                <span className="relative">
                  The Menu
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[#f6efe1]/30" />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#f4b63d] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <Arrow className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Service ticker along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-[#0a0907]/50 backdrop-blur-sm">
        <div className="marquee-mask overflow-hidden py-4" aria-hidden="true">
          <div className="marquee-track" style={{ animationDuration: "70s" }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className={`${MONO} flex shrink-0 items-center gap-8 pr-8 text-[11.5px] uppercase tracking-[0.18em] text-[#f6efe1]/55`}>
                {t}
                <span className="h-1.5 w-1.5 rotate-45 bg-[#f4b63d]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
