import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { iransansx } from "@/lib/font";
import { theme } from "./theme";
import { MyCachProvider } from "@/components/Providers/CacheProvider";
import StoreProvider from "@/components/Providers/StoreProvider";
import { SnackBar } from "@/components/UI/SnackBar";
export const metadata: Metadata = {
  title: "نانوشاپ",
  description: "تولید فروش توزیع مواد شیمیایی و نانو",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iransansx.variable} h-full antialiased`}
    >
      <body>
        <StoreProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <MyCachProvider>
              <ThemeProvider theme={theme}>
                <SnackBar />
                {children}
              </ThemeProvider>
            </MyCachProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
