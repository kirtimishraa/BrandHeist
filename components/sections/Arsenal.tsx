"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { arsenal } from "@/content/site-data";
import Reveal from "@/components/Reveal";

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-20">
      <div className="section-title container mx-auto mb-12 max-w-7xl px-4 text-center">
        <h2>The Arsenal</h2>
        <p>The Tech We Trust</p>
      </div>

      <Reveal className="container mx-auto max-w-7xl px-4">
        <Tabs.Root defaultValue={arsenal[0].id} className="grid gap-6 lg:grid-cols-3">
          <Tabs.List className="flex flex-col gap-2 lg:col-span-1" aria-label="Technology categories">
            {arsenal.map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left font-nav text-[15px] font-medium text-[#fffaf0]/75 transition hover:border-accent/40 data-[state=active]:border-accent data-[state=active]:bg-accent/10 data-[state=active]:text-heading"
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="lg:col-span-2">
            {arsenal.map((t) => (
              <Tabs.Content key={t.id} value={t.id} className="focus:outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <h3 className="font-heading text-xl font-bold leading-snug text-heading">{t.heading}</h3>
                  <p className="mt-4 italic text-accent-2">{t.tools}</p>
                  <p className="mt-4 text-[#fffaf0]/75">{t.body}</p>
                </motion.div>
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </Reveal>
    </section>
  );
}
