import { IForgotPasswordRequest, IForgotPasswordResponse } from 'models';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const forgotPasswordService = async (reqBody: IForgotPasswordRequest): Promise<IForgotPasswordResponse> => {
  const apiUrl = APP_API.MY_APP.GET_ALL_USERS;
  const res = await requestAPI.post(apiUrl, reqBody);

  return res.data as IForgotPasswordResponse;
};
