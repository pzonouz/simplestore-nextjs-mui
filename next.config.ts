import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  images: {
    remotePatterns: [new URL("http://localhost/uploads/**")],
    dangerouslyAllowLocalIP: true,
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
