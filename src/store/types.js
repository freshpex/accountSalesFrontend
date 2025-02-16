export const ActionTypes = {
  // Register actions
  REGISTER_REQUEST: "register/register_user",
  REGISTER_SUCCESS: "register/register_user_success",
  REGISTER_FAILURE: "register/register_user_error",

  // Login actions
  LOGIN_REQUEST: "login/login_user",
  LOGIN_SUCCESS: "login/login_user_success",
  LOGIN_FAILURE: "login/login_user_error",

  // Auth actions
  AUTH_REQUEST: "auth/auth_user",
  AUTH_SUCCESS: "auth/auth_user_success",
  AUTH_FAILURE: "auth/auth_user_error",

  // Account Settings actions
  FETCH_PROFILE: "accountSettings/fetch_profile",
  UPDATE_PROFILE: "accountSettings/update_profile",
  UPDATE_SECURITY: "accountSettings/update_security",
  UPDATE_NOTIFICATIONS: "accountSettings/update_notifications",
  FETCH_NOTIFICATION_SETTINGS: "accountSettings/fetch_notification_settings",
  FETCH_NOTIFICATION_SETTINGS_SUCCESS:
    "accountSettings/fetch_notification_settings_success",
  FETCH_NOTIFICATION_SETTINGS_ERROR:
    "accountSettings/fetch_notification_settings_error",

  // Transaction actions
  FETCH_TRANSACTIONS: "transaction/fetch_transactions",
  FETCH_TRANSACTIONS_SUCCESS: "transaction/fetch_transactions_success",
  FETCH_TRANSACTIONS_ERROR: "transaction/fetch_transactions_error",
  ADD_TRANSACTION: "transaction/add_transaction",
  ADD_TRANSACTION_SUCCESS: "transaction/add_transaction_success",
  ADD_TRANSACTION_ERROR: "transaction/add_transaction_error",
  UPDATE_TRANSACTION: "transaction/update_transaction",
  UPDATE_TRANSACTION_SUCCESS: "transaction/update_transaction_success",
  UPDATE_TRANSACTION_ERROR: "transaction/update_transaction_error",
  DELETE_TRANSACTION: "transaction/delete_transaction",
  DELETE_TRANSACTION_SUCCESS: "transaction/delete_transaction_success",
  DELETE_TRANSACTION_ERROR: "transaction/delete_transaction_error",
  FETCH_TRANSACTION_PRODUCTS: "transaction/fetch_transaction_products",
  FETCH_TRANSACTION_PRODUCTS_SUCCESS:
    "transaction/fetch_transaction_products_success",
  FETCH_TRANSACTION_PRODUCTS_ERROR:
    "transaction/fetch_transaction_products_error",
  TRANSACTION_CREATE: "transaction/create_transaction",
  TRANSACTION_CREATE_SUCCESS: "transaction/create_transaction_success",
  TRANSACTION_CREATE_ERROR: "transaction/create_transaction_error",
  TRANSACTION_UPDATE: "transaction/update_transaction",
  TRANSACTION_UPDATE_SUCCESS: "transaction/update_transaction_success",
  TRANSACTION_UPDATE_ERROR: "transaction/update_transaction_error",

  // Product actions
  FETCH_PRODUCTS: "product/fetch_products",
  FETCH_PRODUCTS_SUCCESS: "product/fetch_products_success",
  FETCH_PRODUCTS_ERROR: "product/fetch_products_error",
  ADD_PRODUCT: "product/add_product",
  ADD_PRODUCT_SUCCESS: "product/add_product_success",
  ADD_PRODUCT_ERROR: "product/add_product_error",
  UPDATE_PRODUCT: "product/update_product",
  UPDATE_PRODUCT_SUCCESS: "product/update_product_success",
  UPDATE_PRODUCT_ERROR: "product/update_product_error",
  DELETE_PRODUCT: "product/delete_product",
  DELETE_PRODUCT_SUCCESS: "product/delete_product_success",
  DELETE_PRODUCT_ERROR: "product/delete_product_error",

  // Customer actions
  FETCH_CUSTOMERS: "customer/fetch_customers",
  FETCH_CUSTOMERS_SUCCESS: "customer/fetch_customers_success",
  FETCH_CUSTOMERS_ERROR: "customer/fetch_customers_error",
  ADD_CUSTOMER: "customer/add_customer",
  ADD_CUSTOMER_SUCCESS: "customer/add_customer_success",
  ADD_CUSTOMER_ERROR: "customer/add_customer_error",
  UPDATE_CUSTOMER: "customer/update_customer",
  UPDATE_CUSTOMER_SEGMENT: "customer/update_customer_segment",
  FETCH_CUSTOMER_ACTIVITY: "customer/fetch_customer_activity",
  FETCH_CUSTOMER_ACTIVITY_SUCCESS: "customer/fetch_customer_activity_success",
  FETCH_CUSTOMER_ACTIVITY_ERROR: "customer/fetch_customer_activity_error",
  DELETE_CUSTOMER: "customer/delete_customer",

  // Help Ticket actions
  FETCH_TICKETS: "help/fetch_tickets",
  FETCH_TICKETS_SUCCESS: "help/fetch_tickets_success",
  FETCH_TICKETS_ERROR: "help/fetch_tickets_error",
  CREATE_TICKET: "help/create_ticket",
  CREATE_TICKET_SUCCESS: "help/create_ticket_success",
  CREATE_TICKET_ERROR: "help/create_ticket_error",
  ADD_RESPONSE: "help/add_response",
  ADD_RESPONSE_SUCCESS: "help/add_response_success",
  ADD_RESPONSE_ERROR: "help/add_response_error",
  UPDATE_TICKET_STATUS: "help/update_ticket_status",
  MARK_NOTIFICATION_READ: "help/mark_notification_read",

  // Dashboard actions
  FETCH_DASHBOARD_DATA: "dashboard/fetch_dashboard_data",
  FETCH_DASHBOARD_SUCCESS: "dashboard/fetch_dashboard_success",
  FETCH_DASHBOARD_ERROR: "dashboard/fetch_dashboard_error",
  FETCH_SALES_METRICS: "dashboard/fetch_sales_metrics",
  FETCH_SALES_METRICS_SUCCESS: "dashboard/fetch_sales_metrics_success",
  FETCH_SALES_METRICS_ERROR: "dashboard/fetch_sales_metrics_error",
  UPDATE_SALES_TARGET: "dashboard/update_sales_target",

  // Sales Report actions
  FETCH_SALES_REPORT: "salesReport/fetch_sales_report",
  FETCH_SALES_REPORT_SUCCESS: "salesReport/fetch_sales_report_success",
  FETCH_SALES_REPORT_ERROR: "salesReport/fetch_sales_report_error",
  UPDATE_FILTERS: "salesReport/update_filters",
  FETCH_REGIONAL_DATA: "salesReport/fetch_regional_data",
  FETCH_REGIONAL_DATA_SUCCESS: "salesReport/fetch_regional_data_success",
  FETCH_REGIONAL_DATA_ERROR: "salesReport/fetch_regional_data_error",

  // Purchase actions
  INITIATE_PURCHASE: "purchase/initiate_purchase",
  INITIATE_PURCHASE_SUCCESS: "purchase/initiate_purchase_success",
  INITIATE_PURCHASE_ERROR: "purchase/initiate_purchase_error",

  // Escrow actions
  REQUEST_ESCROW: "escrow/request_escrow",
  REQUEST_ESCROW_SUCCESS: "escrow/request_escrow_success",
  REQUEST_ESCROW_ERROR: "escrow/request_escrow_error",

  // Layout actions
  LOGOUT: "layout/logout",
  LOGOUT_SUCCESS: "layout/logout_success",
  LOGOUT_ERROR: "layout/logout_error",
};

