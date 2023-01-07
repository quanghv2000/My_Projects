import { createAction } from '@reduxjs/toolkit';
import { hostProfileEnum } from 'app/pages/landlord/host-profile-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const createDepositRequest = createAction<any>(
  hostProfileEnum.CREATE_DEPOSIT_REQUEST
);
export const createDepositSuccess = createAction(
  hostProfileEnum.CREATE_DEPOSIT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDepositFailure = createAction(
  hostProfileEnum.CREATE_DEPOSIT_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);

// gettransactions
export const getTransactionRequest = createAction<any>(
  hostProfileEnum.GET_TRANSACTION_REQUEST
);
export const getTransactionSuccess = createAction(
  hostProfileEnum.GET_TRANSACTION_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getTransactionFailure = createAction(
  hostProfileEnum.GET_TRANSACTION_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// search transaction

export const searchTransactionRequest = createAction<any>(
  hostProfileEnum.SEARCH_TRANSACTION_REQUEST
);
export const searchTransactionSuccess = createAction(
  hostProfileEnum.SEARCH_TRANSACTION_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const searchTransactionFailure = createAction(
  hostProfileEnum.SEARCH_TRANSACTION_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// get user information

export const getUserInfoRequest = createAction<any>(
  hostProfileEnum.GET_USER_INFO_REQUEST
);
export const getUserInfoSuccess = createAction(
  hostProfileEnum.GET_USER_INFO_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getUserInfoFailure = createAction(
  hostProfileEnum.GET_USER_INFO_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// get user information by id

export const getUserInfoByIdRequest = createAction<any>(
  hostProfileEnum.GET_USER_INFO_BY_ID_REQUEST
);
export const getUserInfoByIdSuccess = createAction(
  hostProfileEnum.GET_USER_INFO_BY_ID_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getUserInfoByIdFailure = createAction(
  hostProfileEnum.GET_USER_INFO_BY_ID_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);

// update user information 

export const updateUserInfoRequest = createAction<any>(
  hostProfileEnum.UPDATE_USER_INFO_REQUEST
);
export const updateUserInfoSuccess = createAction(
  hostProfileEnum.UPDATE_USER_INFO_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateUserInfoFailure = createAction(
  hostProfileEnum.UPDATE_USER_INFO_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// update user image 

export const updateUserImageRequest = createAction<any>(
  hostProfileEnum.UPDATE_USER_IMAGE_REQUEST
);
export const updateUserImageSuccess = createAction(
  hostProfileEnum.UPDATE_USER_IMAGE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateUserImageFailure = createAction(
  hostProfileEnum.UPDATE_USER_IMAGE_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// clear state 
export const clearState = createAction<any>(
  hostProfileEnum.CLEAR_HOST_PROFILE_STATE
);


// clear msg update
export const clearMsgUpdate = createAction<any>(
  hostProfileEnum.CLEAR_MSG_UPDATE
);

