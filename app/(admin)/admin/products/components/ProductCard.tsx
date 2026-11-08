import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { env } from "@/lib/env";
import type { Product } from "@/lib/types";

export const ProductCard = ({ product }: { product: Product }) => {
  const imageSrc = product.imageUrl
    ? `${env.NEXT_PUBLIC_BASE_URL}/${product.imageUrl}`
    : "/images/pc.png";
  return (
    <Card
      sx={{
        width: 1,
        borderWidth: "2px",
        borderColor: "grey.200",
        borderRadius: "8px",
      }}
    >
      <Link href={`/product/${product?.slug}`}>
        <CardActionArea>
          <CardMedia component="img" image={imageSrc} alt={product.name} />
          <CardContent>
            <Typography noWrap gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {product?.price ? (
            product.price
          ) : (
            <Typography sx={{ fontWeight: 700 }}>
              برای قیمت تماس بگیرید
            </Typography>
          )}
        </CardActions>
      </Link>
    </Card>
  );
};
