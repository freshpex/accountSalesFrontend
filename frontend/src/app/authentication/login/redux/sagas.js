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

function* handleGoogleCallback({ payload }) {
  try {
    const { token } = payload;
    if (token) {
      // Store the token
      setWithExpiry("x-access-token", `Bearer ${token}`);
      
      // Get user data
      const response = yield call(api.get, '/api/v1/user/profile');
      
      if (response.data.success) {
        const userData = response.data.data;
        setWithExpiry("email", userData.email);
        
        yield put(login_success({
          user: userData,
          userToken: token
        }));
        
        toast.success('Login successful!');
        
        // Redirect based on user role
        setTimeout(() => {
          window.location.href = userData.role === 'admin' ? '/dashboard' : '/userdashboard';
        }, 1000);
      }
    }
  } catch (error) {
    console.error('Google auth error:', error);
    toast.error('Google authentication failed');
    yield put(login_error(error.message));
  }
}

function* loginSagas() {
  yield takeLatest(login_user.type, loginSaga);
  yield takeLatest('HANDLE_GOOGLE_CALLBACK', handleGoogleCallback);
}

export default loginSagas;
