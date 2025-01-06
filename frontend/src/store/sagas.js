import { all, fork } from 'redux-saga/effects';
import loginSagas from '../app/authentication/login/redux/sagas';
import authSagas from '../app/authentication/ForgotPassword/redux/saga';
import registerSagas from '../app/authentication/register/redux/saga';
import dashboardSagas from '../app/dashboard/redux/saga';
import accountSettingsSagas from '../app/accountSettings.jsx/redux/saga';
import salesReportSagas from '../app/salesReport/redux/saga';
import productSagas from '../app/product/redux/saga';
import customerSagas from '../app/customer/redux/saga';
import helpSagas from '../app/help/redux/saga';
import transactionSagas from '../app/transaction/redux/saga';
import { watchLayout } from '../components/layout/redux/saga';

export default function* rootSaga() {
  yield all([
    fork(registerSagas),
    fork(loginSagas),
    fork(authSagas),
    fork(dashboardSagas),
    fork(accountSettingsSagas),
    fork(salesReportSagas),
    fork(productSagas),
    fork(customerSagas),
    fork(helpSagas),
    fork(transactionSagas),
    fork(watchLayout),
    // Add other sagas here
  ]);
}
