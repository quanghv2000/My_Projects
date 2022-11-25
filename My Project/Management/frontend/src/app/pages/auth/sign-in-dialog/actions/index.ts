import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helpers';

export const signInActionType = {
  SIGN_IN_REQUEST: 'AUTH/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH/SIGN_IN_FAILURE',
};

export const signInRequestAction = createAction(
  signInActionType.SIGN_IN_REQUEST,
  payload => actionPayload(payload),
);

export const signInSuccessAction = createAction(
  signInActionType.SIGN_IN_SUCCESS,
  payload => actionPayload(payload),
);

export const signInFailureAction = createAction(
  signInActionType.SIGN_IN_FAILURE,
  payload => actionPayload(payload),
);
