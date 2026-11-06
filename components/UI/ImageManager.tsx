"use client";
import { Box } from "@mui/material";
import { useGetFilesQuery } from "@/lib/redux/api";
import type { FileType } from "@/lib/types";
import ImageSelector from "./ImageSelector";

export const ImageManager = ({
  onSelect,
}: {
  onSelect: (file: FileType) => void;
}) => {
  const { data: files, isLoading } = useGetFilesQuery();
  return (
    <Box
      sx={{
        minWidth: "36rem",
        backgroundColor: "grey.200",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "1rem",
      }}
    >
      {files?.map((file) => (
        <Box
          key={file?.id}
          sx={{
            padding: "1rem",
            backgroundColor: "grey.400",
            borderRadius: "8px",
          }}
        >
          <ImageSelector file={file} onSelect={onSelect} />
        </Box>
      ))}
    </Box>
  );
};
