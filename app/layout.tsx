import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { RtlCacheProvider } from "@/components/Providers/CacheProvider";
import StoreProvider from "@/components/Providers/StoreProvider";
import { SnackBar } from "@/components/UI/SnackBar";
import { env } from "@/lib/env";
import { iransansx } from "@/lib/font";
import { theme } from "./theme";
export const metadata: Metadata = {
  title: "نانوشاپ",
  description:
    "تولید مواد شیمیایی با کیفیت و آنالیز تخصصی مواد شیمیایی در آزمایشگاه مجهز. برای مشاوره و سفارش با ما تماس بگیرید.",
  metadataBase: new URL(env.BASE_URL),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iransansx.variable} h-full antialiased`}
    >
      <body>
        <RtlCacheProvider>
          <AppRouterCacheProvider>
            <StoreProvider>
              <ThemeProvider theme={theme}>
                <SnackBar />
                {children}
              </ThemeProvider>
            </StoreProvider>
          </AppRouterCacheProvider>
        </RtlCacheProvider>
      </body>
    </html>
  );
}
