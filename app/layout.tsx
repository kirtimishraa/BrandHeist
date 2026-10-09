import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Manrope } from "next/font/google";
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
      <head>
        {/* Google Tag Manager — high in <head> (GA4 is configured inside the GTM container) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — right after <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
