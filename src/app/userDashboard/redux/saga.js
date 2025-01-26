import { takeLatest, call, put, all, select } from "redux-saga/effects";
import api from "../../../services/DataService";
import { ApiEndpoints, DASHBOARD_TYPES } from "../../../store/types";
import {
  fetch_overview_success,
  fetch_overview_error,
  fetch_metrics_success,
  fetch_metrics_error,
  fetch_spending_chart_success,
  fetch_spending_chart_error,
  fetch_recent_activity_success,
  fetch_recent_activity_error,
} from "./reducer";
import toast from "react-hot-toast";

function* fetchUserDashboardOverview() {
  try {
    const token = yield select(
      (state) => state.auth?.token || state.login?.token,
    );
    const response = yield call(api.get, ApiEndpoints.overview, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put(fetch_overview_success(response.data.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch overview";
    toast.error(errorMessage);
    yield put(fetch_overview_error(errorMessage));
  }
}

function* fetchUserDashboardMetrics() {
  try {
    const token = yield select(
      (state) => state.auth?.token || state.login?.token,
    );
    const response = yield call(api.get, ApiEndpoints.metrics, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put(fetch_metrics_success(response.data.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch metrics";
    toast.error(errorMessage);
    yield put(fetch_metrics_error(errorMessage));
  }
}

function* fetchUserSpendingChart() {
  try {
    const token = yield select(
      (state) => state.auth?.token || state.login?.token,
    );
    const response = yield call(api.get, ApiEndpoints.spendingChart, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put(fetch_spending_chart_success(response.data.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch spending chart";
    toast.error(errorMessage);
    yield put(fetch_spending_chart_error(errorMessage));
  }
}

function* fetchUserRecentActivity() {
  try {
    const token = yield select(
      (state) => state.auth?.token || state.login?.token,
    );
    const response = yield call(api.get, ApiEndpoints.recentActivity, {
      headers: { Authorization: `Bearer ${token}` },
    });
    yield put(fetch_recent_activity_success(response.data.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch recent activity";
    toast.error(errorMessage);
    yield put(fetch_recent_activity_error(errorMessage));
  }
}

function* updateUserLastSeen(action) {
  try {
    const token = yield select(
      (state) => state.auth?.token || state.login?.token,
    );
    if (!token) {
      console.warn("No auth token found, skipping last seen update");
      return;
    }

    yield call(api.post, ApiEndpoints.updateLastSeen, action.payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    yield put({
      type: DASHBOARD_TYPES.UPDATE_LAST_SEEN_SUCCESS,
    });
  } catch (error) {
    console.warn("Failed to update last seen:", error);
  }
}

export default function* userDashboardSaga() {
  yield all([
    takeLatest("userDashboard/fetch_overview", fetchUserDashboardOverview),
    takeLatest("userDashboard/fetch_metrics", fetchUserDashboardMetrics),
    takeLatest("userDashboard/fetch_spending_chart", fetchUserSpendingChart),
    takeLatest("userDashboard/fetch_recent_activity", fetchUserRecentActivity),
    takeLatest("userDashboard/update_last_seen", updateUserLastSeen),
  ]);
}
