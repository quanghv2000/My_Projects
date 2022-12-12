import { createAction } from '@reduxjs/toolkit';
import { IProductInfo, IUserInfo } from 'models/api-model/response';
import { actionPayload } from 'types/reducers';

export const listPageActionType = {
  GET_USER_INFO_LIST_REQUEST: 'LIST_PAGE/GET_USER_INFO_LIST_REQUEST',
  GET_USER_INFO_LIST_SUCCESS: 'LIST_PAGE/GET_USER_INFO_LIST_SUCCESS',
  GET_USER_INFO_LIST_FAILURE: 'LIST_PAGE/GET_USER_INFO_LIST_FAILURE',
  GET_PRODUCT_INFO_LIST_REQUEST: 'LIST_PAGE/GET_PRODUCT_INFO_LIST_REQUEST',
  GET_PRODUCT_INFO_LIST_SUCCESS: 'LIST_PAGE/GET_PRODUCT_INFO_LIST_SUCCESS',
  GET_PRODUCT_INFO_LIST_FAILURE: 'LIST_PAGE/GET_PRODUCT_INFO_LIST_FAILURE'
};

export const getUserInfoListRequestAction = createAction(listPageActionType.GET_USER_INFO_LIST_REQUEST);
export const getUserInfoListSuccessAction = createAction(
  listPageActionType.GET_USER_INFO_LIST_SUCCESS,
  (payload: IUserInfo[]) => actionPayload(payload)
);
export const getUserInfoListFailureAction = createAction(listPageActionType.GET_USER_INFO_LIST_FAILURE);

export const getProductInfoListRequestAction = createAction(listPageActionType.GET_PRODUCT_INFO_LIST_REQUEST);
export const getProductInfoListSuccessAction = createAction(
  listPageActionType.GET_PRODUCT_INFO_LIST_SUCCESS,
  (payload: IProductInfo[]) => actionPayload(payload)
);
export const getProductInfoListFailureAction = createAction(listPageActionType.GET_PRODUCT_INFO_LIST_FAILURE);
