import { createSelector } from "@reduxjs/toolkit";

const salesReportState = (state) => state.salesReport;

export const getSalesReportData = createSelector(
  salesReportState,
  (state) => state.data
);

export const getSalesSummary = createSelector(
  salesReportState,
  (state) => state.data.summary
);

export const getMonthlySales = createSelector(
  salesReportState,
  (state) => state.data.monthlySales
);

export const getRegionalData = createSelector(
  salesReportState,
  (state) => state.data.regionalData
);

export const getPopularProducts = createSelector(
  salesReportState,
  (state) => state.data.popularProducts
);

export const getPeriodComparison = createSelector(
  salesReportState,
  (state) => state.data.periodComparison
);

export const getFilters = createSelector(
  salesReportState,
  (state) => state.filters
);

export const getLoading = createSelector(
  salesReportState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  salesReportState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  salesReportState,
  (state) => state.ui.success
);
