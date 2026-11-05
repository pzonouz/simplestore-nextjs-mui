"use client";
import { DataTable } from "@/components/Table/DataTable";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { Category } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/lib/redux/api";
import { Collapsible } from "@/components/UI/Collapsible";
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { useAppDispatch } from "@/lib/redux/hooks";
import { translateErrorToPersian } from "@/lib/utils/translate";

export default function AdminCatgories() {
  const { data, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: DeleteIsLoading }] =
    useDeleteCategoryMutation();
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);
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
      cell: ({ row }) => (
        <TableRowAction
          entity="categories"
          onDelete={(id) => {
            setDeleteId(id);
          }}
          id={row.original?.id}
        />
      ),
    },
  ];

  return (
    <>
      <Dialog open={!!deleteId}>
        <Box sx={{ padding: "2rem", minWidth: "20rem" }}>
          <Typography>آیا پاک شود؟</Typography>
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}
          >
            <Button
              loading={DeleteIsLoading}
              onClick={() => {
                if (!deleteId) return;
                deleteCategory(deleteId)
                  .unwrap()
                  .then(() => {
                    OpenSuccessSnackbar(dispatch);
                  })
                  .catch((err) => {
                    setDeleteId((null))
                    OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
                  });
              }}
              variant="contained"
              color="error"
            >
              بله
            </Button>
            <Button onClick={() => setDeleteId(null)} variant="outlined">
              خیر
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Box sx={{ width: 1, padding: "2rem" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          دسته بندی ها
        </Typography>
        <Collapsible>
          <CategoryForm type="CREATE" />
        </Collapsible>
        <DataTable
          id="category"
          isLoading={isLoading}
          skeletonRows={10}
          columns={categoryColumns}
          data={data ?? []}
        />
      </Box>
    </>
  );
}
