"use client";

import { MotionConfig } from "framer-motion";
import Header from "./Header";
import Hero from "./Hero";
import MenuSection from "./MenuSection";
import AuditSection from "./AuditSection";
import { MONO } from "./ui";

export default function MockupShell() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0a0907] font-sans text-[#f6efe1] antialiased">
        <Header />
        <main>
          <Hero />
          <MenuSection />
          <AuditSection mock />
        </main>
        <p className={`${MONO} border-t border-white/[0.06] py-10 text-center text-[11px] uppercase tracking-[0.2em] text-[#f6efe1]/35`}>
          Redesign mockup · Hero, The Menu, Audits · form is simulated, nothing is sent
        </p>
      </div>
    </MotionConfig>
  );
}
