import { put, takeLatest, call } from "redux-saga/effects";
import {
  fetch_sales_report,
  fetch_sales_report_success,
  fetch_sales_report_error,
  fetch_regional_data,
  fetch_regional_data_success
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";

function* fetchSalesReportSaga({ payload }) {
  try {
    const { dateRange, startDate, endDate, region } = payload;
    const response = yield call(api.get, ApiEndpoints.SALES_REPORT, {
      params: { dateRange, startDate, endDate, region }
    });
    yield put(fetch_sales_report_success(response.data));
  } catch (error) {
    yield put(fetch_sales_report_error(error.response?.data?.error || "Failed to fetch sales report"));
  }
}

function* fetchRegionalDataSaga() {
  try {
    const response = yield call(api.get, `${ApiEndpoints.SALES_REPORT}/regional`);
    yield put(fetch_regional_data_success(response.data));
  } catch (error) {
    yield put(fetch_sales_report_error(error.response?.data?.error || "Failed to fetch regional data"));
  }
}

function* salesReportSagas() {
  yield takeLatest(fetch_sales_report.type, fetchSalesReportSaga);
  yield takeLatest(fetch_regional_data.type, fetchRegionalDataSaga);
}

export default salesReportSagas;
