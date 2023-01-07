import { createAction } from '@reduxjs/toolkit';
import { adminTransactionPageEnum } from 'app/pages/admin/admin-transaction-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get transaction

export const adminGetTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_REQUEST
);
export const adminGetTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminGetTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// confirm transaction

export const adminConfirmTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_REQUEST
);
export const adminConfirmTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminConfirmTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// reject transaction

export const adminRejectTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_REQUEST
);
export const adminRejectTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminRejectTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// search transaction

export const adminSearchTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_REQUEST
);
export const adminSearchTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminSearchTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// create new transaction

export const adminCreateTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_REQUEST
);
export const adminCreateTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminCreateTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// search transaction post or extend

export const adminSearchPostOrExtendTransactionRequest = createAction<any>(
  adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_REQUEST
);
export const adminSearchPostOrExtendTransactionSuccess = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const adminSearchPostOrExtendTransactionFailure = createAction(
  adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// clear state

export const clearState = createAction<any>(
  adminTransactionPageEnum.CLEAR_STATE
);
