"use client";
import { DataTable } from "@/components/Table/DataTable";
import { Box, Button, Dialog, Typography } from "@mui/material";
import type { Category } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import type { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/lib/redux/api";
import { Collapsible } from "@/components/UI/Collapsible";
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function AdminCatgories() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: deleteIsLoading }] =
    useDeleteCategoryMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const categoryColumns: Array<ColumnDef<typeof features, Category>> = [
    {
      accessorKey: "name",
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.parentName,
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
              loading={deleteIsLoading}
              onClick={() => {
                if (!deleteId) return;
                deleteCategory(deleteId)
                  .unwrap()
                  .then(() => {
                    OpenSuccessSnackbar(dispatch);
                    setDeleteId(null);
                  })
                  .catch((err) => {
                    setDeleteId(null);
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
