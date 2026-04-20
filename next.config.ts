import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "eastcondos.sg",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Note: redirects() is not applied during static export (`output: "export"`).
  // These are active in `next dev` and on Vercel (which handles them at the edge).
  // Client-side redirects in app/calculator/page.tsx and app/team/page.tsx
  // provide the fallback for static hosting environments.
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/strategy-session",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
