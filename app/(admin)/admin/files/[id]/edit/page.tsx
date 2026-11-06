"use client";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetFileQuery } from "@/lib/redux/api";
import { FileForm } from "../../FileForm";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: file, isLoading } = useGetFileQuery(id);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", paddingY: "2rem" }}>
        ویرایش فایل
      </Typography>
      {file && <FileForm type="EDIT" file={file} externlLoading={isLoading} />}
    </Box>
  );
};

export default page;
