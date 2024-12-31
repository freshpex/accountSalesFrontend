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
  
  // Account Settings actions.
  FETCH_PROFILE: 'accountSettings/fetch_profile',
  UPDATE_PROFILE: 'accountSettings/update_profile',
  UPDATE_SECURITY: 'accountSettings/update_security',
  UPDATE_NOTIFICATIONS: 'accountSettings/update_notifications',
  
  // Transaction actions
  FETCH_TRANSACTIONS: 'transaction/fetch_transactions',
  FETCH_TRANSACTIONS_SUCCESS: 'transaction/fetch_transactions_success',
  FETCH_TRANSACTIONS_ERROR: 'transaction/fetch_transactions_error',
  ADD_TRANSACTION: 'transaction/add_transaction',
  ADD_TRANSACTION_SUCCESS: 'transaction/add_transaction_success',
  ADD_TRANSACTION_ERROR: 'transaction/add_transaction_error',
  UPDATE_TRANSACTION: 'transaction/update_transaction',
  UPDATE_TRANSACTION_SUCCESS: 'transaction/update_transaction_success',
  UPDATE_TRANSACTION_ERROR: 'transaction/update_transaction_error',
  DELETE_TRANSACTION: 'transaction/delete_transaction',
  DELETE_TRANSACTION_SUCCESS: 'transaction/delete_transaction_success',
  DELETE_TRANSACTION_ERROR: 'transaction/delete_transaction_error',
  
  // Product actions.
  FETCH_PRODUCTS: 'product/fetch_products',
  ADD_PRODUCT: 'product/add_product',
  UPDATE_PRODUCT: 'product/update_product',
  DELETE_PRODUCT: 'product/delete_product',
  
  // Customer actions.
  FETCH_CUSTOMERS: 'customer/fetch_customers',
  ADD_CUSTOMER: 'customer/add_customer',
  UPDATE_CUSTOMER: 'customer/update_customer',
  DELETE_CUSTOMER: 'customer/delete_customer',
  
  // Help Ticket actions.
  FETCH_TICKETS: 'help/fetch_tickets',
  FETCH_TICKETS_SUCCESS: 'help/fetch_tickets_success',
  FETCH_TICKETS_ERROR: 'help/fetch_tickets_error',
  CREATE_TICKET: 'help/create_ticket',
  CREATE_TICKET_SUCCESS: 'help/create_ticket_success',
  CREATE_TICKET_ERROR: 'help/create_ticket_error',
  ADD_RESPONSE: 'help/add_response',
  ADD_RESPONSE_SUCCESS: 'help/add_response_success',
  ADD_RESPONSE_ERROR: 'help/add_response_error',
  UPDATE_TICKET_STATUS: 'help/update_ticket_status',
  MARK_NOTIFICATION_READ: 'help/mark_notification_read',
  
  // Dashboard actions.
  FETCH_DASHBOARD_DATA: 'dashboard/fetch_dashboard_data',
  FETCH_SALES_METRICS: 'dashboard/fetch_sales_metrics',
  
  // Sales Report actions - updating to match reducer
  FETCH_SALES_REPORT: 'salesReport/fetch_sales_report',
  FETCH_SALES_REPORT_SUCCESS: 'salesReport/fetch_sales_report_success',
  FETCH_SALES_REPORT_ERROR: 'salesReport/fetch_sales_report_error',
  UPDATE_FILTERS: 'salesReport/update_filters',
  FETCH_REGIONAL_DATA: 'salesReport/fetch_regional_data',
  FETCH_REGIONAL_DATA_SUCCESS: 'salesReport/fetch_regional_data_success',
};

export const ApiEndpoints = {
  REGISTER: '/api/v1/user/signup',
  LOGIN: '/api/v1/user/signin',
  FORGOT_PASSWORD: '/api/v1/user/forgot-password',
  TRANSACTIONS: '/api/v1/transactions',
  PRODUCTS: '/api/v1/products',
  CUSTOMERS: '/api/v1/customers',
  HELP_TICKETS: '/api/v1/help-tickets',
  SALES_REPORT: '/api/v1/sales-report',
  PROFILE: '/api/v1/user/profile',
  SECURITY: '/api/v1/user/security',
  NOTIFICATIONS: '/api/v1/user/notifications',
  PROFILE_PICTURE: '/api/v1/user/profile-picture',
  SALES_SUMMARY: '/api/v1/sales-report/summary',
  SALES_ANALYTICS: '/api/v1/sales-report/analytics',
  REGIONAL_DATA: '/api/v1/sales-report/regional',
  PRODUCT_STATS: '/api/v1/products/stats',
};
