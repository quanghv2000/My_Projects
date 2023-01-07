import { createAction } from '@reduxjs/toolkit';
import { adminPostManagmentPageEnum } from 'app/pages/admin/admin-post-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get admin post 

export const getListPostRequest = createAction<any>(
  adminPostManagmentPageEnum.GET_POST_ADMIN_REQUEST
);
export const getListPostSuccess = createAction(
  adminPostManagmentPageEnum.GET_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getListPostFailure = createAction(
  adminPostManagmentPageEnum.GET_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);



// search admin post 

export const searchPostRequest = createAction<any>(
  adminPostManagmentPageEnum.SEARCH_POST_ADMIN_REQUEST
);
export const searchPostSuccess = createAction(
  adminPostManagmentPageEnum.SEARCH_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const searchPostFailure = createAction(
  adminPostManagmentPageEnum.SEARCH_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// confirm admin post 

export const confirmPostRequest = createAction<string>(
  adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_REQUEST
);
export const confirmPostSuccess = createAction(
  adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const confirmPostFailure = createAction(
  adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// reject admin post 

export const rejectPostRequest = createAction<string>(
  adminPostManagmentPageEnum.REJECT_POST_ADMIN_REQUEST
);
export const rejectPostSuccess = createAction(
  adminPostManagmentPageEnum.REJECT_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const rejectPostFailure = createAction(
  adminPostManagmentPageEnum.REJECT_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// delete admin post 

export const deletePostRequest = createAction<any>(
  adminPostManagmentPageEnum.DELETE_POST_ADMIN_REQUEST
);
export const deletePostSuccess = createAction(
  adminPostManagmentPageEnum.DELETE_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deletePostFailure = createAction(
  adminPostManagmentPageEnum.DELETE_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// verify admin post 

export const verifyPostRequest = createAction<any>(
  adminPostManagmentPageEnum.VERIFY_POST_ADMIN_REQUEST
);
export const verifyPostSuccess = createAction(
  adminPostManagmentPageEnum.VERIFY_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const verifyPostFailure = createAction(
  adminPostManagmentPageEnum.VERIFY_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// cancel admin post 

export const cancelVerifyPostRequest = createAction<any>(
  adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_REQUEST
);
export const cancelVerifyPostSuccess = createAction(
  adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const cancelVerifyPostFailure = createAction(
  adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);



// restore post 

export const restorePostRequest = createAction<any>(
  adminPostManagmentPageEnum.RESTORE_POST_ADMIN_REQUEST
);
export const restorePostSuccess = createAction(
  adminPostManagmentPageEnum.RESTORE_POST_ADMIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const restorePostFailure = createAction(
  adminPostManagmentPageEnum.RESTORE_POST_ADMIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// clear state 

export const clearState = createAction<any>(
  adminPostManagmentPageEnum.CLEAR_STATE
);

