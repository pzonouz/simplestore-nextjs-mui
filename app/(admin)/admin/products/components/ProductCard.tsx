"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export const ProductCard = ({
  product,
  carousel = false,
}: {
  product: Product;
  carousel?: boolean;
}) => {
  const imageSrc = product.imageUrl ? `${product.imageUrl}` : "/images/pc.png";

  return (
    <Card
      sx={{
        border: "2px solid",
        borderColor: "grey.200",
        borderRadius: "8px",
        minHeight: { md: "20rem" },
        width: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={Link}
        href={`/product/${product.slug}`}
        sx={{
          flex: 1,
          display: "flex",
          // carousel → always column; otherwise → row on mobile, column on desktop
          flexDirection: carousel ? "column" : { xs: "row", md: "column" },
          alignItems: "stretch",
          textDecoration: "none",
          width: 1,
          minWidth: 0,
        }}
      >
        <CardMedia
          sx={{
            position: "relative", // required for <Image fill />
            flexShrink: 0, // don't let the text squish the image in row layout
            width: {
              xs: carousel ? "100%" : 120,
              sm: carousel ? "100%" : 160,
              md: "100%",
            },
            aspectRatio: {
              xs: carousel ? "1 / 1" : "auto",
              md: "1 / 1",
            },
          }}
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </CardMedia>

        <CardContent sx={{ flex: 1, minWidth: 0, width: 1 }}>
          <Typography
            gutterBottom
            component="div"
            title={product.name}
            sx={{
              whiteSpace: "normal",
              wordBreak: "normal", // standard wrap
              fontWeight: 700,
            }}
          >
            {product.name}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {product.price ? product.price : "برای قیمت تماس بگیرید"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
