import type { Metadata } from "next";
import { posts } from "@/content/blog/posts";
import { site } from "@/content/site-data";
import BlogGrid from "@/components/blog/BlogGrid";
import Web3Form from "@/components/Web3Form";

export const metadata: Metadata = {
  title: "Blogs - BrandHeist Marketing Blog",
  description:
    "Sharp takes on SEO, D2C growth, performance marketing and everything in between. No fluff - just what's actually working right now.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    url: "https://www.brandheist.agency/blog/",
    title: "Blogs - BrandHeist Marketing Blog",
    description: "Sharp takes on SEO, D2C growth, and performance marketing. No fluff.",
    images: ["https://www.brandheist.agency/assets/img/og-cover.jpg"],
  },
};

export default function BlogListingPage() {
  return (
    <>
      <section className="blog-listing dark-background">
        <div className="container">
          <h1 className="visually-hidden">
            BrandHeist Blogs - SEO, D2C Growth &amp; Performance Marketing Blog
          </h1>
          <BlogGrid posts={posts} />
        </div>
      </section>

      <section className="blog-newsletter dark-background">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6 mx-auto">
              <span className="blog-hero-eyebrow">Newsletter</span>
              <h2>Get the next one in your inbox</h2>
              <p>No spam, no cadence pressure. We send when we have something actually worth reading.</p>
              <Web3Form name="newsletter" accessKey={site.web3forms.newsletter} sentMessage="You're in! Talk soon.">
                <div className="newsletter-form">
                  <input type="email" name="email" aria-label="Email address" placeholder="Your email address" required />
                  <input type="submit" value="Subscribe" />
                </div>
              </Web3Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
