import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ship modern JS only — no legacy polyfills for IE
  // Reduces JS bundle size by ~15-20 KB gzipped
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-progress",
      "@radix-ui/react-separator",
      "@radix-ui/react-label",
    ],
  },

  images: {
    // Serve AVIF first (50% smaller than WebP), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 1 year on CDN
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
      {
        protocol: "http",
        hostname: "15.204.175.186",
        port: "1447",
      },
    ],
  },

  // Enable gzip/brotli compression at the Next.js layer (Vercel does this automatically,
  // but keeping it ensures local `next start` also compresses responses)
  compress: true,

  async redirects() {
    return [
      {
        source: "/blogs/techMind-helps-writers",
        destination: "/blogs/techmind-helps-writers",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Keep crawler-facing discovery files fresh and easy to revalidate.
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Static assets — long-lived cache
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Optimised images
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
      {
        // All routes — security + caching hints
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
