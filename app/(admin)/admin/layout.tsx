import { Box } from "@mui/material";
import AdminAppBar from "@/components/UI/AppBar";

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
