import { createSlice } from "@reduxjs/toolkit";

const defaultMetrics = {
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
};

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    metrics: defaultMetrics,
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
      state.ui.error = null;
    },
    fetch_dashboard_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data = {
        ...state.data,
        ...action.payload,
        metrics: {
          ...defaultMetrics,
          ...(action.payload.metrics || {})
        }
      };
    },
    fetch_dashboard_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
      state.ui.success = false;
    },
    fetch_sales_metrics: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_sales_metrics_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.metrics = {
        ...state.data.metrics,
        ...action.payload.data
      };
    },
    fetch_sales_metrics_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
      state.ui.success = false;
    },
    update_sales_target: (state, action) => {
      state.data.metrics.salesTarget = action.payload;
    },
    fetch_sales_report: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_sales_report_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.salesReport = action.payload;
    },
    fetch_sales_report_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
      state.ui.success = false;
    },
    update_filters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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
  update_sales_target,
  fetch_sales_report,
  fetch_sales_report_success,
  fetch_sales_report_error,
  update_filters
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
