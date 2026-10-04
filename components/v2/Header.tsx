"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "./ui";

const LINKS: { id: string; label: string; href?: string }[] = [
  { id: "home", label: "Home" },
  { id: "flex", label: "The Flex" },
  { id: "arsenal", label: "The Arsenal" },
  { id: "menu", label: "The Menu" },
  { id: "crew", label: "The Crew" },
  { id: "blog", label: "Blogs", href: "/blog/" },
  { id: "talk", label: "Let's Talk" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= probe) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + Escape to close while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-white/[0.06] bg-[#0a0907]/80 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 transition-[height] duration-300 md:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="#home" className="font-heading text-[22px] font-extrabold tracking-[-0.02em]" aria-label="BrandHeist home">
            <span className="text-[#f6efe1]">Brand</span>
            <span className="text-[#f4b63d]">Heist</span>
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <li key={l.id}>
                    <a
                      href={l.href ?? `#${l.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block px-3.5 py-3 text-[14.5px] font-medium transition-colors ${
                        isActive ? "text-[#f6efe1]" : "text-[#f6efe1]/55 hover:text-[#f6efe1]"
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 bottom-1.5 h-[2px] rounded-full bg-[#f4b63d]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#get-free-audit"
              className="hidden h-11 items-center rounded-full bg-[#f4b63d] px-5 text-[14px] font-bold text-[#0a0907] transition-[background-color,transform] duration-200 hover:bg-[#ffc757] active:scale-[0.97] sm:inline-flex"
            >
              Free Website Audit
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/40 lg:hidden"
            >
              <span className="flex w-[18px] flex-col gap-[5px]">
                <span className="h-[1.5px] w-full bg-[#f6efe1]" />
                <span className="h-[1.5px] w-2/3 bg-[#f6efe1]" />
              </span>
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#f4b63d]" />
      </header>

      {/* Rendered outside <header>: its backdrop-filter would trap a fixed overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0a0907] px-5 pb-8 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-20 items-center justify-between">
              <span className="font-heading text-[22px] font-extrabold tracking-[-0.02em]">
                <span className="text-[#f6efe1]">Brand</span>
                <span className="text-[#f4b63d]">Heist</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#f6efe1]"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="flex flex-1 flex-col justify-center"
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                >
                  <a
                    href={l.href ?? `#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-2 font-heading text-[clamp(2rem,9vw,3rem)] font-extrabold tracking-[-0.03em] ${
                      active === l.id ? "text-[#f4b63d]" : "text-[#f6efe1]"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href="#get-free-audit"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-full bg-[#f4b63d] text-[15px] font-bold text-[#0a0907]"
            >
              Free Website Audit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
