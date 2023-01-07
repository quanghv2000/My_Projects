import { createAction } from '@reduxjs/toolkit';
import { hostRoomCreateEnum } from 'app/pages/landlord/room-create-page/screen/types';
import { actionPayload } from 'helper/index';

// get city

export const hostRoomCreateRequest = createAction<any>(
  hostRoomCreateEnum.CREATE_ROOM_REQUEST
);
export const hostRoomCreateSuccess = createAction(
  hostRoomCreateEnum.CREATE_ROOM_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostRoomCreateFailure = createAction(
  hostRoomCreateEnum.CREATE_ROOM_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// check room uniques

export const checkRoomUniqueRequest = createAction<any>(
  hostRoomCreateEnum.CHECK_ROOM_UNIQUE_REQUEST
);
export const checkRoomUniqueSuccess = createAction(
  hostRoomCreateEnum.CHECK_ROOM_UNIQUE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const checkRoomUniqueFailure = createAction(
  hostRoomCreateEnum.CHECK_ROOM_UNIQUE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);



// loading

export const loadingRequest = createAction<any>(
  hostRoomCreateEnum.LOADING_REQUEST
);
export const loadingSuccess = createAction(
  hostRoomCreateEnum.LOADING_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const loadingFailure = createAction(
  hostRoomCreateEnum.LOADING_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


export const clearStateHostRoomCreate = createAction<any>(
  hostRoomCreateEnum.CLEAR_HOST_ROOM_CREATE_STATE
);

