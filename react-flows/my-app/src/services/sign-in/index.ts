import { ISignInResponse, IUserInfoSignInRequest } from 'models';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const signInService = async (userInfoSignIn: IUserInfoSignInRequest): Promise<ISignInResponse> => {
  const { username, password } = userInfoSignIn;

  if (username !== 'admin' || password !== '123456') {
    throw new Error("Invalid username or password!");
  }

  const apiUrl = APP_API.MY_APP.SIGN_IN_REQUEST;
  const res = await requestAPI.post(apiUrl, userInfoSignIn);

  return res.data as ISignInResponse;
};
