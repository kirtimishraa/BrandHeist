"use client";

import { BsWhatsapp, BsTelephone } from "react-icons/bs";
import { site } from "@/content/site-data";
import { track } from "@/lib/analytics";

// Pushes the phone_click event (the original inlined it for tel: links).
function trackPhone(href: string) {
  track("phone_click", { link_url: href, link_text: "Call BrandHeist" });
}

export default function FloatingButtons() {
  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BrandHeist on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-lg shadow-black/40 transition hover:scale-110"
      >
        <BsWhatsapp />
      </a>
      <a
        href={site.phoneHref}
        aria-label="Call Now"
        onClick={() => trackPhone(site.phoneHref)}
        className="fixed bottom-[5.5rem] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-contrast shadow-lg shadow-black/40 transition hover:scale-110"
      >
        <BsTelephone />
      </a>
    </>
  );
}
