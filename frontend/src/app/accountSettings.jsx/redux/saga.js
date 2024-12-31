import { put, takeLatest, call } from "redux-saga/effects";
import {
  fetch_profile,
  fetch_profile_success,
  fetch_profile_error,
  update_profile,
  update_profile_success,
  update_profile_error
} from "./reducer";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProfileSaga() {
  try {
    const response = yield call(api.get, '/api/v1/user/profile');
    yield put(fetch_profile_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch profile";
    toast.error(errorMessage);
    yield put(fetch_profile_error(errorMessage));
  }
}

function* updateProfileSaga({ payload }) {
  try {
    const response = yield call(api.put, '/api/v1/user/profile', payload);
    yield put(update_profile_success(response.data));
    toast.success("Profile updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update profile";
    toast.error(errorMessage);
    yield put(update_profile_error(errorMessage));
  }
}

function* accountSettingsSagas() {
  yield takeLatest(fetch_profile.type, fetchProfileSaga);
  yield takeLatest(update_profile.type, updateProfileSaga);
}

export default accountSettingsSagas;
