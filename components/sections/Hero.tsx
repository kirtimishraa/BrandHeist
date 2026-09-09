"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

// Heavy veil over the background image only — kept dark unless the torch is on it.
const REST = "rgba(4,4,3,0.94)";
const hole = (x: string, y: string) =>
  // warm tint ONLY inside the revealed circle + the neutral dark veil around it
  `radial-gradient(320px circle at ${x} ${y}, rgba(244,182,61,0.14) 0%, rgba(244,182,61,0) 44%),` +
  `radial-gradient(320px circle at ${x} ${y}, rgba(4,4,3,0) 0%, rgba(4,4,3,0) 32%, rgba(4,4,3,0.5) 64%, rgba(4,4,3,0.93) 100%)`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) overlayRef.current.style.background = REST;
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (overlayRef.current) overlayRef.current.style.background = hole(`${x}px`, `${y}px`);
    // very subtle parallax: image drifts a few px opposite the cursor
    if (imgRef.current) {
      const dx = (x / r.width - 0.5) * -12;
      const dy = (y / r.height - 0.5) * -12;
      imgRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const onLeave = () => {
    if (overlayRef.current) overlayRef.current.style.background = REST;
    if (imgRef.current) imgRef.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="dark-background relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background layer: image + parallax + dark torch veil (all below content) */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imgRef} className="absolute inset-[-10px] transition-transform duration-300 ease-out will-change-transform">
          <Image
            src="/assets/img/hero-bg.webp"
            alt="BrandHeist digital growth team workspace"
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
        </div>
        <div ref={overlayRef} className="pointer-events-none absolute inset-0" style={{ background: REST }} />
      </div>

      {/* Content — always fully visible, above the veil */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div className="max-w-3xl" variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="font-heading text-5xl font-extrabold leading-[1.05] text-heading sm:text-6xl md:text-7xl [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
          >
            You&apos;re not<br />
            <span className="text-accent">Underrated</span><br />
            You&apos;re<br />
            <span className="text-accent">Under-seen</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg text-[#fffaf0]/90 md:text-xl [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
            <span className="font-semibold text-accent">
              <BsCupHot className="mb-1 inline" /> Relax.
            </span>{" "}
            We&apos;ll fix your <span className="font-semibold text-accent">digital glow-up</span>
            <br />
            Before your competitors steal your{" "}
            <span className="font-semibold text-accent">spotlight</span>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#get-free-audit"
              className="rounded-xl bg-accent px-5 py-2.5 font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5"
            >
              Get Free Audit
            </Link>
            <Link
              href="#menu"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-extrabold text-heading backdrop-blur transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              The Menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
