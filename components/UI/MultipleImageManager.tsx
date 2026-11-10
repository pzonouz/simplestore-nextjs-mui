"use client";
import { Box, Button, Skeleton } from "@mui/material";
import React from "react";
import { api, useGetFilesQuery } from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { OpenReferesh } from "../DATA/OpenReferesh";
import MultipleImageSelector from "./MultipleImageSelector";

export const MultipleImageManager = ({
  fileIds,
  onChange,
}: {
  fileIds: string[];
  onChange: (fileIds: string[]) => void;
}) => {
  const { data: files, isLoading } = useGetFilesQuery();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = React.useState<string[]>(fileIds);
  return (
    <Box
      sx={{
        minWidth: "36rem",
        backgroundColor: "grey.200",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "1rem",
        posiiton: "relative",
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
              <MultipleImageSelector
                file={file}
                fileIds={selected}
                onChange={setSelected}
              />
            </Box>
          ))
        )}
      </Box>
      <Box
        sx={{
          position: "sticky", // was "posiiton"
          bottom: 0,
          width: 1,
          padding: "1rem",
          // 👇 opaque bg so nothing shows through the footer area
          backgroundColor: "grey.200",
          // 👇 force the footer above the checkbox rows
          zIndex: 2,
          // optional: visual separator
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          onClick={() => {
            onChange(selected);
          }}
          variant="contained"
          color="primary"
        >
          تایید
        </Button>
      </Box>
    </Box>
  );
};
