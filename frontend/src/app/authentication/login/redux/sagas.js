import { put, takeLatest, call } from "@redux-saga/core/effects";
import { login_error, login_success, login_user } from "./reducer";
import api from "../../../../services/DataService";
import toast from "react-hot-toast";
import { setWithExpiry } from "../../../../utils/store";

function* loginSaga({ payload }) {
  try {
    console.log('Login request payload:', payload);

    const requestRes = yield call(api.post, `/api/v1/user/signin`, payload);
    console.log('Login response:', requestRes.data);

    const responseData = requestRes.data;
    setWithExpiry("x-access-token", `Bearer ${responseData.data.userToken}`);
    yield put({
      type: login_success.type,
      payload: responseData.data,
    });

    const result = responseData.data;
    setWithExpiry("email", result.user.email);

    if (result.user.role === "admin") {
      setTimeout(() => {
        window.location.href = "/adminDashboard";
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    
    const errorMessage = error.response?.data?.error || 'An error occurred during login';
    toast.error(errorMessage);
    
    yield put({
      type: login_error.type,
      payload: errorMessage
    });
  }
}

function* loginSagas() {
  yield takeLatest(login_user.type, loginSaga);
}

export default loginSagas;
