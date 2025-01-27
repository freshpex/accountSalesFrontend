import { put, takeLatest, call, all, select } from "redux-saga/effects";
import {
  fetch_dashboard_data,
  fetch_dashboard_success,
  fetch_dashboard_error,
  fetch_sales_metrics,
  fetch_sales_metrics_success,
  fetch_sales_metrics_error,
  fetch_sales_report,
  fetch_sales_report_success,
  fetch_sales_report_error,
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchDashboardDataSaga() {
  try {
    const state = yield select(state => state.dashboard);
    const filters = state.filters || { region: 'all', timeRange: 'weekly' };

    const [overview, metrics] = yield all([
      call(api.get, ApiEndpoints.DASHBOARD_OVERVIEW, {
        params: { 
          region: filters.region,
          timeRange: filters.timeRange 
        }
      }),
      call(api.get, ApiEndpoints.DASHBOARD_METRICS, {
        params: { 
          region: filters.region,
          timeRange: filters.timeRange 
        }
      })
    ]);

    console.log("Overview Data", overview);

    const dashboardData = {
      salesTrends: overview.data.data.salesTrends || {
        daily: [],
        weekly: [],
        monthly: [],
        summary: {
          totalRevenue: 0,
          totalProfit: 0,
          totalOrders: 0,
          growth: { revenue: 0, orders: 0 }
        }
      },
      customerGrowth: overview.data.data.customerGrowth || [],
      recentActivities: overview.data.data.recentActivities || [],
      productPopular: overview.data.data.popularProducts || [],
      metrics: metrics.data.data || {},
    };
    console.log("Dashboard Data", dashboardData);

    yield put(fetch_dashboard_success(dashboardData));
  } catch (error) {
    console.log("Error fetching dashboard data", error);
    const errorMessage =
      error.response?.data?.error || "Failed to fetch dashboard data";
    toast.error(errorMessage);
    yield put(fetch_dashboard_error(errorMessage));
  }
}

function* fetchSalesMetricsSaga({ payload }) {
  try {
    const { timeRange } = payload;
    const response = yield call(api.get, ApiEndpoints.DASHBOARD_METRICS, {
      params: { timeRange },
    });
    yield put(fetch_sales_metrics_success(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch sales metrics";
    toast.error(errorMessage);
    yield put(fetch_sales_metrics_error(errorMessage));
  }
}

function* fetchSalesReportSaga({ payload }) {
  try {
    const response = yield call(api.get, ApiEndpoints.SALES_REPORT, {
      params: payload,
    });
    yield put(fetch_sales_report_success(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch sales report";
    toast.error(errorMessage);
    yield put(fetch_sales_report_error(errorMessage));
  }
}

function* dashboardSagas() {
  yield all([
    takeLatest(fetch_dashboard_data.type, fetchDashboardDataSaga),
    takeLatest(fetch_sales_metrics.type, fetchSalesMetricsSaga),
    takeLatest(fetch_sales_report.type, fetchSalesReportSaga),
  ]);
}

export default dashboardSagas;
