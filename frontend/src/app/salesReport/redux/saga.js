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

    let finalStart = startDate ? new Date(startDate) : null;
    let finalEnd = endDate ? new Date(endDate) : null;

    // Only fall back to dateRange if start/end are not provided
    if (!finalStart && !finalEnd && dateRange === 'month') {
      finalStart = new Date(2023, 0, 1);
      finalEnd = new Date(2023, 0, 31);
    }

    const params = {
      dateRange,
      startDate: finalStart ? finalStart.toISOString() : undefined,
      endDate: finalEnd ? finalEnd.toISOString() : undefined,
      region: region || 'all',
    };

    console.log('Fetching sales report with params:', params);

    const response = yield call(api.get, `${ApiEndpoints.SALES_REPORT}/report`, { params });
    console.log('Sales report response:', response);

    if (!response.data) {
      throw new Error('No sales report found.');
    }

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
    console.error('Error fetching sales report:', error); 
    const errorMessage = error.message || "Failed to fetch sales report";
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
