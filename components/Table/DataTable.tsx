"use client";
import { ColumnDef, RowData, useTable } from "@tanstack/react-table";
import { features } from "./features";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function DataTable<T extends RowData>({
  id,
  columns,
  data,
}: {
  id: string;
  columns: Array<ColumnDef<typeof features, T>>;
  data: T[];
}) {
  const table = useTable({
    key: `${id}-table`, // needed for devtools, omit if you don't want to use the devtools
    features,
    columns,
    data,
  });

  // 6. Render markup from the table instance APIs
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
