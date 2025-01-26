import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, ApiEndpoints } from '../../store/types';
import { logoutSuccess, logoutError } from './actions';
import api from '../../services/DataService';

function* logoutSaga() {
  try {
    yield call(api.post, ApiEndpoints.LOGOUT);
    localStorage.clear();    
    yield put(logoutSuccess());    
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    yield put(logoutError(error.message));
  }
}

export function* watchLayout() {
  yield takeLatest(ActionTypes.LOGOUT, logoutSaga);
}
