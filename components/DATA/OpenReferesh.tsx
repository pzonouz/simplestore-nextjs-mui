import { Add, Refresh } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export const OpenReferesh = ({
  address,
  refresher,
}: {
  address: string;
  refresher: () => void;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "4px" }}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          window.open(
            address,
            "_blank",
            "width=1200,height=600,left=100,top=0,popup=yes",
          );
        }}
      >
        <Add />
      </Button>
      <Button onClick={refresher} color="primary" variant="contained">
        <Refresh />
      </Button>
    </Box>
  );
};
