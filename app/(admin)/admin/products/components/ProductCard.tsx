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
        // 20rem fixed height only makes sense in the column layout
        minHeight: { md: "20rem" },
        display: "flex",
        flexDirection: "column", // single child → row/column is a no-op
      }}
    >
      <CardActionArea
        component={Link}
        href={`/product/${product.slug}`}
        sx={{
          flex: 1,
          display: "flex",
          // ⬇️ This is the important one
          flexDirection: { xs: "row", md: "column" },
          alignItems: "stretch",
          textDecoration: "none",
        }}
      >
        <CardMedia
          sx={{
            position: "relative", // required for <Image fill />
            flexShrink: 0, // don't let the text squish the image on xs
            width: { xs: 120, sm: 160, md: "100%" },
            // Square on md+, natural height (stretched by flexbox) on xs
            aspectRatio: { xs: "auto", md: "1 / 1" },
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

        <CardContent sx={{ flex: 1, minWidth: 0 }}>
          {/* minWidth: 0 so noWrap Typography can actually truncate */}
          <Typography
            // noWrap
            gutterBottom
            component="div"
            sx={{ fontWeight: 700 }}
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
