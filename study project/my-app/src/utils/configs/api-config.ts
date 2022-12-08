import axios from 'axios';

import { notifications } from 'helpers';

import { LocalStorage } from 'utils/constants';

export const apiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  HEAD: 'HEAD',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS'
};

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.response = response;
  }
}

const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${accessToken}` }
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: ResponseError) => {
    if (!error?.response) {
      notifications.show('error', 'Không thể kết nối tới máy chủ. Vui lòng thử lại sau!');
    }
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/unauthorized';
    }
    if (error?.response?.status === 403) {
      window.location.href = '/forbidden';
    }
    if (error?.response?.status === 500) {
      notifications.show('error', 'Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau!');
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    config.headers.Authorization = `Bearer ${accessToken}`;

    if (config.headers.Authorization === 'Bearer null') {
      delete axiosInstance.defaults.headers.common.Authorization;
      config.headers.Authorization = '';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const requestAPI = {
  get(apiUrl: string, params?: any) {
    return axiosInstance.get(apiUrl, { params });
  },

  post(apiUrl: string, reqBody?: any) {
    return axiosInstance.post(apiUrl, reqBody);
  },

  put(apiUrl: string, reqBody?: any) {
    return axiosInstance.put(apiUrl, reqBody);
  },

  delete(apiUrl: string, reqBody?: any) {
    return axiosInstance.put(apiUrl, {
      data: reqBody
    });
  }
};
