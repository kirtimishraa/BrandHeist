"use client";

import { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { BLOG_THEME_KEY } from "@/lib/blog-theme";

// Light/dark switch for individual blog posts only (shown in the header there). Light is the default.
// The theme lives on <html data-blog-theme>; blog.css scopes it to .blog-scope.
type Theme = "light" | "dark";

function savedTheme(): Theme {
  try {
    const t = localStorage.getItem(BLOG_THEME_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {
    // storage blocked: fall back to the default
  }
  return "light";
}

export default function BlogThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Also covers client-side navigation into /blogs, where the layout's inline script doesn't run.
  useEffect(() => {
    const t = savedTheme();
    document.documentElement.dataset.blogTheme = t;
    setTheme(t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.blogTheme = next;
    try {
      localStorage.setItem(BLOG_THEME_KEY, next);
    } catch {
      // not remembered, but still switches for this page
    }
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[17px] text-heading transition-colors hover:bg-white/10 sm:h-11 sm:w-11 sm:rounded-lg"
    >
      {theme === "light" ? <BsMoonStars aria-hidden="true" /> : <BsSun aria-hidden="true" />}
    </button>
  );
}
