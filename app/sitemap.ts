// app/sitemap.ts
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = env.BASE_URL;
  const res = await fetch(`${env.API_URL}/products`, {
    next: { revalidate: 3600 },
  });
  const products: { slug: string; updatedAt?: string }[] = res.ok
    ? await res.json()
    : [];

  return [
    { url: site, changeFrequency: "daily", priority: 1 },
    ...products.map((p) => ({
      url: `${site}/products/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
