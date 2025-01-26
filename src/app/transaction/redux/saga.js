import { put, takeLatest, call, select } from "redux-saga/effects";
import {
  fetch_transactions,
  fetch_transactions_success,
  fetch_transactions_error,
  add_transaction,
  add_transaction_success,
  add_transaction_error,
  update_transaction,
  update_transaction_success,
  update_transaction_error,
  delete_transaction,
  delete_transaction_success,
  delete_transaction_error,
  fetch_transaction_products,
  fetch_transaction_products_success,
  fetch_transaction_products_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchTransactionsSaga({ payload }) {
  try {
    const state = yield select(state => state.transaction.filters);
    const params = { ...state, ...payload };
    
    const response = yield call(api.get, ApiEndpoints.TRANSACTIONS, { 
      params: {
        ...params,
        status: params.status === 'all' ? undefined : params.status
      }
    });

    // Ensure we handle both possible response structures
    const responseData = response.data?.data || response.data;
    
    const formattedData = {
      items: responseData?.items || [],
      meta: responseData?.meta || { 
        currentPage: Number(params.page || 1),
        totalPages: 1,
        totalItems: responseData?.items?.length || 0
      },
      stats: responseData?.stats || { 
        all: responseData?.items?.length || 0,
        pending: 0,
        completed: 0,
        cancelled: 0
      }
    };

    yield put(fetch_transactions_success(formattedData));
  } catch (error) {
    console.error('Fetch transactions error:', error);
    const errorMessage = error.response?.data?.error || error.message;
    yield put(fetch_transactions_error(errorMessage));
    toast.error(`Failed to fetch transactions: ${errorMessage}`);
  }
}

function* fetchTransactionProductsSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.TRANSACTION_PRODUCTS);
    yield put(fetch_transaction_products_success(response.data));
  } catch (error) {
    yield put(fetch_transaction_products_error(error.message));
  }
}

function* addTransactionSaga({ payload }) {
  try {
    const formattedData = {
      productId: payload.productId,
      amount: Number(payload.amount),
      currency: payload.currency,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentStatus,
      customerDetails: payload.customerDetails,
      metadata: {
        ...payload.metadata,
        customerName: payload.customerDetails.name,
        customerEmail: payload.customerDetails.email
      },
      notes: payload.notes
    };

    const response = yield call(api.post, ApiEndpoints.TRANSACTIONS, formattedData);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    yield put(add_transaction_success(response.data));
    toast.success("Transaction created successfully");
    yield put(fetch_transactions());
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    yield put(add_transaction_error(errorMessage));
    toast.error(errorMessage);
  }
}

function* updateTransactionSaga({ payload }) {
  try {
    const { id, data } = payload;
    
    if (!id) {
      throw new Error('Transaction ID is required for update');
    }

    const response = yield call(
      api.put,
      `${ApiEndpoints.TRANSACTIONS}/${id}`,
      data
    );

    yield put(update_transaction_success(response.data));
    toast.success('Transaction updated successfully');
    yield put(fetch_transactions());
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    toast.error(errorMessage);
    yield put(update_transaction_error(errorMessage));
  }
}

function* deleteTransactionSaga({ payload }) {
  try {
    if (!payload) {
      throw new Error('Transaction ID is required for deletion');
    }

    yield call(api.delete, `${ApiEndpoints.TRANSACTIONS}/${payload}`);
    yield put(delete_transaction_success(payload));
    toast.success("Transaction deleted successfully");
    yield put(fetch_transactions());
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    toast.error(errorMessage);
    yield put(delete_transaction_error(errorMessage));
  }
}

function* transactionSagas() {
  yield takeLatest(fetch_transactions.type, fetchTransactionsSaga);
  yield takeLatest(add_transaction.type, addTransactionSaga);
  yield takeLatest(update_transaction.type, updateTransactionSaga);
  yield takeLatest(delete_transaction.type, deleteTransactionSaga);
  yield takeLatest(fetch_transaction_products.type, fetchTransactionProductsSaga);
}

export default transactionSagas;
