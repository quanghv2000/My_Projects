import { createAction } from '@reduxjs/toolkit';
import { adminMapPositonEnum } from 'app/pages/admin/admin-map-position/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// Get action
export const getMapPositonRequest = createAction<string>(
  adminMapPositonEnum.GET_MAP_POSITON_REQUEST
);
export const getMapPositonSuccess = createAction(
  adminMapPositonEnum.GET_MAP_POSITON_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getMapPositonFailure = createAction(
  adminMapPositonEnum.GET_MAP_POSITON_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Create action
export const createMapPositonRequest = createAction<string>(
  adminMapPositonEnum.CREATE_MAP_POSITON_REQUEST
);
export const createMapPositonSuccess = createAction(
  adminMapPositonEnum.CREATE_MAP_POSITON_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createMapPositonFailure = createAction(
  adminMapPositonEnum.CREATE_MAP_POSITON_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Update action
export const updateMapPositonRequest = createAction<string>(
  adminMapPositonEnum.UPDATE_MAP_POSITON_REQUEST
);
export const updateMapPositonSuccess = createAction(
  adminMapPositonEnum.UPDATE_MAP_POSITON_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateMapPositonFailure = createAction(
  adminMapPositonEnum.UPDATE_MAP_POSITON_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Delete action
export const deleteMapPositonRequest = createAction<any>(
  adminMapPositonEnum.DELETE_MAP_POSITON_REQUEST
);
export const deleteMapPositonSuccess = createAction(
  adminMapPositonEnum.DELETE_MAP_POSITON_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteMapPositonFailure = createAction(
  adminMapPositonEnum.DELETE_MAP_POSITON_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateMapPositon = createAction<any>(
  adminMapPositonEnum.CLEAR_MAP_POSITON_STATE
);
