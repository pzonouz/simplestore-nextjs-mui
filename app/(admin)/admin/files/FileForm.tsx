"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileType, FormType } from "@/lib/types";
import {
  useCreateFileMutation,
  useEditFileMutation,
  useUploadFileMutation,
} from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";
import { translateErrorToPersian } from "@/lib/utils/translate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ZoomOnHoverImage } from "@/components/UI/ZoomOnHoverImage";
import { env } from "@/lib/env";
import { fileCreateSchema } from "@/lib/schemas";

export const FileForm = ({
  type,
  file,
  externlLoading: externalLoading = false,
}: {
  type: FormType;
  file?: FileType;
  externlLoading?: boolean;
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const [uplaod, { isLoading: uploadIsLoading }] = useUploadFileMutation();
  const { handleSubmit, reset, control, setValue, watch } = useForm({
    resolver: zodResolver(fileCreateSchema),
    defaultValues: file ?? {
      name: "",
      url: "",
    },
  });
  useEffect(() => { if (file?.url) { setUrl(file?.url) } }, [file])
  const [editFile, { isLoading: editIsLoading }] = useEditFileMutation();
  const [createFile, { isLoading: createIsLoading }] = useCreateFileMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const VisuallyHiddenInput = styled("input")({
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box
      onSubmit={handleSubmit((data) => {
        if (type == "CREATE") {
          createFile(data)
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              setUrl(null)
              reset();
            })
            .catch((err: FetchBaseQueryError) => {
              OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
            });
        }
        if (type == "EDIT") {
          editFile({ ...data, id: file?.id })
            .unwrap()
            .then(() => {
              OpenSuccessSnackbar(dispatch);
              reset();
              router.push("/admin/files");
            })
            .catch((err: FetchBaseQueryError) => {
              OpenErrorSnackbar(dispatch, translateErrorToPersian(err));
            });
        }
      })}
      component="form"
      sx={{ padding: "1rem" }}
    >
      {externalLoading ? (
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
            {!url ? (
              <Button
                loading={uploadIsLoading}
                size="large"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                آپلود
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const formData = new FormData();
                    formData.set(
                      "file",
                      event.currentTarget?.files?.[0] as File,
                    );
                    uplaod(formData)
                      .unwrap()
                      .then((data) => {
                        setValue("url", data.url);
                        setUrl(data.url);
                      })
                      .catch((err) => {
                        OpenErrorSnackbar(
                          dispatch,
                          translateErrorToPersian(err),
                        );
                      });
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ position: "relative" }}>
                <Box>
                  <ZoomOnHoverImage
                    scale={5}
                    width={100}
                    height={100}
                    src={`${env.NEXT_PUBLIC_BASE_URL}/${url}`}
                    alt=""
                  />
                </Box>

                <IconButton
                  onClick={() => {
                    setUrl(null);
                    setValue("url", "");
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    start: 0,
                    color: "error.main",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button
              disabled={!watch("url")}
              loading={createIsLoading || editIsLoading}
              type="submit"
              variant="contained"
            >
              ثبت
            </Button>
            {type == "EDIT" && (
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
