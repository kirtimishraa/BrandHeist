"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

// Adapted from the shadcn "limelight-nav" component: generalised to render
// text labels + optional icon + an optional hover dropdown (kept the sliding
// "limelight" highlight mechanic). Spotlight follows hover, rests on active.

export type LimelightNavItem = {
  id: string | number;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  dropdown?: React.ReactNode;
};

type LimelightNavProps = {
  items: LimelightNavItem[];
  activeIndex?: number; // controlled (falls back to internal click state)
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  hideSpotlightForIndex?: number; // hide the limelight when this item is the target
};

export const LimelightNav = ({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
  hideSpotlightForIndex,
}: LimelightNavProps) => {
  const [internalActive, setInternalActive] = useState(defaultActiveIndex);
  const active = activeIndex ?? internalActive;
  const [hovered, setHovered] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  const target = hovered ?? active;
  const spotlightHidden = hideSpotlightForIndex !== undefined && target === hideSpotlightForIndex;

  useLayoutEffect(() => {
    const nav = navRef.current;
    const limelight = limelightRef.current;
    const item = itemRefs.current[target];
    if (!nav || !limelight || !item) return;

    // Measure the label text (not the padded item) so the line sits exactly
    // under the label — same width as the text, never longer or shorter.
    const navRect = nav.getBoundingClientRect();
    const labelEl = (item.querySelector(".limelight-label") as HTMLElement) ?? item;
    const labelRect = labelEl.getBoundingClientRect();
    limelight.style.width = `${labelRect.width}px`;
    limelight.style.left = `${labelRect.left - navRect.left}px`;

    if (!isReady) setTimeout(() => setIsReady(true), 50);
  }, [target, isReady, items]);

  if (items.length === 0) return null;

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(null)}
      className={`relative flex h-14 items-center text-foreground ${className}`}
    >
      {items.map((item, index) => {
        const link = (
          <a
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={item.href}
            onMouseEnter={() => setHovered(index)}
            onClick={() => {
              setInternalActive(index);
              onTabChange?.(index);
              item.onClick?.();
            }}
            aria-label={item.label}
            className={`relative z-20 flex h-full cursor-pointer items-center gap-1.5 px-4 font-nav text-[15px] font-medium transition-colors ${
              active === index ? "text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            {item.icon}
            <span className="limelight-label whitespace-nowrap">{item.label}</span>
            {item.dropdown && <BsChevronDown className="text-xs" />}
          </a>
        );

        return item.dropdown ? (
          <div key={item.id} className="group relative flex h-full items-center">
            {link}
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {item.dropdown}
            </div>
          </div>
        ) : (
          <React.Fragment key={item.id}>{link}</React.Fragment>
        );
      })}

      <div
        ref={limelightRef}
        className={`pointer-events-none absolute top-2 z-10 h-[2px] rounded-full bg-primary shadow-[0_1px_10px_rgb(var(--primary)/0.5)] ${
          spotlightHidden ? "opacity-0" : "opacity-100"
        } ${isReady ? "transition-[left,width,opacity] duration-300 ease-in-out" : "transition-opacity duration-200"}`}
        style={{ left: "-999px" }}
      >
        {/* soft glow drop — label width, no hard edges */}
        <div className="absolute left-0 top-[2px] h-8 w-full bg-gradient-to-b from-primary/20 to-transparent blur-[3px]" />
      </div>
    </nav>
  );
};
