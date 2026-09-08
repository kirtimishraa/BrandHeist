/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // export /blog/ and /thank-you/ as folders, matching current canonical URLs
};

export default nextConfig;
