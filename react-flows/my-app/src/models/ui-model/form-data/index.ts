export interface ISignInFormData {
  username: string;
  password: string;
  rememberMe: boolean;
  captchaCode: string;
}

export interface ISignUpFormData {
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export interface IForgotPasswordFormData {
  email: string;
}
