import { createAction } from '@reduxjs/toolkit';
import { detailRoomPageEnum } from 'app/pages/user/detail-room-page/screen/types';
import { actionPayload } from 'helper/index';

// get detail room
export const getDetailRoomRequest = createAction<any>(
  detailRoomPageEnum.GET_DETAIL_ROOM_REQUEST
);
export const getDetailRoomSuccess = createAction(
  detailRoomPageEnum.GET_DETAIL_ROOM_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDetailRoomFailure = createAction(
  detailRoomPageEnum.GET_DETAIL_ROOM_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// report post
export const reportPostRequest = createAction<any>(
  detailRoomPageEnum.REPORT_POST_REQUEST
);
export const reportPostSuccess = createAction(
  detailRoomPageEnum.REPORT_POST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const reportPostFailure = createAction(
  detailRoomPageEnum.REPORT_POST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// get detail post
export const getDetailPostRequest = createAction<any>(
  detailRoomPageEnum.GET_DETAIL_POST_REQUEST
);
export const getDetailPostSuccess = createAction(
  detailRoomPageEnum.GET_DETAIL_POST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDetailPostFailure = createAction(
  detailRoomPageEnum.GET_DETAIL_POST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get detail post with room
export const getDetailPostWithRoomRequest = createAction<any>(
  detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_REQUEST
);
export const getDetailPostWithRoomSuccess = createAction(
  detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDetailPostWithRoomFailure = createAction(
  detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// add to favourite
export const addToFavouriteRequest = createAction<any>(
  detailRoomPageEnum.ADD_TO_FAVOURITE_REQUEST
);
export const addToFavouriteSuccess = createAction(
  detailRoomPageEnum.ADD_TO_FAVOURITE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const addToFavouriteFailure = createAction(
  detailRoomPageEnum.ADD_TO_FAVOURITE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get list favourite
export const getListFavouriteRequest = createAction<any>(
  detailRoomPageEnum.GET_LIST_FAVOURITE_USER_REQUEST
);
export const getListFavouriteSuccess = createAction(
  detailRoomPageEnum.GET_LIST_FAVOURITE_USER_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getListFavouriteFailure = createAction(
  detailRoomPageEnum.GET_LIST_FAVOURITE_USER_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);



// get list feedback
export const getListFeedbackRequest = createAction<any>(
  detailRoomPageEnum.GET_LIST_FEEDBACK_REQUEST
);
export const getListFeedbackSuccess = createAction(
  detailRoomPageEnum.GET_LIST_FEEDBACK_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getListFeedbackFailure = createAction(
  detailRoomPageEnum.GET_LIST_FEEDBACK_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// create feedback
export const createFeedbackRequest = createAction<any>(
  detailRoomPageEnum.CREATE_FEEDBACK_REQUEST
);
export const createFeedbackSuccess = createAction(
  detailRoomPageEnum.CREATE_FEEDBACK_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createFeedbackFailure = createAction(
  detailRoomPageEnum.CREATE_FEEDBACK_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// update feedback
export const updateFeedbackRequest = createAction<any>(
  detailRoomPageEnum.UPDATE_FEEDBACK_REQUEST
);
export const updateFeedbackSuccess = createAction(
  detailRoomPageEnum.UPDATE_FEEDBACK_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateFeedbackFailure = createAction(
  detailRoomPageEnum.UPDATE_FEEDBACK_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// clear state report

export const clearStateReport = createAction<any>(
  detailRoomPageEnum.CLEAR_STATE_REPORT
);

// clear state page

export const clearStateDetailRoom = createAction<any>(
  detailRoomPageEnum.CLEAR_DETAIL_ROOM_PAGE_STATE
);
