import { createAction } from '@reduxjs/toolkit';
import { adminPageTypeOfRentalEnum } from 'app/pages/admin/admin-type-of-rental-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataTypeOfRentalRequest = createAction<string>(
  adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_REQUEST
);
export const getDataTypeOfRentalSuccess = createAction(
  adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataTypeOfRentalFailure = createAction(
  adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const updateDataTypeOfRentalRequest = createAction<string>(
  adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_REQUEST
);
export const updateDataTypeOfRentalSuccess = createAction(
  adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataTypeOfRentalFailure = createAction(
  adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const createDataTypeOfRentalRequest = createAction<string>(
  adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_REQUEST
);
export const createDataTypeOfRentalSuccess = createAction(
  adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataTypeOfRentalFailure = createAction(
  adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const deleteDataTypeOfRentalRequest = createAction<any>(
  adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_REQUEST
);
export const deleteDataTypeOfRentalSuccess = createAction(
  adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataTypeOfRentalFailure = createAction(
  adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateAdminTypeOfRental = createAction<any>(
  adminPageTypeOfRentalEnum.CLEAR_DATA_TYPE_OF_RENTAL
);
