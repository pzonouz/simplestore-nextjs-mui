import {
  Button,
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
    <Link href={`/product/${product?.slug}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={140}
            image={imageSrc}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};
