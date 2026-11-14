// app/RtlCacheProvider.tsx
"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import type React from "react";
import { prefixer } from "stylis";

export function RtlCacheProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider
      options={{
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }}
    >
      {children}
    </AppRouterCacheProvider>
  );
}
