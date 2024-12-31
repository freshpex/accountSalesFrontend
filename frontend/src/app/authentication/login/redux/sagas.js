import { put, takeLatest, call } from "@redux-saga/core/effects";
import { login_error, login_success, login_user } from "./reducer";
import api from "../../../../services/DataService";
import toast from "react-hot-toast";
import { setWithExpiry } from "../../../../utils/store";

function* loginSaga({ payload }) {
  try {
    const requestRes = yield call(api.post, `/api/v1/user/signin`, payload);
    const responseData = requestRes.data;
    setWithExpiry("x-access-token", responseData.data.userToken);
    yield put({
      type: login_success.type,
      payload: responseData.data,
    });

    const result = responseData.data;
    setWithExpiry("email", result.email);

    if (result.current_role === "admin") {
      setTimeout(() => {
        window.location.href = "/adminDashboard";
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      toast.error("Invalid email or password");
    } else {
      toast.error(error?.response?.data?.message);
    }
    yield put({
      type: login_error.type,
    });
  }
}

function* loginSagas() {
  yield takeLatest(login_user.type, loginSaga);
}

export default loginSagas;
