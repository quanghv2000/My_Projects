export const Characters = {
  SPACE: ' ',
};

export const LocalStorage = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  USER_INFO: 'USER_INFO',
};

export const API_URL = 'http://localhost:8081';

export const AppAPI = {
  LightX: {
    SIGN_IN_REQUEST: `${API_URL}/api/authenticate`,
    SIGN_UP_REQUEST: `${API_URL}/api/register`,
    FORGOT_PASSWORD_REQUEST: `${API_URL}/api/forgot-password`,
    GET_ACCOUNT: `${API_URL}/api/account`,
  },
};
