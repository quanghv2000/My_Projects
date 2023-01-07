import { createReducer } from '@reduxjs/toolkit';
import { adminMapPositonEnum } from 'app/pages/admin/admin-map-position/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  status: '',
  error: false,
  dataResponse: {},
};

export const adminMapPositonPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get all room categories
      .addCase(
        adminMapPositonEnum.GET_MAP_POSITON_REQUEST,
        (state, action) => {
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.GET_MAP_POSITON_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.GET_MAP_POSITON_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // create
      .addCase(
        adminMapPositonEnum.CREATE_MAP_POSITON_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          state.status = '';
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.CREATE_MAP_POSITON_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;
          state.status = 'created';
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.CREATE_MAP_POSITON_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          state.status = '';
          return state;
        }
      )
      // update
      .addCase(
        adminMapPositonEnum.UPDATE_MAP_POSITON_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          state.status = '';
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.UPDATE_MAP_POSITON_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          state.status = 'updated';
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.UPDATE_MAP_POSITON_FAILURE,
        (state, action) => {
          state.status = '';
          state.loadingBtnUpdate = false;
          return state;
        }
      )

      // delete
      .addCase(
        adminMapPositonEnum.DELETE_MAP_POSITON_REQUEST,
        (state, action) => {
          state.loading = true;
          state.status = '';
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.DELETE_MAP_POSITON_SUCCESS,
        (state, action: any) => {
          state.status = 'deleted';
          state.loading = false;
          return state;
        }
      )
      .addCase(
        adminMapPositonEnum.DELETE_MAP_POSITON_FAILURE,
        (state, action) => {
          state.status = '';
          state.loading = false;
          return state;
        }
      )

      .addCase(
        adminMapPositonEnum.CLEAR_MAP_POSITON_STATE,
        (state, action: any) => {
          state.loading = false;
          state.loadingBtnUpdate = false;
          state.loadingBtnCreate = false;
          state.status = '';
          state.error = false;
          state.dataResponse = {};
          return state;
        }
      );
  }
);
