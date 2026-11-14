import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost/uploads/**")],
    dangerouslyAllowLocalIP: true,
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    inlineCss: true,
  },
  allowedDevOrigins: ["192.168.1.91", "127.0.0.1", "localhost"],
  reactCompiler: true,
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
