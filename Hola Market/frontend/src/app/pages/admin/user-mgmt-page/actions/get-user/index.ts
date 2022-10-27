import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helpers';
import { IUserInfo } from 'models/api-model/response';

export const adminGetUsersActionType = {
  GET_USER_REQUEST: 'ADMIN/USER_MGMT/GET_USER_REQUEST',
  GET_USER_SUCCESS: 'ADMIN/USER_MGMT/GET_USER_SUCCESS',
  GET_USER_FAILURE: 'ADMIN/USER_MGMT/GET_USER_FAILURE',
};

export const getUsersRequestAction = createAction(
  adminGetUsersActionType.GET_USER_REQUEST,
);

export const getUsersSuccessAction = createAction(
  adminGetUsersActionType.GET_USER_SUCCESS,
  (payload: IUserInfo[]) => actionPayload(payload),
);

export const getUsersFailureAction = createAction(
  adminGetUsersActionType.GET_USER_FAILURE,
  (payload: any) => payload,
);
