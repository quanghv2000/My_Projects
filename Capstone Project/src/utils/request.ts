import axios from 'axios';
import { notification } from 'antd';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export const apiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  HEAD: 'HEAD',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const setCookie = (name: string, value: any, days: any) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const eraseCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

export function requestAPI(URL: string, method: string, value: any) {
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call

  if (method === apiMethod.GET) {
    return axios.get(URL, { params: value });
  }
  if (method === apiMethod.POST) {
    return axios.post(URL, value);
  }
  if (method === apiMethod.PUT) {
    return axios.put(URL, value);
  }
  if (method === apiMethod.DELETE) {
    return axios.delete(URL, {
      data: value,
    });
  }
}

// const token = getCookie('token');
const token = localStorage.getItem('token');
//  const userInfoCookies = localStorage.getItem('user-info');
// const userInfoCookies = getCookie('user-info');
//  let userInfo: any;

//  if (userInfoCookies) {
//    userInfo = JSON.parse(userInfoCookies);
//  }
const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${token}` },
});

const openNotificationWithIcon = (type: any) => {
  notification[type]({
    message: 'Hệ thống đang xảy ra lỗi',
    description: 'Vui lòng thử lại sau',
  });
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // delete the cookie.
      localStorage.clear();
      window.location.href = '/';
    }
    if (error?.response?.status === 500) {
      openNotificationWithIcon('error');
      // delete the cookie.
      // localStorage.clear();
      // setCookie('user-info', '', 0);
      // window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config: any) => {
    // const token = getCookie('token');
    const tokenCookies = localStorage.getItem('token');
    config.headers.Authorization = 'Bearer ' + tokenCookies;
    if (config.headers.Authorization === 'Bearer null') {
      delete axiosInstance.defaults.headers.common['Authorization'];
      config.headers.Authorization = '';
    }
    // // const tokenCookies = getCookie('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function requestAPIWithToken(URL: string, method: string, value: any) {
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call

  if (method === apiMethod.GET) {
    return axiosInstance.get(URL, { params: value });
  }
  if (method === apiMethod.POST) {
    return axiosInstance.post(URL, value);
  }
  if (method === apiMethod.PUT) {
    return axiosInstance.put(URL, value);
  }
  if (method === apiMethod.DELETE) {
    return axiosInstance.delete(URL, {
      data: value,
    });
  }
}
