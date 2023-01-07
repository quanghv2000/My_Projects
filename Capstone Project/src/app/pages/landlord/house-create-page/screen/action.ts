import { createAction } from '@reduxjs/toolkit';
import { hostHouseCreateEnum } from 'app/pages/landlord/house-create-page/screen/types';
import { actionPayload } from 'helper/index';

// get city

export const hostHouseGetCityRequest = createAction<any>(
  hostHouseCreateEnum.GET_ALL_CITY_REQUEST
);
export const hostHouseGetCitySuccess = createAction(
  hostHouseCreateEnum.GET_ALL_CITY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseGetCityFailure = createAction(
  hostHouseCreateEnum.GET_ALL_CITY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get district

export const hostHouseGetDistrictRequest = createAction<any>(
  hostHouseCreateEnum.GET_DISTRICT_REQUEST
);
export const hostHouseGetDistrictSuccess = createAction(
  hostHouseCreateEnum.GET_DISTRICT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseGetDistrictFailure = createAction(
  hostHouseCreateEnum.GET_DISTRICT_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get village

export const hostHouseGetVillageRequest = createAction<any>(
  hostHouseCreateEnum.GET_VILLAGE_REQUEST
);
export const hostHouseGetVillageSuccess = createAction(
  hostHouseCreateEnum.GET_VILLAGE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseGetVillageFailure = createAction(
  hostHouseCreateEnum.GET_VILLAGE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// create house

export const hostHouseCreateRequest = createAction<any>(
  hostHouseCreateEnum.CREATE_HOUSE_REQUEST
);
export const hostHouseCreateSuccess = createAction(
  hostHouseCreateEnum.CREATE_HOUSE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseCreateFailure = createAction(
  hostHouseCreateEnum.CREATE_HOUSE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


export const btnCreateLoading = createAction<any>(
  hostHouseCreateEnum.BTN_LOADING_STATE
);

export const clearStateHostHouseCreate = createAction<any>(
  hostHouseCreateEnum.HOST_HOUSE_CREATE_STATE
);
