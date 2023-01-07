import { createAction } from '@reduxjs/toolkit';
import { adminPageAmenityEnum } from 'app/pages/admin/admin-amenity-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// Get action
export const getDataAmenityRequest = createAction<string>(
  adminPageAmenityEnum.GET_DATA_AMENITY_REQUEST
);
export const getDataAmenitySuccess = createAction(
  adminPageAmenityEnum.GET_DATA_AMENITY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataAmenityFailure = createAction(
  adminPageAmenityEnum.GET_DATA_AMENITY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Create action
export const createDataAmenityRequest = createAction<string>(
  adminPageAmenityEnum.CREATE_DATA_AMENITY_REQUEST
);
export const createDataAmenitySuccess = createAction(
  adminPageAmenityEnum.CREATE_DATA_AMENITY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataAmenityFailure = createAction(
  adminPageAmenityEnum.CREATE_DATA_AMENITY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Update action
export const updateDataAmenityRequest = createAction<string>(
  adminPageAmenityEnum.UPDATE_DATA_AMENITY_REQUEST
);
export const updateDataAmenitySuccess = createAction(
  adminPageAmenityEnum.UPDATE_DATA_AMENITY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataAmenityFailure = createAction(
  adminPageAmenityEnum.UPDATE_DATA_AMENITY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Delete action
export const deleteDataAmenityRequest = createAction<any>(
  adminPageAmenityEnum.DELETE_DATA_AMENITY_REQUEST
);
export const deleteDataAmenitySuccess = createAction(
  adminPageAmenityEnum.DELETE_DATA_AMENITY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataAmenityFailure = createAction(
  adminPageAmenityEnum.DELETE_DATA_AMENITY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateAmenity = createAction<any>(
  adminPageAmenityEnum.CLEAR_AMENITY_STATE
);
