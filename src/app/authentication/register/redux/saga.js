import { put, takeLatest, call } from "@redux-saga/core/effects";
import {
  register_user,
  register_user_error,
  register_user_success,
  google_auth_start,
  google_auth_success,
  google_auth_error,
} from "./reducer";
import toast from "react-hot-toast";
import api from "../../../../services/DataService";

function* registerSaga({ payload }) {
  try {
    const response = yield call(api.post, "/api/v1/user/signup", payload);
    const responseData = response.data;

    yield put({
      type: register_user_success.type,
      payload: responseData,
    });

    toast.success(responseData.message || "Registration successful!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.body?.email ||
      "Registration failed";

    toast.error(errorMessage);

    yield put({
      type: register_user_error.type,
      payload: errorMessage,
    });
  }
}

function* handleGoogleCallback({ payload }) {
  try {
    yield put(google_auth_start());
    const { token } = payload;

    if (token) {
      const response = yield call(api.get, "/api/v1/user/profile");

      if (response.data.businessName === "Not Set") {
        window.location.href = `/complete-profile?token=${token}`;
      } else {
        yield put(register_user_success(response.data));
        yield put(google_auth_success());
        toast.success("Registration successful!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }
  } catch (error) {
    console.error("Google auth error:", error);
    toast.error("Google authentication failed");
    yield put(google_auth_error(error.message));
  }
}

function* registerSagas() {
  yield takeLatest(register_user.type, registerSaga);
  yield takeLatest("HANDLE_GOOGLE_CALLBACK", handleGoogleCallback);
  yield takeLatest("HANDLE_GOOGLE_REGISTER", handleGoogleCallback);
}

export default registerSagas;
