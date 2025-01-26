import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
  },
};

export const authReducerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    forgot_password: (state) => {
      state.ui.loading = true;
    },
    forgot_password_success: (state) => {
      state.ui.loading = false;
    },
    forgot_password_error: (state) => {
      state.ui.loading = false;
    },
    change_password: (state) => {
      state.ui.loading = true;
    },
    change_password_success: (state) => {
      state.ui.loading = false;
    },
    change_password_error: (state) => {
      state.ui.loading = false;
    },
  },
});

export const {
  forgot_password,
  forgot_password_error,
  forgot_password_success,
  change_password,
  change_password_success,
  change_password_error,
} = authReducerSlice.actions;

export default authReducerSlice.reducer;
