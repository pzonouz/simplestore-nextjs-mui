"use client";
import { Box, Button, Dialog, Typography } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "@/components/Table/DataTable";
import type { features } from "@/components/Table/features";
import { TableRowAction } from "@/components/Table/TableRowAction";
import { Collapsible } from "@/components/UI/Collapsible";
import {
  useDeleteParamatersGroupMutation,
  useGetParametersGroupsQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import type { ParametersGroup } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";
import { ParametersGroupForm } from "./ParametersGroupForm";

export default function AdminParametersGroups() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetParametersGroupsQuery();
  const [deleteParameterGroup, { isLoading: deleteIsLoading }] =
    useDeleteParamatersGroupMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const parametersGroupsColumns: Array<
    ColumnDef<typeof features, ParametersGroup>
  > = [
    {
      accessorKey: "name",
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.categoryName,
      id: "category",
      header: () => <span>دسته بندی</span>,
      cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
      header: "عملیات",
      cell: ({ row }) => (
        <TableRowAction
          entity="parameters_groups"
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
                deleteParameterGroup(deleteId)
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
      <Box sx={{ width: 1 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", paddingTop: "2rem" }}
        >
          گروه بندی پارامترها
        </Typography>
        <Collapsible>
          <ParametersGroupForm type="CREATE" />
        </Collapsible>
        <DataTable
          id="parameter_group"
          isLoading={isLoading}
          skeletonRows={10}
          columns={parametersGroupsColumns}
          data={data ?? []}
        />
      </Box>
    </>
  );
}
