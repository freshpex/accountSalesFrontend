import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    transactions: [],
    stats: {
      all: 0,
      shipping: 0,
      completed: 0,
      cancelled: 0,
      pending: 0
    },
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  },
  filters: {
    search: '',
    payment: null,
    date: null,
    status: 'all',
    page: 1,
    limit: 10
  }
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    fetch_transactions: (state) => {
      state.ui.loading = true;
    },
    fetch_transactions_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.transactions = action.payload.items;
      state.data.stats = action.payload.stats;
      state.data.meta = action.payload.meta;
    },
    fetch_transactions_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    add_transaction: (state) => {
      state.ui.loading = true;
    },
    add_transaction_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.transactions.unshift(action.payload);
    },
    add_transaction_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_transaction: (state) => {
      state.ui.loading = true;
    },
    update_transaction_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      const index = state.data.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.data.transactions[index] = action.payload;
      }
    },
    update_transaction_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    delete_transaction: (state) => {
      state.ui.loading = true;
    },
    delete_transaction_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.transactions = state.data.transactions.filter(
        t => t.id !== action.payload
      );
    },
    delete_transaction_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_filters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filters.page = 1; // Reset to first page when filters change
    },
    reset_filters: (state) => {
      state.filters = initialState.filters;
    },
    set_page: (state, action) => {
      state.filters.page = action.payload;
    }
  }
});

export const {
  fetch_transactions,
  fetch_transactions_success,
  fetch_transactions_error,
  add_transaction,
  add_transaction_success,
  add_transaction_error,
  update_transaction,
  update_transaction_success,
  update_transaction_error,
  delete_transaction,
  delete_transaction_success,
  delete_transaction_error,
  update_filters,
  reset_filters,
  set_page
} = transactionSlice.actions;

export default transactionSlice.reducer;
