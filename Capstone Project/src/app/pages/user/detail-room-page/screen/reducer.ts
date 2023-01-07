import { createReducer } from '@reduxjs/toolkit';
import { detailRoomPageEnum } from 'app/pages/user/detail-room-page/screen/types';
import { message } from 'antd';

// The initial state of the App
export const initialState = {
  loading: false,
  btnReportLoading: false,
  error: false,
  message: '',
  dataResponse: [],
  listFeedback: [],
  listFavourite: [],
  loadingFeedback: false,
  loadingBtnCreateFeedback: false,
  loadingBtnUpdateFeedback: false,
  status: ""
};

export const detailRoomReducer = createReducer(initialState, (builder) => {
  builder
    // get detail post
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_REQUEST, (state, action) => {
      state.dataResponse = [];
      state.loading = true;
      return state;
    })
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results
      return state;
    })
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_FAILURE, (state, action: any) => {
      state.loading = false;
      return state;
    })

    // get detail post with room
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_REQUEST, (state, action) => {
      state.dataResponse = [];
      state.loading = true;
      return state;
    })
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_FAILURE, (state, action: any) => {
      state.loading = false;
      return state;
    })

    // report post
    .addCase(detailRoomPageEnum.REPORT_POST_REQUEST, (state, action) => {
      state.status = '';
      state.btnReportLoading = true;
      return state;
    })
    .addCase(detailRoomPageEnum.REPORT_POST_SUCCESS, (state, action: any) => {
      state.btnReportLoading = false;
      state.status = 'reported';
      return state;
    })
    .addCase(detailRoomPageEnum.REPORT_POST_FAILURE, (state, action: any) => {
      state.status = '';
      return state;
    })


    // add to favourite
    .addCase(detailRoomPageEnum.ADD_TO_FAVOURITE_REQUEST, (state, action) => {
      state.message = ''
      return state;
    })
    .addCase(detailRoomPageEnum.ADD_TO_FAVOURITE_SUCCESS, (state, action: any) => {
      state.message = 'favourite-update'
      return state;
    })
    .addCase(detailRoomPageEnum.ADD_TO_FAVOURITE_FAILURE, (state, action: any) => {
      message.error('Đã có lỗi xảy ra vui lòng thủ lại sau')
      state.message = ''
      return state;
    })



    // get list favourite
    .addCase(detailRoomPageEnum.GET_LIST_FAVOURITE_USER_REQUEST, (state, action) => {
      state.listFavourite = []
      return state;
    })
    .addCase(detailRoomPageEnum.GET_LIST_FAVOURITE_USER_SUCCESS, (state, action: any) => {
      state.listFavourite = action?.payload?.results
      return state;
    })
    .addCase(detailRoomPageEnum.GET_LIST_FAVOURITE_USER_FAILURE, (state, action: any) => {
      return state;
    })

    // get list feedback
    .addCase(detailRoomPageEnum.GET_LIST_FEEDBACK_REQUEST, (state, action) => {
      state.loadingFeedback = true
      state.listFeedback = []
      return state;
    })
    .addCase(detailRoomPageEnum.GET_LIST_FEEDBACK_SUCCESS, (state, action: any) => {
      state.loadingFeedback = false
      state.listFeedback = action?.payload?.results
      return state;
    })
    .addCase(detailRoomPageEnum.GET_LIST_FEEDBACK_FAILURE, (state, action: any) => {
      state.loadingFeedback = false
      return state;
    })

    // create feedback
    .addCase(detailRoomPageEnum.CREATE_FEEDBACK_REQUEST, (state, action) => {
      state.loadingBtnCreateFeedback = true
      state.message = ''
      return state;
    })
    .addCase(detailRoomPageEnum.CREATE_FEEDBACK_SUCCESS, (state, action: any) => {
      state.loadingBtnCreateFeedback = false
      state.message = 'feedback-created'
      return state;
    })
    .addCase(detailRoomPageEnum.CREATE_FEEDBACK_FAILURE, (state, action: any) => {
      state.loadingBtnCreateFeedback = false
      state.message = ''
      return state;
    })

    // update feedback
    .addCase(detailRoomPageEnum.UPDATE_FEEDBACK_REQUEST, (state, action) => {
      state.loadingBtnUpdateFeedback = true
      state.message = ''
      return state;
    })
    .addCase(detailRoomPageEnum.UPDATE_FEEDBACK_SUCCESS, (state, action: any) => {
      state.loadingBtnUpdateFeedback = false
      state.message = 'feedback-updated'
      return state;
    })
    .addCase(detailRoomPageEnum.UPDATE_FEEDBACK_FAILURE, (state, action: any) => {
      state.loadingBtnUpdateFeedback = false
      state.message = ''
      return state;
    })


    .addCase(detailRoomPageEnum.CLEAR_STATE_REPORT, (state, action: any) => {
      state.status = '';
      return state;
    })

    .addCase(detailRoomPageEnum.CLEAR_DETAIL_ROOM_PAGE_STATE, (state, action: any) => {
      state.loading = false;
      state.message = '';
      state.status = '';
      state.listFeedback = []
      state.dataResponse = [];
      state.dataResponse = [];
      state.listFavourite = [];
      state.loadingFeedback = false;
      state.loadingBtnCreateFeedback = false;
      return state;
    });
});
