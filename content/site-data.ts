// All site copy/data extracted verbatim from the original static site.
// Single source of truth so nothing is retyped or lost.

export const site = {
  name: "BrandHeist",
  gtmId: "GTM-W68VKSJF",
  phoneDisplay: "+91 9137920469",
  phoneHref: "tel:+919137920469",
  email: "heist@brandheist.agency",
  emailHref: "mailto:heist@brandheist.agency",
  address: "Dahisar - 400068, Mumbai",
  whatsapp: "https://wa.me/919137920469",
  social: {
    linkedin: "https://www.linkedin.com/in/brandheist.agency",
    instagram: "https://www.instagram.com/brandheist.agency",
    x: "https://x.com/brandheist.agency",
  },
  web3forms: {
    audit: "48eb82f6-6e91-4b78-a06a-0803116957bf",
    contact: "ed43a4a4-cf28-4563-88eb-6fbb096414d6",
    newsletter: "cfec9d4c-578b-4394-b248-1131a7cda767",
  },
};

// ── The Menu mega-dropdown (nav) ─────────────────────────────────────
export const menuNav: { label: string; items: string[] }[] = [
  {
    label: "SEO & Socials",
    items: [
      "Advanced AI SEO",
      "SEO Strategy & Growth",
      "Social Media Management",
      "Content & Social Growth",
    ],
  },
  {
    label: "Growth Marketing",
    items: [
      "Paid Search (PPC/SEM)",
      "Conversion Tracking & Optimization",
      "Display, Video Ads & Retargeting",
      "Paid Social",
    ],
  },
  {
    label: "Design and Motion",
    items: [
      "Brand Identity & Logo Design",
      "UI/UX & Web Animations",
      "Motion Graphics & Product Demos",
      "Social Media & Ad Creatives",
    ],
  },
  {
    label: "Web Development",
    items: [
      "Website Design & Development",
      "Domain, Hosting & Secure Payments",
      "Performance & Security Optimization",
      "Testing, Deployment & Maintenance",
    ],
  },
  {
    label: "Content",
    items: [
      "Website & SEO Content",
      "Content Strategy & Optimization",
      "Copywriting (Web, Ads, Email)",
      "Technical Writing & Documentation",
    ],
  },
];

// ── The Flex (client logos) ──────────────────────────────────────────
export const clients: { src: string; alt: string }[] = [
  { src: "/assets/img/clients/citizen.jpg", alt: "Citizen client logo" },
  { src: "/assets/img/clients/dattani.jpg", alt: "Dattani client logo" },
  { src: "/assets/img/clients/develearn.svg", alt: "Develearn client logo" },
  { src: "/assets/img/clients/direct-tire.png", alt: "Direct Tire client logo" },
  { src: "/assets/img/clients/first-hawaiian-bank.svg", alt: "First Hawaiian Bank client logo" },
  { src: "/assets/img/clients/galaxy-global.webp", alt: "Galaxy Global client logo" },
  { src: "/assets/img/clients/lodha.webp", alt: "Lodha client logo" },
  { src: "/assets/img/clients/minerva.png", alt: "Minerva client logo" },
  { src: "/assets/img/clients/moreys.webp", alt: "Moreys client logo" },
  { src: "/assets/img/clients/netflix.png", alt: "Netflix client logo" },
  { src: "/assets/img/clients/ocdc.png", alt: "OCDC client logo" },
  { src: "/assets/img/clients/organon.svg", alt: "Organon client logo" },
  { src: "/assets/img/clients/painting-drive.png", alt: "Painting Drive client logo" },
  { src: "/assets/img/clients/toyota.png", alt: "Toyota client logo" },
];

// ── The Arsenal (tech tabs) ──────────────────────────────────────────
export const arsenal: { id: string; label: string; heading: string; tools: string; body: string }[] = [
  {
    id: "auditing-market-insights",
    label: "Auditing & Market Insights",
    heading:
      "We invest in premium, industry-grade research and competitive intelligence tools to run deep market and competitor analysis",
    tools:
      "Screaming Frog · Ahrefs · SEMrush · Google Trends · Brandwatch · SurveyMonkey and more",
    body: "Combined with hands-on expertise in advanced SEO and audience research. This helps us spot gaps and opportunities before your competitors do.",
  },
  {
    id: "tracking-analytics",
    label: "Tracking & Analytics",
    heading:
      "We design and deploy advanced tracking systems using industry-leading tools, built for accuracy and performance",
    tools:
      "Google Tag Manager (GTM) · Google Analytics 4 (GA4) · Meta Pixel · Google Merchant Center (GMC) · Conversion & event tracking and more",
    body: "These platforms require expert setup and interpretation, so we can extract actionable insights and give you clean, reliable data to make real growth decisions.",
  },
  {
    id: "creative-motion-studio",
    label: "Creative & Motion Studio",
    heading:
      "We specialize in professional, high-end creative and motion tools used by leading studios and production teams",
    tools:
      "Figma · Adobe Illustrator · Photoshop · Premiere Pro · After Effects · DaVinci Resolve · Canva · Blender and more",
    body: "The goal isn’t just to look good, but to create visual assets that actually perform for your brand.",
  },
  {
    id: "content-cro",
    label: "Content & CRO",
    heading:
      "We turn traffic into measurable business growth through hands-on conversion optimization and deep performance testing.",
    tools:
      "Hotjar (heatmaps & recordings) · Jasper/Anyword (copy variants) · Unbounce (landing pages) · ChatGPT · Perplexity (content ideation) · Conversion-focused content testing",
    body: "We use advanced, paid experimentation platforms and expert-led behavioral analysis to continuously test, refine, and improve results over time.",
  },
  {
    id: "web-stack",
    label: "Web Stack",
    heading:
      "We build on a robust, modern web stack using scalable, industry-proven technologies to deliver high-performance digital experiences.",
    tools: "React · Next.js · Node.js · PHP · Tailwind CSS · MongoDB · PostgreSQL and more",
    body: "Combined with hands-on expertise in performance optimization, responsive design, and secure architecture. This ensures fast, reliable, and future-ready products that scale seamlessly as your business grows.",
  },
];

