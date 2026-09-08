"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BsChevronDown, BsList, BsX } from "react-icons/bs";
import { menuNav } from "@/content/site-data";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "The Flex", href: "/#flex" },
  { label: "The Arsenal", href: "/#arsenal" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenuExpanded(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0b0a08]/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" aria-label="BrandHeist home" className="flex items-center gap-2.5 shrink-0" onClick={closeMobile}>
            <Image src="/assets/img/brandheist-logo.svg" alt="BrandHeist logo" width={44} height={44} priority />
            <span className="font-heading text-xl font-extrabold text-heading">BrandHeist</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}

            {/* The Menu — mega dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 font-nav text-[15px] font-medium text-[#fffaf0]/85 hover:text-accent transition-colors">
                The Menu <BsChevronDown className="text-xs" />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                  >
                    <div className="grid grid-cols-5 gap-6 rounded-2xl border border-white/10 bg-[#17150f] p-6 shadow-2xl shadow-black/50 w-[900px]">
                      {menuNav.map((col) => (
                        <div key={col.label}>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-accent">
                            {col.label}
                          </p>
                          <ul className="space-y-2">
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href="/#menu"
                                  className="text-[13px] leading-snug text-[#fffaf0]/70 hover:text-accent transition-colors"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/#crew">The Crew</NavLink>
            <NavLink href="/blog/">Blogs</NavLink>
            <NavLink href="/#talk">Let&apos;s Talk</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#get-free-audit"
              className="hidden xl:inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-extrabold text-contrast hover:brightness-110 transition"
            >
              Free Website Audit
            </Link>

            {/* Mobile toggle */}
            <button
              className="xl:hidden text-2xl text-heading"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? <BsX /> : <BsList />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden overflow-hidden bg-[#12110d] border-t border-white/10"
            aria-label="Primary navigation"
          >
            <ul className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={closeMobile} className="block py-2.5 text-[#fffaf0]/85 hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="flex w-full items-center justify-between py-2.5 text-[#fffaf0]/85 hover:text-accent"
                  onClick={() => setMobileMenuExpanded((e) => !e)}
                >
                  The Menu <BsChevronDown className={`text-xs transition-transform ${mobileMenuExpanded ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileMenuExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {menuNav.map((col) => (
                        <div key={col.label} className="py-2">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{col.label}</p>
                          <ul className="mt-1.5 space-y-1.5">
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link href="/#menu" onClick={closeMobile} className="text-[13px] text-[#fffaf0]/65 hover:text-accent">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <Link href="/#crew" onClick={closeMobile} className="block py-2.5 text-[#fffaf0]/85 hover:text-accent">The Crew</Link>
              </li>
              <li>
                <Link href="/blog/" onClick={closeMobile} className="block py-2.5 text-[#fffaf0]/85 hover:text-accent">Blogs</Link>
              </li>
              <li>
                <Link href="/#talk" onClick={closeMobile} className="block py-2.5 text-[#fffaf0]/85 hover:text-accent">Let&apos;s Talk</Link>
              </li>
              <li className="pt-2">
                <Link href="/#get-free-audit" onClick={closeMobile} className="inline-flex rounded-lg bg-accent px-4 py-2.5 text-sm font-extrabold text-contrast">
                  Free Website Audit
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3.5 py-2 font-nav text-[15px] font-medium text-[#fffaf0]/85 hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
}
