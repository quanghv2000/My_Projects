import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helpers';

export const getAccountActionType = {
  GET_ACCOUNT_REQUEST: 'USER_LAYOUT/GET_ACCOUNT_REQUEST',
  GET_ACCOUNT_SUCCESS: 'USER_LAYOUT/GET_ACCOUNT_SUCCESS',
  GET_ACCOUNT_FAILURE: 'USER_LAYOUT/GET_ACCOUNT_FAILURE',
};

export const getAccountRequestAction = createAction(
  getAccountActionType.GET_ACCOUNT_REQUEST,
);

export const getAccountSuccessAction = createAction(
  getAccountActionType.GET_ACCOUNT_SUCCESS,
  payload => actionPayload(payload),
);

export const getAccountFailureAction = createAction(
  getAccountActionType.GET_ACCOUNT_FAILURE,
  payload => actionPayload(payload),
);
