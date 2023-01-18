export * from './screen-name';
export * from './element-ids';
export * from './form-data';

export const API_URL = 'http://localhost:8081';

export const APP_API = {
  MY_APP: {
    SIGN_IN_REQUEST: `${API_URL}/api/sign-in`,
    SIGN_UP_REQUEST: `${API_URL}/api/sign-up`,
    GET_ACCOUNT_REQUEST: `${API_URL}/api/account`,
    GET_ALL_USERS: `${API_URL}/api/users`,
    GET_ALL_PRODUCTS: `${API_URL}/api/products`
  }
};

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  USER_LOGGED_INFO: 'USER_LOGGED_INFO',
  REMEMBER_ME: 'REMEMBER_ME'
};

export const SESSION_STORAGE = {
  AUTHED_STATUS: 'AUTHED_STATUS'
};

export const ROLES = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER'
};

export const MODAL_STATUS = {
  OPENING: true,
  CLOSED: false
};

export const LOADING_SPINNER_STATUS = {
  OPENING: true,
  CLOSED: false
};

export const MODAL_NAMES = {
  SIGN_IN_MODAL: 'SIGN_IN_MODAL',
  SIGN_UP_MODAL: 'SIGN_UP_MODAL',
  FORGOT_PASSWORD_MODAL: 'FORGOT_PASSWORD_MODAL'
};

export const AUTHED_STATUS = {
  LOGGED: 'LOGGED',
  NOT_LOGGED: 'NOT_LOGGED',
  LOGGED_FAILURE: 'LOGGED_FAILURE'
};

export const SAVE_DRAFT_STATUS = {
  SAVED: 'SAVED',
  UNSAVED: 'UNSAVED'
};

export const DELAY_TIME = 500;