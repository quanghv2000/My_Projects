import { createAction } from '@reduxjs/toolkit';
import { adminPageRoomCategoryEnum } from 'app/pages/admin/admin-room-category-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// Get action
export const getDataRoomCategoriesRequest = createAction<string>(
  adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_REQUEST
);
export const getDataRoomCategoriesSuccess = createAction(
  adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataRoomCategoriesFailure = createAction(
  adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Create action
export const createDataRoomCategoriesRequest = createAction<string>(
  adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_REQUEST
);
export const createDataRoomCategoriesSuccess = createAction(
  adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataRoomCategoriesFailure = createAction(
  adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Update action
export const updateDataRoomCategoriesRequest = createAction<string>(
  adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_REQUEST
);
export const updateDataRoomCategoriesSuccess = createAction(
  adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataRoomCategoriesFailure = createAction(
  adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Delete action
export const deleteDataRoomCategoriesRequest = createAction<any>(
  adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_REQUEST
);
export const deleteDataRoomCategoriesSuccess = createAction(
  adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataRoomCategoriesFailure = createAction(
  adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateRoomCategory = createAction<any>(
  adminPageRoomCategoryEnum.CLEAR_ROOM_CATEGORY_STATE
);
