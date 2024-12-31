import { createSelector } from "@reduxjs/toolkit";

const transactionState = (state) => state.transaction;

export const getTransactions = createSelector(
  transactionState,
  (state) => state.data.transactions
);

export const getTransactionStats = createSelector(
  transactionState,
  (state) => state.data.stats
);

export const getTransactionMeta = createSelector(
  transactionState,
  (state) => state.data.meta
);

export const getLoading = createSelector(
  transactionState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  transactionState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  transactionState,
  (state) => state.ui.success
);
