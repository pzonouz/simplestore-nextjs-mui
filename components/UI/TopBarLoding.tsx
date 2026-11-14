// app/(home)/loading.tsx  (next to page.tsx)
import { Box, Skeleton } from "@mui/material";

export default function TopBarLoading() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginY: { md: "0", xs: "1rem" },
          aspectRatio: { xs: "2/1", md: "3/1" },
          bgcolor: "grey.200",
          minHeight: "4rem",
        }}
      />
      <Box
        sx={{
          mt: { md: "8rem" },
          height: "16rem",
          bgcolor: "primary.main",
          p: "1rem",
        }}
      >
        <Box sx={{ pt: "2rem" }}>
          <Skeleton variant="rectangular" height={220} />
        </Box>
      </Box>
    </>
  );
}
