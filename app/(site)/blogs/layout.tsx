import "@/app/blog.css";

// Bootstrap-icons font is only needed inside blog content (article bodies use <i class="bi ...">).
// .blog-scope carries the blog's light/dark tokens; the theme itself is set on <html> by the
// script in the root layout (before paint) and by the header switcher.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.min.css" />
      <div className="blog-scope">{children}</div>
    </>
  );
}
