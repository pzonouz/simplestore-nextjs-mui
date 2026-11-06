import { successMessage } from "../constants";
import {
  setSnackbarOpen,
  setSnackbarStatus,
  setSnackbarText,
} from "../redux/snackbarSlice";
import type { AppDispatch } from "../redux/store";

export const OpenSuccessSnackbar = (
  dispatch: AppDispatch,
  text = successMessage,
) => {
  dispatch(setSnackbarStatus("SUCCESS"));
  if (text) {
    dispatch(setSnackbarText(text));
  } else {
    dispatch(setSnackbarText(successMessage));
  }
  dispatch(setSnackbarOpen(true));
};

export const OpenErrorSnackbar = (dispatch: AppDispatch, text: string) => {
  dispatch(setSnackbarStatus("ERROR"));
  dispatch(setSnackbarText(text));
  dispatch(setSnackbarOpen(true));
};