export const ApiEndpoints = {
  LOGIN: "/api/v1/user/signin",
  REGISTER: "/api/v1/user/signup",
  FORGOT_PASSWORD: "/api/v1/user/forgot-password",
  RESET_PASSWORD: "/api/v1/user/reset-password",
  TRANSACTIONS: "/api/v1/transactions",
  PRODUCTS: "/api/v1/products",
  PRODUCTS_AVAILABLE: "/api/v1/products/available",
  CUSTOMERS: "/api/v1/customers",
  CUSTOMER_ACTIVITY: "/api/v1/users/:id/activity",
  CUSTOMER_SEGMENT: "/api/v1/users/:id/segment",
  HELP_TICKETS: "/api/v1/help-tickets",
  HELP_TICKET_RESPONSE: (id) => `/api/v1/help-tickets/${id}/response`,
  SALES_REPORT: "/api/v1/sales/report",
  PROFILE: "/api/v1/user/profile",
  SECURITY: "/api/v1/user/security",
  NOTIFICATIONS: "/api/v1/user/notifications",
  PROFILE_PICTURE: "/api/v1/user/profile/profile-picture",
  LOGIN_HISTORY: "/api/v1/user/security/login-history",
  NOTIFICATION_SETTINGS: "/api/v1/user/notifications/settings",
  SALES_SUMMARY: "/api/v1/sales-report/summary",
  SALES_ANALYTICS: "/api/v1/sales-report/analytics",
  REGIONAL_DATA: "/api/v1/sales-report/regional",
  PRODUCT_STATS: "/api/v1/products/stats",
  DASHBOARD_OVERVIEW: "/api/v1/dashboard/overview",
  DASHBOARD_METRICS: "/api/v1/dashboard/metrics",
  LOGOUT: "/api/v1/user/logout",

  PURCHASES: "/api/v1/transactions/initiate",
  TRANSACTION_ESCROW: "/api/v1/transactions/escrow",
  PAYMENT_CALLBACK: "/api/v1/transactions/callback",
  PAYMENT_VERIFY: "/api/v1/transactions/verify",
  PRODUCT_DETAIL: "/api/v1/products/:id",
  ESCROW_DETAILS: "/api/v1/escrow",
  ESCROW: "/api/v1/escrow",
  TRANSACTION_PRODUCTS: "/api/v1/products/available",
  overview: "/api/v1/user/dashboard/overview",
  metrics: "/api/v1/user/dashboard/metrics",
  spendingChart: "/api/v1/user/dashboard/spending-chart",
  recentActivity: "/api/v1/user/dashboard/recent-activity",
  updateLastSeen: "/api/v1/user/dashboard/update-last-seen",
};

