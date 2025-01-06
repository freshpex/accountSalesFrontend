import { createSelector } from "@reduxjs/toolkit";

const dashboardState = (state) => state.dashboard;

export const getDashboardMetrics = createSelector(
  dashboardState,
  (state) => state.data.metrics || {
    revenue: { value: 0, growth: 0, previousValue: 0 },
    customers: { value: 0, growth: 0, newCustomers: 0 },
    transactions: { value: 0, growth: 0, avgTicketSize: 0 },
    products: { value: 0, growth: 0, outOfStock: 0 },
    salesTarget: { current: 0, target: 0, percentage: 0, timeLeft: "" }
  }
);

export const getSalesTarget = createSelector(
  getDashboardMetrics,
  (metrics) => metrics.salesTarget || {
    current: 0,
    target: 0,
    percentage: 0,
    timeLeft: ""
  }
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
  (state) => state.data.salesTrends || { weekly: [], monthly: [] }
);

export const getCustomerGrowth = createSelector(
  dashboardState,
  (state) => state.data.customerGrowth || []
);

export const getPopularProducts = createSelector(
  dashboardState,
  (state) => state.data.productPopular || []
);

export const getRecentActivities = createSelector(
  dashboardState,
  (state) => state.data.recentActivities || []
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
