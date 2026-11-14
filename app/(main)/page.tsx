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
        url: "/images/og-home.webp", // 1200×630 – you must create this image
        width: 1200,
        height: 630,
        alt: "خانه",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: "relative", // Required for fill
          width: "100%",
          aspectRatio: { xs: "2 / 1", md: "3 / 1" }, // Reserves space
          minHeight: { xs: "50vw", md: "33.33vw" }, // matches the ratio
        }}
      >
        <Image
          src="/images/Hero3.webp"
          alt="hero pic"
          fill // Use fill instead of width/height
          priority
          quality={70}
          sizes="100vw"
          style={{ objectFit: "cover" }} // Ensures the image covers the box
        />
      </Box>
      {/*<Box sx={{ minHeight: "40rem" }}>
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

          <Box sx={{ padding: "2rem", minHeight: "300px" }}>
            <ProductCarousel items={products} />
          </Box>
        </Box>
    </Box >*/}
    </>
  );
}
