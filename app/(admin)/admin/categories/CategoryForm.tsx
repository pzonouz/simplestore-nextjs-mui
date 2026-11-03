"use client";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { catagoryCreateSchema } from "@/lib/scemats";
import { Category } from "@/lib/types";
import { useCreateCategoryMutation } from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  setSnackbarOpen,
  setSnackbarStatus,
  setSnackbarText,
} from "@/lib/redux/snackbarSlice";
import { successMessage } from "@/lib/contants";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const CategoryForm = ({ categories }: { categories: Category[] }) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(catagoryCreateSchema),
    defaultValues: {
      name: "",
      parent: null,
      description: "",
    },
  });
  const [createCategory, { isLoading: isCreateLoading }] =
    useCreateCategoryMutation();
  const dispatch = useAppDispatch();
  return (
    <Box
      onSubmit={handleSubmit((data) => {
        createCategory(data)
          .unwrap()
          .then(() => {
            dispatch(setSnackbarStatus("SUCCESS"));
            dispatch(setSnackbarText(successMessage));
            dispatch(setSnackbarOpen(true));
          })
          .catch((err: FetchBaseQueryError) => {
            dispatch(setSnackbarText(String(err.data)));
            dispatch(setSnackbarStatus("ERROR"));
            dispatch(setSnackbarOpen(true));
          });
      })}
      component="form"
      sx={{ padding: "1rem" }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TextField
            sx={{ width: 1 }}
            {...register("name")}
            label="نام"
            variant="outlined"
            error={!!errors?.name}
            helperText={errors?.name?.message}
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
                value={categories?.find((c) => c.id == field?.value) ?? null}
                options={categories}
                getOptionLabel={(item) => item?.name}
                renderInput={(params) => (
                  <TextField inputRef={field.ref} {...params} label="والد" />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <TextField
            sx={{ width: 1 }}
            {...register("description")}
            label="توضیحات"
            variant="outlined"
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />
        </Grid>
        <Button loading={isCreateLoading} type="submit" variant="contained">
          ثبت
        </Button>
      </Grid>
    </Box>
  );
};
