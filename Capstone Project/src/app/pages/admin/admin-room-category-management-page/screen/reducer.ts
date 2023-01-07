import { createReducer } from '@reduxjs/toolkit';
import { adminPageRoomCategoryEnum } from 'app/pages/admin/admin-room-category-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminRoomCategoryPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get all room categories
      .addCase(
        adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )

      // delete
      .addCase(
        adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      )

      .addCase(
        adminPageRoomCategoryEnum.CLEAR_ROOM_CATEGORY_STATE,
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
