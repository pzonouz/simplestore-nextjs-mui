import { Box } from "@mui/material";
import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import { MainMenubar } from "@/components/UI/MainMenu/MainMenu";
import MobileMenu from "@/components/UI/MobileMenu/MobileMenu";
import { TopBar } from "@/components/UI/TopBar";
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

export const metadata: Metadata = {
  title: {
    default: "نانوشاپ", // Required: Fallback title
    template: "%s | نانوشاپ", // Pattern for child pages
  },
};
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        paddingX: { xs: "1rem", md: "1rem" },
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      <Box sx={{ paddingX: { xs: "0", md: "6rem" } }}>
        <TopBar />
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <MainMenubar items={mainMenuItems} />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          left: "1rem",
          width: "100%",
        }}
      ></Box>
      {children}
    </Box>
  );
}
