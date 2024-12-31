import { put, takeLatest, call } from "redux-saga/effects";
import {
  fetch_customers,
  fetch_customers_success,
  fetch_customers_error,
  fetch_customer_activity,
  fetch_customer_activity_success,
  fetch_customer_activity_error,
  add_customer,
  add_customer_success,
  add_customer_error,
  update_customer_segment
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchCustomersSaga({ payload }) {
  try {
    const { segment, status, sort, page = 1, limit = 10 } = payload || {};
    const params = { segment, status, sort, page, limit };
    const response = yield call(api.get, ApiEndpoints.CUSTOMERS, { params });
    yield put(fetch_customers_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch customers";
    toast.error(errorMessage);
    yield put(fetch_customers_error(errorMessage));
    yield takeLatest(update_customer_segment.type, updateCustomerSegmentSaga);
  }
}

function* fetchCustomerActivitySaga({ payload }) {
  try {
    const response = yield call(api.get, `${ApiEndpoints.CUSTOMERS}/${payload}/activity`);
    yield put(fetch_customer_activity_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch customer activity";
    yield put(fetch_customer_activity_error(errorMessage));
  }
}

function* addCustomerSaga({ payload }) {
  try {
    const response = yield call(api.post, ApiEndpoints.CUSTOMERS, payload);
    yield put(add_customer_success(response.data));
    toast.success("Customer added successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to add customer";
    toast.error(errorMessage);
    yield put(add_customer_error(errorMessage));
  }
}

function* updateCustomerSegmentSaga({ payload }) {
  try {
    const { customerId, segment } = payload;
    yield call(api.patch, `${ApiEndpoints.CUSTOMERS}/${customerId}/segment`, { segment });
    toast.success("Customer segment updated successfully");
  } catch {
    toast.error("Failed to update customer segment");
  }
}

function* customerSagas() {
  yield takeLatest(fetch_customers.type, fetchCustomersSaga);
  yield takeLatest(fetch_customer_activity.type, fetchCustomerActivitySaga);
  yield takeLatest(add_customer.type, addCustomerSaga);
}

export default customerSagas;
