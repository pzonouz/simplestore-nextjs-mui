"use client";

import { Box, Skeleton, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/(admin)/admin/products/components/ProductCard";
import { SubCategorySelect } from "@/components/DATA/SubCategorySelect";
import {
  useGetProductsByCategoriesSlugsQuery,
  useGetProductsByCategorySlugQuery,
} from "@/lib/redux/api";
import "./page.css";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selected, setSelected] = useState<string[]>([]);
  const {
    data: productsBySlug,
    isLoading: isLoadingSlug,
    isError: isErrorSlug,
  } = useGetProductsByCategorySlugQuery(slug, {
    skip: !slug || selected.length !== 0,
  });

  const {
    data: productsBySlugs,
    isLoading: isLoadingSlugs,
    isError: isErrorSlugs,
  } = useGetProductsByCategoriesSlugsQuery(selected, {
    skip: !slug || selected.length === 0,
  });

  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (selected?.length > 0) {
      setItems(productsBySlugs ?? []);
    } else {
      setItems(productsBySlug ?? []);
    }
  }, [selected, productsBySlug, productsBySlugs]);

  return (
    <Box
      sx={{
        paddingX: { xs: 0, md: "6rem" },
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      {slug && (
        <SubCategorySelect
          selected={selected}
          setSelected={setSelected}
          slug={slug}
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(auto-fill, minmax(12rem, 1fr))" },
          gap: 2,
          width: 1,
          py: "2rem",
        }}
      >
        {isLoadingSlug || isLoadingSlugs ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              sx={{ width: 1, minHeight: "20rem" }}
            />
          ))
        ) : isErrorSlug || isErrorSlugs ? (
          <Box sx={{ gridColumn: "1 / -1" }}>
            <Typography color="error">
              خطا در دریافت محصولات. لطفاً دوباره تلاش کنید.
            </Typography>
          </Box>
        ) : !items?.length ? (
          <Box sx={{ gridColumn: "1 / -1" }}>
            <Typography color="text.secondary">
              محصولی در این دسته‌بندی یافت نشد.
            </Typography>
          </Box>
        ) : selected?.length > 0 ? (
          items?.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))
        ) : (
          items.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Page;
