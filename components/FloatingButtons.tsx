"use client";

import { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { site } from "@/content/site-data";
import { track } from "@/lib/analytics";

// Pushes the phone_click event (the original inlined it for tel: links).
function trackPhone(href: string) {
  track("phone_click", { link_url: href, link_text: "Call BrandHeist" });
}

const PEEK_KEY = "bh-call-peeked";

export default function FloatingButtons() {
  // Touch screens can't hover (and a tap should dial straight away), so on those
  // the label slides out once by itself a few seconds in, then tucks back.
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    try {
      if (sessionStorage.getItem(PEEK_KEY)) return;
      sessionStorage.setItem(PEEK_KEY, "1");
    } catch {
      // storage blocked: still peek, just not remembered
    }
    const show = setTimeout(() => setPeek(true), 2500);
    const hide = setTimeout(() => setPeek(false), 6500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    // WhatsApp now lives in the hero ("Chat on WhatsApp"), so only the call button floats.
    // Collapsed: a 56px gold circle. Hover / keyboard focus / peek: expands into icon + "Call now" (label on the right).
    <a
      href={site.phoneHref}
      aria-label={`Call BrandHeist now on ${site.phoneDisplay}`}
      onClick={() => trackPhone(site.phoneHref)}
      data-peek={peek || undefined}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center rounded-full bg-accent px-4 text-contrast shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_4px_14px_rgba(0,0,0,0.35)] hover:brightness-105 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-accent/30"
    >
      {/* 24px icon box + 16px padding each side = 56px circle when collapsed */}
      <span className="grid h-6 w-6 shrink-0 place-items-center">
        <BsTelephone className="text-2xl transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
      </span>
      {/* Label: 10px gap after the icon, +4px right padding so the pill's ends feel even */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-bold opacity-0 transition-all duration-300 ease-out group-hover:ml-2.5 group-hover:max-w-24 group-hover:pr-1 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-24 group-focus-visible:pr-1 group-focus-visible:opacity-100 group-data-peek:ml-2.5 group-data-peek:max-w-24 group-data-peek:pr-1 group-data-peek:opacity-100">
        Call now
      </span>
    </a>
  );
}
