import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false,
  },
  overview: {
    data: null,
    loading: false,
    error: null,
  },
  metrics: {
    data: {
      totalSpent: 0,
      totalTransactions: 0,
      averageSpend: 0,
      lastTransaction: null,
    },
    loading: false,
    error: null,
  },
  spendingChart: {
    data: {
      labels: [],
      datasets: [],
    },
    loading: false,
    error: null,
  },
  recentActivity: {
    data: [],
    loading: false,
    error: null,
  },
  userActivity: {
    lastActive: null,
    currentPage: null,
    preferences: {},
    deviceInfo: null,
  },
};

export const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {
    fetch_overview: (state) => {
      state.overview.loading = true;
      state.overview.error = null;
    },
    fetch_overview_success: (state, action) => {
      state.overview.loading = false;
      state.overview.error = null;
      state.overview.data = action.payload;
    },
    fetch_overview_error: (state, action) => {
      state.overview.loading = false;
      state.overview.error = action.payload;
    },
    fetch_metrics: (state) => {
      state.metrics.loading = true;
      state.metrics.error = null;
    },
    fetch_metrics_success: (state, action) => {
      state.metrics.loading = false;
      state.metrics.data = action.payload;
    },
    fetch_metrics_error: (state, action) => {
      state.metrics.loading = false;
      state.metrics.error = action.payload;
    },
    fetch_spending_chart: (state) => {
      state.spendingChart.loading = true;
      state.spendingChart.error = null;
    },
    fetch_spending_chart_success: (state, action) => {
      state.spendingChart.loading = false;
      state.spendingChart.data = action.payload;
    },
    fetch_spending_chart_error: (state, action) => {
      state.spendingChart.loading = false;
      state.spendingChart.error = action.payload;
    },
    fetch_recent_activity: (state) => {
      state.recentActivity.loading = true;
      state.recentActivity.error = null;
    },
    fetch_recent_activity_success: (state, action) => {
      state.recentActivity.loading = false;
      state.recentActivity.error = null;
      state.recentActivity.data = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
    fetch_recent_activity_error: (state, action) => {
      state.recentActivity.loading = false;
      state.recentActivity.error = action.payload;
    },
    track_activity: (state, action) => {
      state.userActivity = {
        ...state.userActivity,
        lastActive: new Date().toISOString(),
        currentPage: action.payload.page,
        deviceInfo: action.payload.deviceInfo,
      };
    },
    update_preferences: (state, action) => {
      state.userActivity.preferences = {
        ...state.userActivity.preferences,
        ...action.payload,
      };
    },
  },
});

// Export slice actions
export const {
  fetch_overview,
  fetch_overview_success,
  fetch_overview_error,
  fetch_metrics,
  fetch_metrics_success,
  fetch_metrics_error,
  fetch_spending_chart,
  fetch_spending_chart_success,
  fetch_spending_chart_error,
  fetch_recent_activity,
  fetch_recent_activity_success,
  fetch_recent_activity_error,
  track_activity,
  update_preferences,
} = userDashboardSlice.actions;

export const fetchDashboardOverview = () => fetch_overview();
export const fetchDashboardMetrics = () => fetch_metrics();
export const fetchDashboardSpendingChart = () => fetch_spending_chart();
export const fetchDashboardRecentActivity = () => fetch_recent_activity();
export const updateLastSeen = (payload) => ({
  type: "userDashboard/update_last_seen",
  payload,
});

export default userDashboardSlice.reducer;
