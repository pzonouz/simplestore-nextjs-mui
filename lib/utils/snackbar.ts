import { successMessage } from "../contants";
import {
  setSnackbarOpen,
  setSnackbarStatus,
  setSnackbarText,
} from "../redux/snackbarSlice";

export const OpenSuccessSnackbar = (dispatch: any, text = successMessage) => {
  dispatch(setSnackbarStatus("SUCCESS"));
  if (text) {
    dispatch(setSnackbarText(text));
  } else {
    dispatch(setSnackbarText(successMessage));
  }
  dispatch(setSnackbarOpen(true));
};

export const OpenErrorSnackbar = (dispatch: any, text: string) => {
  dispatch(setSnackbarStatus("ERROR"));
  dispatch(setSnackbarText(text));
  dispatch(setSnackbarOpen(true));
};
