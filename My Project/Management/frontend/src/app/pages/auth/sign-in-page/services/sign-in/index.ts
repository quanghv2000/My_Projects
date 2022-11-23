import { requestAPI } from 'utils/configs';
import { AppAPI } from 'utils/constants';

export const signInServices = async userLogin => {
  const apiUrl = AppAPI.LightX.SIGN_IN_REQUEST;
  const res = await requestAPI.post(apiUrl, userLogin);

  return res.data;
};
