import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';
import { ISignInResponse, IUserSignIn } from '../../models';

export const signInService = async (userLogin: IUserSignIn): Promise<ISignInResponse> => {
  const apiUrl = APP_API.MY_APP.SIGN_IN_REQUEST;
  const res = await requestAPI.post(apiUrl, userLogin);

  return res.data as ISignInResponse;
};
