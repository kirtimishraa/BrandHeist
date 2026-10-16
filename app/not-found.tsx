import type { Metadata } from "next";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export const metadata: Metadata = {
  title: "Page not found - BrandHeist",
  robots: { index: false, follow: true },
};

// Branded 404: never a dead end — a clear way home and the site's main action.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
      <Link href="/" aria-label="BrandHeist home" className="font-heading text-2xl font-extrabold">
        <span className="text-heading">Brand</span>
        <span className="text-accent">Heist</span>
      </Link>

      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Error 404</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold text-heading sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#fffaf0]/65">
        The link may be old or mistyped. Head back home, or tell us about your business and we&apos;ll send a festive plan.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-contrast transition hover:-translate-y-0.5 hover:brightness-105"
        >
          <BsArrowLeft aria-hidden="true" /> Back to home
        </Link>
        <Link
          href="/#get-free-audit"
          className="inline-flex h-12 items-center rounded-xl border border-white/20 bg-white/10 px-6 text-[15px] font-bold text-heading transition hover:-translate-y-0.5 hover:bg-white/[0.15]"
        >
          Get My Diwali Plan
        </Link>
      </div>
    </main>
  );
}
