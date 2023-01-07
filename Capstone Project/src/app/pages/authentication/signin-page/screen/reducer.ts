import { createReducer } from '@reduxjs/toolkit';
import { authenticationEnum } from 'app/pages/authentication/signin-page/screen/types';
// import { setCookie } from 'utils/request';
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  loadingForgotPass: false,
  messageForgotPass: '',
  message: '',
  token: '',
  balance: 0,
  isVerify: false,
  dataResponse: {},
  loadingResendEmail: false,
  messageResendEmail: '',
};

export const signInReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticationEnum.SIGN_IN_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.token = '';
      state.loading = true;
      state.isVerify = false;
      return state;
    })
    .addCase(authenticationEnum.SIGN_IN_SUCCESS, (state, action: any) => {
      state.loading = true;
      localStorage.setItem('token', action?.payload?.results?.jwttoken);
      // setCookie('token', action?.payload?.results?.jwttoken, 3600);
      state.token = action?.payload?.results?.jwttoken;
      return state;
    })
    .addCase(authenticationEnum.SIGN_IN_FAILURE, (state, action: any) => {
      if (
        action.payload?.data?.code === '401' &&
        action.payload?.data?.messageCode === 'USERNAME_PASSWORD_WRONG'
      ) {
        state.message = 'Tên đăng nhập hoặc mật khẩu không chính xác!';
      }
      if (
        action.payload?.data?.code === '401' &&
        action.payload?.data?.messageCode === 'UNVERIFIED_ACCOUNT'
      ) {
        state.message =
          'Bạn cần xác minh tài khoản qua email trước khi đăng nhập!';
        state.isVerify = true
      }
      if (
        action.payload?.data?.code === '401' &&
        action.payload?.data?.messageCode === 'INACTIVE_ACCOUNT'
      ) {
        state.message = 'Tài khoản của bạn đang bị khoá!';
      }

      state.token = '';
      state.loading = false;
      return state;
    })
    // sign in with GG
    .addCase(authenticationEnum.SIGN_IN_WITH_GG_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.token = '';
      state.loading = true;
      return state;
    })

    .addCase(
      authenticationEnum.SIGN_IN_WITH_GG_SUCCESS,
      (state, action: any) => {
        state.loading = true;
        localStorage.setItem('token', action?.payload?.results?.jwttoken);
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        state.token = action?.payload?.results?.jwttoken;
        return state;
      }
    )
    .addCase(
      authenticationEnum.SIGN_IN_WITH_GG_FAILURE,
      (state, action: any) => {
        if (
          action.payload?.data?.code === '401' &&
          action.payload?.data?.messageCode === 'USERNAME_PASSWORD_WRONG'
        ) {
          state.message = 'Tên đăng nhập hoặc mật khẩu không chính xác!';
        }
        if (
          action.payload?.data?.code === '401' &&
          action.payload?.data?.messageCode === 'ACCOUNT_INACTIVE'
        ) {
          state.message =
            'Tài khoản của bạn đang bị khoá!';
        }
        state.token = '';
        state.loading = false;
        return state;
      }
    )
    // get info
    .addCase(
      authenticationEnum.SIGN_IN_GET_USER_INFOR_REQUEST,
      (state, action) => {
        state.loading = true;
        state.dataResponse = {};
        return state;
      }
    )
    .addCase(
      authenticationEnum.SIGN_IN_GET_USER_INFOR_SUCCESS,
      (state, action: any) => {
        state.loading = true;
        state.dataResponse = action?.payload?.results;

        localStorage.setItem(
          'user-info',
          // JSON.parse(action?.payload?.results)
          JSON.stringify(action?.payload?.results)
        );
        if (action?.payload?.results.role?.id === 1) {
          window.location.href = '/admin/dashboard';
        }
        else if (action?.payload?.results.role?.id === 3) {
          window.location.href = '/host/dashboard';
        }
        else {
          window.location.href = '/';
        }
        return state;
      }
    )
    .addCase(
      authenticationEnum.SIGN_IN_GET_USER_INFOR_FAILURE,
      (state, action: any) => {
        state.loading = false;
        return state;
      }
    )

    // forgot password
    .addCase(
      authenticationEnum.FORGOT_PASSWORD_REQUEST,
      (state, action: any) => {
        state.loadingForgotPass = true;
        state.messageForgotPass = '';
        return state;
      }
    )
    .addCase(
      authenticationEnum.FORGOT_PASSWORD_SUCCESS,
      (state, action: any) => {
        state.loadingForgotPass = false;
        state.messageForgotPass =
          'Cài lại mât khẩu mới thành công! Vui lòng kiểm tra email';
        return state;
      }
    )
    .addCase(
      authenticationEnum.FORGOT_PASSWORD_FAILURE,
      (state, action: any) => {
        state.loadingForgotPass = false;
        state.messageForgotPass = '';
        return state;
      }
    )



    // resend email verify
    .addCase(
      authenticationEnum.RESEND_EMAIL_VERIFY_REQUEST,
      (state, action: any) => {
        state.loadingResendEmail = true;
        state.messageResendEmail = '';
        return state;
      }
    )
    .addCase(
      authenticationEnum.RESEND_EMAIL_VERIFY_SUCCESS,
      (state, action: any) => {
        state.loadingResendEmail = false;
        state.messageResendEmail =
          'Email đã được gửi thành công. Vui lòng kiểm tra email để xác minh!';
        return state;
      }
    )
    .addCase(
      authenticationEnum.RESEND_EMAIL_VERIFY_FAILURE,
      (state, action: any) => {
        state.loadingResendEmail = false;
        state.messageResendEmail = '';
        return state;
      }
    )

    .addCase(authenticationEnum.CLEAR_SIGN_IN_STATE, (state, action: any) => {
      state.loading = false;
      state.message = '';
      state.token = '';
      state.dataResponse = {};
      state.isVerify = false
      return state;
    });
});
