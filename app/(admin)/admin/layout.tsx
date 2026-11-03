import AdminAppBar from "@/components/UI/AppBar";
import { Box } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <AdminAppBar />
      {children}
    </Box>
  );
}
