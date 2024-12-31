import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../app/authentication/login/redux/reducer';
import authReducer from '../app/authentication/ForgotPassword/redux/reducer';
import registerReducer from '../app/authentication/register/redux/reducer';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  auth: authReducer,
});

export default rootReducer;

// Selector helpers
export const selectRegisterState = (state) => state.register;
export const selectLoginState = (state) => state.login;
export const selectAuthState = (state) => state.auth;
