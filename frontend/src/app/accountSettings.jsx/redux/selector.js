import { createSelector } from "@reduxjs/toolkit";

const accountSettingsState = (state) => state.accountSettings;

export const getProfile = createSelector(
  accountSettingsState,
  (state) => state.data.profile
);

export const getSecuritySettings = createSelector(
  accountSettingsState,
  (state) => state.data.security
);

export const getNotificationPreferences = createSelector(
  accountSettingsState,
  (state) => state.data.notifications
);

export const getLoading = createSelector(
  accountSettingsState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  accountSettingsState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  accountSettingsState,
  (state) => state.ui.success
);

// Derived selectors
export const getFullName = createSelector(
  getProfile,
  (profile) => `${profile.firstName} ${profile.lastName}`
);

export const getLoginHistory = createSelector(
  getSecuritySettings,
  (security) => security.loginHistory || []
);
