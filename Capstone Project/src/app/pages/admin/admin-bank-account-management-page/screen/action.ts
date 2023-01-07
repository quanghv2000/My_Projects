import { createAction } from '@reduxjs/toolkit';
import { adminPageBankAccountEnum } from 'app/pages/admin/admin-bank-account-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataBankAccountRequest = createAction<string>(
  adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_REQUEST
);
export const getDataBankAccountSuccess = createAction(
  adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataBankAccountFailure = createAction(
  adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const updateDataBankAccountRequest = createAction<any>(
  adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_REQUEST
);
export const updateDataBankAccountSuccess = createAction(
  adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataBankAccountFailure = createAction(
  adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const createDataBankAccountRequest = createAction<any>(
  adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_REQUEST
);
export const createDataBankAccountSuccess = createAction(
  adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataBankAccountFailure = createAction(
  adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const deleteDataBankAccountRequest = createAction<any>(
  adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_REQUEST
);
export const deleteDataBankAccountSuccess = createAction(
  adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataBankAccountFailure = createAction(
  adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateAdminBankAccount = createAction<any>(
  adminPageBankAccountEnum.CLEAR_DATA_BANK_ACCOUNT
);
