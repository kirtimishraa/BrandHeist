import type { ReactNode } from "react";

// Shared bits for the redesign.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const MONO = "font-[family-name:var(--font-mono),ui-monospace,monospace]";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className={`${MONO} flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#f6efe1]/55`}>
      <span className="h-px w-8 bg-[#f4b63d]" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
