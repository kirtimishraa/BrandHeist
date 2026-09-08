import "@/app/blog.css";

// Bootstrap-icons font is only needed inside blog content (article bodies use <i class="bi ...">).
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.min.css" />
      {children}
    </>
  );
}
