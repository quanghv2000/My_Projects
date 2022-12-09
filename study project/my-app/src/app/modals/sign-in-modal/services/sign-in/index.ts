import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';
import { IUserSignIn } from '../../models';

export const signInService = async (userLogin: IUserSignIn) => {
  const apiUrl = APP_API.MY_APP.SIGN_IN_REQUEST;
  const res = await requestAPI.post(apiUrl, userLogin);

  return res.data;
};

// export const signInService = async (userSignIn: IUserSignIn) => {
//   const { username, password } = userSignIn;

//   if (username === 'user' && password === '123') {
//     return {
//       statusCode: 201,
//       message: 'Sign in successfully!',
//       accessToken: ACCESS_TOKEN_USER
//     };
//   }

//   if (username === 'admin' && password === '123') {
//     return {
//       statusCode: 201,
//       message: 'Sign in successfully!',
//       accessToken: ACCESS_TOKEN_ADMIN
//     };
//   }

//   return {
//     statusCode: 400,
//     message: 'Invalid username or password!',
//     accessToken: 'None'
//   };
// };
