export const API_URL = 'http://localhost:8081';

export const APP_API = {
  MY_APP: {
    SIGN_IN_REQUEST: `${API_URL}/api/authenticate`,
    SIGN_UP_REQUEST: `${API_URL}/api/register`,
    GET_ACCOUNT_REQUEST: `${API_URL}/api/account`,
    GET_ALL_USERS: `${API_URL}/api/admin/users`
  }
};

export const LocalStorage = {
  ACCESS_TOKEN: 'ACCESS_TOKEN'
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

export const MODALS_NAME = {
  SIGN_IN_MODAL: 'SIGN_IN_MODAL',
  SIGN_UP_MODAL: 'SIGN_UP_MODAL',
  FORGOT_PASSWORD_MODAL: 'FORGOT_PASSWORD_MODAL'
};

export const SIGN_IN_STATUS = {
  SUCCESSFULLY: 'SUCCESSFULLY',
  FAILED: 'FAILED',
  UNDEFINED: 'UNDEFINED'
};

export const AUTHED_STATUS = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  AUTHENTICATED: 'AUTHENTICATED',
  UNDEFINED: 'UNDEFINED'
};

export const DELAY_TIME = 500;

export const SECRET_KEY = 'SECRET_KEY_TOKEN';
export const ACCESS_TOKEN_USER =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ1c2VyIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImltYWdlVXJsIjoiIiwiaWF0IjoxNjcwNTUzMjk4LCJleHAiOjE2NzA1NTM1OTh9.GukfLUQwPRgxYNszHr0vyDc8H7V1dkqg3OQX9BhfWvA';
export const ACCESS_TOKEN_ADMIN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaW1hZ2VVcmwiOiIiLCJpYXQiOjE2NzA1NTM0MTgsImV4cCI6MTY3MDU1MzcxOH0.IFKVmBZmFonbq0mwP7Jr50gigL95rwXWt3QOnV6afjQ';
