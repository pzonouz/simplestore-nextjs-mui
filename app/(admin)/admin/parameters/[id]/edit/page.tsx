"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetParameterQuery } from "@/lib/redux/api";
import { ParameterForm } from "../../ParameterForm";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: parameter, isLoading } = useGetParameterQuery(id);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: "2rem" }}>
        ویرایش پارامتر
      </Typography>
      {parameter && (
        <ParameterForm
          type="EDIT"
          parameter={parameter}
          externalLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default page;