export const DASHBOARD_TYPES = {
  FETCH_OVERVIEW: "userDashboard/fetch_overview",
  FETCH_OVERVIEW_SUCCESS: "userDashboard/fetch_overview_success",
  FETCH_OVERVIEW_ERROR: "userDashboard/fetch_overview_error",

  FETCH_METRICS: "userDashboard/fetch_metrics",
  FETCH_METRICS_SUCCESS: "userDashboard/fetch_metrics_success",
  FETCH_METRICS_ERROR: "userDashboard/fetch_metrics_error",

  FETCH_SPENDING_CHART: "userDashboard/fetch_spending_chart",
  FETCH_SPENDING_CHART_SUCCESS: "userDashboard/fetch_spending_chart_success",
  FETCH_SPENDING_CHART_ERROR: "userDashboard/fetch_spending_chart_error",

  FETCH_RECENT_ACTIVITY: "userDashboard/fetch_recent_activity",
  FETCH_RECENT_ACTIVITY_SUCCESS: "userDashboard/fetch_recent_activity_success",
  FETCH_RECENT_ACTIVITY_ERROR: "userDashboard/fetch_recent_activity_error",

  UPDATE_LAST_SEEN: "userDashboard/update_last_seen",
  UPDATE_LAST_SEEN_SUCCESS: "userDashboard/update_last_seen_success",
  UPDATE_LAST_SEEN_ERROR: "userDashboard/update_last_seen_error",

  TRACK_USER_ACTIVITY: "userDashboard/track_activity",
  UPDATE_USER_STATUS: "userDashboard/update_status",
  UPDATE_USER_PREFERENCES: "userDashboard/update_preferences",
};

export const NOTIFICATION_TYPES = {
  EMAIL: {
    NEWS_UPDATES: 'newsUpdates',
    ACCOUNT_ACTIVITY: 'accountActivity',
    PROMOTIONS: 'promotions'
  },
  PUSH: {
    NEW_MESSAGES: 'newMessages',
    MENTIONS: 'mentions',
    REMINDERS: 'reminders'
  },
  SMS: {
    SECURITY: 'security',
    ORDERS: 'orders'
  },
  BROWSER: {
    DESKTOP: 'desktop',
    SOUND: 'sound',
    BACKGROUND: 'background'
  }
};

export const SECURITY_ACTIONS = {
  UPDATE_2FA: 'update2FA',
  CHANGE_PASSWORD: 'changePassword',
  VIEW_LOGIN_HISTORY: 'viewLoginHistory'
};

export const SECURITY_TYPES = {
  TWO_FACTOR: {
    SETUP: 'setup',
    VERIFY: 'verify',
    DISABLE: 'disable'
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true
  },
  LOGIN_HISTORY: {
    MAX_ENTRIES: 10
  }
};
