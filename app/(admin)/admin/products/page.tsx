"use client";
import { Box, Button, Dialog, Typography } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/Table/DataTable";
import type { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import { Collapsible } from "@/components/UI/Collapsible";
import { useDeleteProductMutation, useGetProductsQuery } from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import type { Product } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";
import { ProductForm } from "./ProductForm";

export default function AdminCatgories() {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: DeleteIsLoading }] =
    useDeleteProductMutation();
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const productColumns: Array<ColumnDef<typeof features, Product>> = [
    {
      accessorKey: "name", // accessorKey shorthand
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.categoryName,
      id: "دسته بندی",
      header: () => <span>والد</span>,
      cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
      header: "عملیات",
      cell: ({ row }) => (
        <TableRowAction
          entity="products"
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
                deleteProduct(deleteId)
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
          محصولات
        </Typography>
        <Collapsible>
          <ProductForm type="CREATE" />
        </Collapsible>
        <DataTable
          id="product"
          isLoading={isLoading}
          skeletonRows={10}
          columns={productColumns}
          data={data ?? []}
        />
      </Box>
    </>
  );
}
