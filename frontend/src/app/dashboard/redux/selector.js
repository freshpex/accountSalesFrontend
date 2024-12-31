import { createSelector } from "@reduxjs/toolkit";

const dashboardState = (state) => state.dashboard;

export const getDashboardMetrics = createSelector(
  dashboardState,
  (state) => state.data.metrics
);

export const getSalesTarget = createSelector(
  getDashboardMetrics,
  (metrics) => metrics.salesTarget
);

export const getRevenueMetrics = createSelector(
  getDashboardMetrics,
  (metrics) => metrics.revenue
);

export const getCustomerMetrics = createSelector(
  getDashboardMetrics,
  (metrics) => metrics.customers
);

export const getSalesTrends = createSelector(
  dashboardState,
  (state) => state.data.salesTrends
);

export const getCustomerGrowth = createSelector(
  dashboardState,
  (state) => state.data.customerGrowth
);

export const getPopularProducts = createSelector(
  dashboardState,
  (state) => state.data.productPopular
);

export const getRecentActivities = createSelector(
  dashboardState,
  (state) => state.data.recentActivities
);

export const getLoading = createSelector(
  dashboardState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  dashboardState,
  (state) => state.ui.error
);

// Derived selectors for specific metrics
export const getSalesGrowth = createSelector(
  getRevenueMetrics,
  (revenue) => ({
    current: revenue.value,
    previous: revenue.previousValue,
    growth: revenue.growth
  })
);

export const getOutOfStockCount = createSelector(
  getDashboardMetrics,
  (metrics) => metrics.products.outOfStock
);
