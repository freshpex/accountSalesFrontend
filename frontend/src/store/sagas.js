import { all, fork } from 'redux-saga/effects';
import loginSagas from '../app/authentication/login/redux/sagas';
import authSagas from '../app/authentication/ForgotPassword/redux/saga';
import registerSagas from '../app/authentication/register/redux/saga';

export default function* rootSaga() {
  yield all([
    fork(registerSagas),
    fork(loginSagas),
    fork(authSagas),
    // Add other sagas here
  ]);
}
