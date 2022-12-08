export interface IUserSignIn {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface ISignInFormData {
  username: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}
