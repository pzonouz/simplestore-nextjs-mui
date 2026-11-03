"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: true,
  direction: "rtl",
  typography: {
    fontFamily: "var(--font-iransansx)",
  },
  palette: {
    mode: "light",
    primary: {
      light: "#27887d",
      main: "#05756b",
      dark: "#006359",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#942eba",
      main: "#8015a6",
      dark: "#6c0093",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});
