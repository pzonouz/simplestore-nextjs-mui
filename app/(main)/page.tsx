import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Carousel } from "@/components/UI/Carousel";
import { env } from "@/lib/env";

export default async function Home() {
  const productsRes = await fetch(`${env.API_URL}/products`);
  const products = await productsRes.json();
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "350px",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Image
          src={"/images/home-slider-min.png"}
          alt="hero pic"
          fill
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
        <Carousel items={products} />
      </Box>
    </>
  );
}
