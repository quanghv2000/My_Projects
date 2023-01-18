import { createAction } from '@reduxjs/toolkit';
import { IUserInfoSignInRequest } from 'models/api-model/request';
import { actionPayload } from 'types/reducers';

export const signInActionType = {
  SIGN_IN_REQUEST: 'AUTH/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH/SIGN_IN_FAILURE',
  RESET_AUTHED_STATUS: 'AUTH/RESET_AUTHED_STATUS'
};

export const signInRequestAction = createAction(signInActionType.SIGN_IN_REQUEST, (payload: IUserInfoSignInRequest) =>
  actionPayload(payload)
);
export const signInSuccessAction = createAction(signInActionType.SIGN_IN_SUCCESS);
export const signInFailureAction = createAction(signInActionType.SIGN_IN_FAILURE, (payload: string) =>
  actionPayload(payload)
);

export const resetSignInStatusAction = createAction(signInActionType.RESET_AUTHED_STATUS);
