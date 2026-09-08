import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";

export const dynamic = "force-static";

const BASE = "https://www.brandheist.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date("2026-05-17"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog/`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}/`,
      lastModified: new Date(p.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
