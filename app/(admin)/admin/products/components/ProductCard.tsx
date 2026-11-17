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

export const ProductCard = ({ product }: { product: Product }) => {
  const imageSrc = product.imageUrl ? `${product.imageUrl}` : "/images/pc.png";

  return (
    <Card
      sx={{
        border: "2px solid",
        borderColor: "grey.200",
        borderRadius: "8px",
        minHeight: "20rem",
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
          flexDirection: "column",
          alignItems: "stretch",
          textDecoration: "none",
        }}
      >
        <CardMedia
          sx={{
            position: "relative", // ← required for `fill`
            width: "100%",
            aspectRatio: "1 / 1", // ← reserves space, no CLS
          }}
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </CardMedia>

        <CardContent sx={{ flex: 1 }}>
          <Typography
            noWrap
            gutterBottom
            component="div"
            sx={{ fontWeight: "700" }}
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
