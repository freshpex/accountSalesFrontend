import { createSelector } from "@reduxjs/toolkit";

const loginState = (state) => state.login;

export const getLoading = createSelector(
  loginState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  loginState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  loginState,
  (state) => state.ui.success
);

export const getUserData = createSelector(
  loginState,
  (state) => state.data.user
);

export const getUserToken = createSelector(
  loginState,
  (state) => state.data.userToken
);
