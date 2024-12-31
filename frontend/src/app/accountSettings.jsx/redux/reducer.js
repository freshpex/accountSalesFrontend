import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    profile: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
      profilePicture: ""
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: null,
      loginHistory: []
    },
    notifications: {
      email: {},
      push: {},
      sms: {},
      browser: {}
    }
  }
};

export const accountSettingsSlice = createSlice({
  name: "accountSettings",
  initialState,
  reducers: {
    fetch_profile: (state) => {
      state.ui.loading = true;
    },
    fetch_profile_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.profile = action.payload;
    },
    fetch_profile_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_profile: (state) => {
      state.ui.loading = true;
    },
    update_profile_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.profile = { ...state.data.profile, ...action.payload };
    },
    update_profile_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_security_settings: (state) => {
      state.ui.loading = true;
    },
    update_notification_preferences: (state, action) => {
      state.data.notifications = { ...state.data.notifications, ...action.payload };
    }
  }
});

export const {
  fetch_profile,
  fetch_profile_success,
  fetch_profile_error,
  update_profile,
  update_profile_success,
  update_profile_error,
  update_security_settings,
  update_notification_preferences
} = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;
