"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/content/blog/posts";

const FILTERS = ["All", "SEO", "D2C Growth", "Performance", "Design"];

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState("All");
  const shown = posts.filter((p) => filter === "All" || p.categoryLabel === filter);

  return (
    <>
      <div className="blog-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`blog-filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} className="text-decoration-none d-block h-100" aria-label={`Read: ${p.title}`}>
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

        {/* Placeholder teaser card — shows how future posts look */}
        <div className="hidden md:block" aria-hidden="true">
          <div className="blog-card" style={{ opacity: 0.3, pointerEvents: "none" }}>
            <div className="blog-card-cover">
              <div className="blog-card-cover-gradient" style={{ background: "linear-gradient(135deg, #180d0a 0%, #12100a 100%)" }}>
                <i className="bi bi-graph-up-arrow" />
              </div>
              <span className="blog-cat-pill coral">D2C Growth</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span><i className="bi bi-calendar3" /> Coming soon</span>
                <span><i className="bi bi-clock" /> - min</span>
              </div>
              <h2>More sharp insights dropping soon.</h2>
              <p>Subscribe to the newsletter so you don&apos;t miss the next one.</p>
              <span className="blog-read-more">Subscribe <i className="bi bi-arrow-right" /></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
