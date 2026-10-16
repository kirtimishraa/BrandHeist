"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import AuditForm from "@/components/AuditForm";
import { track } from "@/lib/analytics";

// On-visit "Get My Diwali Plan" popup. Shows on every visit and every reload,
// after a short delay (an instant interstitial annoys visitors and Google penalises
// intrusive popups on mobile), never over someone already typing in a form, and
// not on blog articles (readers came to read; the article has its own CTA).
const DELAY_MS = 4000;
const isBlogArticle = () => /^\/blog\/[^/]+\/?$/.test(window.location.pathname);

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export default function AuditPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const submitted = useRef(false);

  useEffect(() => {
    if (isBlogArticle()) return;
    const t = setTimeout(() => {
      if (document.activeElement?.closest("form")) return; // don't interrupt someone filling a form
      if (isBlogArticle()) return; // navigated into an article during the delay
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      track("audit_popup_open");
    }, DELAY_MS);
    return () => clearTimeout(t);
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
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
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
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="thin-scrollbar relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-3xl bg-[#14130f] p-6 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] outline-none sm:max-w-2xl sm:rounded-3xl sm:px-10 sm:py-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-xl text-[#fffaf0]/70 transition-colors hover:bg-white/10 hover:text-heading"
            >
              <BsX aria-hidden="true" />
            </button>

            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-6 bg-accent opacity-80" aria-hidden="true" />
              Diwali 2026
            </p>
            <h2 id="audit-popup-title" className="mt-3 pr-12 font-heading text-[1.65rem] font-extrabold leading-tight text-heading sm:text-[1.9rem]">
              Get Your Free Diwali Plan
            </h2>
            <p id="audit-popup-desc" className="mt-2 text-[15px] leading-relaxed text-[#fffaf0]/65">
              Tell us about your business and get a free business audit to plan your festive growth.
            </p>

            <div className="mt-6">
              <AuditForm variant="popup" source="popup" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
