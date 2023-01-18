import { IForgotPasswordFormData, ISignInFormData, ISignUpFormData } from 'models';

export const defaultFormDataSignIn: ISignInFormData = {
  username: '',
  password: '',
  rememberMe: false,
  captchaCode: ''
};

export const defaultFormDataSignUp: ISignUpFormData = {
  username: '',
  password: '',
  email: '',
  phone: '',
  address: '',
  description: ''
};

export const defaultFormForgotPassword: IForgotPasswordFormData = {
  email: ''
};
