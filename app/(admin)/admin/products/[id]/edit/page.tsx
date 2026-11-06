"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/lib/redux/api";
import { ProductForm } from "../../ProductForm";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductQuery(id);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: "2rem" }}>
        ویرایش دسته بندی
      </Typography>
      {product && (
        <ProductForm type="EDIT" product={product} externlLoading={isLoading} />
      )}
    </Box>
  );
};

export default page;
