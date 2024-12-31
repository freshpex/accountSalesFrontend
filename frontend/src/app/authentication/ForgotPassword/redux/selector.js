import { createSelector } from "@reduxjs/toolkit";

const authState = (state) => state.auth;

export const getLoading = createSelector(
  authState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  authState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  authState,
  (state) => state.ui.success
);
