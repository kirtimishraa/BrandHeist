"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BsChevronDown, BsList, BsX } from "react-icons/bs";
import { menuNav, serviceFilters } from "@/content/site-data";
import { LimelightNav, type LimelightNavItem } from "@/components/ui/limelight-nav";
import { categoryForLabel, selectService } from "@/lib/service-nav";

// The Menu mega-dropdown panel (passed into the limelight nav item).
// Each link opens The Menu on that service's category.
function MegaMenu() {
  return (
    <div className="grid w-[900px] grid-cols-5 gap-6 rounded-2xl border border-white/10 bg-[#17150f] p-6 shadow-2xl shadow-black/50">
      {menuNav.map((col) => {
        const cat = categoryForLabel(col.label);
        return (
          <div key={col.label}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-accent">{col.label}</p>
            <ul className="space-y-1">
              {col.items.map((item) => (
                <li key={item}>
                  <Link
                    href="/#menu"
                    onClick={(e) => {
                      selectService(cat);
                      // release focus so the (focus-within) panel closes after the jump
                      e.currentTarget.blur();
                    }}
                    className="block py-1 text-[13px] leading-snug text-[#fffaf0]/70 transition-colors hover:text-accent"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// Order follows the page: services (The Menu) before tools (The Arsenal).
const NAV_ITEMS: LimelightNavItem[] = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "flex", label: "The Flex", href: "/#flex" },
  { id: "menu", label: "The Menu", href: "/#menu", dropdown: <MegaMenu /> },
  { id: "arsenal", label: "The Arsenal", href: "/#arsenal" },
  // Crew section hidden for now
  // { id: "crew", label: "The Crew", href: "/#crew" },
  { id: "blog", label: "Blogs", href: "/blog/" },
  { id: "talk", label: "Let's Talk", href: "/#talk" },
];

const navIndex = (id: string) => NAV_ITEMS.findIndex((i) => i.id === id);

// Home-page sections in page order → NAV_ITEMS index, for scroll-spy (Blogs has no section)
const SPY = ["home", "flex", "menu", "arsenal", "crew", "talk"]
  .map((id) => ({ id, index: navIndex(id) }))
  .filter((s) => s.index !== -1);

const drawerLink = "flex min-h-[44px] items-center text-[#fffaf0]/85 hover:text-accent";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Blog pages have no hero/sections — keep nav themed and "Blogs" active.
    if (pathname?.startsWith("/blog")) {
      setActiveIndex(navIndex("blog"));
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
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 min-[360px]:gap-3">
        {/* Wordmark (text only) */}
        <Link href="/" aria-label="BrandHeist home" className="flex min-h-[44px] shrink-0 items-center" onClick={closeMobile}>
          <span className="font-heading text-lg font-extrabold min-[360px]:text-xl sm:text-2xl">
            <span className="text-heading">Brand</span>
            <span className="text-accent">Heist</span>
          </span>
        </Link>

        {/* Desktop nav — limelight (no spotlight over the hero / Home) */}
        <div className="hidden lg:block">
          <LimelightNav items={NAV_ITEMS} activeIndex={activeIndex} hideSpotlightForIndex={0} />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Primary action: visible at every width. Phones: same size/shape as the hero buttons (36px, 10px radius, 12px bold) */}
          <Link
            href="/#get-free-audit"
            onClick={closeMobile}
            className="inline-flex h-9 items-center whitespace-nowrap rounded-[10px] bg-accent px-3.5 text-xs font-bold text-contrast transition hover:brightness-110 sm:h-auto sm:min-h-[44px] sm:rounded-lg sm:px-4 sm:text-sm sm:font-extrabold"
          >
            Get My Diwali Plan
          </Link>

          {/* Mobile toggle — 44px tap target */}
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center text-[22px] text-heading sm:text-2xl lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
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
            className="overflow-hidden border-t border-white/10 bg-[#12110d] lg:hidden"
            aria-label="Primary navigation"
          >
            <ul className="px-6 py-3">
              <li>
                <Link href="/#home" onClick={closeMobile} className={drawerLink}>Home</Link>
              </li>
              <li>
                <Link href="/#flex" onClick={closeMobile} className={drawerLink}>The Flex</Link>
              </li>
              <li>
                <button
                  type="button"
                  className={`${drawerLink} w-full justify-between`}
                  onClick={() => setMobileMenuExpanded((e) => !e)}
                  aria-expanded={mobileMenuExpanded}
                >
                  The Menu <BsChevronDown className={`text-xs transition-transform ${mobileMenuExpanded ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileMenuExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {/* The 5 categories as large targets (not all 20 services) */}
                      {serviceFilters.map((f) => (
                        <li key={f.key}>
                          <Link
                            href="/#menu"
                            onClick={() => {
                              selectService(f.key);
                              closeMobile();
                            }}
                            className="flex min-h-[44px] items-center text-[15px] text-[#fffaf0]/65 hover:text-accent"
                          >
                            {f.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <Link href="/#arsenal" onClick={closeMobile} className={drawerLink}>The Arsenal</Link>
              </li>
              {/* Crew section hidden for now
              <li>
                <Link href="/#crew" onClick={closeMobile} className={drawerLink}>The Crew</Link>
              </li>
              */}
              <li>
                <Link href="/blog/" onClick={closeMobile} className={drawerLink}>Blogs</Link>
              </li>
              <li>
                <Link href="/#talk" onClick={closeMobile} className={drawerLink}>Let&apos;s Talk</Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
