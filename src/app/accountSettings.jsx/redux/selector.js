import { createSelector } from "@reduxjs/toolkit";

const accountSettingsState = (state) => state.accountSettings;

export const getProfile = createSelector(
  accountSettingsState,
  (state) => state.data.profile
);

export const selectProfile = createSelector(
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

export const getNotificationSettings = createSelector(
  accountSettingsState,
  (state) => state.data.notifications
);

export const getNotificationsByType = createSelector(
  getNotificationSettings,
  (notifications) => (type) => notifications[type] || {}
);

export const getTwoFactorEnabled = createSelector(
  getSecuritySettings,
  (security) => security.twoFactorEnabled
);

export const getPasswordRequirements = createSelector(
  getSecuritySettings,
  (security) => security.passwordRequirements
);

export const getFilteredLoginHistory = createSelector(
  [getLoginHistory, (_, filter) => filter],
  (history, filter) => history.filter(entry => 
    entry.device.toLowerCase().includes(filter.toLowerCase())
  )
);
