"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetParametersGroupQuery } from "@/lib/redux/api";
import { ParametersGroupForm } from "../../ParametersGroupForm";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: parametersGroup, isLoading } = useGetParametersGroupQuery(id);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: "2rem" }}>
        ویرایش گروه بندی
      </Typography>
      {parametersGroup && (
        <ParametersGroupForm
          type="EDIT"
          parametersGroup={parametersGroup}
          externalLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default page;
