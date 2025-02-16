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
  fetch_transaction_products_error,
  fetch_single_product,
  fetch_single_product_success,
  fetch_single_product_error,
  initiate_purchase,
  initiate_purchase_success,
  initiate_purchase_error,
  request_escrow,
  request_escrow_success,
  request_escrow_error,
  set_purchase_status,
  set_escrow_status,
  fetch_product_credentials,
  fetch_product_credentials_success,
  fetch_product_credentials_error,
  fetch_purchased_credentials,
  fetch_purchased_credentials_success,
  fetch_purchased_credentials_error,
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProductsSaga({ payload }) {
  try {
    const filters = yield select((state) => state.product.filters);
    const tableSettings = yield select((state) => state.product.tableSettings);

    const params = {
      ...filters,
      ...payload,
      type: payload?.platform || filters.type,
      sort: tableSettings.sortBy
        ? `${tableSettings.sortOrder === "desc" ? "-" : ""}${tableSettings.sortBy}`
        : undefined,
      page: payload?.page || tableSettings.currentPage,
      limit: tableSettings.pageSize,
    };

    if (!params.type) {
      delete params.type;
    }

    const response = yield call(api.get, ApiEndpoints.PRODUCTS, { params });

    const responseData = {
      items:
        response.data.data?.items ||
        response.data.items ||
        (Array.isArray(response.data) ? response.data : []),
      stats: response.data.stats ||
        response.data.data?.stats || {
          instagram: 0,
          facebook: 0,
          twitter: 0,
          whatsapp: 0,
          total: 0,
        },
      meta: response.data.meta ||
        response.data.data?.meta || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
        },
    };

    if (responseData.items && Array.isArray(responseData.items)) {
      responseData.items = responseData.items.map((item) => ({
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
        images: item.images || [],
      }));
    }

    yield put(fetch_products_success(responseData));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch products";
    console.log(errorMessage);
    yield put(fetch_products_error(errorMessage));
  }
}

function* fetchProductsTransactionSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.PRODUCTS);
    yield put(fetch_products_transaction_success(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch products";
    console.log(errorMessage);
    yield put(fetch_products_transaction_error(errorMessage));
  }
}

function* fetchTransactionProductsSaga() {
  try {
    yield delay(1000);

    const response = yield call(api.get, `${ApiEndpoints.PRODUCTS}/available`);
    const products = response.data?.data || [];

    if (!Array.isArray(products)) {
      throw new Error("Invalid products data received");
    }

    yield put(fetch_transaction_products_success(products));
  } catch (error) {
    yield put(fetch_transaction_products_error(error.message));
  }
}

function* fetchSingleProductSaga({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `${ApiEndpoints.PRODUCTS}/${id}`);

    const productData = {
      ...response.data.data,
    };

    yield put(fetch_single_product_success(productData));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log(errorMessage);
    yield put(fetch_single_product_error(errorMessage));
  }
}

function* initiatePurchaseSaga({ payload }) {
  try {
    yield put(set_purchase_status("pending"));
    const response = yield call(api.post, `${ApiEndpoints.PURCHASES}`, payload);

    yield put(initiate_purchase_success());
    yield put(set_purchase_status("success"));
    toast.success("Purchase initiated successfully");

    return { success: true, paymentUrl: response.data.paymentUrl };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(initiate_purchase_error(errorMessage));
    yield put(set_purchase_status("failed"));
    console.log(errorMessage);
    return { success: false };
  }
}

function* requestEscrowSaga({ payload }) {
  try {
    yield put(set_escrow_status("pending"));

    const response = yield call(api.post, ApiEndpoints.TRANSACTION_ESCROW, {
      productId: payload.productId,
      type: "product_purchase",
    });

    if (response.data.success && response.data.escrowId) {
      yield put(request_escrow_success(response.data));
      yield put(set_escrow_status("success"));
      toast.success("Escrow request created successfully");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Escrow request error:", error);
    const errorMessage = error.response?.data?.message || error.message;
    yield put(request_escrow_error(errorMessage));
    yield put(set_escrow_status("failed"));
    toast.error(errorMessage || "Failed to create escrow request");
  }
}

function* addProductSaga({ payload }) {
  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value);
      }
    });

    // Handle images
    if (Array.isArray(payload.images)) {
      payload.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    const response = yield call(api.post, ApiEndpoints.PRODUCTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
    const errorMessage =
      error.response?.data?.error || error.message || "Failed to add product";
    console.log(errorMessage);
    yield put(add_product_error(errorMessage));
  }
}

function* updateProductSaga({ payload }) {
  try {
    const { id, data } = payload;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images" && Array.isArray(data[key])) {
        data[key].forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = yield call(
      api.put,
      `${ApiEndpoints.PRODUCTS}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    const updatedProduct = {
      ...response.data,
    };

    yield put(update_product_success(updatedProduct));
    toast.success("Product updated successfully");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to update product";
    console.log(errorMessage);
    yield put(update_product_error(errorMessage));
  }
}

function* deleteProductSaga({ payload }) {
  try {
    yield call(api.delete, `${ApiEndpoints.PRODUCTS}/${payload}`);
    yield put(delete_product_success(payload));
    toast.success("Product deleted successfully");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to delete product";
    console.log(errorMessage);
    yield put(delete_product_error(errorMessage));
  }
}

function* fetchProductCredentialsSaga({ payload }) {
  try {
    const { productId } = payload;
    const response = yield call(
      api.get,
      `/api/v1/products/transaction/${productId}/credentials`,
    );

    if (response.data.success) {
      yield put(fetch_product_credentials_success(response.data.data));
    } else {
      throw new Error(response.data.error || "Failed to fetch credentials");
    }
  } catch (error) {
    yield put(
      fetch_product_credentials_error(
        error.response?.data?.error || error.message,
      ),
    );
  }
}

function* fetchPurchasedCredentialsSaga({ payload }) {
  try {
    const { transactionId } = payload;
    const response = yield call(
      api.get,
      `/api/v1/products/transaction/${transactionId}/credentials`,
    );

    if (response.data.success) {
      yield put(fetch_purchased_credentials_success(response.data.data));
    } else {
      throw new Error(response.data.error || "Failed to fetch credentials");
    }
  } catch (error) {
    yield put(
      fetch_purchased_credentials_error(
        error.response?.data?.error || error.message,
      ),
    );
    toast.error("Failed to fetch account credentials");
  }
}

function* productSagas() {
  yield takeLatest(fetch_products.type, fetchProductsSaga);
  yield takeLatest(
    fetch_products_transaction.type,
    fetchProductsTransactionSaga,
  );
  yield takeLatest(
    fetch_transaction_products.type,
    fetchTransactionProductsSaga,
  );
  yield takeLatest(fetch_single_product.type, fetchSingleProductSaga);
  yield takeLatest(initiate_purchase.type, initiatePurchaseSaga);
  yield takeLatest(request_escrow.type, requestEscrowSaga);
  yield takeLatest(add_product.type, addProductSaga);
  yield takeLatest(update_product.type, updateProductSaga);
  yield takeLatest(delete_product.type, deleteProductSaga);
  yield takeLatest(fetch_product_credentials.type, fetchProductCredentialsSaga);
  yield takeLatest(
    fetch_purchased_credentials.type,
    fetchPurchasedCredentialsSaga,
  );
}

export default productSagas;
