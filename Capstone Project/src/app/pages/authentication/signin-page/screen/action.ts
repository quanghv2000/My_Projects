import { createAction } from '@reduxjs/toolkit';
import { authenticationEnum } from 'app/pages/authentication/signin-page/screen/types';
import { actionPayload } from 'helper/index';

// sign in
export const signInRequest = createAction<any>(
  authenticationEnum.SIGN_IN_REQUEST
);
export const signInSuccess = createAction(
  authenticationEnum.SIGN_IN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const signInFailure = createAction(
  authenticationEnum.SIGN_IN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// sign in with GG

export const signInWithGGRequest = createAction<any>(
  authenticationEnum.SIGN_IN_WITH_GG_REQUEST
);
export const signInWithGGSuccess = createAction(
  authenticationEnum.SIGN_IN_WITH_GG_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const signInWithGGFailure = createAction(
  authenticationEnum.SIGN_IN_WITH_GG_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// get user information
export const signInUserInformationRequest = createAction<any>(
  authenticationEnum.SIGN_IN_GET_USER_INFOR_REQUEST
);
export const signInUserInformationSuccess = createAction(
  authenticationEnum.SIGN_IN_GET_USER_INFOR_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const signInUserInformationFailure = createAction(
  authenticationEnum.SIGN_IN_GET_USER_INFOR_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// forgot password
export const forgotPasswordRequest = createAction<any>(
  authenticationEnum.FORGOT_PASSWORD_REQUEST
);
export const forgotPasswordSuccess = createAction(
  authenticationEnum.FORGOT_PASSWORD_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const forgotPasswordFailure = createAction(
  authenticationEnum.FORGOT_PASSWORD_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// resend email verify
export const resendEmailVerifyRequest = createAction<any>(
  authenticationEnum.RESEND_EMAIL_VERIFY_REQUEST
);
export const resendEmailVerifySuccess = createAction(
  authenticationEnum.RESEND_EMAIL_VERIFY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const resendEmailVerifyFailure = createAction(
  authenticationEnum.RESEND_EMAIL_VERIFY_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// clear state
export const clearStateSignIn = createAction<any>(
  authenticationEnum.CLEAR_SIGN_IN_STATE
);
