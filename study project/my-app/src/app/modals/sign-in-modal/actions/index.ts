import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'types/reducers';
import { IUserSignIn } from '../models';

export const signInActionType = {
  SIGN_IN_REQUEST: 'AUTH/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH/SIGN_IN_FAILURE',
  RESET_SIGN_IN_STATUS: 'AUTH/RESET_SIGN_IN_STATUS'
};

export const signInRequestAction = createAction(signInActionType.SIGN_IN_REQUEST, (payload: IUserSignIn) =>
  actionPayload(payload)
);
export const signInSuccessAction = createAction(signInActionType.SIGN_IN_SUCCESS);
export const signInFailureAction = createAction(signInActionType.SIGN_IN_FAILURE);
export const resetSignInStatusAction = createAction(signInActionType.RESET_SIGN_IN_STATUS);
