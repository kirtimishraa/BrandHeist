"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BsChevronDown, BsList, BsX } from "react-icons/bs";
import { menuNav } from "@/content/site-data";
import { LimelightNav, type LimelightNavItem } from "@/components/ui/limelight-nav";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "The Flex", href: "/#flex" },
  { label: "The Arsenal", href: "/#arsenal" },
];

// The Menu mega-dropdown panel (passed into the limelight nav item)
function MegaMenu() {
  return (
    <div className="grid w-[900px] grid-cols-5 gap-6 rounded-2xl border border-white/10 bg-[#17150f] p-6 shadow-2xl shadow-black/50">
      {menuNav.map((col) => (
        <div key={col.label}>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-accent">{col.label}</p>
          <ul className="space-y-2">
            {col.items.map((item) => (
              <li key={item}>
                <Link href="/#menu" className="text-[13px] leading-snug text-[#fffaf0]/70 transition-colors hover:text-accent">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const NAV_ITEMS: LimelightNavItem[] = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "flex", label: "The Flex", href: "/#flex" },
  { id: "arsenal", label: "The Arsenal", href: "/#arsenal" },
  { id: "menu", label: "The Menu", href: "/#menu", dropdown: <MegaMenu /> },
  { id: "crew", label: "The Crew", href: "/#crew" },
  { id: "blog", label: "Blogs", href: "/blog/" },
  { id: "talk", label: "Let's Talk", href: "/#talk" },
];

// Home-page sections → NAV_ITEMS index, for scroll-spy (Blogs has no section)
const SPY = [
  { id: "home", index: 0 },
  { id: "flex", index: 1 },
  { id: "arsenal", index: 2 },
  { id: "menu", index: 3 },
  { id: "crew", index: 4 },
  { id: "talk", index: 6 },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Blog pages have no hero/sections — keep nav themed and "Blogs" active.
    if (pathname?.startsWith("/blog")) {
      setActiveIndex(5);
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const pos = window.scrollY + 200;
      let current = 0;
      for (const { id, index } of SPY) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop) current = index;
      }
      setActiveIndex(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenuExpanded(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-[#0b0a08] shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Wordmark (text only) */}
        <Link href="/" aria-label="BrandHeist home" className="flex shrink-0 items-center" onClick={closeMobile}>
          <span className="font-heading text-2xl font-extrabold">
            <span className="text-heading">Brand</span>
            <span className="text-accent">Heist</span>
          </span>
        </Link>

        {/* Desktop nav — limelight (no spotlight over the hero / Home) */}
        <div className="hidden xl:block">
          <LimelightNav items={NAV_ITEMS} activeIndex={activeIndex} hideSpotlightForIndex={0} />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#get-free-audit"
            className="hidden items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-extrabold text-contrast transition hover:brightness-110 xl:inline-flex"
          >
            Free Website Audit
          </Link>

          {/* Mobile toggle */}
          <button
            className="text-2xl text-heading xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <BsX /> : <BsList />}
          </button>
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
            className="overflow-hidden border-t border-white/10 bg-[#12110d] xl:hidden"
            aria-label="Primary navigation"
          >
            <ul className="space-y-1 px-6 py-4">
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
