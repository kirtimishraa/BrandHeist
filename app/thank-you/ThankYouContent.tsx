"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsWhatsapp } from "react-icons/bs";
import { site } from "@/content/site-data";
import { track } from "@/lib/analytics";

type Cfg = { tag: string; title: string; body: string; steps: string[] | null; waMsg: string };

const CONFIG: Record<string, Cfg> = {
  audit: {
    tag: "Audit Requested",
    title: "Your audit is in the queue.",
    body: "We'll dig into your site and come back with real, actionable findings - usually within 24 hours.",
    steps: [
      "We audit your site for SEO, speed, and conversion gaps",
      "We put together a clear, tailored findings report",
      "We reach out to walk you through every finding",
    ],
    waMsg: "Hi BrandHeist! I just requested a free audit. Looking forward to the results!",
  },
  contact: {
    tag: "Message Received",
    title: "Message received.",
    body: "Someone from the crew will get back to you shortly. We're usually pretty quick about it.",
    steps: [
      "We read your message carefully",
      "We match you with the right crew member",
      "You hear back within a few business hours",
    ],
    waMsg: "Hi BrandHeist! I just sent a message through the website. Let's connect!",
  },
  newsletter: {
    tag: "Newsletter Subscribed",
    title: "You're on the list.",
    body: "Expect sharp marketing insights, zero fluff. We publish when we actually have something worth saying.",
    steps: null,
    waMsg: "Hi BrandHeist! Just subscribed to the newsletter. Really excited to see the content!",
  },
};

export default function ThankYouContent() {
  const params = useSearchParams();
  const key = params.get("form") || "contact";
  const d = CONFIG[key] || CONFIG.contact;

  useEffect(() => {
    track("form_submission_complete", { form_type: key, page_title: document.title });
  }, [key]);

  return (
    <section className="dark-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-24 pt-28">
      <Image src="/assets/img/hero-bg.webp" alt="" aria-hidden fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080806]/85 via-[#080806]/65 to-[#080806]/85" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        {/* Animated checkmark */}
        <motion.svg
          viewBox="0 0 88 88"
          className="mx-auto mb-9 h-24 w-24"
          style={{ filter: "drop-shadow(0 0 22px rgba(244,182,61,0.32))" }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 0.91, 0.36, 1] }}
        >
          <circle cx="44" cy="44" r="42" fill="none" stroke="rgba(244,182,61,0.15)" strokeWidth={2} />
          <motion.circle
            cx="44" cy="44" r="42" fill="none" stroke="var(--accent-color)" strokeWidth={2.2} strokeLinecap="round"
            transform="rotate(-90 44 44)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.75, delay: 0.3 }}
          />
          <motion.polyline
            points="22,44 36,57 66,31" fill="none" stroke="var(--accent-color)" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 1.0 }}
          />
        </motion.svg>

        <span className="mb-5 inline-block rounded-full bg-accent px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-contrast">
          {d.tag}
        </span>
        <h1 className="mb-4 font-heading text-4xl font-extrabold text-heading md:text-5xl">{d.title}</h1>
        <p className="mx-auto mb-10 max-w-md text-[#fffaf0]/75">{d.body}</p>

        {d.steps && (
          <>
            <div className="mx-auto mb-8 flex max-w-xs items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#fffaf0]/40">
              <span className="h-px flex-1 bg-white/10" />
              What happens next
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="mx-auto mb-11 flex max-w-md flex-col gap-2.5 text-left">
              {d.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.055] px-4.5 py-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-contrast">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm font-medium text-[#fffaf0]/80">{step}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 font-black text-heading backdrop-blur transition hover:bg-white/15 hover:-translate-y-0.5">
            <BsArrowLeft /> Back to Home
          </Link>
          <a
            href={`${site.whatsapp}?text=${encodeURIComponent(d.waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#25d366] px-7 font-black text-white shadow-lg shadow-[#25d366]/30 transition hover:brightness-110 hover:-translate-y-0.5"
          >
            <BsWhatsapp /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
