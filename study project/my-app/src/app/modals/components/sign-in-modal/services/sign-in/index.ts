import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';
import { IUserLogin } from '../../models';

export const signInService = async (userLogin: IUserLogin) => {
  const apiUrl = APP_API.MY_APP.SIGN_IN_REQUEST;
  const res = await requestAPI.post(apiUrl, userLogin);

  return res;
};
