import { put, takeLatest, call } from "redux-saga/effects";
import { fetch_sales_report, fetch_sales_report_success, fetch_sales_report_error } from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchSalesReportSaga({ payload }) {
  try {
    const { dateRange, startDate, endDate, region } = payload;

    const params = {
      dateRange,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate ? new Date(endDate).toISOString() : undefined,
      region: region || 'all',
    };

    console.log('Fetching sales report with params:', params); // Debug log

    const response = yield call(api.get, ApiEndpoints.SALES_REPORT, { params });
    console.log('Backend response:', response.data); // Debug log

    if (!response.data) {
      throw new Error('No data received from backend');
    }

    // Use the data directly as it's already in the correct format
    yield put(fetch_sales_report_success(response.data));
  } catch (error) {
    console.error('Error fetching sales report:', error);
    toast.error(error.message || "Failed to fetch sales report");
    yield put(fetch_sales_report_error(error.message));
  }
}

export default function* salesReportSagas() {
  yield takeLatest(fetch_sales_report.type, fetchSalesReportSaga);
}
