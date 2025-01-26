import { put, takeLatest, call, delay } from "redux-saga/effects";
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
  upload_profile_picture_error,
  toggle_two_factor,
  toggle_two_factor_success,
  toggle_two_factor_error,
  update_password,
  update_password_success,
  update_password_error,
  fetch_login_history,
  fetch_login_history_success,
  fetch_login_history_error,
  toggle_notification_setting,
  toggle_notification_setting_success,
  toggle_notification_setting_error,
  fetch_notification_settings,
  fetch_notification_settings_success,
  fetch_notification_settings_error,
} from "./reducer";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchProfileSaga(retries = 3) {
  try {
    const response = yield call(api.get, ApiEndpoints.PROFILE);
    yield put(fetch_profile_success(response.data));
  } catch (error) {
    if (retries > 0) {
      yield delay(1000);
      yield call(fetchProfileSaga, retries - 1);
    } else {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch profile";
      toast.error(errorMessage);
      yield put(fetch_profile_error(errorMessage));
    }
  }
}

function* updateProfileSaga({ payload }) {
  try {
    yield put({ type: "SET_LOADING", payload: true });

    const response = yield call(api.put, "/api/v1/user/profile", payload);

    yield put(update_profile_success(response.data));
    toast.success("Profile updated successfully");

    yield call(fetchProfileSaga);
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to update profile";
    toast.error(errorMessage);
    yield put(update_profile_error(errorMessage));
  } finally {
    yield put({ type: "SET_LOADING", payload: false });
  }
}

function* updateSecuritySettingsSaga({ payload }) {
  try {
    const response = yield call(api.put, ApiEndpoints.SECURITY, payload);
    yield put(update_security_settings_success(response.data));
    toast.success("Security settings updated successfully");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to update security settings";
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
    const errorMessage =
      error.response?.data?.error ||
      "Failed to update notification preferences";
    toast.error(errorMessage);
    yield put(update_notification_preferences_error(errorMessage));
  }
}

function* uploadProfilePictureSaga({ payload }) {
  try {
    const response = yield call(
      api.post,
      ApiEndpoints.PROFILE_PICTURE,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.data && response.data.success) {
      yield put(upload_profile_picture_success(response.data.url));
      toast.success("Profile picture updated successfully");
      yield call(fetchProfileSaga);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Profile picture upload error:", error);
    const errorMessage =
      error.response?.data?.error || "Failed to upload profile picture";
    toast.error(errorMessage);
    yield put(upload_profile_picture_error(errorMessage));
  }
}

function* toggleTwoFactorSaga({ payload }) {
  try {
    const response = yield call(
      api.post,
      `${ApiEndpoints.SECURITY}/2fa/toggle`,
      payload,
    );
    yield put(toggle_two_factor_success(response.data));
    toast.success("Two-factor authentication settings updated");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to update 2FA settings";
    toast.error(errorMessage);
    yield put(toggle_two_factor_error(errorMessage));
  }
}

function* updatePasswordSaga({ payload }) {
  try {
    const response = yield call(
      api.post,
      `${ApiEndpoints.SECURITY}/password`,
      payload,
    );
    yield put(update_password_success(response.data));
    toast.success("Password updated successfully");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to update password";
    toast.error(errorMessage);
    yield put(update_password_error(errorMessage));
  }
}

function* fetchLoginHistorySaga() {
  try {
    const response = yield call(
      api.get,
      `${ApiEndpoints.SECURITY}/login-history`,
    );

    if (response.data?.success) {
      yield put(fetch_login_history_success(response.data.data));
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Login history error:", error);
    const errorMessage =
      error.response?.data?.error || "Failed to fetch login history";
    toast.error(errorMessage);
    yield put(fetch_login_history_error(errorMessage));
  }
}

function* toggleNotificationSettingSaga({ payload }) {
  try {
    const response = yield call(
      api.post,
      `${ApiEndpoints.NOTIFICATIONS}/toggle`,
      payload,
    );

    if (response.data?.success) {
      yield put(toggle_notification_setting_success(response.data.data));
      toast.success("Notification setting updated");
      yield call(fetchNotificationSettingsSaga);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Toggle notification error:", error);
    const errorMessage =
      error.response?.data?.error || "Failed to update notification setting";
    toast.error(errorMessage);
    yield put(toggle_notification_setting_error(errorMessage));
  }
}

function* fetchNotificationSettingsSaga() {
  try {
    const response = yield call(api.get, ApiEndpoints.NOTIFICATION_SETTINGS);
    if (response.data?.success) {
      yield put(fetch_notification_settings_success(response.data.data));
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Fetch notification settings error:", error);
    const errorMessage =
      error.response?.data?.error || "Failed to fetch notification settings";
    toast.error(errorMessage);
    yield put(fetch_notification_settings_error(errorMessage));
  }
}

function* accountSettingsSagas() {
  yield takeLatest(fetch_profile.type, fetchProfileSaga);
  yield takeLatest(update_profile.type, updateProfileSaga);
  yield takeLatest(update_security_settings.type, updateSecuritySettingsSaga);
  yield takeLatest(
    update_notification_preferences.type,
    updateNotificationPreferencesSaga,
  );
  yield takeLatest(upload_profile_picture.type, uploadProfilePictureSaga);
  yield takeLatest(toggle_two_factor.type, toggleTwoFactorSaga);
  yield takeLatest(update_password.type, updatePasswordSaga);
  yield takeLatest(fetch_login_history.type, fetchLoginHistorySaga);
  yield takeLatest(
    toggle_notification_setting.type,
    toggleNotificationSettingSaga,
  );
  yield takeLatest(
    fetch_notification_settings.type,
    fetchNotificationSettingsSaga,
  );
}

export default accountSettingsSagas;
