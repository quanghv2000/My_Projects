export const API_URL = 'http://localhost:8081';

export const APP_API = {
  MY_APP: {
    SIGN_IN_REQUEST: `${API_URL}/api/authenticate`,
    SIGN_UP_REQUEST: `${API_URL}/api/register`,
    GET_ACCOUNT_REQUEST: `${API_URL}/api/account`
  }
};

export const LocalStorage = {
  ACCESS_TOKEN: 'ACCESS_TOKEN'
};

export const MODAL_STATUS = {
  OPENING: true,
  CLOSED: false
};
