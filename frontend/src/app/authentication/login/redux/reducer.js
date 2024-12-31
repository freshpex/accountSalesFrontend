import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    user: null,
    token: null
  }
};

export const loginReducerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login_user: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
      state.ui.success = false;
    },
    login_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.user = action.payload;
      state.data.token = action.payload.userToken;
    },
    login_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
      state.ui.success = false;
    },
    logout: () => {
      return initialState;
    }
  },
});

export const { login_user, login_success, login_error, logout } = loginReducerSlice.actions;

export default loginReducerSlice.reducer;
