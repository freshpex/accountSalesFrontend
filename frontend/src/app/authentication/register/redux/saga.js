import { put, takeLatest, call } from "@redux-saga/core/effects";
import {
  register_user,
  register_user_error,
  register_user_success,
} from "./reducer";
import toast from "react-hot-toast";
import api from "../../../../services/DataService";

function* registerSaga({ payload }) {
  try {
    const response = yield call(api.post, '/api/v1/user/signup', payload);
    const responseData = response.data;
    
    yield put({
      type: register_user_success.type,
      payload: responseData
    });

    toast.success(responseData.message || "Registration successful!");

    // Redirect to login after successful registration
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.body?.email ||
                        'Registration failed';
    
    toast.error(errorMessage);
    
    yield put({
      type: register_user_error.type,
      payload: errorMessage
    });
  }
}

function* registerSagas() {
  yield takeLatest(register_user.type, registerSaga);
}

export default registerSagas;
