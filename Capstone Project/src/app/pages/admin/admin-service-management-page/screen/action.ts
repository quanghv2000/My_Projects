import { createAction } from '@reduxjs/toolkit';
import { hostRoomGetPageEnum } from 'app/pages/landlord/landlord-room-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get room

export const hostRoomGetRequest = createAction<any>(
  hostRoomGetPageEnum.GET_ROOM_REQUEST
);
export const hostRoomGetSuccess = createAction(
  hostRoomGetPageEnum.GET_ROOM_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostRoomGetFailure = createAction(
  hostRoomGetPageEnum.GET_ROOM_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);
