import { createAction } from '@reduxjs/toolkit';
import { hostHouseDetailPageEnum } from 'app/pages/landlord/host-house-detail-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get house

export const hostHouseGetDetailRequest = createAction<any>(
  hostHouseDetailPageEnum.GET_HOUSE_DETAIL_REQUEST
);
export const hostHouseGetDetailSuccess = createAction(
  hostHouseDetailPageEnum.GET_HOUSE_DETAIL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseGetDetailFailure = createAction(
  hostHouseDetailPageEnum.GET_HOUSE_DETAIL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// update

export const hostHouseUpdateRequest = createAction<any>(
  hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_REQUEST
);
export const hostHouseUpdateSuccess = createAction(
  hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseUpdateFailure = createAction(
  hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// get house history

export const hostHouseHistoryRequest = createAction<any>(
  hostHouseDetailPageEnum.GET_HOUSE_HISTORY_REQUEST
);
export const hostHouseHistorySuccess = createAction(
  hostHouseDetailPageEnum.GET_HOUSE_HISTORY_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseHistoryFailure = createAction(
  hostHouseDetailPageEnum.GET_HOUSE_HISTORY_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearHouseListAmenity = createAction<any>(
  hostHouseDetailPageEnum.CLEAR_HOUSE_DETAIL_STATE
);
