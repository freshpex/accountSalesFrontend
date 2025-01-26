import { createSelector } from "@reduxjs/toolkit";

const registerState = (state) => state.register;

export const getLoading = createSelector(
  registerState,
  (state) => state.ui.loading,
);

export const getError = createSelector(
  registerState,
  (state) => state.ui.error,
);

export const getSuccess = createSelector(
  registerState,
  (state) => state.ui.success,
);

export const getUserData = createSelector(registerState, (state) => state.data);
