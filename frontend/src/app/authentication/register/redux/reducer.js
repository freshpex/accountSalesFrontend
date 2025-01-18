import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    userId: null,
    message: null
  },
  googleAuth: {
    loading: false,
    error: null
  }
};

export const registerReducerSlice = createSlice({
  name: "authRegister",
  initialState,
  reducers: {
    register_user: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
      state.ui.success = false;
    },
    register_user_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.userId = action.payload.userId;
      state.data.message = action.payload.message;
    },
    register_user_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    reset_register: (state) => {
      return initialState;
    },
    google_auth_start: (state) => {
      state.googleAuth.loading = true;
      state.googleAuth.error = null;
    },
    google_auth_success: (state) => {
      state.googleAuth.loading = false;
    },
    google_auth_error: (state, action) => {
      state.googleAuth.loading = false;
      state.googleAuth.error = action.payload;
    }
  },
});

export const {
  register_user,
  register_user_error,
  register_user_success,
  reset_register,
  google_auth_start,
  google_auth_success,
  google_auth_error
} = registerReducerSlice.actions;

export default registerReducerSlice.reducer;
