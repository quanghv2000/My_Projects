import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helpers';
import { ICategoryInfo } from 'models/api-model/response';

export const getCategoriesActionType = {
  GET_CATEGORIES_REQUEST: 'CATEGORY_MGMT/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'CATEGORY_MGMT/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'CATEGORY_MGMT/GET_CATEGORIES_FAILURE',
};

export const getCategoriesRequestAction = createAction(
  getCategoriesActionType.GET_CATEGORIES_REQUEST,
);

export const getCategoriesSuccessAction = createAction(
  getCategoriesActionType.GET_CATEGORIES_SUCCESS,
  (payload: ICategoryInfo[]) => actionPayload(payload),
);

export const getCategoriesFailureAction = createAction(
  getCategoriesActionType.GET_CATEGORIES_FAILURE,
  (payload: any) => payload,
);
