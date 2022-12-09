import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const getAccountService = async () => {
  const apiUrl = APP_API.MY_APP.GET_ACCOUNT_REQUEST;
  const res = await requestAPI.get(apiUrl);

  return res.data;
};
