import { Box, Button, Typography } from "@mui/material";
import type { FileType } from "@/lib/types";
import { ZoomOnHoverImage } from "./ZoomOnHoverImage";

function ImageSelector({
  file,
  onSelect,
}: {
  file: FileType;
  onSelect: (file: FileType) => void;
}) {
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={() => {
          if (file) {
            onSelect(file);
          }
        }}
        variant="contained"
      >
        انتخاب
      </Button>
      <Typography>{file?.name}</Typography>
      <ZoomOnHoverImage width={96} height={96} src={`${file.url}`} alt="" />
    </Box>
  );
}

export default ImageSelector;
