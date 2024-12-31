import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    summary: {
      currentTarget: 0,
      totalTarget: 0,
      totalRevenue: 0,
      revenueGrowth: 0,
      totalTransactions: 0,
      transactionGrowth: 0,
      totalCustomers: 0, // Added missing field
      customerGrowth: 0, // Added missing field
      totalProducts: 0,  // Added missing field
      productGrowth: 0   // Added missing field
    },
    monthlySales: [],
    regionalData: [],
    popularProducts: [],
    periodComparison: {
      current: {},
      previous: {}
    }
  },
  filters: {
    dateRange: 'month',
    startDate: null,
    endDate: null,
    region: 'all'
  }
};

export const salesReportSlice = createSlice({
  name: "salesReport",
  initialState,
  reducers: {
    fetch_sales_report: (state) => {
      state.ui.loading = true;
    },
    fetch_sales_report_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data = { ...state.data, ...action.payload };
    },
    fetch_sales_report_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_filters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    fetch_regional_data: (state) => {
      state.ui.loading = true;
    },
    fetch_regional_data_success: (state, action) => {
      state.ui.loading = false;
      state.data.regionalData = action.payload;
    },
    fetch_regional_data_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    }
  }
});

export const {
  fetch_sales_report,
  fetch_sales_report_success,
  fetch_sales_report_error,
  update_filters,
  fetch_regional_data,
  fetch_regional_data_success,
  fetch_regional_data_error  // Export the new action
} = salesReportSlice.actions;

export default salesReportSlice.reducer;
