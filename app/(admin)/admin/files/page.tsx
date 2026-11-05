"use client";
import { DataTable } from "@/components/Table/DataTable";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { FileType } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import { useDeleteFileMutation, useGetFilesQuery } from "@/lib/redux/api";
import { Collapsible } from "@/components/UI/Collapsible";
import { FileForm } from "./FileForm";
import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { translateErrorToPersian } from "@/lib/utils/translate";
import { ZoomOnHoverImage } from "@/components/UI/ZoomOnHoverImage";
import { env } from "@/lib/env";

export default function AdminFiles() {
  const { data, isLoading } = useGetFilesQuery();
  const [deleteFile, { isLoading: DeleteIsLoading }] = useDeleteFileMutation();
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileColumns: Array<ColumnDef<typeof features, FileType>> = [
    {
      accessorKey: "name", // accessorKey shorthand
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      header: "تصویر",
      cell: ({ row }) => (
        <Box sx={{ width: "4rem", height: "4rem" }}>
          <ZoomOnHoverImage
            scale={5}
            src={`${env.NEXT_PUBLIC_BASE_URL}/${row?.original?.url}`}
            alt={row?.original?.name}
          />
        </Box>
      ),
    },

    {
      header: "عملیات",
      cell: ({ row }) => (
        <TableRowAction
          entity="files"
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
                deleteFile(deleteId)
                  .unwrap()
                  .then(() => {
                    OpenSuccessSnackbar(dispatch);
                  })
                  .catch((err: FetchBaseQueryError) => {
                    OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
                  })
                  .finally(() => setDeleteId(null));
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
          فایلها
        </Typography>
        <Collapsible>
          <FileForm type="CREATE" />
        </Collapsible>
        <DataTable
          id="category"
          isLoading={isLoading}
          skeletonRows={10}
          columns={fileColumns}
          data={data ?? []}
        />
      </Box>
    </>
  );
}
