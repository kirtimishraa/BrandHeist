import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/content/site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brandheist.agency"),
  title: "BrandHeist: Best Digital Marketing Agency in Mumbai",
  description:
    "Your customers are already searching. BrandHeist makes sure they find your brand first with razor-sharp SEO, D2C growth, and performance marketing that converts.",
  keywords:
    "BrandHeist, growth marketing, SEO, web development, brand design, content marketing, Mumbai",
  alternates: { canonical: "/" },
  verification: { google: "CMmou4xgRLS5AE-wjiNr-7JpcD6JQ9ISQbT6gEd0qIQ" },
  icons: {
    icon: [
      { url: "/assets/img/brandheist-logo.svg", type: "image/svg+xml" },
      { url: "/assets/img/favicon.png", sizes: "any" },
    ],
    apple: "/assets/img/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.brandheist.agency/",
    title: "BrandHeist - Best Digital Marketing Agency in Mumbai",
    description:
      "Your customers are already searching. BrandHeist makes sure they find your brand first with SEO, D2C growth, and performance marketing.",
    images: ["https://www.brandheist.agency/assets/img/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandHeist - Digital Marketing Agency Mumbai",
    description: "Razor-sharp SEO, D2C growth, and performance marketing that converts.",
    images: ["https://www.brandheist.agency/assets/img/og-cover.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${manrope.variable}`}>
      <body>
        {/* Google Analytics (GA4) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${site.gaId}');`}
        </Script>

        {children}
      </body>
    </html>
  );
}
