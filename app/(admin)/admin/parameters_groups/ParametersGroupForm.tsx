"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { OpenReferesh } from "@/components/DATA/OpenReferesh";
import {
  api,
  useCreateParametersGroupMutation,
  useEditParametersGroupMutation,
  useGetCategoriesQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { parametersGroupCreateSchema } from "@/lib/schemas";
import type { FormType, ParametersGroup } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";

export const ParametersGroupForm = ({
  type,
  parametersGroup,
  externalLoading = false,
}: {
  type: FormType;
  parametersGroup?: ParametersGroup;
  externalLoading?: boolean;
}) => {
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(parametersGroupCreateSchema),
    defaultValues: parametersGroup ?? {
      name: "",
      category: "",
    },
  });
  const { data: categories, isLoading: getIsLoading } = useGetCategoriesQuery();
  const [editParametersGroup, { isLoading: editIsLoading }] =
    useEditParametersGroupMutation();
  const [createParametersGroup, { isLoading: createIsLoading }] =
    useCreateParametersGroupMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Box
      onSubmit={handleSubmit((data) => {
        if (type === "CREATE") {
          createParametersGroup(data)
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              reset();
            })
            .catch((err: FetchBaseQueryError) => {
              OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
            });
        }
        if (type === "EDIT") {
          editParametersGroup({ ...data, id: parametersGroup?.id })
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              reset();
              router.push("/admin/parameters_groups");
            })
            .catch((err: FetchBaseQueryError) => {
              OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
            });
        }
      })}
      component="form"
      sx={{ padding: "1rem" }}
    >
      {getIsLoading || externalLoading ? (
        <Skeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ width: 1 }}
                  label="نام"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", gap: 1, alignItems: "stretch" }}
          >
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <Autocomplete
                  onChange={(_, option) => field.onChange(option?.id ?? null)}
                  sx={{ width: 1 }}
                  disablePortal
                  onBlur={field.onBlur}
                  value={categories?.find((c) => c.id === field?.value) ?? null}
                  options={categories ?? []}
                  getOptionLabel={(item) => item?.name}
                  renderInput={(params) => (
                    <TextField
                      inputRef={field.ref}
                      {...params}
                      label="دسته بندی"
                      error={!!fieldState.error}
                      helperText={fieldState?.error?.message ?? ""}
                    />
                  )}
                />
              )}
            />
            <OpenReferesh
              address="/admin/categories"
              refresher={() => {
                dispatch(api.util.invalidateTags(["categories"]));
              }}
            />
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button
              loading={createIsLoading || editIsLoading}
              type="submit"
              variant="contained"
            >
              ثبت
            </Button>
            {type === "EDIT" && (
              <Button onClick={() => router.back()} variant="outlined">
                بازگشت
              </Button>
            )}
          </Box>
        </Grid>
      )}
    </Box>
  );
};
