"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services, serviceFilters, type ServiceCategory } from "@/content/site-data";
import { Arrow, EASE, MONO, SectionLabel } from "./ui";

type Service = (typeof services)[number];

const firstOf = (c: ServiceCategory) => services.find((s) => s.category === c)!.title;

export default function MenuSection() {
  const [cat, setCat] = useState<ServiceCategory>("seo");
  // Sensible default: the first service in the category starts open.
  const [openTitle, setOpenTitle] = useState<string | null>(firstOf("seo"));
  const items = services.filter((s) => s.category === cat);

  const pick = (c: ServiceCategory) => {
    setCat(c);
    setOpenTitle(firstOf(c));
  };

  return (
    <section id="menu" className="scroll-mt-16 bg-[#0a0907] py-24 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Left: title + category picker (sticky on desktop) */}
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>The Menu</SectionLabel>
            <h2 className="mt-5 font-heading text-[clamp(2.6rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[#f6efe1] text-balance">
              What We Serve
            </h2>
            <p className="mt-5 max-w-[32ch] text-[15.5px] leading-relaxed text-[#f6efe1]/55">
              Pick a category, then open any service to see what&apos;s inside.
            </p>

            <div
              role="tablist"
              aria-label="Service categories"
              className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {serviceFilters.map((f) => {
                const on = f.key === cat;
                const count = services.filter((s) => s.category === f.key).length;
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(f.key)}
                    className={`flex min-h-[44px] shrink-0 items-center justify-between gap-6 whitespace-nowrap rounded-full border px-5 text-left text-[15px] font-semibold transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-white/[0.08] lg:px-0 lg:py-4 ${
                      on
                        ? "border-[#f4b63d] bg-[#f4b63d] text-[#0a0907] lg:bg-transparent lg:text-[#f4b63d]"
                        : "border-white/15 text-[#f6efe1]/60 hover:text-[#f6efe1]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`hidden h-1.5 w-1.5 rounded-full transition-[transform,background-color] duration-300 lg:block ${
                          on ? "scale-100 bg-[#f4b63d]" : "scale-75 bg-white/25"
                        }`}
                      />
                      {f.label}
                    </span>
                    <span className={`${MONO} hidden text-[12px] lg:inline`}>{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: accordion of services in the active category */}
        <div className="min-w-0 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.ul
              key={cat}
              role="tabpanel"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              className="border-t border-white/[0.08]"
            >
              {items.map((s) => (
                <Row
                  key={s.title}
                  s={s}
                  open={openTitle === s.title}
                  onToggle={() => setOpenTitle((t) => (t === s.title ? null : s.title))}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Row({ s, open, onToggle }: { s: Service; open: boolean; onToggle: () => void }) {
  const tags = s.tech.split(/,\s*/);
  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
      className="border-b border-white/[0.08]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
      >
        <span
          className={`font-heading text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold tracking-[-0.02em] transition-[color,transform] duration-300 group-hover:translate-x-1.5 ${
            open ? "text-[#f4b63d]" : "text-[#f6efe1]"
          }`}
        >
          {s.title}
        </span>
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
            open
              ? "rotate-45 border-[#f4b63d] bg-[#f4b63d] text-[#0a0907]"
              : "border-white/15 text-[#f6efe1] group-hover:border-white/40"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pr-16">
              <ul className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13.5px] text-[#f6efe1]/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="#talk"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-[#f4b63d] transition-[gap] duration-200 hover:gap-3"
              >
                Ask about {s.title} <Arrow />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
