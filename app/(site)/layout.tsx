import Script from "next/script";
import { site } from "@/content/site-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: "BrandHeist",
  url: "https://www.brandheist.agency",
  logo: "https://www.brandheist.agency/assets/img/brandheist-logo.svg",
  image: "https://www.brandheist.agency/assets/img/hero-bg.webp",
  description:
    "Digital marketing agency in Mumbai specialising in SEO, D2C growth, and performance marketing.",
  telephone: "+91-9137920469",
  email: "heist@brandheist.agency",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dahisar",
    addressLocality: "Mumbai",
    postalCode: "400068",
    addressCountry: "IN",
  },
  areaServed: "Mumbai",
  priceRange: "$$",
  sameAs: [site.social.linkedin, site.social.instagram, site.social.x],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="main">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
