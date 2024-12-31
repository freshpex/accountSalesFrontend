import { put, takeLatest, call, all } from "redux-saga/effects";
import {
  fetch_dashboard_data,
  fetch_dashboard_success,
  fetch_dashboard_error,
  fetch_sales_metrics,
  fetch_sales_metrics_success,
  fetch_sales_metrics_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";

function* fetchDashboardDataSaga() {
  try {
    const [
      salesResponse,
      customerResponse,
      activityResponse,
      productsResponse
    ] = yield all([
      call(api.get, `${ApiEndpoints.SALES_REPORT}/overview`),
      call(api.get, `${ApiEndpoints.CUSTOMERS}/growth`),
      call(api.get, `${ApiEndpoints.SALES_REPORT}/activities`),
      call(api.get, `${ApiEndpoints.PRODUCTS}/popular`)
    ]);

    yield put(fetch_dashboard_success({
      salesTrends: salesResponse.data,
      customerGrowth: customerResponse.data,
      recentActivities: activityResponse.data,
      productPopular: productsResponse.data
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch dashboard data";
    yield put(fetch_dashboard_error(errorMessage));
  }
}

function* fetchSalesMetricsSaga({ payload }) {
  try {
    const { timeRange } = payload || {};
    const response = yield call(
      api.get,
      `${ApiEndpoints.SALES_REPORT}/metrics`,
      { params: { timeRange } }
    );
    yield put(fetch_sales_metrics_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch sales metrics";
    yield put(fetch_sales_metrics_error(errorMessage));
  }
}

function* dashboardSagas() {
  yield takeLatest(fetch_dashboard_data.type, fetchDashboardDataSaga);
  yield takeLatest(fetch_sales_metrics.type, fetchSalesMetricsSaga);
}

export default dashboardSagas;
