import { createAction } from '@reduxjs/toolkit';
import { adminPageRoomTypeEnum } from 'app/pages/admin/admin-room-type-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// Get action
export const getDataRoomTypeRequest = createAction<string>(
  adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_REQUEST
);
export const getDataRoomTypeSuccess = createAction(
  adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataRoomTypeFailure = createAction(
  adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Create action
export const createDataRoomTypeRequest = createAction<string>(
  adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_REQUEST
);
export const createDataRoomTypeSuccess = createAction(
  adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataRoomTypeFailure = createAction(
  adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Update action
export const updateDataRoomTypeRequest = createAction<string>(
  adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_REQUEST
);
export const updateDataRoomTypeSuccess = createAction(
  adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataRoomTypeFailure = createAction(
  adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Delete action
export const deleteDataRoomTypeRequest = createAction<any>(
  adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_REQUEST
);
export const deleteDataRoomTypeSuccess = createAction(
  adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataRoomTypeFailure = createAction(
  adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateRoomCategory = createAction<any>(
  adminPageRoomTypeEnum.CLEAR_ROOM_TYPE_STATE
);
