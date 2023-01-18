import { LOCAL_STORAGE, SESSION_STORAGE, AUTHED_STATUS } from 'utils/constants';

export const localStorageManager = {
  accessToken: {
    setValue(value: string) {
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, value);
    },

    getValue() {
      return localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    }
  },

  rememberMe: {
    setValue(value: string) {
      localStorage.setItem(LOCAL_STORAGE.REMEMBER_ME, value);
    },

    getValue() {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE.REMEMBER_ME) ?? 'false');
    }
  },

  clear() {
    localStorage.clear();
  }
};

export const sessionStorageManager = {
  authedStatus: {
    setValue(value: string) {
      sessionStorage.setItem(SESSION_STORAGE.AUTHED_STATUS, value);
    },

    getValue() {
      return JSON.parse(sessionStorage.getItem(SESSION_STORAGE.AUTHED_STATUS) ?? AUTHED_STATUS.NOT_LOGGED);
    }
  }
};
