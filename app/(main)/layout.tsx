import { Box } from "@mui/material";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box>{children}</Box>;
}
