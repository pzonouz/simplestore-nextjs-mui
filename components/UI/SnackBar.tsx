"use client";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setSnackbarOpen } from "@/lib/redux/snackbarSlice";

export const SnackBar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.snackbar.open);
  const status = useAppSelector((state) => state.snackbar.status);
  const text = useAppSelector((state) => state.snackbar.text);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(setSnackbarOpen(false));
      }}
    >
      <Alert
        onClose={() => {
          dispatch(setSnackbarOpen(false));
        }}
        severity={status === "SUCCESS" ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
