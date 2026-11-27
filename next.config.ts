import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Recipe photos are sent through a server action: up to 4 photos of 4 MB
    serverActions: { bodySizeLimit: "17mb" },
  },
  images: {
    // Photos uploaded on the live site are served by Cloudinary
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
