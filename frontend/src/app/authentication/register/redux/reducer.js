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
    }
  },
});

export const {
  register_user,
  register_user_error,
  register_user_success,
  reset_register
} = registerReducerSlice.actions;

export default registerReducerSlice.reducer;
