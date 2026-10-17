"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { services, serviceFilters, type ServiceCategory } from "@/content/site-data";
import Reveal from "@/components/Reveal";
import { SERVICE_EVENT, takePendingService } from "@/lib/service-nav";

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export default function Menu() {
  const [active, setActive] = useState<ServiceCategory>("seo");
  const shown = services.filter((s) => s.category === active);

  // Open on the category picked in the nav (mega menu / mobile drawer).
  useEffect(() => {
    const pending = takePendingService();
    if (pending) setActive(pending);
    const onPick = (e: Event) => {
      const key = (e as CustomEvent<ServiceCategory>).detail;
      setActive(key);
      takePendingService(); // consumed here, don't re-apply on a later mount
      // The category switch re-lays out the grid during the link's #menu jump, which can leave
      // the page short of the section; scroll again once the new category has rendered.
      setTimeout(() => document.getElementById("menu")?.scrollIntoView(), 0);
    };
    window.addEventListener(SERVICE_EVENT, onPick);
    return () => window.removeEventListener(SERVICE_EVENT, onPick);
  }, []);

  // Phones: keep the selected chip in view in the swipeable row (e.g. "Content" picked
  // from the nav). Scrolls the row only, never the page.
  const filtersRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const row = filtersRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <section id="menu" className="border-y border-white/6 bg-white/2.5 py-24 md:py-32">
      <Reveal className="section-title container mx-auto mb-10 max-w-7xl px-4">
        <h2>The Menu</h2>
        <p>What We Serve</p>
      </Reveal>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Filters: the selected one is tinted (not a solid gold button, which is reserved for actions).
            Phones: one swipeable row (edge-faded, edge-to-edge) instead of ragged wrapped rows;
            sm+: centred and wrapping. */}
        <Reveal>
          <ul
            ref={filtersRef}
            className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 mask-[linear-gradient(90deg,transparent,#000_16px,#000_calc(100%-32px),transparent)] scrollbar-none sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:mask-none [&::-webkit-scrollbar]:hidden"
            aria-label="Service filters"
          >
            {serviceFilters.map((f) => (
              <li key={f.key} className="shrink-0">
                <button
                  type="button"
                  data-key={f.key}
                  onClick={() => setActive(f.key)}
                  aria-pressed={active === f.key}
                  className={`inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors ${
                    active === f.key
                      ? "bg-accent/15 text-accent"
                      : "bg-white/4 text-[#fffaf0]/70 hover:bg-white/[0.07] hover:text-heading"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Grid — informational cards (not links), so no hover lift that would suggest a click */}
        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => (
              <m.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, delay: Math.min(i, 8) * 0.04, ease: EASE }}
                className="rounded-2xl bg-white/3 p-6"
              >
                <h3 className="font-heading text-lg font-bold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#fffaf0]/65">{s.tech}</p>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
