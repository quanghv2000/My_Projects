import { createReducer } from '@reduxjs/toolkit';
import { adminPageRoomTypeEnum } from 'app/pages/admin/admin-room-type-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminRoomTypePageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get all room categories
      .addCase(
        adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      // delete
      .addCase(
        adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      )

      .addCase(
        adminPageRoomTypeEnum.CLEAR_ROOM_TYPE_STATE,
        (state, action: any) => {
          state.loading = false;
          state.loadingBtnUpdate = false;
          state.loadingBtnCreate = false;
          state.statusDelete = '';
          state.error = false;
          state.dataResponse = {};

          return state;
        }
      );
  }
);
