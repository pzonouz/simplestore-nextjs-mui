import { Box, Typography } from "@mui/material";
import { Carousel } from "@/components/UI/Carousel";
import { env } from "@/lib/env";

export default async function Home() {
  const productsRes = await fetch(`${env.API_URL}/products`);
  const products = await productsRes.json();
  return (
    <Box
      sx={{
        height: "16rem",
        backgroundColor: "primary.light",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          paddingTop: "2rem",
          paddingX: "2rem",
          color: "white",
        }}
      >
        جدیدترین محصولات
      </Typography>
      <Box sx={{ paddingX: "4rem", paddingY: "2rem" }}>
        <Carousel items={products} />
      </Box>
    </Box>
  );
}
