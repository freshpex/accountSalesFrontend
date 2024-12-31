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

export const getFilters = createSelector(
  transactionState,
  (state) => state.filters
);

export const getFilteredTransactions = createSelector(
  [getTransactions, getFilters],
  (transactions, filters) => {
    return transactions.filter(transaction => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.productName.toLowerCase().includes(searchLower) ||
          transaction.customer.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }
);

export const getTransactionsByStatus = createSelector(
  getTransactions,
  (transactions) => ({
    all: transactions.length,
    shipping: transactions.filter(t => t.status.toLowerCase() === 'shipping').length,
    completed: transactions.filter(t => t.status.toLowerCase() === 'completed').length,
    cancelled: transactions.filter(t => t.status.toLowerCase() === 'cancelled').length
  })
);
