"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import type React from "react";
import { prefixer } from "stylis";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const MyCachProvider = ({ children }: { children: React.ReactNode }) => {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
};
