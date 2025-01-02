import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  fetch_products,
  fetch_products_success,
  fetch_products_error,
  add_product,
  add_product_success,
  add_product_error,
  update_product,
  update_product_success,
  update_product_error,
  delete_product,
  delete_product_success,
  delete_product_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProductsSaga({ payload }) {
  try {
    // Get current filters from state
    const filters = yield select(state => state.product.filters);
    const tableSettings = yield select(state => state.product.tableSettings);

    const params = {
      ...filters,
      ...payload,
      type: payload?.platform || filters.type, // Add type/platform filter
      sort: tableSettings.sortBy ? `${tableSettings.sortOrder === 'desc' ? '-' : ''}${tableSettings.sortBy}` : undefined,
      page: payload?.page || tableSettings.currentPage,
      limit: tableSettings.pageSize
    };

    console.log('Fetching products with params:', params); // Debug log

    const response = yield call(api.get, ApiEndpoints.PRODUCTS, { params });
    
    if (response.data.items) {
      yield put(fetch_products_success(response.data));
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Product fetch error:', error);
    const errorMessage = error.response?.data?.error || "Failed to fetch products";
    toast.error(errorMessage);
    yield put(fetch_products_error(errorMessage));
  }
}

function* addProductSaga({ payload }) {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'images') {
        payload[key].forEach(image => formData.append('images', image));
      } else {
        formData.append(key, payload[key]);
      }
    });

    const response = yield call(api.post, ApiEndpoints.PRODUCTS, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(add_product_success(response.data));
    toast.success("Product added successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to add product";
    toast.error(errorMessage);
    yield put(add_product_error(errorMessage));
  }
}

function* updateProductSaga({ payload }) {
  try {
    const { id, data } = payload;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'images' && Array.isArray(data[key])) {
        data[key].forEach(image => formData.append('images', image));
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = yield call(api.put, `${ApiEndpoints.PRODUCTS}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(update_product_success(response.data));
    toast.success("Product updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update product";
    toast.error(errorMessage);
    yield put(update_product_error(errorMessage));
  }
}

function* deleteProductSaga({ payload }) {
  try {
    yield call(api.delete, `${ApiEndpoints.PRODUCTS}/${payload}`);
    yield put(delete_product_success(payload));
    toast.success("Product deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to delete product";
    toast.error(errorMessage);
    yield put(delete_product_error(errorMessage));
  }
}

function* productSagas() {
  yield takeLatest(fetch_products.type, fetchProductsSaga);
  yield takeLatest(add_product.type, addProductSaga);
  yield takeLatest(update_product.type, updateProductSaga);
  yield takeLatest(delete_product.type, deleteProductSaga);
}

export default productSagas;
