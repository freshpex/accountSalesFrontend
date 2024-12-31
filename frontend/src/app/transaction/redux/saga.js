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

    yield put(fetch_transactions_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch transactions";
    toast.error(errorMessage);
    yield put(fetch_transactions_error(errorMessage));
  }
}

function* addTransactionSaga({ payload }) {
  try {
    const response = yield call(api.post, ApiEndpoints.TRANSACTIONS, payload);
    yield put(add_transaction_success(response.data));
    toast.success("Transaction created successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to create transaction";
    toast.error(errorMessage);
    yield put(add_transaction_error(errorMessage));
  }
}

function* updateTransactionSaga({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(api.put, `${ApiEndpoints.TRANSACTIONS}/${id}`, data);
    yield put(update_transaction_success(response.data));
    toast.success("Transaction updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update transaction";
    toast.error(errorMessage);
    yield put(update_transaction_error(errorMessage));
  }
}

function* deleteTransactionSaga({ payload }) {
  try {
    yield call(api.delete, `${ApiEndpoints.TRANSACTIONS}/${payload}`);
    yield put(delete_transaction_success(payload));
    toast.success("Transaction deleted successfully");
  } catch (error) {
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
