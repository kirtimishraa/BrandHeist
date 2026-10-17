// Blog post metadata. Article bodies + JSON-LD live in sibling files
// (extracted verbatim from the original static posts) and are read at build time.

export type TocItem = { href: string; label: string };

export type Post = {
  slug: string;
  bodyFile: string; // in content/blogs/
  ldFile: string; // in content/blogs/
  // <head> metadata
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: { url: string; alt: string }; // 1200x630 share card; falls back to the site-wide og-cover
  images?: string[]; // in-article images (site paths), listed in the sitemap for image search
  // title block
  title: string;
  categoryLabel: string;
  categoryPill: "teal" | "coral";
  categoryIcon: string; // bootstrap-icons class
  dateISO: string;
  dateLabel: string;
  readTime: string;
  words: string;
  author: string;
  // listing card
  cardIcon: string;
  cardGradient: string;
  cardExcerpt: string;
  cardReadLabel: string;
  toc: TocItem[];
};

export const posts: Post[] = [
  {
    slug: "d2c-cac-meta-cpm-india-2026",
    bodyFile: "d2c-cac.body.html",
    ldFile: "d2c-cac.ld.json",
    metaTitle: "Why Meta Ads Stopped Working for D2C Brands in India (2026) - BrandHeist",
    metaDescription:
      "Meta CPMs in India are up 40-60% since 2023 and D2C CAC is up 35% a year. Real numbers, the 2026 budget mix and a 90-day plan to cut CAC without spending more.",
    canonical: "https://www.brandheist.agency/blogs/d2c-cac-meta-cpm-india-2026/",
    ogTitle: "Why Meta Ads Stopped Working for Your D2C Brand (And What Indian Founders Are Doing Instead)",
    ogDescription:
      "Meta CPMs up 40-60% since 2023. CAC up 35% a year. The budget mix and 90-day plan profitable Indian D2C brands are using in 2026.",
    ogImage: {
      url: "/assets/img/blogs/meta-cpm-trend-india-2026-og.jpg",
      alt: "Meta CPM trend in India, indexed to 2023: up 55% by 2026",
    },
    images: [
      "/assets/img/blogs/meta-cpm-trend-india-2023-2026-1520w.webp",
      "/assets/img/blogs/d2c-marketing-budget-mix-india-2026-1520w.webp",
    ],
    title: "Why Meta Ads Stopped Working for Your D2C Brand (And What Indian Founders Are Doing Instead in 2026)",
    categoryLabel: "D2C Growth",
    categoryPill: "coral",
    categoryIcon: "bi bi-graph-up-arrow",
    dateISO: "2026-07-28",
    dateLabel: "July 2026",
    readTime: "15 min read",
    words: "3,600+ words",
    author: "Kirti Mishra",
    cardIcon: "bh-icon-meta", // outline Meta mark, defined in app/blog.css
    cardGradient: "linear-gradient(135deg, #1a0f0b 0%, #140d09 50%, #121008 100%)",
    cardExcerpt:
      "Meta CPMs are up 40-60% since 2023 and CAC keeps climbing. The budget mix, CRO fixes and 90-day plan profitable Indian D2C brands are using now.",
    cardReadLabel: "15 min",
    toc: [
      { href: "#real-numbers", label: "The Real Numbers" },
      { href: "#why-it-happened", label: "Why It Happened" },
      { href: "#whats-working", label: "What's Working Now" },
      { href: "#big-brands", label: "How the Big Brands Did It" },
      { href: "#90-day-plan", label: "A 90-Day Plan" },
      { href: "#what-not-to-do", label: "What NOT to Do" },
      { href: "#what-vcs-look-at", label: "What VCs Look At" },
      { href: "#where-this-leaves-you", label: "Where This Leaves You" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    slug: "ai-overviews-zero-click-search-2026",
    bodyFile: "ai-overviews.body.html",
    ldFile: "ai-overviews.ld.json",
    metaTitle: "AI Overviews & Zero-Click Search: What's Killing Your Traffic in 2026 - BrandHeist",
    metaDescription:
      "Your rankings held. Your traffic didn't. Here's why AI Overviews are draining clicks, who's getting hit hardest, and the 5 strategies actually working in 2026.",
    canonical: "https://www.brandheist.agency/blogs/ai-overviews-zero-click-search-2026/",
    ogTitle: "AI Overviews & Zero-Click Search: What's Killing Your Traffic in 2026",
    ogDescription:
      "Your rankings held. Your traffic didn't. 5 strategies that actually work in the zero-click era.",
    title: "AI Overviews & Zero-Click Search: What's Killing Your Traffic in 2026",
    categoryLabel: "SEO",
    categoryPill: "teal",
    categoryIcon: "bi bi-search",
    dateISO: "2026-06-01",
    dateLabel: "June 2026",
    readTime: "13 min read",
    words: "2,600+ words",
    author: "Kirti Mishra",
    cardIcon: "bi bi-robot",
    cardGradient: "linear-gradient(135deg, #0f1a18 0%, #0d1410 50%, #121008 100%)",
    cardExcerpt:
      "Your rankings held. Your traffic didn't. Here's the full breakdown of what changed, who's getting hit, and what actually works now.",
    cardReadLabel: "13 min",
    toc: [
      { href: "#what-happened", label: "What Happened to Your Traffic?" },
      { href: "#why-happening", label: "Why Is This Happening?" },
      { href: "#whos-hit", label: "Who's Getting Hit?" },
      { href: "#real-problem", label: "The Real Problem" },
      { href: "#what-works", label: "What Actually Works in 2026" },
      { href: "#metrics", label: "Metrics That Matter Now" },
      { href: "#what-not-to-do", label: "What NOT to Do" },
      { href: "#action-plan", label: "Your Action Plan" },
      { href: "#bottom-line", label: "The Bottom Line" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    slug: "eeat-2026-small-brands-trust-signals",
    bodyFile: "eeat.body.html",
    ldFile: "eeat.ld.json",
    metaTitle:
      "E-E-A-T for Small Indian Brands in 2026: What Actually Works (Without a Big Budget) - BrandHeist",
    metaDescription:
      "Google's March 2026 update reshuffled 79.5% of top-3 positions. Trust is now the ranking. Here's the honest, practical E-E-A-T checklist we give small Indian brands - no fluff, no paid tools required.",
    canonical: "https://www.brandheist.agency/blogs/eeat-2026-small-brands-trust-signals/",
    ogTitle: "E-E-A-T for Small Indian Brands: What Actually Works in 2026",
    ogDescription:
      "The trust signals we tell small Indian brands to fix first - before spending a rupee on tools or content.",
    title: "E-E-A-T for Small Indian Brands in 2026: What Actually Works (Without a Big Budget)",
    categoryLabel: "SEO",
    categoryPill: "teal",
    categoryIcon: "bi bi-search",
    dateISO: "2026-07-09",
    dateLabel: "July 2026",
    readTime: "12 min read",
    words: "2,800+ words",
    author: "Kirti Mishra",
    cardIcon: "bi bi-patch-check",
    cardGradient: "linear-gradient(135deg, #0f1a18 0%, #0d1410 50%, #121008 100%)",
    cardExcerpt:
      "Google's March 2026 update made trust the ranking. Here's the honest, practical E-E-A-T checklist we give small Indian brands - no paid tools required.",
    cardReadLabel: "12 min",
    toc: [
      { href: "#what-changed", label: "What Google Changed" },
      { href: "#what-eeat", label: "What E-E-A-T Stands For" },
      { href: "#ai-twist", label: "The AI Overviews Twist" },
      { href: "#where-to-start", label: "Where to Start" },
      { href: "#what-not-to-do", label: "What Not To Do" },
      { href: "#30-day-plan", label: "A 30-Day Plan" },
      { href: "#favours-small", label: "Why It Favours Small Brands" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
