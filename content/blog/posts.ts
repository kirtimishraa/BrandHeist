// Blog post metadata. Article bodies + JSON-LD live in sibling files
// (extracted verbatim from the original static posts) and are read at build time.

export type TocItem = { href: string; label: string };

export type Post = {
  slug: string;
  bodyFile: string; // in content/blog/
  ldFile: string; // in content/blog/
  // <head> metadata
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
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
  // sidebar
  toc: TocItem[];
  sidebarCta: { strong: string; p: string; href: string; label: string };
};

export const posts: Post[] = [
  {
    slug: "ai-overviews-zero-click-search-2026",
    bodyFile: "ai-overviews.body.html",
    ldFile: "ai-overviews.ld.json",
    metaTitle: "AI Overviews & Zero-Click Search: What's Killing Your Traffic in 2026 - BrandHeist",
    metaDescription:
      "Your rankings held. Your traffic didn't. Here's why AI Overviews are draining clicks, who's getting hit hardest, and the 5 strategies actually working in 2026.",
    canonical: "https://www.brandheist.agency/blog/ai-overviews-zero-click-search-2026/",
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
    sidebarCta: {
      strong: "Is AI eating your traffic?",
      p: "Get a free audit - we'll show you exactly where you're losing visibility and hand you a recovery plan.",
      href: "/#get-free-audit",
      label: "Get Free Audit",
    },
  },
  {
    slug: "eeat-2026-small-brands-trust-signals",
    bodyFile: "eeat.body.html",
    ldFile: "eeat.ld.json",
    metaTitle:
      "E-E-A-T for Small Indian Brands in 2026: What Actually Works (Without a Big Budget) - BrandHeist",
    metaDescription:
      "Google's March 2026 update reshuffled 79.5% of top-3 positions. Trust is now the ranking. Here's the honest, practical E-E-A-T checklist we give small Indian brands - no fluff, no paid tools required.",
    canonical: "https://www.brandheist.agency/blog/eeat-2026-small-brands-trust-signals/",
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
    sidebarCta: {
      strong: "Traffic dropped after March 2026?",
      p: "Get a free audit - we'll check your trust signals and hand you a prioritised recovery plan.",
      href: "/#get-free-audit",
      label: "Get Free Audit",
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
