"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetCategoryQuery } from "@/lib/redux/api";
import { CategoryForm } from "../../CategoryForm";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategoryQuery(id);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: "2rem" }}>
        ویرایش دسته بندی
      </Typography>
      {category && (
        <CategoryForm
          type="EDIT"
          category={category}
          externlLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default page;
