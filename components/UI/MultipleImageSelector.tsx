import { Box, Button, Checkbox, Typography } from "@mui/material";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";
import { ZoomOnHoverImage } from "./ZoomOnHoverImage";

function MultipleImageSelector({
  fileIds,
  file,
  onChange
}: {
    fileIds: string[];
    file: FileType;
    onChange: (fileIds: string[]) => void;
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
      <Checkbox
        value={file?.id}
        checked={fileIds?.includes(file?.id)}
        onChange={(e) => {
          e.currentTarget?.checked
            ? onChange([...fileIds,e.currentTarget.value])
            :onChange(fileIds?.filter((f) => f !== e.currentTarget.value))
        }}
        slotProps={{
          input: { "aria-label": "controlled" },
        }}
      />
      <Typography>{file?.name}</Typography>
      <ZoomOnHoverImage
        width={96}
        src={`${env.NEXT_PUBLIC_BASE_URL}/${file.url}`}
        alt=""
      />
    </Box>
  );
}

export default MultipleImageSelector;
