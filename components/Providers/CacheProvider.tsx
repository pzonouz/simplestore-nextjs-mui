"use client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import React from "react";
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const MyCachProvider = ({ children }: { children: React.ReactNode }) => {
  return <CacheProvider value={rtlCache}>{children}</CacheProvider>;
};
