import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    metrics: {
      salesTarget: {
        current: 0,
        target: 0,
        percentage: 0,
        timeLeft: ""
      },
      revenue: {
        value: 0,
        growth: 0,
        trend: "neutral",
        previousValue: 0
      },
      customers: {
        value: 0,
        growth: 0,
        newCustomers: 0
      },
      transactions: {
        value: 0,
        growth: 0,
        avgTicketSize: 0
      },
      products: {
        value: 0,
        growth: 0,
        outOfStock: 0
      }
    },
    salesTrends: {
      weekly: [],
      monthly: []
    },
    customerGrowth: [],
    productPopular: [],
    recentActivities: []
  }
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetch_dashboard_data: (state) => {
      state.ui.loading = true;
    },
    fetch_dashboard_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data = { ...state.data, ...action.payload };
    },
    fetch_dashboard_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    fetch_sales_metrics: (state) => {
      state.ui.loading = true;
    },
    fetch_sales_metrics_success: (state, action) => {
      state.ui.loading = false;
      state.data.metrics = action.payload;
    },
    fetch_sales_metrics_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_sales_target: (state, action) => {
      state.data.metrics.salesTarget = action.payload;
    }
  }
});

export const {
  fetch_dashboard_data,
  fetch_dashboard_success,
  fetch_dashboard_error,
  fetch_sales_metrics,
  fetch_sales_metrics_success,
  fetch_sales_metrics_error,
  update_sales_target
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
