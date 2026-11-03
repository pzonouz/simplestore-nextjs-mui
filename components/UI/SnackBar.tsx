"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setSnackbarOpen } from "@/lib/redux/snackbarSlice";

export const SnackBar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.snackbar.open);
  const status = useAppSelector((state) => state.snackbar.status);
  const text = useAppSelector((state) => state.snackbar.text);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {
        setSnackbarOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          dispatch(setSnackbarOpen(false));
        }}
        severity={status == "SUCCESS" ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
