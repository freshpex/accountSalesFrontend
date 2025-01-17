import { put, takeLatest, call } from "@redux-saga/core/effects";
import { login_error, login_success, login_user } from "./reducer";
import api from "../../../../services/DataService";
import toast from "react-hot-toast";
import { setWithExpiry } from "../../../../utils/store";

function* loginSaga({ payload }) {
  try {
    const response = yield call(api.post, `/api/v1/user/signin`, payload);
    
    if (response.data.success) {
      const { data } = response.data;
      
      
      if (!data) {
        throw new Error('Invalid response format from server');
      }

      setWithExpiry("x-access-token", `Bearer ${data.userToken}`);
      setWithExpiry("email", data.user.email);
      
      
      yield put(login_success(data));
      
      toast.success('Login successful!');

      setTimeout(() => {
        window.location.href = data.user.role === "admin" ? "/dashboard" : "/userdashboard";
      }, 1000);
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.message);
    yield put(login_error(error.message));
  }
}

function* loginSagas() {
  yield takeLatest(login_user.type, loginSaga);
}

export default loginSagas;
