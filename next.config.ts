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
  async redirects() {
    return [
      {
        // The Safety Meter is the standalone funnel (the proven lead machine).
        // Forward the on-site route into it at the edge — instant, no flash.
        // Temporary (307): we may bring a restyled version back on-site later.
        source: "/safety-meter",
        destination:
          "https://safetymeter.eastcondos.sg/?utm_source=eastcondos_site&utm_medium=nav",
        permanent: false,
      },
      {
        source: "/team",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/case-studies/case-27-staircase-wealth",
        destination: "/case-studies/staircase-wealth",
        permanent: true,
      },
      {
        source: "/case-studies/case-28-scarcity-tax",
        destination: "/case-studies/the-scarcity-tax",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
