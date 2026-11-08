import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { env } from "@/lib/env";
import type { Product } from "@/lib/types";
import "./page.css";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const productRes = await fetch(`${env.API_URL}/products/by_slug/${slug}`);
  const product: Product = await productRes.json();
  return (
    <>
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
            <Image
              style={{
                borderColor: "#EEE",
                borderWidth: "1px",
                borderRadius: "1rem",
                aspectRatio: 1,
              }}
              sizes="(max-width: 900px) 100vw, 33vw"
              fill
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
            <Typography sx={{ fontSize: "1.2rem" }}>
              برای قیمت تماس بگیرید
            </Typography>
            <Typography sx={{ alignSelf: "end", fontWeight: "bold" }}>
              09040427153
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        id="tiptap"
        sx={{ fontFamily: "iransansx", paddingY: "2rem" }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      ></Box>
    </>
  );
};

export default page;
