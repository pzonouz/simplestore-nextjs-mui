"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MuiChipsInput } from "mui-chips-input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { OpenReferesh } from "@/components/DATA/OpenReferesh";
import {
  api,
  useCreateParameterMutation,
  useEditParameterMutation,
  useGetParametersGroupsQuery,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { parameterCreateSchema } from "@/lib/schemas";
import type { FormType, Parameter } from "@/lib/types";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";

export const ParameterForm = ({
  type,
  parameter,
  externalLoading = false,
}: {
  type: FormType;
  parameter?: Parameter;
  externalLoading?: boolean;
}) => {
  const { handleSubmit, reset, control, watch } = useForm({
    resolver: zodResolver(parameterCreateSchema),
    defaultValues: parameter ?? {
      name: "",
      parameterGroup: "",
      parameterType: "Text",
      selectableOptions: [],
    },
  });
  const { data: parametersGroups, isLoading: getIsLoading } =
    useGetParametersGroupsQuery();
  const [editParameter, { isLoading: editIsLoading }] =
    useEditParameterMutation();
  const [createParameter, { isLoading: createIsLoading }] =
    useCreateParameterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Box
      onSubmit={handleSubmit((data) => {
        if (type === "CREATE") {
          createParameter(data)
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
          editParameter({ ...data, id: parameter?.id })
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
              name="parametersGroup"
              render={({ field, fieldState }) => (
                <Autocomplete
                  onChange={(_, option) => field.onChange(option?.id ?? null)}
                  sx={{ width: 1 }}
                  disablePortal
                  onBlur={field.onBlur}
                  value={
                    parametersGroups?.find((c) => c.id === field?.value) ?? null
                  }
                  options={parametersGroups ?? []}
                  getOptionLabel={(item) => item?.name}
                  renderInput={(params) => (
                    <TextField
                      inputRef={field.ref}
                      {...params}
                      label="گروه بندی"
                      error={!!fieldState.error}
                      helperText={fieldState?.error?.message ?? ""}
                    />
                  )}
                />
              )}
            />
            <OpenReferesh
              address="parameters_groups"
              refresher={() => {
                dispatch(api.util.invalidateTags(["parametersGroups"]));
              }}
            />
          </Grid>

          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", gap: 1, alignItems: "stretch" }}
          >
            <Controller
              control={control}
              name="parameterType"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="parameter-group">نوع پارامتر</InputLabel>
                  <Select
                    labelId="parameter-group"
                    label="نوع پارامتر"
                    {...field}
                  >
                    <MenuItem value={"Boolean"}>بله-خیر</MenuItem>
                    <MenuItem value={"Text"}>متن</MenuItem>
                    <MenuItem value={"Selectable"}>انتخابی</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{ display: "flex", gap: 1, alignItems: "stretch" }}
          >
            {!!(watch("parameterType") === "Selectable") && (
              <Controller
                control={control}
                name="selectableOptions"
                render={({ field }) => (
                  <MuiChipsInput
                    label="موارد انتخابی"
                    sx={{ width: 1 }}
                    placeholder=""
                    value={field.value}
                    onChange={(chips) => {
                      field.onChange(chips);
                    }}
                  />
                )}
              />
            )}
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
