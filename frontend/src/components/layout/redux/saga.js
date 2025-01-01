import { takeLatest, put } from 'redux-saga/effects';
import { ActionTypes } from '../../../store/types';

function* toggleSidebarSaga() {
  yield put({ type: ActionTypes.TOGGLE_SIDEBAR });
}

export default function* layoutSagas() {
  yield takeLatest(ActionTypes.TOGGLE_SIDEBAR, toggleSidebarSaga);
}
