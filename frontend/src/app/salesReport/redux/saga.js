import { put, takeLatest, call } from "redux-saga/effects";
import {
  fetch_sales_report,
  fetch_sales_report_success,
  fetch_sales_report_error,
  fetch_regional_data,
  fetch_regional_data_success,
  fetch_regional_data_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchSalesReportSaga({ payload }) {
  try {
    const { dateRange, startDate, endDate, region } = payload;
    const response = yield call(api.get, ApiEndpoints.SALES_REPORT, {
      params: { dateRange, startDate, endDate, region }
    });

    // Transform and validate the data
    const transformedData = {
      summary: {
        currentTarget: Number(response.data.summary?.currentTarget || 0),
        totalTarget: Number(response.data.summary?.totalTarget || 0),
        totalRevenue: Number(response.data.summary?.totalRevenue || 0),
        revenueGrowth: Number(response.data.summary?.revenueGrowth || 0),
        totalTransactions: Number(response.data.summary?.totalTransactions || 0),
        transactionGrowth: Number(response.data.summary?.transactionGrowth || 0),
        totalCustomers: Number(response.data.summary?.totalCustomers || 0),
        customerGrowth: Number(response.data.summary?.customerGrowth || 0),
        totalProducts: Number(response.data.summary?.totalProducts || 0),
        productGrowth: Number(response.data.summary?.productGrowth || 0)
      },
      monthlySales: response.data.monthlySales || [],
      regionalData: response.data.regionalData || [],
      popularProducts: response.data.popularProducts || [],
      periodComparison: response.data.periodComparison || { current: {}, previous: {} }
    };

    yield put(fetch_sales_report_success(transformedData));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch sales report";
    toast.error(errorMessage);
    yield put(fetch_sales_report_error(errorMessage));
  }
}

function* fetchRegionalDataSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.REGIONAL_DATA);
    yield put(fetch_regional_data_success(response.data || []));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch regional data";
    toast.error(errorMessage);
    yield put(fetch_regional_data_error(errorMessage));
  }
}

function* salesReportSagas() {
  yield takeLatest(fetch_sales_report.type, fetchSalesReportSaga);
  yield takeLatest(fetch_regional_data.type, fetchRegionalDataSaga);
}

export default salesReportSagas;
