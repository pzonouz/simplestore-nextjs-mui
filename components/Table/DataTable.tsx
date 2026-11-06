"use client";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { type ColumnDef, type RowData, useTable } from "@tanstack/react-table";
import { features } from "./features";

export function DataTable<T extends RowData>({
  id,
  columns,
  data,
  isLoading = false,
  skeletonRows = 10,
}: {
  id: string;
  columns: Array<ColumnDef<typeof features, T>>;
  data: T[];
  isLoading?: boolean;
  skeletonRows?: number;
}) {
  const table = useTable({
    key: `${id}-table`,
    features,
    columns,
    data,
  });

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
          {isLoading
            ? Array.from({ length: skeletonRows }, (_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
            : table.getRowModel().rows.map((row) => (
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
