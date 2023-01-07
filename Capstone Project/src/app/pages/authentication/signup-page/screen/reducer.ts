import { createReducer } from '@reduxjs/toolkit';
import { authenticationSignUpEnum } from 'app/pages/authentication/signup-page/screen/types';
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  message: '',
  dataResponse: {},
  token: '',
};

export const signUpReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticationSignUpEnum.SIGN_UP_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.message = '';
      state.loading = true;
      return state;
    })
    .addCase(authenticationSignUpEnum.SIGN_UP_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload;
      if (action.payload?.code === '200') {
        state.message =
          'Bạn đã đăng ký tài khoản thành công! Vui lòng kiểm tra email để xác minh tài khoản';
      }
      return state;
    })
    .addCase(authenticationSignUpEnum.SIGN_UP_FAILURE, (state, action: any) => {
      if (action?.payload?.status === 500) {
        state.message = 'Hệ thống đang lỗi, vui lòng thử lại sau!';
      }
      if (action?.payload?.data?.messageCode === 'USERNAME_INVALID') {
        state.message = 'Tên tài khoản nhập lớn hơn 8 ký tự và không chứa ký tự đặc biệt!';
      }
      if (action?.payload?.data?.messageCode === 'EMAIL_HAS_EXISTED') {
        state.message = 'Tên đăng nhập hoặc email đã được đăng ký!';
      }
      state.loading = false;
      return state;
    })
    // sign up GG
    .addCase(
      authenticationSignUpEnum.SIGN_UP_WITH_GG_REQUEST,
      (state, action) => {
        state.dataResponse = {};
        state.message = '';
        state.loading = true;
        state.token = '';
        return state;
      }
    )
    .addCase(
      authenticationSignUpEnum.SIGN_UP_WITH_GG_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload;
        if (action.payload?.code === '200') {
          state.message = 'Bạn đã đăng ký tài khoản thành công!';
        }
        localStorage.setItem('token', action?.payload?.results?.jwttoken);
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        state.token = action?.payload?.results?.jwttoken;
        return state;
      }
    )
    .addCase(
      authenticationSignUpEnum.SIGN_UP_WITH_GG_FAILURE,
      (state, action: any) => {
        if (action?.payload?.status === 500) {
          state.message = 'Hệ thống đang lỗi, vui lòng thử lại sau!';
        }
        if (action?.payload?.status === 400) {
          state.message = 'Email đã được đăng ký!';
        }
        state.token = '';
        state.loading = false;
        return state;
      }
    )
    .addCase(
      authenticationSignUpEnum.CLEAR_SIGN_UP_STATE,
      (state, action: any) => {
        state.loading = false;
        state.message = '';
        state.dataResponse = {};
        return state;
      }
    );
});
