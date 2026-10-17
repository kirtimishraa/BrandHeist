import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Got it - BrandHeist",
  description: "Thank you for reaching out to BrandHeist. We'll be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Logo-only header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" aria-label="BrandHeist - Go home" className="flex items-center gap-2.5">
              <Image src="/assets/img/brandheist-logo.svg" alt="BrandHeist logo" width={44} height={44} />
              <span className="font-heading text-xl font-extrabold">
                <span className="text-heading">Brand</span>
                <span className="text-accent">Heist</span>
              </span>
            </Link>
            {/* No "request" CTA here: the visitor has just completed that action */}
          </div>
        </div>
      </header>

      <Suspense fallback={null}>
        <ThankYouContent />
      </Suspense>

      {/* Minimal fixed footer */}
      <footer className="fixed bottom-0 inset-x-0 z-10 border-t border-white/10 bg-[#080806]/70 px-5 py-3 text-center text-[13px] text-[#fffaf0]/50 backdrop-blur-sm">
        <p className="m-0">
          &copy; <span className="font-extrabold text-[#fffaf0]/80">BrandHeist</span> &bull;{" "}
          <Link href="/" className="hover:text-accent">Home</Link> &bull;{" "}
          <Link href="/#menu" className="hover:text-accent">Services</Link> &bull;{" "}
          <Link href="/#talk" className="hover:text-accent">Contact</Link>
        </p>
      </footer>
    </>
  );
}
