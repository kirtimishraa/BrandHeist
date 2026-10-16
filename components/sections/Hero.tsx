"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BsStars, BsWhatsapp } from "react-icons/bs";
import { FairyLights, Rangoli } from "@/components/festive/FestiveDecor";
import { site } from "@/content/site-data";
import { track } from "@/lib/analytics";

const WA_MESSAGE = "Hi BrandHeist! I'd like a Diwali marketing plan for my business.";

// Staggered CSS entrance (.hero-in in globals.css): runs on first paint, no JS wait.
const stagger = (i: number) => ({ animationDelay: `${0.1 + i * 0.15}s` });

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Respect reduced motion: hold the video on its first frame.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) video.pause();
    // <source media> is only evaluated on load, so re-pick the file when the device rotates.
    const portrait = window.matchMedia("(orientation: portrait)");
    const onRotate = () => {
      video.load();
      if (reduced) video.pause();
    };
    portrait.addEventListener("change", onRotate);
    return () => portrait.removeEventListener("change", onRotate);
  }, []);

  return (
    <section id="home" className="dark-background relative isolate flex min-h-screen items-center overflow-hidden">
      {/* Background video, slightly dimmed: 9:16 cut for portrait screens, 16:9 for landscape.
          Landscape is anchored top (wide screens trim the table, not her head) and 70% across (narrower
          screens keep her in frame); the portrait cut is centred. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_0%] brightness-[0.6] portrait:object-center"
      >
        <source src="/assets/video/hero-portrait.mp4" type="video/mp4" media="(orientation: portrait)" />
        <source src="/assets/video/hero-landscape.mp4" type="video/mp4" />
      </video>
      {/* Instant still under the video (first frame of each cut), so the hero is never
          blank while the video loads; same crop + dim as the video. */}
      <picture>
        <source srcSet="/assets/img/hero-poster-portrait.webp" media="(orientation: portrait)" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/hero-poster-landscape.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_0%] brightness-[0.6] portrait:object-center"
        />
      </picture>

      {/* Festive grade: dark on the text side, warm glow from below, soft top for the lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0605]/85 via-[#0b0605]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_105%,rgba(255,140,40,0.28),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Rangoli behind the headline */}
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 w-[min(760px,140vw)] -translate-x-1/3 -translate-y-1/2 text-[#f4b63d] opacity-[0.1] [mask-image:radial-gradient(circle,#000_60%,transparent_85%)]">
        <Rangoli className="w-full animate-[spin_160s_linear_infinite]" />
      </div>

      <FairyLights className="absolute inset-x-0 top-14" />

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-32">
        <div className="max-w-4xl">
          {/* Type scale: eyebrow 12 → H1 fluid 30–50 → body 15–16 → price pill 14 → buttons 15, on an 8px rhythm */}
          <h1
            style={stagger(0)}
            className="hero-in font-heading text-[clamp(1.875rem,4vw,3.15rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-heading [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
          >
            {/* Eyebrow lives inside the H1 so "Digital Marketing Agency Mumbai" is part of the page's main heading */}
            <span className="mb-5 flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-accent [text-shadow:none] sm:text-xs sm:tracking-[0.18em]">
              <span className="h-px w-6 bg-accent opacity-80" aria-hidden="true" />
              Digital Marketing Agency · Mumbai
            </span>
            Your customers are already<br className="hidden sm:block" /> shopping for Diwali
            <span className="festive-gradient-text mt-1.5 block">Are they buying from you?</span>
          </h1>

          <div style={stagger(1)} className="hero-in mt-6 [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
            <p className="max-w-[34rem] text-[15px] leading-[1.65] text-[#fffaf0]/80 md:text-base">
              Festive creatives, Meta &amp; Google Ads, and website enquiries for your business, all live in just 72 hours.
            </p>
            <p className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f4b63d]/25 bg-[#1a0f06]/70 px-3.5 py-1 text-sm font-semibold text-accent backdrop-blur [text-shadow:none]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(244,182,61,0.7)]" aria-hidden="true" />
                Plans from ₹5,000
              </span>
            </p>
          </div>

          <div style={stagger(2)} className="hero-in mt-8 flex flex-wrap gap-3">
            <Link
              href="#get-free-audit"
              className="relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#ffcf5c] via-accent to-[#ff9a3d] px-6 text-[15px] font-bold text-contrast shadow-[0_2px_10px_rgba(244,182,61,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(244,182,61,0.22)] hover:brightness-105"
            >
              <BsStars aria-hidden="true" />
              Get My Diwali Plan
              <span className="festive-sweep" aria-hidden="true" />
            </Link>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { link_location: "hero" })}
              className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-[15px] font-bold text-heading backdrop-blur transition hover:-translate-y-0.5 hover:border-[#25d366]/50 hover:bg-white/[0.15]"
            >
              {/* Theme-styled secondary button; only the icon keeps WhatsApp green for instant recognition */}
              <BsWhatsapp className="text-lg text-[#25d366]" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
