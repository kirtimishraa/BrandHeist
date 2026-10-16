"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import { arsenal } from "@/content/site-data";
import Reveal from "@/components/Reveal";

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

type Item = (typeof arsenal)[number];

function Details({ t }: { t: Item }) {
  return (
    <>
      <h3 className="font-heading text-xl font-bold leading-snug text-heading">{t.heading}</h3>
      <p className="mt-4 italic text-accent-2">{t.tools}</p>
      <p className="mt-4 text-[#fffaf0]/75">{t.body}</p>
    </>
  );
}

export default function Arsenal() {
  // Phones: accordion, so the details open right under the item tapped.
  const [openId, setOpenId] = useState<string | null>(arsenal[0].id);

  return (
    <section id="arsenal" className="py-24 md:py-32">
      <Reveal className="section-title container mx-auto mb-12 max-w-7xl px-4">
        <h2>The Arsenal</h2>
        <p>The Tech We Trust</p>
      </Reveal>

      <Reveal className="container mx-auto max-w-7xl px-4">
        {/* Phones & tablets: accordion */}
        <ul className="space-y-2 lg:hidden">
          {arsenal.map((t) => {
            const open = openId === t.id;
            return (
              <li key={t.id} className={`rounded-xl transition-colors ${open ? "bg-accent/[0.08]" : "bg-white/[0.03]"}`}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : t.id)}
                  aria-expanded={open}
                  aria-controls={`arsenal-${t.id}`}
                  className={`flex min-h-[56px] w-full items-center justify-between gap-4 px-5 text-left font-nav text-[15px] font-medium ${
                    open ? "text-heading" : "text-[#fffaf0]/75"
                  }`}
                >
                  {t.label}
                  <BsChevronDown className={`shrink-0 text-xs transition-transform ${open ? "rotate-180 text-accent" : ""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`arsenal-${t.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6">
                        <Details t={t} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Desktop: tabs beside their content */}
        <Tabs.Root defaultValue={arsenal[0].id} className="hidden gap-6 lg:grid lg:grid-cols-3">
          <Tabs.List className="flex flex-col gap-2 lg:col-span-1" aria-label="Technology categories">
            {arsenal.map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className="rounded-xl bg-white/[0.03] px-5 py-4 text-left font-nav text-[15px] font-medium text-[#fffaf0]/75 transition hover:bg-white/[0.06] data-[state=active]:bg-accent/[0.12] data-[state=active]:text-heading"
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
                  className="rounded-2xl bg-white/[0.03] p-7"
                >
                  <Details t={t} />
                </motion.div>
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </Reveal>
    </section>
  );
}
