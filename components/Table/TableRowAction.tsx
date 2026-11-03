import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TableRowAction = ({ id }: { id: string }) => {
  return (
    <Box>
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
      <IconButton color="info">
        <EditIcon />
      </IconButton>
    </Box>
  );
};
