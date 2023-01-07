import { createAction } from '@reduxjs/toolkit';
import { adminPageAccountEnum } from 'app/pages/admin/admin-account-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataAccountRequest = createAction<any>(
  adminPageAccountEnum.GET_DATA_ACCOUNT_REQUEST
);
export const getDataAccountSuccess = createAction(
  adminPageAccountEnum.GET_DATA_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataAccountFailure = createAction(
  adminPageAccountEnum.GET_DATA_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const updateDataAccountRequest = createAction<string>(
  adminPageAccountEnum.UPDATE_DATA_ACCOUNT_REQUEST
);
export const updateDataAccountSuccess = createAction(
  adminPageAccountEnum.UPDATE_DATA_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataAccountFailure = createAction(
  adminPageAccountEnum.UPDATE_DATA_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const createDataAccountRequest = createAction<string>(
  adminPageAccountEnum.CREATE_DATA_ACCOUNT_REQUEST
);
export const createDataAccountSuccess = createAction(
  adminPageAccountEnum.CREATE_DATA_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataAccountFailure = createAction(
  adminPageAccountEnum.CREATE_DATA_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const deleteDataAccountRequest = createAction<any>(
  adminPageAccountEnum.DELETE_DATA_ACCOUNT_REQUEST
);
export const deleteDataAccountSuccess = createAction(
  adminPageAccountEnum.DELETE_DATA_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataAccountFailure = createAction(
  adminPageAccountEnum.DELETE_DATA_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const lockAccountRequest = createAction<any>(
  adminPageAccountEnum.LOCK_ACCOUNT_REQUEST
);
export const lockAccountSuccess = createAction(
  adminPageAccountEnum.LOCK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const lockAccountFailure = createAction(
  adminPageAccountEnum.LOCK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const unlockAccountRequest = createAction<any>(
  adminPageAccountEnum.UNLOCK_ACCOUNT_REQUEST
);
export const unlockAccountSuccess = createAction(
  adminPageAccountEnum.UNLOCK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const unlockAccountFailure = createAction(
  adminPageAccountEnum.UNLOCK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// create new account 

export const createNewAccountRequest = createAction<any>(
  adminPageAccountEnum.CREATE_NEW_ACCOUNT_REQUEST
);
export const createNewAccountSuccess = createAction(
  adminPageAccountEnum.CREATE_NEW_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createNewAccountFailure = createAction(
  adminPageAccountEnum.CREATE_NEW_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// verify new account 

export const verifyAccountRequest = createAction<any>(
  adminPageAccountEnum.VERIFY_ACCOUNT_REQUEST
);
export const verifyAccountSuccess = createAction(
  adminPageAccountEnum.VERIFY_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const verifyAccountFailure = createAction(
  adminPageAccountEnum.VERIFY_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateAdminAccount = createAction<any>(
  adminPageAccountEnum.CLEAR_DATA_ACCOUNT
);
