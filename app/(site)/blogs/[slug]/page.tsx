import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost, type Post } from "@/content/blogs/posts";
import ReadingProgress from "@/components/blogs/ReadingProgress";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "content/blogs", file), "utf8");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const image = post.ogImage
    ? { url: post.ogImage.url, width: 1200, height: 630, alt: post.ogImage.alt }
    : { url: "https://www.brandheist.agency/assets/img/og-cover.jpg", width: 1200, height: 630, alt: "BrandHeist, digital marketing agency in Mumbai: your customers are already searching, we make sure they find you first" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blogs/${post.slug}/` },
    openGraph: {
      type: "article",
      url: post.canonical,
      title: post.ogTitle,
      description: post.ogDescription,
      publishedTime: post.dateISO,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.ogTitle, description: post.ogDescription, images: [image] },
  };
}

function Toc({ post, heading = false }: { post: Post; heading?: boolean }) {
  return (
    <nav className="blog-toc" aria-label="Table of contents">
      {heading && <div className="blog-toc-heading">In this article</div>}
      <ol>
        {post.toc.map((t) => (
          <li key={t.href}>
            <a href={t.href} className="blog-toc-link">{t.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
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

      <section className="blog-post-body">
        <div className="blog-post-shell">
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

          {/* Article centred in one reading column; the TOC is a rail in the right gutter on wide
              screens and a collapsed box above the article on smaller ones. */}
          <div className="blog-post-grid">
            <div className="blog-post-main">
              <details className="blog-toc-inline">
                <summary>
                  In this article <i className="bi bi-chevron-down" aria-hidden="true" />
                </summary>
                <Toc post={post} />
              </details>
              <article className="blog-article" dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            <aside className="blog-toc-rail">
              <Toc post={post} heading />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
