import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Search } from "../DATA/Search";

export const TopBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <Link href="/">
        {/** biome-ignore lint/performance/noImgElement: "" */}
        <img src="/images/logo.webp" alt="logo" width={70} height={70} />
      </Link>
      <Search />
      <Box
        sx={{
          marginInlineStart: "auto",
          display: { xs: "none", md: "flex" },
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "grey.200",
            color: "grey.800",
            padding: "1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <AccountCircleOutlinedIcon />
          <Typography>حساب کابری</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            backgroundColor: "grey.200",
            color: "grey.800",
            padding: "1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <ShoppingCartOutlinedIcon />
        </Box>
      </Box>
    </Box>
  );
};
