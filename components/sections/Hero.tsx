"use client";

import { useEffect, useRef } from "react";
import { BsStars, BsWhatsapp } from "react-icons/bs";
import { FairyLights, Rangoli } from "@/components/festive/FestiveDecor";
import { site } from "@/content/site-data";
import { track } from "@/lib/analytics";

const WA_MESSAGE = "Hi BrandHeist! I'd like a Diwali marketing plan for my business.";

// Staggered CSS entrance (.hero-in in globals.css): runs on first paint, no JS wait.
const stagger = (i: number) => ({ animationDelay: `${0.05 + i * 0.1}s` });

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

  // Arriving with a #section (links from other pages, campaign URLs): the browser jumps while the
  // page is still loading, then fonts, images and the restored Menu category move things, so it can
  // stop short. Jump again once everything has loaded.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    // after web fonts, then one tick so the Menu's restored category has rendered
    const jump = () =>
      document.fonts.ready.then(() =>
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }), 50)
      );
    if (document.readyState === "complete") jump();
    else window.addEventListener("load", jump, { once: true });
    return () => window.removeEventListener("load", jump);
  }, []);

  return (
    <section id="home" className="dark-background relative isolate flex min-h-screen items-center overflow-hidden portrait:items-start">
      {/* Background video, slightly dimmed: 9:16 cut for portrait screens, 16:9 for landscape.
          Landscape is anchored top (wide screens trim the table, not her head) and 70% across (narrower
          screens keep her in frame); the portrait cut is centred, with her in the bottom ~40%, so on
          portrait screens the content sits at the top and the video is dimmed less. Portrait also scales
          it 8% from the top edge: the empty dark top stays put and she moves down, making room for the copy. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_0%] brightness-[0.6] portrait:origin-top portrait:scale-[1.08] portrait:object-center portrait:brightness-[0.75]"
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
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_0%] brightness-[0.6] portrait:origin-top portrait:scale-[1.08] portrait:object-center portrait:brightness-[0.75]"
        />
      </picture>

      {/* Festive grade: dark on the text side (top on portrait, so she isn't dimmed), warm glow from below, soft top for the lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r/srgb from-[#0b0605]/85 via-[#0b0605]/40 to-transparent portrait:bg-linear-to-b/srgb portrait:from-[#0b0605]/70 portrait:via-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_105%,rgba(255,140,40,0.28),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-linear-to-b/srgb from-black/60 to-transparent" />

      {/* Rangoli behind the headline: a faint, slow texture so the eye goes to the copy (not on phones: it clutters the small copy area) */}
      <div className="pointer-events-none absolute left-0 hidden sm:block top-1/2 -z-10 w-[min(760px,140vw)] -translate-x-1/3 -translate-y-1/2 text-[#f4b63d] opacity-[0.05] mask-[radial-gradient(circle,#000_60%,transparent_85%)]">
        <Rangoli className="w-full animate-[spin_240s_linear_infinite]" />
      </div>

      <FairyLights className="absolute inset-x-0 top-14" />

      {/* Content. Portrait: centred in the dark band of the video, from a little below the fairy lights
          (>= 96px) to just above her head (~66% down with the 8% scale; vh, like the video, so it holds when mobile browser bars change size). */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-32 portrait:flex portrait:min-h-[66vh] portrait:flex-col portrait:justify-center portrait:pb-0 portrait:pt-[max(6.5rem,17.5vh)] short:pt-[6.5rem]!">
        <div className="max-w-4xl">
          {/* Type scale: eyebrow 12 → H1 fluid 30–50 → body 15–16 → price pill 14 → buttons 15, on an 8px rhythm.
              Phones: H1 scales with width (~23–26, same line breaks on every phone), body 13.5; buttons (here and in the header) 36px / 10px radius / 12px bold, stacked; price pill 24px, fully round, so it reads as a label not a button; "Diwali" on its own line, body wraps to 3 lines.
              Short phones (short:): H1 22.4 and tighter gaps so the block still fits above her head. */}
          <h1
            style={stagger(0)}
            className="hero-in font-heading text-[clamp(1.3rem,6.4vw,1.65rem)] short:text-[1.4rem] sm:text-[clamp(1.875rem,4vw,3.15rem)] font-extrabold leading-[1.1] text-balance sm:leading-[1.05] sm:text-wrap tracking-[-0.02em] text-heading [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
          >
            {/* Eyebrow lives inside the H1 so "Digital Marketing Agency Mumbai" is part of the page's main heading */}
            <span className="mb-3 flex items-center gap-3 font-sans short:mb-2 sm:mb-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent text-shadow-none sm:text-xs sm:tracking-[0.18em]">
              <span className="h-px w-6 bg-accent opacity-80" aria-hidden="true" />
              Digital Marketing Agency · Mumbai
            </span>
            Your customers are already<br className="hidden sm:block" /> shopping for<br className="sm:hidden" /> Diwali
            <span className="festive-gradient-text mt-1.5 block">Are they buying from you?</span>
          </h1>

          <div style={stagger(1)} className="hero-in mt-4 short:mt-3 sm:mt-6 [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
            <p className="max-w-70 text-[13.5px] sm:max-w-136 leading-[1.6] text-pretty sm:text-[15px] sm:leading-[1.65] text-[#fffaf0]/80 md:text-base md:leading-6">
              Festive creatives, Meta &amp; Google Ads, and website enquiries for your business, all live in just 72 hours.
            </p>
            <p className="mt-3 short:mt-2 sm:mt-4">
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-[#f4b63d]/25 bg-[#1a0f06]/70 px-2.5 text-[11px] font-semibold sm:h-auto sm:gap-2 sm:px-3.5 sm:py-1 sm:text-sm text-accent backdrop-blur-sm text-shadow-none">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(244,182,61,0.7)]" aria-hidden="true" />
                Plans from ₹5,000
              </span>
            </p>
          </div>

          <div style={stagger(2)} className="hero-in mt-5 grid w-fit gap-2 short:mt-4 sm:mt-8 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
            {/* plain <a> (not next/link) so repeat clicks still scroll to the form */}
            <a
              href="#get-free-audit"
              className="relative inline-flex h-9 items-center justify-center gap-1.5 overflow-hidden rounded-[10px] bg-linear-to-r/srgb from-[#ffcf5c] via-accent to-[#ff9a3d] px-3.5 text-xs sm:h-12 sm:rounded-xl sm:gap-2 sm:px-6 sm:text-[15px] font-bold text-contrast shadow-[0_2px_10px_rgba(244,182,61,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(244,182,61,0.22)] hover:brightness-105"
            >
              <BsStars aria-hidden="true" />
              Get My Diwali Plan
              <span className="festive-sweep" aria-hidden="true" />
            </a>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { link_location: "hero" })}
              className="group inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-white/20 bg-white/10 px-3.5 text-xs sm:h-12 sm:rounded-xl sm:gap-2 sm:px-6 sm:text-[15px] font-bold text-heading backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#25d366]/50 hover:bg-white/15"
            >
              {/* Theme-styled secondary button; only the icon keeps WhatsApp green for instant recognition */}
              <BsWhatsapp className="text-sm text-[#25d366] sm:text-lg" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
