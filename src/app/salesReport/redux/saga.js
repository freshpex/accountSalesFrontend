import { put, takeLatest, call } from "redux-saga/effects";
import { fetch_sales_report, fetch_sales_report_success, fetch_sales_report_error } from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchSalesReportSaga({ payload }) {
  try {
    const { dateRange, region } = payload;
    const params = { dateRange, region };

    const response = yield call(api.get, ApiEndpoints.SALES_REPORT, { params });

    if (!response.data || !response.data.data) {
      throw new Error('No data received from backend');
    }

    const rawData = response.data.data;
    const transformedData = {
      summary: {
        totalRevenue: Number(rawData.summary.totalRevenue || 0),
        totalTransactions: Number(rawData.summary.totalTransactions || 0),
        totalProducts: Number(rawData.summary.totalProducts || 0),
        currentTarget: Number(rawData.summary.currentTarget || 0),
        totalTarget: Number(rawData.summary.totalTarget || 0),
        revenueGrowth: Number(rawData.summary.revenueGrowth || 0),
        customerGrowth: Number(rawData.summary.customerGrowth || 0),
        productGrowth: Number(rawData.summary.productGrowth || 0)
      },
      monthlySales: rawData.monthlySales.map(sale => ({
        month: sale.month,
        revenue: Number(sale.revenue),
        itemValue: Number(sale.itemValue)
      })),
      regionalData: Array.isArray(rawData.regionalData) ? rawData.regionalData.map(region => ({
        region: region.region,
        growth: Number(region.growth || 0)
      })) : [],
      popularProducts: Array.isArray(rawData.popularProducts) ? rawData.popularProducts.map(product => ({
        id: product.productId,
        units: Number(product.units || 0),
        revenue: Number(product.revenue || 0),
        growth: Number(product.growth || 0)
      })) : []
    };

    yield put(fetch_sales_report_success(transformedData));
    
  } catch (error) {
    console.error('Error in fetchSalesReportSaga:', error);
    toast.error(error.message || "Failed to fetch sales report");
    yield put(fetch_sales_report_error(error.message));
  }
}

export default function* salesReportSagas() {
  yield takeLatest(fetch_sales_report.type, fetchSalesReportSaga);
}
