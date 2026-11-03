"use client";
import { DataTable } from "@/components/Table/DataTable";
import { Box, Skeleton, Typography } from "@mui/material";
import { Category } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import { useGetCategoriesQuery } from "@/lib/redux/api";
import { Collapsible } from "@/components/UI/Collapsible";
import { CategoryForm } from "./CategoryForm";

const categoryColumns: Array<ColumnDef<typeof features, Category>> = [
  {
    accessorKey: "name", // accessorKey shorthand
    header: "نام",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.parentName, // accessorFn alternative with a custom id
    id: "والد",
    header: () => <span>والد</span>,
    cell: (info) => <i>{info.getValue<string>()}</i>,
  },
  {
    header: "عملیات",
    cell: ({ row }) => <TableRowAction id={row.original?.id} />,
  },
];
export default function AdminCatgories() {
  const { data, isLoading } = useGetCategoriesQuery();
  return (
    <Box sx={{ width: 1, padding: "2rem" }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        دسته بندی ها
      </Typography>
      <Collapsible>
        <CategoryForm categories={data ?? []} />
      </Collapsible>
      {isLoading ? (
        <Box sx={{ width: 300 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Box>
      ) : (
        <DataTable id="category" columns={categoryColumns} data={data ?? []} />
      )}
    </Box>
  );
}
