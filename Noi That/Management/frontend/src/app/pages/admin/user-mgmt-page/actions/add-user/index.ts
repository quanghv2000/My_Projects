import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helpers';
import { IUserInfo } from 'models/api-model/response';

interface IPayload {
  newUser: IUserInfo;
}

export const adminAddUserActionType = {
  ADD_USER_REQUEST: 'ADMIN/USER_MGMT/ADD_USER_REQUEST',
  ADD_USER_SUCCESS: 'ADMIN/USER_MGMT/ADD_USER_SUCCESS',
  ADD_USER_FAILURE: 'ADMIN/USER_MGMT/ADD_USER_FAILURE',
};

export const addUserRequestAction = createAction(
  adminAddUserActionType.ADD_USER_REQUEST,
  (payload: IPayload) => actionPayload(payload),
);

export const addUserSuccessAction = createAction(
  adminAddUserActionType.ADD_USER_SUCCESS,
  (payload: IPayload) => actionPayload(payload),
);

export const addUserFailureAction = createAction(
  adminAddUserActionType.ADD_USER_FAILURE,
  (error: any) => actionPayload(error),
);
