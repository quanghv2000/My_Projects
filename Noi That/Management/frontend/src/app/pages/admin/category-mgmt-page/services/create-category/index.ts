import { API_URL, requestAPIWithToken } from 'utils/configs';

export const createCategoryServices = async () => {
  const apiUrl = `${API_URL}/api/category/get-all`;
  const res = await requestAPIWithToken.get(apiUrl);

  return res.data;
};
