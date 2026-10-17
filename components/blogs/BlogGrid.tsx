"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/content/blogs/posts";

export default function BlogGrid({ posts }: { posts: Post[] }) {
  // Only offer categories that actually have posts — no filter should lead to an
  // empty page. With a single category, filtering adds nothing, so hide the bar.
  const categories = [...new Set(posts.map((p) => p.categoryLabel))];
  const filters = ["All", ...categories];
  const [filter, setFilter] = useState("All");
  const shown = posts.filter((p) => filter === "All" || p.categoryLabel === filter);

  return (
    <>
      {categories.length > 1 && (
        <div className="blog-filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              className={`blog-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link key={p.slug} href={`/blogs/${p.slug}/`} className="block h-full" aria-label={`Read: ${p.title}`}>
            <article className="blog-card">
              <div className="blog-card-cover">
                <div className="blog-card-cover-gradient" style={{ background: p.cardGradient }}>
                  <i className={p.cardIcon} aria-hidden="true" />
                </div>
                <span className={`blog-cat-pill ${p.categoryPill}`}>
                  <i className={p.categoryIcon} aria-hidden="true" /> {p.categoryLabel}
                </span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span><i className="bi bi-calendar3" /> {p.dateLabel}</span>
                  <span><i className="bi bi-clock" /> {p.cardReadLabel}</span>
                </div>
                <h2>{p.title}</h2>
                <p>{p.cardExcerpt}</p>
                <span className="blog-read-more">Read Article <i className="bi bi-arrow-right" /></span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
