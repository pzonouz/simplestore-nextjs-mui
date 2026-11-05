"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { productCreateSchema } from "@/lib/schemas";
import type { FormType, Product } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";
import { ChangeEvent } from "react";

export const ProductForm = ({
  type,
  product,
  externlLoading: externalLoading = false,
}: {
  type: FormType;
  product?: Product;
  externlLoading?: boolean;
}) => {
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productCreateSchema),
    values: product,
    defaultValues: {
      name: "",
      price: 0,
      count: 0,
      category: "",
      packingType: "Quantity" as const,
      packingCoefficientTypes: [],
      description: "",
    },
  });
  const { data: categories, isLoading: getIsLoading } = useGetCategoriesQuery();
  const [editProduct, { isLoading: editIsLoading }] = useEditProductMutation();
  const [createProduct, { isLoading: createIsLoading }] =
    useCreateProductMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const checkboxOnChange = (e: ChangeEvent<HTMLInputElement, Element>) => {
    const value = e.currentTarget?.value;
    const checked = e.currentTarget?.checked;
    const selected = getValues("packingCoefficientTypes");
    setValue(
      "packingCoefficientTypes",
      checked
        ? [...selected, Number(value)]
        : selected?.filter((v: number) => v !== Number(value)),
    );
  };
  return (
    <Box
      onSubmit={handleSubmit((data) => {
        if (type === "CREATE") {
          createProduct(data)
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
          editProduct({ ...data, id: product?.id })
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              reset();
              router.push("/admin/products");
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
                      helperText={fieldState?.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => (
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  inputMode="numeric"
                  name={field.name}
                  inputRef={field.ref}
                  value={field.value ?? ""}
                  onBlur={field.onBlur}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ?? null)
                  }
                  sx={{ width: 1 }}
                  label="قیمت"
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
              name="count"
              render={({ field, fieldState }) => (
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  inputMode="numeric"
                  name={field.name}
                  inputRef={field.ref}
                  value={field.value ?? ""}
                  onBlur={field.onBlur}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ?? null)
                  }
                  sx={{ width: 1 }}
                  label="تعداد"
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
              name="packingType"
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="packingType">نوع بسته بندی</InputLabel>
                  <Select
                    aria-describedby={`packingType-helper-text`}
                    labelId="packingType"
                    label="نوع بسته بندی"
                    {...field}
                    error={!!fieldState?.error}
                  >
                    <MenuItem value="Quantity">تعدادی</MenuItem>
                    <MenuItem value="Volume">حجمی</MenuItem>
                    <MenuItem value="Weight">وزنی</MenuItem>
                  </Select>
                  <FormHelperText id={`packingType-helper-text`}>
                    {errors.packingType?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              control={control}
              name="packingCoefficientTypes"
              render={({ fieldState, field }) => (
                <FormControl error={!!fieldState.error} component="fieldset">
                  <FormLabel component="legend">ضرایب بسته بندی</FormLabel>
                  <FormGroup
                    sx={{ display: "flex", flexDirection: "row", gap: "3px" }}
                  >
                    <FormControlLabel
                      label="یک"
                      control={
                        <Checkbox
                          value={1}
                          checked={getValues(
                            "packingCoefficientTypes",
                          ).includes(1)}
                          onChange={(e) => {
                            checkboxOnChange(e);
                          }}
                          onBlur={field.onBlur}
                        />
                      }
                    />
                    <FormControlLabel
                      label="1,000"
                      control={
                        <Checkbox
                          value={1000}
                          checked={getValues(
                            "packingCoefficientTypes",
                          ).includes(1000)}
                          onChange={(e) => {
                            checkboxOnChange(e);
                          }}
                          onBlur={field.onBlur}
                        />
                      }
                    />
                    <FormControlLabel
                      label="1,000,000"
                      control={
                        <Checkbox
                          value={1000000}
                          checked={getValues(
                            "packingCoefficientTypes",
                          ).includes(1000000)}
                          onChange={(e) => {
                            checkboxOnChange(e);
                          }}
                          onBlur={field.onBlur}
                        />
                      }
                    />
                  </FormGroup>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
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
