export const ActionTypes = {
  // Register actions
  REGISTER_REQUEST: 'register/register_user',
  REGISTER_SUCCESS: 'register/register_user_success',
  REGISTER_FAILURE: 'register/register_user_error',
  
  // Login actions
  LOGIN_REQUEST: 'login/login_user',
  LOGIN_SUCCESS: 'login/login_user_success',
  LOGIN_FAILURE: 'login/login_user_error',
  
  // Auth actions
  AUTH_REQUEST: 'auth/auth_user',
  AUTH_SUCCESS: 'auth/auth_user_success',
  AUTH_FAILURE: 'auth/auth_user_error',
};

export const ApiEndpoints = {
  REGISTER: '/api/v1/user/signup',
  LOGIN: '/api/v1/user/signin',
  FORGOT_PASSWORD: '/api/v1/user/forgot-password',
};
