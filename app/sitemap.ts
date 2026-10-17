import type { MetadataRoute } from "next";
import { posts } from "@/content/blogs/posts";

export const dynamic = "force-static";

const BASE = "https://www.brandheist.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, lastModified: new Date("2026-05-17"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blogs/`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${BASE}/blogs/${p.slug}/`,
      lastModified: new Date(p.dateISO),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.images && { images: p.images.map((src) => `${BASE}${src}`) }),
    })),
  ];
}
