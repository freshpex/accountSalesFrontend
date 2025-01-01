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
