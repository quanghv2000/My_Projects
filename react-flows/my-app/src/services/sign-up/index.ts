import { ISignUpResponse, IUserInfoSignUpRequest } from 'models';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const signUpService = async (userSignUp: IUserInfoSignUpRequest): Promise<ISignUpResponse> => {
  const { username, email, phone } = userSignUp;

  if (username === 'admin') {
    throw new Error('Username already exist!');
  }
  if (email === 'admin@gmail.com') {
    throw new Error('Email already exist!');
  }
  if (phone === '0999999999') {
    throw new Error('Phone already exist!');
  }

  const apiUrl = APP_API.MY_APP.SIGN_UP_REQUEST;
  const res = await requestAPI.post(apiUrl, userSignUp);

  return res.data as ISignUpResponse;
};
