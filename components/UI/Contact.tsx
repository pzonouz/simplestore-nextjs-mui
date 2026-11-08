import { Box, Button, Typography } from "@mui/material";
import BaleIcon from "../../public/images/bale.svg";
import TelegramIcon from "../../public/images/telegram.svg";

export const Contact = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: 1,
      }}
    >
      <Box
        sx={{
          width: "3rem",
          height: "3rem",
          flexShrink: 0, // ← don't let the icon column shrink
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="a"
        href="https://ble.ir/nanochemshop" // Replace with your link
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaleIcon sx={{ width: "100%", height: "100%" }} />
      </Box>

      <Button
        sx={{
          width: "1rem",
          height: "1rem",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="a"
        href="https://t.me/nanochemshop" // Replace with your link
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramIcon sx={{ width: "100%", height: "100%" }} />
      </Button>

      <Typography
        sx={{
          flex: 1,
          minWidth: 0, // ← the key fix: allow the text to shrink
          whiteSpace: "nowrap", // ← keep the number on one line
          overflow: "hidden",
          textOverflow: "ellipsis", // ← show "…" if the parent is too narrow
          fontSize: "1rem",
          textAlign: "end",
          fontWeight: 700,
        }}
      >
        09040427153
      </Typography>
    </Box>
  );
};
