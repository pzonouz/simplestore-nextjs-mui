import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { successMessage } from "../constants";

export type SnackbarStatusType = "SUCCESS" | "ERROR";
export type SnackbarStateType = {
  open: boolean;
  text: string;
  status: SnackbarStatusType;
};

// Define the initial state using that type
const initialState: SnackbarStateType = {
  status: "SUCCESS",
  text: successMessage,
  open: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarStatus: (state, action: PayloadAction<SnackbarStatusType>) => {
      state.status = action.payload;
    },
    setSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setSnackbarText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackbarStateType>) => {
      state.status = action.payload.status;
      state.open = action.payload.open;
      state.text = action.payload.text;
    },
  },
});

export const {
  setSnackbar,
  setSnackbarOpen,
  setSnackbarStatus,
  setSnackbarText,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
