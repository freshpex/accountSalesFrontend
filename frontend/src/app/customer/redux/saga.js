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
  update_customer_segment,
  search_customers,
  search_customers_success,
  search_customers_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchCustomersSaga({ payload }) {
  try {
    const { segment, status, sort = '-createdAt', page = 1, limit = 10 } = payload || {};
    const params = { 
      segment, 
      status, 
      sort, 
      page, 
      limit,
      role: 'user' // Ensure this is set to fetch non-admin users
    };
    
    console.log('Fetching customers with params:', params);
    const response = yield call(api.get, ApiEndpoints.CUSTOMERS, { params });
    console.log('Customers response:', response.data);
    
    if (response.data.success) {
      const transformedData = {
        customers: response.data.data.items,
        meta: response.data.data.meta,
        metrics: response.data.data.metrics,
        segments: response.data.data.segments
      };
      yield put(fetch_customers_success(transformedData));
    } else {
      throw new Error(response.data.error || 'Failed to fetch customers');
    }
  } catch (error) {
    console.error('Fetch customers error:', error);
    const errorMessage = error.response?.data?.error || error.message;
    toast.error(errorMessage);
    yield put(fetch_customers_error(errorMessage));
  }
}

function* fetchCustomerActivitySaga({ payload }) {
  try {
    if (!payload) {
      console.warn('No customer ID provided for activity fetch');
      return;
    }
    
    const response = yield call(api.get, `${ApiEndpoints.CUSTOMERS}/${payload}/activity`);
    yield put(fetch_customer_activity_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch customer activity";
    yield put(fetch_customer_activity_error(errorMessage));
  }
}

function* addCustomerSaga({ payload }) {
  try {
    const response = yield call(api.post, ApiEndpoints.REGISTER, {
      ...payload,
      role: 'user'
    });

    if (response.data.success) {
      yield put(add_customer_success(response.data.data));
      toast.success('Customer added successfully');
      yield put(fetch_customers());
    } else {
      throw new Error(response.data.error || 'Failed to add customer');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    toast.error(errorMessage);
    yield put(add_customer_error(errorMessage));
  }
}

function* updateCustomerSegmentSaga({ payload }) {
  try {
    const { customerId, newSegment } = payload;
    
    // Call API to update segment
    yield call(
      api.patch, 
      `${ApiEndpoints.CUSTOMERS}/${customerId}/segment`, 
      { segment: newSegment }
    );
    
    // Refresh customer list after update
    yield put(fetch_customers());
    
    toast.success("Customer segment updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update customer segment";
    toast.error(errorMessage);
  }
}

function* searchCustomersSaga({ payload }) {
  try {
    const response = yield call(
      api.get, 
      `${ApiEndpoints.CUSTOMERS}/search`, 
      { params: { query: payload } }
    );
    yield put(search_customers_success(response.data));
  } catch (error) {
    yield put(search_customers_error(error.message));
  }
}

function* customerSagas() {
  yield takeLatest(fetch_customers.type, fetchCustomersSaga);
  yield takeLatest(search_customers.type, searchCustomersSaga);
  yield takeLatest(fetch_customer_activity.type, fetchCustomerActivitySaga);
  yield takeLatest(add_customer.type, addCustomerSaga);
  yield takeLatest(update_customer_segment.type, updateCustomerSegmentSaga);
}

export default customerSagas;
