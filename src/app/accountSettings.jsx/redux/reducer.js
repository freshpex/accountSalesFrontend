import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false,
  },
  data: {
    profile: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      birthDate: "",
      profilePicture: "",
      phoneNumber: "",
      country: "",
      address: "",
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: null,
      loginHistory: [],
      passwordRequirements: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecial: true,
      },
    },
    notifications: {
      email: {
        newsUpdates: false,
        accountActivity: false,
        promotions: false,
      },
      push: {
        newMessages: false,
        mentions: false,
        reminders: false,
      },
      sms: {
        security: false,
        orders: false,
      },
      browser: {
        desktop: false,
        sound: false,
        background: false,
      },
      preferences: {
        emailFrequency: "daily",
        pushEnabled: true,
        smsEnabled: false,
        quietHours: {
          enabled: false,
          start: "22:00",
          end: "07:00",
        },
      },
    },
  },
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
      state.data.profile = action.payload.data || action.payload;
    },
    fetch_profile_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_profile: (state, action) => {
      state.ui.loading = true;
      state.data.profile = { ...state.data.profile, ...action.payload };
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
    update_security_settings_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.security = { ...state.data.security, ...action.payload };
    },
    update_security_settings_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_notification_preferences: (state, action) => {
      state.data.notifications = {
        ...state.data.notifications,
        ...action.payload,
      };
    },
    update_notification_preferences_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.notifications = {
        ...state.data.notifications,
        ...action.payload,
      };
    },
    update_notification_preferences_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    upload_profile_picture: (state) => {
      state.ui.loading = true;
    },
    upload_profile_picture_success: (state, action) => {
      state.ui.loading = false;
      state.data.profile.profilePicture = action.payload;
    },
    upload_profile_picture_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    toggle_notification_setting: (state) => {
      state.ui.loading = true;
    },
    toggle_notification_setting_success: (state, action) => {
      const { type, setting, value, preferences } = action.payload;
      state.ui.loading = false;
      state.ui.success = true;
      // Update the entire notification preferences if available
      if (preferences) {
        state.data.notifications = preferences;
      } else {
        // Fallback to updating just the specific setting
        state.data.notifications = {
          ...state.data.notifications,
          [type]: {
            ...(state.data.notifications[type] || {}),
            [setting]: value,
          },
        };
      }
    },
    toggle_notification_setting_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    toggle_two_factor: (state) => {
      state.ui.loading = true;
    },
    toggle_two_factor_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.security.twoFactorEnabled = action.payload.enabled;
    },
    toggle_two_factor_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_password: (state) => {
      state.ui.loading = true;
    },
    update_password_success: (state) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.security.lastPasswordChange = new Date().toISOString();
    },
    update_password_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    fetch_login_history: (state) => {
      state.ui.loading = true;
    },
    fetch_login_history_success: (state, action) => {
      state.ui.loading = false;
      state.data.security.loginHistory = action.payload;
    },
    fetch_login_history_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    fetch_notification_settings: (state) => {
      state.ui.loading = true;
    },
    fetch_notification_settings_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      // Ensure we're getting the correct data structure
      state.data.notifications = action.payload || {
        email: {
          newsUpdates: false,
          accountActivity: false,
          promotions: false,
        },
        push: { newMessages: false, mentions: false, reminders: false },
        sms: { security: false, orders: false },
        browser: { desktop: false, sound: false, background: false },
      };
    },
    fetch_notification_settings_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
  },
});

export const {
  fetch_profile,
  fetch_profile_success,
  fetch_profile_error,
  update_profile,
  update_profile_success,
  update_profile_error,
  update_security_settings,
  update_security_settings_success,
  update_security_settings_error,
  update_notification_preferences,
  update_notification_preferences_success,
  update_notification_preferences_error,
  upload_profile_picture,
  upload_profile_picture_success,
  upload_profile_picture_error,
  toggle_notification_setting,
  toggle_notification_setting_success,
  toggle_notification_setting_error,
  toggle_two_factor,
  toggle_two_factor_success,
  toggle_two_factor_error,
  update_password,
  update_password_success,
  update_password_error,
  fetch_login_history,
  fetch_login_history_success,
  fetch_login_history_error,
  fetch_notification_settings,
  fetch_notification_settings_success,
  fetch_notification_settings_error,
} = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;