// ── The Menu (services grid) — order preserved from original DOM ─────
export type ServiceCategory = "seo" | "growth" | "design" | "web" | "content";

export const serviceFilters: { key: ServiceCategory; label: string }[] = [
  { key: "seo", label: "SEO & Socials" },
  { key: "growth", label: "Growth Marketing" },
  { key: "design", label: "Design and Motion" },
  { key: "web", label: "Web Development" },
  { key: "content", label: "Content" },
];

export const services: { title: string; tech: string; category: ServiceCategory }[] = [
  { category: "seo", title: "Advanced AI SEO", tech: "AI-powered SEO systems, topical authority building, semantic SEO, programmatic SEO, AI content optimization, entity mapping, search intent modeling, GEO & AI search optimization" },
  { category: "seo", title: "SEO Strategy & Growth", tech: "Technical SEO, on-page optimization, keyword research & clustering, local SEO, backlink strategy, analytics & ranking growth, competitor & SERP analysis" },
  { category: "seo", title: "Social Media Management", tech: "Content calendars, platform management, community engagement, organic growth strategy, profile optimization, posting consistency across all social platforms" },
  { category: "seo", title: "Content & Social Growth", tech: "Short-form content strategy, reels & carousel planning, trend research, audience building, engagement optimization, brand positioning & organic reach scaling" },
  { category: "web", title: "Website Design & Development", tech: "Responsive design, custom website creation, CMS setup (WordPress/Webflow/etc.), UI/UX design, SEO-friendly structure" },
  { category: "growth", title: "Paid Search (PPC/SEM)", tech: "Google Ads setup, search ads, keyword targeting & bidding strategy, ad copy & extensions, conversion tracking" },
  { category: "growth", title: "Display, Video Ads & Retargeting", tech: "Google Display Network, YouTube video ads, banner ads, video ad creatives, website visitor retargeting, cart abandonment ads, dynamic remarketing, frequency & placement control" },
  { category: "growth", title: "Conversion Tracking & Optimization", tech: "GA4 & conversion tracking setup, pixels & events, funnel tracking, attribution basics, performance reporting, ROAS optimization, data-driven iteration" },
  { category: "web", title: "Performance & Security Optimization", tech: "Speed optimization, Core Web Vitals, security testing, SSL setup, basic hardening" },
  { category: "web", title: "Domain, Hosting & Secure Payments", tech: "Domain & hosting setup, payment gateway integration, third-party integrations (forms, CRM, email tools)" },
  { category: "web", title: "Testing, Deployment & Maintenance", tech: "Functional & cross-browser testing, deployment, post-launch support, bug fixes & updates" },
  { category: "growth", title: "Paid Social", tech: "Meta (Facebook & Instagram) ads, LinkedIn ads, TikTok/X ads, audience targeting & lookalikes, creative testing, A/B testing of creatives & audiences, budget & bid optimization" },
  { category: "design", title: "Brand Identity & Logo Design", tech: "Logo design, brand guidelines, color palette & typography, visual identity system, brand assets (icons, templates)" },
  { category: "design", title: "Motion Graphics & Product Demos", tech: "2D motion graphics, explainer videos, storyboard & scripting, video editing, sound sync & basic transitions" },
  { category: "design", title: "UI/UX & Web Animations", tech: "Micro-interactions, Lottie animations, page transitions, interactive UI animations, motion for web/app interfaces" },
  { category: "design", title: "Social Media & Ad Creatives", tech: "Static ad creatives, animated ad creatives, short-form video ads, platform-specific formats, creative variations for A/B testing" },
  { category: "content", title: "Website & SEO Content", tech: "Website pages, blog content, landing page content, SEO-optimized copy, content updates & refresh" },
  { category: "content", title: "Copywriting (Web, Ads, Email)", tech: "Website copy, ad copy, email campaigns, headlines & CTAs, conversion-focused messaging" },
  { category: "content", title: "Content Strategy & Optimization", tech: "Content planning & topic research, content calendars, content audits, content optimization for SEO & conversions, performance-based content improvements" },
  { category: "content", title: "Technical Writing & Documentation", tech: "Product documentation, user guides, knowledge base articles, API/docs (if applicable), onboarding content" },
];

// ── The Crew ─────────────────────────────────────────────────────────
export const crew: { name: string; role: string; img: string; linkedin: string; x: string }[] = [
  { name: "Kirti Mishra", role: "Marketing Specialist", img: "/assets/img/crews/crew-1.jpg", linkedin: "https://www.linkedin.com/in/kirtimishra17", x: "https://x.com/Kirtim108" },
  { name: "Ayush Mishra", role: "Web Design & Graphics", img: "/assets/img/crews/crew-2.jpg", linkedin: "https://www.linkedin.com/in/ayush", x: "https://x.com/ayush" },
  { name: "Mandar Patkar", role: "Web Dev & Security", img: "/assets/img/crews/crew-3.jpg", linkedin: "https://www.linkedin.com/in/mandarsh", x: "https://x.com/mandarverse" },
];
