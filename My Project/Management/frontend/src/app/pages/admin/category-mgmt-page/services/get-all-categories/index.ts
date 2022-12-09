import { API_URL, requestAPI } from 'utils/configs';

export const getAllCategoriesServices = async () => {
  const apiUrl = `${API_URL}/api/category/get-all`;
  const res = await requestAPI.get(apiUrl);

  return res.data;
};
