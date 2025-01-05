import { createSelector } from "@reduxjs/toolkit";

const customerState = state => state.user || { data: { customers: [] }, ui: {} };

export const getCustomers = createSelector(
  [customerState],
  (state) => state.data?.customers || []
);

export const getCustomerMetrics = createSelector(
  [customerState],
  (state) => state.data?.metrics || {
    totalCustomers: 0,
    activeCustomers: 0,
    newCustomers: 0,
    churnRate: 0,
    trends: []
  }
);

export const getCustomerSegments = createSelector(
  [customerState],
  (state) => state.data?.segments || {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0
  }
);

export const getRecentActivity = createSelector(
  [customerState],
  (state) => state.data?.recentActivity || []
);

export const getMeta = createSelector(
  [customerState],
  (state) => state.data?.meta || {}
);

export const getLoading = createSelector(
  [customerState],
  (state) => state.ui?.loading || false
);

export const getError = createSelector(
  [customerState],
  (state) => state.ui?.error || null
);

export const getActiveCustomers = createSelector(
  getCustomers,
  (customers) => customers.filter(c => c.status === 'active')
);

export const getCustomersBySegment = createSelector(
  getCustomers,
  (customers) => {
    return {
      platinum: customers.filter(c => c.segment === 'Platinum'),
      gold: customers.filter(c => c.segment === 'Gold'),
      silver: customers.filter(c => c.segment === 'Silver'),
      bronze: customers.filter(c => c.segment === 'Bronze')
    };
  }
);

export const getCustomerChurnRate = createSelector(
  getCustomerMetrics,
  (metrics) => metrics.churnRate
);
