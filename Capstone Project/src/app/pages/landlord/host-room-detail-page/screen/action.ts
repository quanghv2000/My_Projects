import { createAction } from '@reduxjs/toolkit';
import { hostRoomDetailGetPageEnum } from 'app/pages/landlord/host-room-detail-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get room

export const hostRoomDetailGetRequest = createAction<any>(
  hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_REQUEST
);
export const hostRoomDetailGetSuccess = createAction(
  hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostRoomDetailGetFailure = createAction(
  hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// update room

export const hostRoomDetailUpdateRequest = createAction<any>(
  hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_REQUEST
);
export const hostRoomDetailUpdateSuccess = createAction(
  hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostRoomDetailUpdateFailure = createAction(
  hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// setLoadingBtn upadte

export const setLoadingBtnUpdate = createAction<any>(
  hostRoomDetailGetPageEnum.SET_LOADING_BTN_UPDATE
);

// clear state 

export const clearState = createAction<any>(
  hostRoomDetailGetPageEnum.CLEAR_STATE
);


