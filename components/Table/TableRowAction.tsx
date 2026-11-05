import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

export const TableRowAction = ({
  id,
  onDelete,
  entity,
}: {
  id: string;
  onDelete: (id: string) => void;
  entity: string;
}) => {
  return (
    <Box>
      <IconButton color="error" onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
      <Link href={`/admin/${entity}/${id}/edit`}>
        <IconButton color="info">
          <EditIcon />
        </IconButton>
      </Link>
    </Box>
  );
};
