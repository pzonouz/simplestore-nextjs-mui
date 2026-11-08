import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MainMenubar } from "@/components/UI/MainMenu/MainMenu";
import type { MenuItemType } from "@/lib/types";

export const mainMenuItems: MenuItemType[] = [
  { title: "خانه", href: "/" },
  {
    title: "محصولات",
    children: [
      {
        title: "مواد شیمیایی",
        children: [{ title: "آزمایشگاهی" }, { title: "صنعتی" }],
      },
    ],
  },
];
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ paddingX: { xs: "1rem", md: "6rem" } }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
            height: 100,
          }}
        >
          <Link href="/">
            <Image src="/images/logo.jpg" alt="logo" width={70} height={70} />
          </Link>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
          />
        </Box>
        <MainMenubar items={mainMenuItems} />
      </Box>
      {children}
    </Box>
  );
}
