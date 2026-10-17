"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { BsChevronDown, BsList, BsX } from "react-icons/bs";
import { menuNav, serviceFilters } from "@/content/site-data";
import { LimelightNav, type LimelightNavItem } from "@/components/ui/limelight-nav";
import { categoryForLabel, selectService } from "@/lib/service-nav";
import BlogThemeToggle from "@/components/blogs/BlogThemeToggle";

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
                  <a
                    href="/#menu"
                    onClick={(e) => {
                      selectService(cat);
                      // release focus so the (focus-within) panel closes after the jump
                      e.currentTarget.blur();
                    }}
                    className="block py-1 text-[13px] leading-snug text-[#fffaf0]/70 transition-colors hover:text-accent"
                  >
                    {item}
                  </a>
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
  { id: "blog", label: "Blogs", href: "/blogs/" },
  { id: "talk", label: "Let's Talk", href: "/#talk" },
];

const navIndex = (id: string) => NAV_ITEMS.findIndex((i) => i.id === id);

// Home-page sections in page order → NAV_ITEMS index, for scroll-spy (Blogs has no section)
const SPY = ["home", "flex", "menu", "arsenal", "talk"]
  .map((id) => ({ id, index: navIndex(id) }))
  .filter((s) => s.index !== -1);

// Links to home-page sections are plain <a>, not next/link: Link does nothing when the URL
// already has that #hash, so a second click wouldn't scroll back to the section.
const drawerLink = "flex min-h-[44px] items-center text-[#fffaf0]/85 hover:text-accent";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const pathname = usePathname();
  const onBlogs = pathname?.startsWith("/blogs");
  const onPost = /^\/blogs\/[^/]+\/?$/.test(pathname ?? "");

  useEffect(() => {
    // Blog pages have no hero/sections — keep nav themed and "Blogs" active.
    if (onBlogs) {
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
  }, [pathname, onBlogs]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenuExpanded(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-200 ${
        scrolled || onBlogs ? "border-b border-white/10 bg-[#0b0a08] shadow-lg shadow-black/40" : "bg-transparent"
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
          {/* Light/dark switch, individual posts only (hidden on very narrow phones, which keep the saved/default theme) */}
          {onPost && (
            <div className="max-[359px]:hidden">
              <BlogThemeToggle />
            </div>
          )}
          {/* Primary action: visible at every width. Phones: same size/shape as the hero buttons (36px, 10px radius, 12px bold) */}
          <a
            href="/#get-free-audit"
            onClick={closeMobile}
            className="inline-flex h-9 items-center whitespace-nowrap rounded-[10px] bg-accent px-3 text-xs font-bold min-[400px]:px-3.5 text-contrast transition hover:brightness-110 sm:h-auto sm:min-h-[44px] sm:rounded-lg sm:px-4 sm:text-sm sm:font-extrabold"
          >
            Get My Diwali Plan
          </a>

          {/* Mobile toggle — 44px tap target */}
          <button
            type="button"
            className="-mr-3 grid h-11 w-11 place-items-center text-[22px] text-heading sm:text-2xl lg:hidden"
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
          <m.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 bg-[#12110d] lg:hidden"
            aria-label="Primary navigation"
          >
            <ul className="px-6 py-3">
              <li>
                <a href="/#home" onClick={closeMobile} className={drawerLink}>Home</a>
              </li>
              <li>
                <a href="/#flex" onClick={closeMobile} className={drawerLink}>The Flex</a>
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
                    <m.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {/* The 5 categories as large targets (not all 20 services) */}
                      {serviceFilters.map((f) => (
                        <li key={f.key}>
                          <a
                            href="/#menu"
                            onClick={() => {
                              selectService(f.key);
                              closeMobile();
                            }}
                            className="flex min-h-[44px] items-center text-[15px] text-[#fffaf0]/65 hover:text-accent"
                          >
                            {f.label}
                          </a>
                        </li>
                      ))}
                    </m.ul>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <a href="/#arsenal" onClick={closeMobile} className={drawerLink}>The Arsenal</a>
              </li>
              <li>
                <Link href="/blogs/" onClick={closeMobile} className={drawerLink}>Blogs</Link>
              </li>
              <li>
                <a href="/#talk" onClick={closeMobile} className={drawerLink}>Let&apos;s Talk</a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
