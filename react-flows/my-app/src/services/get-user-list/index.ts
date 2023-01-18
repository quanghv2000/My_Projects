import { IUserInfoResponse } from 'models';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const getUserListService = async (): Promise<IUserInfoResponse[]> => {
  const apiUrl = APP_API.MY_APP.GET_ALL_USERS;
  const res = await requestAPI.get(apiUrl);

  return res.data as IUserInfoResponse[];
};
