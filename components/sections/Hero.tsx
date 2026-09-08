"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsCupHot } from "react-icons/bs";

export default function Hero() {
  return (
    <section id="home" className="dark-background relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/assets/img/hero-bg.webp"
        alt="BrandHeist digital growth team workspace"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080806]/85 via-[#080806]/70 to-[#080806]/95" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-heading sm:text-6xl md:text-7xl">
            You&apos;re not<br />
            <span className="text-accent">Underrated</span><br />
            You&apos;re<br />
            <span className="text-accent">Under-seen</span>
          </h1>

          <p className="mt-6 text-lg text-[#fffaf0]/80 md:text-xl">
            <span className="font-semibold text-accent">
              <BsCupHot className="mb-1 inline" /> Relax.
            </span>{" "}
            We&apos;ll fix your <span className="font-semibold text-accent">digital glow-up</span>
            <br />
            Before your competitors steal your{" "}
            <span className="font-semibold text-accent">spotlight</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#get-free-audit"
              className="rounded-xl bg-accent px-5 py-2.5 font-extrabold text-contrast transition hover:brightness-110 hover:-translate-y-0.5"
            >
              Get Free Audit
            </Link>
            <Link
              href="#menu"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 font-extrabold text-heading backdrop-blur transition hover:bg-white/10 hover:-translate-y-0.5"
            >
              The Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
