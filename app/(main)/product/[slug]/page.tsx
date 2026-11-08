export const revalidate = 3600; // regenerate at most once per hour
export const dynamicParams = true; // new slugs are rendered on first request, then cached

import { Box, Typography } from "@mui/material";
import { env } from "@/lib/env";
import type { Product } from "@/lib/types";
import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Contact } from "@/components/UI/Contact";

const siteUrl = env.BASE_URL;
const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const getProduct = cache(async (slug: string): Promise<Product> => {
  const res = await fetch(`${env.API_URL}/products/by_slug/${slug}`);
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load product: ${res.status}`);
  return res.json();
});
const StoreName = "نانوشاپ";

export async function generateStaticParams() {
  const res = await fetch(`${env.API_URL}/products`);
  if (!res.ok) return [];
  const products: { slug: string }[] = await res.json();
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: `${product.name} |${StoreName} `,
    description:
      product.description?.slice(0, 160) ??
      `فروش ${product.name} ٔدر ${StoreName}`,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: product.name,
      description: `فروش ${product.name} در ${StoreName}`,
      images: [{ url: `${env.BASE_URL}/${product.imageUrl}` }],
      type: "website",
      siteName: StoreName,
      locale: "fa_IR",
    },
  };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: stripHtml(product.description).slice(0, 300),
      image: [`${env.BASE_URL}/${product.imageUrl}`],
      url: `${siteUrl}/products/${slug}`,
      brand: { "@type": "Brand", name: StoreName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "محصولات",
          item: `${siteUrl}/products`,
        },
        { "@type": "ListItem", position: 3, name: product.name },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ""
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Box
        sx={{
          borderColor: "grey.200",
          borderWidth: "1px",
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
              minWidth: "33%",
              aspectRatio: 4 / 3,
            }}
          >
            {/** biome-ignore lint/performance/noImgElement: "" */}
            <img
              style={{
                borderColor: "#EEE",
                borderWidth: "1px",
                borderRadius: "1rem",
                aspectRatio: 1,
              }}
              alt={product.name}
              src={`${env.BASE_URL}/${product.imageUrl}`}
            />
          </Box>
          <Box
            sx={{
              flexShrink: 0,
              borderColor: "#EEE",
              borderWidth: "1px",
              padding: "1rem",
              borderRadius: "1rem",
              minWidth: "33%",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              {product.name}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              borderColor: "#EEE",
              borderWidth: "1px",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              flex: 1,
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
              برای قیمت تماس بگیرید
            </Typography>
            <Contact />
          </Box>
        </Box>
      </Box>
      <Box
        id="tiptap"
        sx={{ fontFamily: "iransansx", paddingY: "2rem" }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ""
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      ></Box>
    </>
  );
};

export default page;
