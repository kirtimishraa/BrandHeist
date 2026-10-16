"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import AuditForm from "@/components/AuditForm";
import { track } from "@/lib/analytics";

// "Get My Diwali Plan" popup. Opens on the first intent signal instead of a short timer:
// exit intent (desktop pointer leaving through the top edge), ~50% page scroll, or 18s.
// Once per browser session (a session cookie, so reloads and internal pages don't repeat it),
// never over someone already typing in a form, and not on blog articles (readers came to
// read; the article has its own CTA).
const DELAY_MS = 18000;
const SCROLL_SHARE = 0.5;
const SEEN_COOKIE = "bh_popup_seen";
const isBlogArticle = () => /^\/blog\/[^/]+\/?$/.test(window.location.pathname);

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export default function AuditPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const submitted = useRef(false);

  useEffect(() => {
    if (document.cookie.includes(`${SEEN_COOKIE}=1`)) return;

    const show = (trigger: string) => {
      // blocked signals just wait for the next one (e.g. scroll after leaving an article)
      if (isBlogArticle() || document.activeElement?.closest("form")) return;
      stop();
      document.cookie = `${SEEN_COOKIE}=1; path=/; SameSite=Lax`; // no expiry: gone when the browser session ends
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      track("audit_popup_open", { trigger });
    };
    const onScroll = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (room > 0 && window.scrollY / room >= SCROLL_SHARE) show("scroll");
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show("exit_intent");
    };

    const timer = setTimeout(() => show("timer"), DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    // exit intent only means something with a real mouse
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (desktop) document.addEventListener("mouseout", onMouseOut);

    function stop() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }
    return stop;
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (!submitted.current) track("audit_popup_dismiss");
    returnFocus.current?.focus?.();
  }, []);

  // While open: lock page scroll, focus the dialog (not an input, so phones don't
  // pop the keyboard), close on Escape, keep Tab inside the dialog.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          // light, unblurred backdrop so the page stays visible around the card; click it to close
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-popup-title"
            aria-describedby="audit-popup-desc"
            tabIndex={-1}
            onSubmitCapture={() => {
              // fires only after the browser's required-field checks pass; just stops
              // a post-submit close from being counted as a dismiss
              submitted.current = true;
            }}
            // A centred card that pops in (not a bottom sheet), compact on phones
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="thin-scrollbar relative max-h-[90svh] w-full max-w-[22rem] overflow-y-auto overscroll-contain rounded-2xl bg-[#14130f] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] outline-none sm:max-w-2xl sm:rounded-3xl sm:px-10 sm:py-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl text-heading ring-1 ring-white/15 transition-colors hover:bg-white/20 sm:right-3 sm:top-3"
            >
              <BsX aria-hidden="true" />
            </button>

            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
              <span className="h-px w-6 bg-accent opacity-80" aria-hidden="true" />
              Diwali 2026
            </p>
            <h2 id="audit-popup-title" className="mt-2 pr-12 font-heading text-xl font-extrabold leading-tight text-heading sm:mt-3 sm:text-[1.9rem]">
              Get Your Free Diwali Plan
            </h2>
            <p id="audit-popup-desc" className="mt-1.5 text-[13px] leading-relaxed text-[#fffaf0]/65 sm:mt-2 sm:text-[15px]">
              Tell us about your business and get a free business audit to plan your festive growth.
            </p>

            <div className="mt-4 sm:mt-6">
              <AuditForm variant="popup" source="popup" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
