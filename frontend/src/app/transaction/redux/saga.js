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
  delete_transaction_error
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

// Helper function to validate MongoDB ObjectId format
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

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

    console.log('Fetch transactions response:', response);

    const responseData = response.data.data || response.data;
    
    const formattedData = {
      items: Array.isArray(responseData.items) ? responseData.items.map(item => ({
        ...item,
        date: item.date || item.createdAt,
        price: Number(item.price || item.amount || 0),
        customer: item.customer || item.metadata?.customerName || 'N/A',
        productName: item.productName || item.metadata?.productName || 'N/A'
      })) : [],
      meta: responseData.meta || { currentPage: 1, totalPages: 1, totalItems: 0 },
      stats: responseData.stats || { all: 0, shipping: 0, completed: 0, cancelled: 0 }
    };

    yield put(fetch_transactions_success(formattedData));
  } catch (error) {
    console.error('Fetch transactions error:', error);
    const errorMessage = error.response?.data?.error || error.message || "Failed to fetch transactions";
    toast.error(errorMessage);
    yield put(fetch_transactions_error(errorMessage));
  }
}

function* addTransactionSaga({ payload }) {
  try {
    const formattedData = {
      productId: payload.productId,
      amount: Number(payload.amount),
      quantity: Number(payload.quantity || 1),
      status: payload.status.toLowerCase(),
      paymentStatus: payload.paymentStatus.toLowerCase(),
      paymentMethod: payload.paymentMethod,
      notes: payload.notes,
      metadata: {
        productName: payload.metadata.productName,
        customerName: payload.metadata.customerName
      }
    };

    // Validate required fields
    if (!formattedData.productId || !isValidObjectId(formattedData.productId)) {
      throw new Error('Valid Product ID is required');
    }

    const response = yield call(api.post, ApiEndpoints.TRANSACTIONS, formattedData);
    yield put(add_transaction_success(response.data));
    toast.success("Transaction created successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    toast.error(errorMessage);
    yield put(add_transaction_error(errorMessage));
  }
}

function* updateTransactionSaga({ payload }) {
  try {
    const { id, data } = payload;
    
    // Validate required fields
    if (!id) {
      throw new Error('Transaction ID is required for update');
    }

    // Format the data for update
    const formattedData = {
      status: data.status?.toLowerCase(),
      paymentStatus: data.paymentStatus?.toLowerCase(),
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      amount: Number(data.amount),
      metadata: {
        productName: data.metadata?.productName,
        customerName: data.metadata?.customerName
      }
    };

    const response = yield call(
      api.put,
      `${ApiEndpoints.TRANSACTIONS}/${id}`,
      formattedData
    );

    yield put(update_transaction_success(response.data));
    toast.success('Transaction updated successfully');
    
    // Refresh the transactions list
    yield put(fetch_transactions());
  } catch (error) {
    console.error('Update transaction error:', error);
    const errorMessage = error.response?.data?.error || 'Failed to update transaction';
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
    console.error('Delete transaction error:', error);
    const errorMessage = error.response?.data?.error || "Failed to delete transaction";
    toast.error(errorMessage);
    yield put(delete_transaction_error(errorMessage));
  }
}

function* transactionSagas() {
  yield takeLatest(fetch_transactions.type, fetchTransactionsSaga);
  yield takeLatest(add_transaction.type, addTransactionSaga);
  yield takeLatest(update_transaction.type, updateTransactionSaga);
  yield takeLatest(delete_transaction.type, deleteTransactionSaga);
}

export default transactionSagas;
