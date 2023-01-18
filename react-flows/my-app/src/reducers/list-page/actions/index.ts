import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'types/reducers';
import { IProductInfoResponse, IUserInfoResponse } from 'models';

export const listPageActionType = {
  GET_DATA_LIST_PAGE_REQUEST: 'LIST_PAGE/GET_DATA_LIST_PAGE_REQUEST',
  GET_DATA_LIST_PAGE_SUCCESS: 'LIST_PAGE/GET_DATA_LIST_PAGE_SUCCESS',
  GET_DATA_LIST_PAGE_FAILURE: 'LIST_PAGE/GET_DATA_LIST_PAGE_FAILURE',
};

export const getDataListPageRequestAction = createAction(listPageActionType.GET_DATA_LIST_PAGE_REQUEST);
export const getDataListPageSuccessAction = createAction(
  listPageActionType.GET_DATA_LIST_PAGE_SUCCESS,
  (payload: { userList: IUserInfoResponse[]; productList: IProductInfoResponse[] }) => actionPayload(payload)
);
export const getDataListPageFailureAction = createAction(listPageActionType.GET_DATA_LIST_PAGE_FAILURE);
