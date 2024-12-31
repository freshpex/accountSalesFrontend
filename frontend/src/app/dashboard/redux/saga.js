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
import toast from "react-hot-toast";

function* fetchDashboardDataSaga() {
  try {
    const [overview, metrics] = yield all([
      call(api.get, ApiEndpoints.DASHBOARD_OVERVIEW),
      call(api.get, ApiEndpoints.DASHBOARD_METRICS)
    ]);

    yield put(fetch_dashboard_success({
      ...overview.data,
      metrics: metrics.data
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch dashboard data";
    toast.error(errorMessage);
    yield put(fetch_dashboard_error(errorMessage));
  }
}

function* fetchSalesMetricsSaga({ payload }) {
  try {
    const { timeRange } = payload;
    const response = yield call(api.get, ApiEndpoints.DASHBOARD_METRICS, {
      params: { timeRange }
    });
    yield put(fetch_sales_metrics_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch sales metrics";
    toast.error(errorMessage);
    yield put(fetch_sales_metrics_error(errorMessage));
  }
}

function* dashboardSagas() {
  yield takeLatest(fetch_dashboard_data.type, fetchDashboardDataSaga);
  yield takeLatest(fetch_sales_metrics.type, fetchSalesMetricsSaga);
}

export default dashboardSagas;
