import { createAction } from '@reduxjs/toolkit';
import { adminPageAccountEnum } from 'app/pages/admin/admin-account-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataUserRequest = createAction<string>(
  adminPageAccountEnum.GET_DATA_ACCOUNT_REQUEST
);
export const getDataUserSuccess = createAction(
  adminPageAccountEnum.GET_DATA_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[], meta: GetReposSuccessMeta) =>
    actionPayload(payload, meta)
);
export const getDataUserFailure = createAction(
  adminPageAccountEnum.GET_DATA_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);
