import { put, takeLatest, call, delay } from "@redux-saga/core/effects";
import {
  forgot_password,
  forgot_password_error,
  forgot_password_success,
  change_password,
  change_password_success,
  change_password_error,
} from "./reducer";
import api from "../../../../services/DataService";
import toast from "react-hot-toast";

function* forgotPasswordSaga({ payload }) {
  try {
    const response = yield call(
      api.patch,
      `/api/v1/user/forgot-password`,
      payload,
    );
    yield put({
      type: forgot_password_success.type,
      payload: response.data,
    });
    window.location.href = "/email-check";
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || "Failed to send reset link";
    toast.error(errorMessage);
    yield put({
      type: forgot_password_error.type,
      payload: errorMessage,
    });
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(
      api.patch,
      `/api/v1/user/reset-password/${id}`,
      data,
    );
    yield put({
      type: change_password_success.type,
      payload: response.data,
    });
    toast.success("Password changed successfully");
    yield delay(1000);
    window.location.href = "/login";
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || "Failed to reset password";
    toast.error(errorMessage);
    yield put({
      type: change_password_error.type,
      payload: errorMessage,
    });
  }
}

function* authSagas() {
  yield takeLatest(forgot_password.type, forgotPasswordSaga);
  yield takeLatest(change_password.type, resetPasswordSaga);
}

export default authSagas;
