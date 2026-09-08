import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/content/blog/posts";
import ReadingProgress from "@/components/blog/ReadingProgress";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "content/blog", file), "utf8");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      url: post.canonical,
      title: post.ogTitle,
      description: post.ogDescription,
      images: ["https://www.brandheist.agency/assets/img/og-cover.jpg"],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = read(post.bodyFile);
  const ld = JSON.parse(read(post.ldFile)) as unknown[];

  return (
    <>
      <ReadingProgress />
      {ld.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}

      <section className="blog-post-body dark-background">
        <div className="container">
          <div className="blog-post-title-block">
            <span className={`blog-cat-pill ${post.categoryPill}`}>
              <i className={post.categoryIcon} aria-hidden="true" /> {post.categoryLabel}
            </span>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span><i className="bi bi-calendar3" /> <time dateTime={post.dateISO}>{post.dateLabel}</time></span>
              <span><i className="bi bi-clock" /> {post.readTime}</span>
              <span><i className="bi bi-file-text" /> {post.words}</span>
              <span><i className="bi bi-person" /> {post.author}</span>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <article className="blog-article" dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            <div className="hidden lg:block">
              <aside className="blog-sidebar-wrap">
                <nav className="blog-toc" aria-label="Table of contents">
                  <div className="blog-toc-heading">In this article</div>
                  <ol>
                    {post.toc.map((t) => (
                      <li key={t.href}>
                        <a href={t.href} className="blog-toc-link">{t.label}</a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="blog-sidebar-cta">
                  <strong>{post.sidebarCta.strong}</strong>
                  <p>{post.sidebarCta.p}</p>
                  <a href={post.sidebarCta.href} className="cta-btn primary">
                    {post.sidebarCta.label} <i className="bi bi-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
