import { API_URL, requestAPI } from 'utils/configs';

export const signInServices = async userLogin => {
  const apiUrl = `${API_URL}/api/authenticate`;
  const res = await requestAPI.post(apiUrl, userLogin);

  return res.data;
};
