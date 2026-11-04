import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const TableRowAction = ({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => void;
}) => {
  return (
    <Box>
      <IconButton color="error" onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="info">
        <EditIcon />
      </IconButton>
    </Box>
  );
};
