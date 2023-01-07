import { createAction } from '@reduxjs/toolkit';
import { authenticationSignUpEnum } from 'app/pages/authentication/signup-page/screen/types';
import { actionPayload } from 'helper/index';

export const signUpRequest = createAction<any>(
  authenticationSignUpEnum.SIGN_UP_REQUEST
);
export const signUpSuccess = createAction(
  authenticationSignUpEnum.SIGN_UP_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const signUpFailure = createAction(
  authenticationSignUpEnum.SIGN_UP_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);

export const signUpWithGGRequest = createAction<any>(
  authenticationSignUpEnum.SIGN_UP_WITH_GG_REQUEST
);
export const signUpWithGGSuccess = createAction(
  authenticationSignUpEnum.SIGN_UP_WITH_GG_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const signUpWithGGFailure = createAction(
  authenticationSignUpEnum.SIGN_UP_WITH_GG_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);

export const clearStateSignUp = createAction<any>(
  authenticationSignUpEnum.CLEAR_SIGN_UP_STATE
);
