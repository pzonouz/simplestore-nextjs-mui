export const revalidate = 3600;
export const dynamicParams = true;

import { Box, Typography } from "@mui/material";
import { env } from "@/lib/env";
import type { FileType, Product } from "@/lib/types";
import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Contact } from "@/components/UI/Contact";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ImageShow } from "@/components/UI/ImageShow";
import { ImagesCarousel } from "@/components/UI/ImagesCarousel";

const siteUrl = env.BASE_URL;
const StoreName = "نانوشاپ";

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getProduct = cache(async (slug: string): Promise<Product> => {
  const encodedSlug = encodeURIComponent(slug);
  const res = await fetch(
    `${env.API_URL}/products/by_slug/${encodedSlug}`,
    { next: { revalidate: 3600 } }, // align fetch cache with page ISR
  );
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load product: ${res.status}`);
  return res.json();
});

export async function generateStaticParams() {
  const res = await fetch(`${env.API_URL}/products`);
  if (!res.ok) return [];
  const products: { slug: string }[] = await res.json();

  // Skip non-ASCII slugs — they crash Next.js prerendering.
  // `dynamicParams = true` ensures they still render on demand.
  return (
    products
      // biome-ignore lint/suspicious/noControlCharactersInRegex:""
      .filter((p) => /^[\x00-\x7F]+$/.test(p.slug))
      .map((p) => ({ slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: `${product.name} | ${StoreName}`,
    description:
      product.description?.slice(0, 160) ??
      `فروش ${product.name} در ${StoreName}`,
    alternates: {
      canonical: `/product/${encodeURIComponent(slug)}`,
    },
    keywords: [
      product.name,
      `${product.name} ${StoreName}`,
      `خرید ${product.name}`,
      `قیمت ${product.name}`,
      `${product.categoryName}`, // if you have it
      StoreName,
      "اردبیل",
      "تبریز",
    ].filter(Boolean),
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
  const decoded = decodeURIComponent(slug);
  const product = await getProduct(decoded);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: stripHtml(product.description).slice(0, 300),
      image: [`${env.BASE_URL}/uploads/${product.imageUrl}`],
      url: `${siteUrl}/product/${encodeURIComponent(slug)}`,
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
  const filesRes = await fetch(`${env.API_URL}/files`);
  const files = await filesRes.json();

  const images = files?.filter((f: FileType) =>
    product?.fileIds?.includes(f.id),
  );
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
              width: "33%",
              aspectRatio: 4 / 3,
              display: { xs: "none", md: "block" },
            }}
          >
            <ImageShow
              images={images}
              mainImageUrl={product.imageUrl ?? ""}
              mainImageName={product?.name ?? ""}
            />
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <ImagesCarousel
              images={images}
              mainImageUrl={product.imageUrl ?? ""}
              mainImageName={product?.name ?? ""}
            />
          </Box>
          <Box
            sx={{
              flexShrink: 0,
              borderColor: "#EEE",
              borderWidth: "1px",
              padding: "1rem",
              borderRadius: "1rem",
              width: { xs: 1, md: "33%" },
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
      />
    </>
  );
};

export default page;
