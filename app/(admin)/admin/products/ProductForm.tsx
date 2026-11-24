"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
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
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { OpenReferesh } from "@/components/DATA/OpenReferesh";
import { Tiptap } from "@/components/DATA/Tiptap";
import { ImageManager } from "@/components/UI/ImageManager";
import { MultipleImageManager } from "@/components/UI/MultipleImageManager";
import { ZoomOnHoverImage } from "@/components/UI/ZoomOnHoverImage";
import type { ProductParameterValueCreate } from "@/lib/ProductParameterValueCreate";
import {
  api,
  useCreateProductMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
  useGetFilesQuery,
  useGetParametersByGroupQuery,
  useGetParametersGroupsByCategoryAncestorsQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { productCreateSchema } from "@/lib/schemas";
import type { FileType, FormType, Parameter, Product } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";

export const ProductForm = ({
  type,
  product,
  externalLoading = false,
}: {
  type: FormType;
  product?: Product;
  externalLoading?: boolean;
}) => {
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
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
      imageUrl: "",
      slug: "",
      fileIds: [],
      productsParametersValues: [],
    },
  });
  const { data: categories, isLoading: getIsLoading } = useGetCategoriesQuery();
  const [editProduct, { isLoading: editIsLoading }] = useEditProductMutation();
  const [createProduct, { isLoading: createIsLoading }] =
    useCreateProductMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: files } = useGetFilesQuery();
  const [imageSelectOpen, setImageSelectOpen] = useState(false);
  const [imagesSelectOpen, setImagesSelectOpen] = useState(false);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: ""
  useEffect(() => {
    setValue("slug", watch("name").replaceAll(" ", "_"));
  }, [setValue, watch("name")]);

  const [parametersGroup, setParametersGroup] = useState("");
  const category = watch("category");
  const { data: parametersGroups, isLoading: parametersGroupsIsLoading } =
    useGetParametersGroupsByCategoryAncestorsQuery(category, {
      skip: !category,
    });
  const { data: parameters, isLoading: parametersIsLoading } =
    useGetParametersByGroupQuery(parametersGroup, {
      skip: !parametersGroup,
    });

  useEffect(() => {
    const productParameterValues: ProductParameterValueCreate[] = [];
    parameters?.map((p: Parameter) => {
      return productParameterValues.push({
        BooleanValue: false,
        TextValue: "",
        parameter: p.id,
        selectableValues: [],
      });
    });
    setValue("productsParametersValues", productParameterValues ?? []);
  }, [parameters, setValue]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {Array.from([1, 2, 3, 4, 5, 6]).map((i) => (
            <Skeleton key={i} height={48} />
          ))}
        </Box>
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
              name="slug"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ width: 1 }}
                  label="مسیر"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid
            sx={{ display: "flex", flexDirection: "row", gap: "4px" }}
            size={{ xs: 12, lg: 6 }}
          >
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <Box sx={{ flexGrow: 1 }}>
                  {getIsLoading ? (
                    <Skeleton />
                  ) : (
                    <Autocomplete
                      onChange={(_, option) =>
                        field.onChange(option?.id ?? null)
                      }
                      sx={{ width: 1 }}
                      disablePortal
                      onBlur={field.onBlur}
                      value={
                        categories?.find((c) => c.id === field?.value) ?? null
                      }
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
                </Box>
              )}
            />
            <OpenReferesh
              address="categories"
              refresher={() => {
                dispatch(api.util.invalidateTags(["categories"]));
              }}
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
          {watch("packingType") !== "Quantity" && (
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
          )}

          {/* ── Image field ── */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field, fieldState }) => (
                <Box>
                  {field.value ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <ZoomOnHoverImage
                        width={64}
                        height={64}
                        scale={5}
                        alt=""
                        src={`${field.value}`}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => setImageSelectOpen(true)}
                      >
                        تغییر تصویر
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          field.onChange("", {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                      >
                        حذف تصویر
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      onClick={() => setImageSelectOpen(true)}
                      variant="contained"
                    >
                      افزودن تصویر
                    </Button>
                  )}
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Controller
              control={control}
              name="fileIds"
              render={({ field, fieldState }) => (
                <Box>
                  {field.value?.length > 0 ? (
                    field.value?.map((v) => {
                      const file = files?.find((f) => f.id === v);
                      return (
                        <Box
                          key={file?.id}
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <ZoomOnHoverImage
                            width={64}
                            height={64}
                            scale={5}
                            alt=""
                            src={`${file?.url}`}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => setImagesSelectOpen(true)}
                          >
                            تغییر تصویر
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              setValue(
                                "fileIds",
                                getValues("fileIds").filter((f) => f !== v),
                              )
                            }
                          >
                            حذف تصویر
                          </Button>
                        </Box>
                      );
                    })
                  ) : (
                    <Button
                      onClick={() => setImagesSelectOpen(true)}
                      variant="contained"
                    >
                      افزودن تصاویر
                    </Button>
                  )}
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />
          </Grid>
          {parametersGroups && (
            <Grid size={{ xs: 12, lg: 12 }} sx={{ display: "flex", gap: 1 }}>
              {parametersGroupsIsLoading ? (
                <Skeleton />
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="parameter-groups">گروه پارامترها</InputLabel>
                  <Select
                    labelId="parameter-groups"
                    id="parameter-groups"
                    value={parametersGroup}
                    label="گروه پارامترها"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value !== null) {
                        setParametersGroup(value as string);
                      }
                    }}
                  >
                    {parametersGroups?.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <OpenReferesh
                address="/admin/parameters_groups"
                refresher={() =>
                  dispatch(api.util.invalidateTags(["parametersGroups"]))
                }
              />
            </Grid>
          )}
          {parametersGroup && (
            <Grid size={{ xs: 12, lg: 12 }}>
              {parametersIsLoading ? (
                <Skeleton />
              ) : (
                parameters?.map((p: Parameter) => {
                  const productParameterValues = watch(
                    "productsParametersValues",
                  );
                  return (
                    <Box key={p.id} sx={{ maxWidth: "10rem" }}>
                      {p.parameterType === "Boolean" && (
                        <Box>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={
                                    productParameterValues?.find(
                                      (ppv) => ppv.parameter === p.id,
                                    )?.BooleanValue ?? false
                                  }
                                  onChange={(e) => {
                                    setValue(
                                      "productsParametersValues",
                                      productParameterValues?.map((ppv) =>
                                        ppv.parameter === p.id
                                          ? {
                                            ...ppv,
                                            BooleanValue:
                                              e.currentTarget.checked,
                                          }
                                          : ppv,
                                      ),
                                    );
                                  }}
                                />
                              }
                              label={p.name}
                            />
                          </FormGroup>
                        </Box>
                      )}
                      {p.parameterType === "Text" && (
                        <TextField
                          label={p.name}
                          onChange={(e) => {
                            setValue(
                              "productParameterValues",
                              productParameterValues?.map((ppv) =>
                                ppv.parameter === p.id
                                  ? {
                                    ...ppv,
                                    TextValue: e.currentTarget.value,
                                  }
                                  : ppv,
                              ),
                            );
                          }}
                          value={
                            productParameterValues?.find(
                              (ppv) => ppv.parameter === p.id,
                            )?.TextValue ?? ""
                          }
                        />
                      )}
                      {p.parameterType === "Selectable" && (
                        <FormControl fullWidth>
                          <InputLabel id={`options-label-${p.id}`}>
                            موارد انتخابی
                          </InputLabel>
                          <Select
                            labelId={`options-label-${p.id}`}
                            label="موارد انتخابی"
                            multiple
                            value={
                              productParameterValues?.find(
                                (ppv) => ppv.parameter === p.id,
                              )?.selectableValues ?? []
                            }
                            onChange={(e) => {
                              const newValues = e.target.value as string[];

                              const current =
                                getValues("productParameterValues") ?? [];
                              const exists = current.some(
                                (ppv) => ppv.parameter === p.id,
                              );

                              const updated = exists
                                ? current.map((ppv) =>
                                  ppv.parameter === p.id
                                    ? { ...ppv, selectableValues: newValues }
                                    : ppv,
                                )
                                : [
                                  ...current,
                                  {
                                    parameter: p.id,
                                    selectableValues: newValues,
                                  },
                                ];

                              setValue("productsParametersValues", updated, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }}
                          >
                            {p.selectableOptions?.map((s) => (
                              <MenuItem key={s} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  );
                })
              )}
            </Grid>
          )}
          <Grid size={{ xs: 12, lg: 12 }}>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <Box>
                  <Tiptap
                    error={!!fieldState.error}
                    content={field.value}
                    setContent={(content: string) => {
                      field.onChange(content);
                    }}
                  />
                  <Typography sx={{}} className="error">
                    {errors?.description?.message}
                  </Typography>
                </Box>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
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
        </Grid>
      )}

      <Dialog
        open={imageSelectOpen}
        onClose={() => setImageSelectOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <ImageManager
          onSelect={(file: FileType) => {
            setValue("imageUrl", file?.url, {
              shouldDirty: true,
              shouldValidate: true,
            });
            setImageSelectOpen(false);
          }}
        />
      </Dialog>
      <Dialog
        open={imagesSelectOpen}
        onClose={() => setImagesSelectOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <MultipleImageManager
          fileIds={getValues("fileIds")}
          onChange={(fileIds: string[]) => {
            setValue("fileIds", fileIds, {
              shouldDirty: true,
              shouldValidate: true,
            });
            setImagesSelectOpen(false);
          }}
        />
      </Dialog>
    </Box>
  );
};
