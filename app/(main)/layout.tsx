import { Box } from "@mui/material";
import type { Metadata } from "next";
import Footer from "@/components/UI/Footer";
import { MainMenubar } from "@/components/UI/MainMenu/MainMenu";
import { MobileMenuTreeView } from "@/components/UI/MobileMenu/MobileMenuTreeView";
import { TopBar } from "@/components/UI/TopBar";
import { env } from "@/lib/env";
import type { MenuItemType } from "@/lib/types";

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
  let menuItems: MenuItemType[] = await menuItemsRes.json();
  menuItems = [
    { id: "10b5972d-6eaa-4197-b5c7-b462020830d6", name: "خانه", slug: "/" },
    ...menuItems,
  ];
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
        <MobileMenuTreeView items={menuItems} />
      </Box>
      {children}
      <Footer />
    </Box>
  );
}
