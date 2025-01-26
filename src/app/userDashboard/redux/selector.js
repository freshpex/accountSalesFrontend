import { createSelector } from "@reduxjs/toolkit";

const userDashboardState = (state) => state.userDashboard || {};

export const getUserDashboardOverview = createSelector(
  userDashboardState,
  (state) => ({
    data: state.overview.data,
    loading: state.overview.loading,
    error: state.overview.error,
  }),
);

export const getUserDashboardMetrics = createSelector(
  userDashboardState,
  (state) =>
    state.metrics.data || {
      totalSpent: 0,
      totalTransactions: 0,
      averageSpend: 0,
      lastTransaction: null,
    },
);

export const getUserSpendingChartData = createSelector(
  userDashboardState,
  (state) => state.spendingChart.data || { labels: [], datasets: [] },
);

export const getUserRecentActivity = createSelector(
  userDashboardState,
  (state) => ({
    data: state.recentActivity?.data || [],
    loading: state.recentActivity?.loading || false,
    error: state.recentActivity?.error || null,
  }),
);

export const getUserLoadingStates = createSelector(
  userDashboardState,
  (state) => ({
    overviewLoading: state.overview.loading,
    metricsLoading: state.metrics.loading,
    chartLoading: state.spendingChart.loading,
    activityLoading: state.recentActivity.loading,
  }),
);

export const getUserErrorStates = createSelector(
  userDashboardState,
  (state) => ({
    overviewError: state.overview.error,
    metricsError: state.metrics.error,
    chartError: state.spendingChart.error,
    activityError: state.recentActivity.error,
  }),
);

export const getUserSegment = (state) =>
  state.dashboard.overview.data?.user?.segment || "bronze";
