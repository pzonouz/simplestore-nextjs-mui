import { Box } from "@mui/material";
import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import { MainMenubar } from "@/components/UI/MainMenu/MainMenu";
import MobileMenu from "@/components/UI/MobileMenu/MobileMenu";
import { TopBar } from "@/components/UI/TopBar";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: {
    default: "نانوشاپ", // Required: Fallback title
    template: "%s | نانوشاپ", // Pattern for child pages
  },
};
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItemsRes = await fetch(
    `${env.API_URL}/categories/categories_tree`,
    { cache: "no-store" },
  );
  const menuItems = await menuItemsRes.json();
  return (
    <Box
      sx={{
        paddingX: { xs: "1rem", md: "1rem" },
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        gap: { xs: "1rem", md: "0" },
      }}
    >
      <Box sx={{ paddingX: { xs: "0", md: "6rem" } }}>
        <TopBar />
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <MainMenubar items={menuItems ?? []} addressPrefix="category" />
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
      >
        <MobileMenu items={menuItems ?? []} />
      </Box>
      {children}
      <Footer />
    </Box>
  );
}
