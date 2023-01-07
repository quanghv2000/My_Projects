import { createAction } from '@reduxjs/toolkit';
import { hostPostpageEnum } from 'app/pages/landlord/host-post-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get list post

export const getListPostRequest = createAction<string>(
  hostPostpageEnum.GET_POST_HOST_REQUEST
);
export const getListPostSuccess = createAction(
  hostPostpageEnum.GET_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getListPostFailure = createAction(
  hostPostpageEnum.GET_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// search host post

export const searchPostRequest = createAction<any>(
  hostPostpageEnum.SEARCH_POST_HOST_REQUEST
);
export const searchPostSuccess = createAction(
  hostPostpageEnum.SEARCH_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const searchPostFailure = createAction(
  hostPostpageEnum.SEARCH_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// create post

export const createPostRequest = createAction<any>(
  hostPostpageEnum.CREATE_POST_HOST_REQUEST
);
export const createPostSuccess = createAction(
  hostPostpageEnum.CREATE_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createPostFailure = createAction(
  hostPostpageEnum.CREATE_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get post type

export const getPostTypeRequest = createAction<any>(
  hostPostpageEnum.GET_POST_TYPE_HOST_REQUEST
);
export const getPostTypeSuccess = createAction(
  hostPostpageEnum.GET_POST_TYPE_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getPostTypeFailure = createAction(
  hostPostpageEnum.GET_POST_TYPE_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// extend post

export const extendPostRequest = createAction<any>(
  hostPostpageEnum.EXTEND_POST_HOST_REQUEST
);
export const extendPostSuccess = createAction(
  hostPostpageEnum.EXTEND_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const extendPostFailure = createAction(
  hostPostpageEnum.EXTEND_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// request verify post

export const verifyPostRequest = createAction<any>(
  hostPostpageEnum.VERIFY_POST_HOST_REQUEST
);
export const verifyPostSuccess = createAction(
  hostPostpageEnum.VERIFY_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const verifyPostFailure = createAction(
  hostPostpageEnum.VERIFY_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// request verify post again

export const verifyPostAgainRequest = createAction<any>(
  hostPostpageEnum.VERIFY_POST_HOST_AGAIN_REQUEST
);
export const verifyPostAgainSuccess = createAction(
  hostPostpageEnum.VERIFY_POST_HOST_AGAIN_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const verifyPostAgainFailure = createAction(
  hostPostpageEnum.VERIFY_POST_HOST_AGAIN_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// delete host post

export const deletePostRequest = createAction<any>(
  hostPostpageEnum.DELETE_POST_HOST_REQUEST
);
export const deletePostSuccess = createAction(
  hostPostpageEnum.DELETE_POST_HOST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deletePostFailure = createAction(
  hostPostpageEnum.DELETE_POST_HOST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

//clear msg

export const clearMsg = createAction<any>(
  hostPostpageEnum.CLEAR_MSG
);

export const clearHostPostCreate = createAction<any>(
  hostPostpageEnum.CLEAR_POST_HOST_STATE
);
