// app/robots.ts

import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const site = env.BASE_URL;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${site}/sitemap.xml`,
  };
}
