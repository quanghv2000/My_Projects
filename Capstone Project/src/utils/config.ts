import axios from 'axios';

//apply base url for axios
export const API_URL = 'https://api.holahouses.com';
// export const API_URL = 'https://hola-boarding-house.up.railway.app';

const axiosApi = axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(function (config) {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
    })
    .then((response) => response.data);
}

export const DEFAULT_APP_LINK = 'https://hoalac.netlify.app';
export const DEFAULT_APP_CLOUNDINARY =
  'https://res.cloudinary.com/longbody/image/upload/v1646810056/shopsale';
export const DEFAULT_APP_UPLOAD_CLOUNDIANRY =
  'https://api.cloudinary.com/v1_1/shopsale/image/upload';

export const DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY =
  'https://api.cloudinary.com/v1_1/longbody/image/upload';

export const DEFAULT_GOOGLE_MAP_API_KEY =
  'AIzaSyDuOQPwxD8Sdac_NREPQDfhj956hegF2sQ';
