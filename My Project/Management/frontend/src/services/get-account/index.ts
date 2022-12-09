import { requestAPI } from 'utils/configs';
import { AppAPI } from 'utils/constants';

export const getAccountServices = async () => {
  const apiUrl = AppAPI.LightX.GET_ACCOUNT;
  const res = await requestAPI.get(apiUrl);

  return res.data;
};
