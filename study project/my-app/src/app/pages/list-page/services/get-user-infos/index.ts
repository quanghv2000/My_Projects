import { IUserInfo } from 'models/api-model/response';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const getUserInfosService = async (): Promise<IUserInfo[]> => {
  const apiUrl = APP_API.MY_APP.GET_ALL_USERS;
  const res = await requestAPI.get(apiUrl);

  return res.data as IUserInfo[];
};
