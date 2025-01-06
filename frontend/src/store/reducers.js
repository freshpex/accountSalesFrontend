import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../app/authentication/login/redux/reducer';
import authReducer from '../app/authentication/ForgotPassword/redux/reducer';
import registerReducer from '../app/authentication/register/redux/reducer';
import dashboardReducer from '../app/dashboard/redux/reducer';
import accountSettingsReducer from '../app/accountSettings.jsx/redux/reducer';
import salesReportReducer from '../app/salesReport/redux/reducer';
import productReducer from '../app/product/redux/reducer';
import customerReducer from '../app/customer/redux/reducer';
import helpReducer from '../app/help/redux/reducer';
import transactionReducer from '../app/transaction/redux/reducer';
import layoutReducer from '../components/layout/redux/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  accountSettings: accountSettingsReducer,
  salesReport: salesReportReducer,
  product: productReducer,
  customer: customerReducer,
  help: helpReducer,
  transaction: transactionReducer,
  layout: layoutReducer,
});

export default rootReducer;

// Selector helpers
export const selectRegisterState = (state) => state.register;
export const selectLoginState = (state) => state.login;
export const selectLogoutState = (state) => state.logout;
export const selectAuthState = (state) => state.auth;
export const selectSalesReportState = (state) => state.salesReport;
export const selectProductState = (state) => state.product;
export const selectCustomerState = (state) => state.customer;
export const selectTransactionState = (state) => state.transaction;
export const selectHelpState = (state) => state.help;
