import { put, takeLatest, call } from "@redux-saga/core/effects";
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
    const requestRes = yield call(
      api.patch,
      `/api/v1/user/forgot-password`,
      payload,
    );
    const responseData = requestRes.data;
    const response = responseData.data;
    yield put({
      type: forgot_password_success.type,
      payload: response,
    });
    window.location.href = "/email_check";
  } catch (error) {
    toast.error(error?.response?.data?.error);

    yield put({
      type: forgot_password_error.type,
    });
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    const { id, data } = payload;
    const requestRes = yield call(
      api.patch,
      `/api/v1/user/reset-password/${id}`,
      data,
    );
    const responseData = requestRes.data;
    const response = responseData.data;
    yield put({
      type: change_password_success.type,
      payload: response,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } catch (error) {
    toast.error(error.response.data.error);
    yield put({
      type: change_password_error.type,
    });
  }
}

function* authSagas() {
  yield takeLatest(forgot_password.type, forgotPasswordSaga);
  yield takeLatest(change_password.type, resetPasswordSaga);
}

export default authSagas;
