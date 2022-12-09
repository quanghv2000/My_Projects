import { ISignInFormData } from '../models';

export const initialFormData: ISignInFormData = {
  username: '',
  password: '',
  rememberMe: false,
  captcha: ''
};

export const elementIds = {
  textFieldUsernameId: 'textFieldUsernameId',
  textFieldPasswordId: 'textFieldPasswordId',
  cbxRememberMeId: 'cbxRememberMeId',
  lblForgotPasswordId: 'lblForgotPasswordId',
  textFieldCaptchaId: 'textFieldCaptchaId',
  btnSignInId: 'btnSignInId',
  lblSignUpId: 'lblSignUpId'
};
