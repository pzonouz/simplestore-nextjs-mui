import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
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
        paddingTop: "1rem",
      }}
    >
      <Link href="/" style={{ zIndex: "100" }}>
        <Image
          src="/images/logo.webp"
          alt="logo"
          width={86}
          height={70}
          priority
        />
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
            alignItems: "center",
          }}
        >
          <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />
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
          <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
      </Box>
    </Box>
  );
};
