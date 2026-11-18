import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import { ProductCarousel } from "@/components/UI/ProductsCarousel";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: { absolute: "خانه | نانوشاپ" },
  description:
    "تولید مواد شیمیایی با کیفیت و آنالیز تخصصی مواد شیمیایی در آزمایشگاه مجهز. برای مشاوره و سفارش با ما تماس بگیرید.",
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
        url: "/images/og-home.webp",
        width: 1200,
        height: 630,
        alt: "خانه",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
};

export default async function Home() {
  const productsRes = await fetch(`${env.API_URL}/products`);
  const products = await productsRes.json();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, sm: 3 },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          width: 1,
          borderRadius: { xs: 0, md: 2 },
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/Hero3.webp"
          alt="hero pic"
          width={0} // Use width={0} with aspectRatio
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "2/1",
          }} // Let aspectRatio handle the height
          priority
          fetchPriority="high" // 👈 explicitly prioritize the LCP image
          loading="eager"
        />
      </Box>

      {/* Newest products */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "16rem" },
          backgroundColor: "primary.main",
          padding: { xs: "1rem", md: "1rem" },
          borderRadius: { xs: 0, md: 2 },
          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            marginY: "1rem",
            paddingInline: { xs: "0.5rem", md: 0 },
          }}
        >
          جدیدترین محصولات
        </Typography>

        <Box sx={{ padding: { xs: "0.5rem", sm: "1rem", md: "2rem" } }}>
          <ProductCarousel items={products} />
        </Box>
      </Box>
    </Box>
  );
}
