import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import { ProductCarousel } from "@/components/UI/ProductsCarousel";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "خانه",
  description: "",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "خانه",
    description:
      "تولید مواد شیمیایی با کیفیت و آنالیز تخصصی مواد شیمیایی در آزمایشگاه مجهز. برای مشاوره و سفارش با ما تماس بگیرید.",
    url: "/",
    siteName: "نانوشاپ",
    images: [
      {
        url: "/images/og-home.webp", // 1200×630 – you must create this image
        width: 1200,
        height: 630,
        alt: "خانه",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خانه",
    description: "جدیدترین محصولات فروشگاه را ببینید.",
    images: ["/images/og-home.webp"],
  },
  // ... your title, description, OG, etc.
};

export default async function Home() {
  const productsRes = await fetch(`${env.API_URL}/products`, {
    cache: "no-store",
  });
  const products = await productsRes.json();
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "3/1",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Image
          src={"/images/Hero3.webp"}
          alt="hero pic"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          marginTop: { md: "8rem" },
          height: "16rem",
          backgroundColor: "primary.main",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "1.5rem", marginY: "1rem" }}
        >
          جدیدترین محصولات
        </Typography>
        <Box sx={{ padding: "2rem" }}>
          <ProductCarousel items={products} />
        </Box>
      </Box>
    </>
  );
}
