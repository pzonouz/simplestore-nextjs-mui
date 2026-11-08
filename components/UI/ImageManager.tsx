"use client";
import { Box, Skeleton } from "@mui/material";
import { api, useGetFilesQuery } from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import type { FileType } from "@/lib/types";
import { OpenReferesh } from "../DATA/OpenReferesh";
import ImageSelector from "./ImageSelector";

export const ImageManager = ({
  onSelect,
}: {
  onSelect: (file: FileType) => void;
}) => {
  const { data: files, isLoading } = useGetFilesQuery();
  const dispatch = useAppDispatch();
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
      <OpenReferesh
        address="/admin/files"
        refresher={() => {
          dispatch(api.util.invalidateTags(["files"]));
        }}
      />
      <Box
        sx={{
          minWidth: "36rem",
          backgroundColor: "grey.200",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {isLoading ? (
          <Skeleton height={36} />
        ) : (
          files?.map((file) => (
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
          ))
        )}
      </Box>
    </Box>
  );
};
