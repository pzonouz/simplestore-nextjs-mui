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
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { categoryCreateSchema } from "@/lib/schemas";
import type { Category, FormType } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";

export const CategoryForm = ({
  type,
  category,
  externlLoading: externalLoading = false,
}: {
  type: FormType;
  category?: Category;
  externlLoading?: boolean;
}) => {
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(categoryCreateSchema),
    defaultValues: category ?? {
      name: "",
      parent: null,
      description: "",
    },
  });
  const { data: categories, isLoading: getIsLoading } = useGetCategoriesQuery();
  const [editCategory, { isLoading: editIsLoading }] =
    useEditCategoryMutation();
  const [createCategory, { isLoading: createIsLoading }] =
    useCreateCategoryMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Box
      onSubmit={handleSubmit((data) => {
        if (type === "CREATE") {
          createCategory(data)
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
          editCategory({ ...data, id: category?.id })
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              reset();
              router.push("/admin/categories");
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
          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              control={control}
              name="parent"
              render={({ field }) => (
                <Autocomplete
                  onChange={(_, option) => field.onChange(option?.id ?? null)}
                  sx={{ width: 1 }}
                  disablePortal
                  onBlur={field.onBlur}
                  value={categories?.find((c) => c.id === field?.value) ?? null}
                  options={categories ?? []}
                  getOptionLabel={(item) => item?.name}
                  renderInput={(params) => (
                    <TextField inputRef={field.ref} {...params} label="والد" />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 12 }}>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ width: 1 }}
                  label="توضیحات"
                  variant="outlined"
                  error={!!fieldState?.error}
                  helperText={fieldState?.error?.message}
                />
              )}
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
