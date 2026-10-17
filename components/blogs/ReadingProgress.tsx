"use client";

import { useEffect } from "react";

// Ports the inline scripts from the original blog posts:
// reading-progress bar + TOC scroll-spy.
export default function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("reading-progress");
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".blog-toc-link");
    const sections = document.querySelectorAll<HTMLElement>(".blog-article h2[id]");

    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? s / h : 0})`;

      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      tocLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="reading-progress" id="reading-progress" aria-hidden="true" />;
}
