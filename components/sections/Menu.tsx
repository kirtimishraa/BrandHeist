"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { services, serviceFilters, type ServiceCategory } from "@/content/site-data";
import Reveal from "@/components/Reveal";

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export default function Menu() {
  const [active, setActive] = useState<ServiceCategory>("seo");
  const shown = services.filter((s) => s.category === active);

  return (
    <section id="menu" className="py-20">
      <Reveal className="section-title container mx-auto mb-10 max-w-7xl px-4">
        <h2>The Menu</h2>
        <p>What We Serve</p>
      </Reveal>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Filters */}
        <Reveal>
          <ul className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Service filters">
            {serviceFilters.map((f) => (
              <li key={f.key}>
                <button
                  onClick={() => setActive(f.key)}
                  aria-pressed={active === f.key}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    active === f.key
                      ? "bg-accent text-contrast"
                      : "border border-white/10 bg-white/[0.03] text-[#fffaf0]/70 hover:border-accent/40 hover:text-heading"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => (
              <motion.div
                key={s.title}
                layout
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.05, ease: EASE }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.05]"
              >
                <Link href="#menu" className="font-heading text-lg font-bold text-heading transition-colors group-hover:text-accent">
                  {s.title}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-[#fffaf0]/65">{s.tech}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
