import axios from 'axios';
import { showInfoModal } from 'helpers';

export const API_URL = 'http://localhost:8081';
export const apiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  HEAD: 'HEAD',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
};

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

const accessToken =
  localStorage.getItem('accessToken') ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjY2MTA0MzY2LCJleHAiOjE2NjYxMDQ2NjZ9.bOIdF1XvyDvawPyTeGrhVFBvKa0C66z1P0hfTqmnlzI';

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${accessToken}` },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error?.response) {
      showInfoModal(
        'error',
        'Không thể kết nối tới máy chủ. Vui lòng thử lại sau!',
      );
    }
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    if (error?.response?.status === 500) {
      showInfoModal('error', 'Hệ thống đang xảy ra lỗi. Vui lòng thử lại sau!');
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken =
      localStorage.getItem('accessToken') ??
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjY2MTA0MzY2LCJleHAiOjE2NjYxMDQ2NjZ9.bOIdF1XvyDvawPyTeGrhVFBvKa0C66z1P0hfTqmnlzI';
    config.headers.Authorization = 'Bearer ' + accessToken;
    if (config.headers.Authorization === 'Bearer null') {
      delete axiosInstance.defaults.headers.common['Authorization'];
      config.headers.Authorization = '';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const requestAPI = {
  get(apiUrl: string, params?: any) {
    return axios.get(apiUrl, { params });
  },
  post(apiUrl: string, reqBody?: any) {
    return axios.post(apiUrl, reqBody);
  },
  put(apiUrl: string, reqBody?: any) {
    return axios.put(apiUrl, reqBody);
  },
  delete(apiUrl: string, reqBody?: any) {
    return axios.put(apiUrl, {
      data: reqBody,
    });
  },
};

export const requestAPIWithToken = {
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
      data: reqBody,
    });
  },
};
