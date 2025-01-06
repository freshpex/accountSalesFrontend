import { put, takeLatest, call, select, delay } from "redux-saga/effects";
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
  delete_product_error,
  fetch_products_transaction,
  fetch_products_transaction_success,
  fetch_products_transaction_error,
  fetch_transaction_products,
  fetch_transaction_products_success,
  fetch_transaction_products_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProductsSaga({ payload }) {
  try {
    const filters = yield select(state => state.product.filters);
    const tableSettings = yield select(state => state.product.tableSettings);

    const params = {
      ...filters,
      ...payload,
      type: payload?.platform || filters.type,
      sort: tableSettings.sortBy ? `${tableSettings.sortOrder === 'desc' ? '-' : ''}${tableSettings.sortBy}` : undefined,
      page: payload?.page || tableSettings.currentPage,
      limit: tableSettings.pageSize
    };

    const response = yield call(api.get, ApiEndpoints.PRODUCTS, { params });
    console.log('Raw API Response:', response);

    const responseData = {
      items: response.data.data?.items || 
             response.data.items || 
             (Array.isArray(response.data) ? response.data : []),
      stats: response.data.stats || response.data.data?.stats || {
        instagram: 0,
        facebook: 0,
        twitter: 0,
        whatsapp: 0,
        total: 0
      },
      meta: response.data.meta || response.data.data?.meta || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
      }
    };

    if (responseData.items && Array.isArray(responseData.items)) {
      responseData.items = responseData.items.map(item => ({
        id: item._id || item.id,
        type: item.type?.toLowerCase(),
        username: item.username,
        status: item.status,
        followers: item.followers,
        engagement: item.engagement,
        age: item.age,
        price: item.price,
        region: item.region,
        about: item.about,
        images: item.images || []
      }));
    }

    console.log('Transformed response data:', responseData);
    yield put(fetch_products_success(responseData));
  } catch (error) {
    console.error('Product fetch error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch products';
    toast.error(errorMessage);
    yield put(fetch_products_error(errorMessage));
  }
}

function* fetchProductsTransactionSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.PRODUCTS);
    yield put(fetch_products_transaction_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to fetch products';
    toast.error(`Product fetch error: ${errorMessage}`);
    yield put(fetch_products_transaction_error(errorMessage));
  }
}

function* fetchTransactionProductsSaga() {
  try {
    // Add delay to prevent rate limiting
    yield delay(1000);

    console.log('Fetching available products...');
    const response = yield call(api.get, `${ApiEndpoints.PRODUCTS}/available`);
    console.log('Available products response:', response);

    const products = response.data?.data || [];
    
    if (!Array.isArray(products)) {
      throw new Error('Invalid products data received');
    }

    yield put(fetch_transaction_products_success(products));
  } catch (error) {
    console.error('Error fetching available products:', error);
    yield put(fetch_transaction_products_error(error.message));
  }
}

function* addProductSaga({ payload }) {
  try {
    const formData = new FormData();
    
    if (!payload) {
      throw new Error('No product data provided');
    }

    // Add basic fields
    Object.entries(payload).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value);
      }
    });

    // Handle images
    if (Array.isArray(payload.images)) {
      payload.images.forEach(image => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }

    console.log('Sending product data:', Object.fromEntries(formData.entries()));

    const response = yield call(api.post, ApiEndpoints.PRODUCTS, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
      }
    });

    const transformedData = response.data?.data || response.data || {};
    
    const productData = {
      ...transformedData,
      id: transformedData._id || transformedData.id,
      type: transformedData.type?.toLowerCase(),
    };

    yield put(add_product_success(productData));
    toast.success("Product added successfully");
  } catch (error) {
    console.error('Add product error:', error.response || error);
    const errorMessage = error.response?.data?.error || error.message || "Failed to add product";
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
  yield takeLatest(fetch_products_transaction.type, fetchProductsTransactionSaga);
  yield takeLatest(fetch_transaction_products.type, fetchTransactionProductsSaga);
  yield takeLatest(add_product.type, addProductSaga);
  yield takeLatest(update_product.type, updateProductSaga);
  yield takeLatest(delete_product.type, deleteProductSaga);
}

export default productSagas;
