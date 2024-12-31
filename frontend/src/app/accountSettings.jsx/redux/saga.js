import { put, takeLatest, call } from "redux-saga/effects";
import { ApiEndpoints } from "../../../store/types";
import {
  fetch_profile,
  fetch_profile_success,
  fetch_profile_error,
  update_profile,
  update_profile_success,
  update_profile_error,
  update_security_settings,
  update_security_settings_success,
  update_security_settings_error,
  update_notification_preferences,
  update_notification_preferences_success,
  update_notification_preferences_error,
  upload_profile_picture,
  upload_profile_picture_success,
  upload_profile_picture_error
} from "./reducer";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProfileSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.PROFILE);
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

function* updateSecuritySettingsSaga({ payload }) {
  try {
    const response = yield call(api.put, ApiEndpoints.SECURITY, payload);
    yield put(update_security_settings_success(response.data));
    toast.success("Security settings updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update security settings";
    toast.error(errorMessage);
    yield put(update_security_settings_error(errorMessage));
  }
}

function* updateNotificationPreferencesSaga({ payload }) {
  try {
    const response = yield call(api.put, ApiEndpoints.NOTIFICATIONS, payload);
    yield put(update_notification_preferences_success(response.data));
    toast.success("Notification preferences updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to update notification preferences";
    toast.error(errorMessage);
    yield put(update_notification_preferences_error(errorMessage));
  }
}

function* uploadProfilePictureSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append('image', payload);
    
    const response = yield call(api.post, ApiEndpoints.PROFILE_PICTURE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    yield put(upload_profile_picture_success(response.data.url));
    toast.success("Profile picture updated successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to upload profile picture";
    toast.error(errorMessage);
    yield put(upload_profile_picture_error(errorMessage));
  }
}

function* accountSettingsSagas() {
  yield takeLatest(fetch_profile.type, fetchProfileSaga);
  yield takeLatest(update_profile.type, updateProfileSaga);
  yield takeLatest(update_security_settings.type, updateSecuritySettingsSaga);
  yield takeLatest(update_notification_preferences.type, updateNotificationPreferencesSaga);
  yield takeLatest(upload_profile_picture.type, uploadProfilePictureSaga);
}

export default accountSettingsSagas;
