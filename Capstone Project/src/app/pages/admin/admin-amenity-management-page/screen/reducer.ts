import { createReducer } from '@reduxjs/toolkit';
import { adminPageAmenityEnum } from 'app/pages/admin/admin-amenity-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminAmenityPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get all room categories
      .addCase(
        adminPageAmenityEnum.GET_DATA_AMENITY_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.GET_DATA_AMENITY_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.GET_DATA_AMENITY_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageAmenityEnum.CREATE_DATA_AMENITY_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.CREATE_DATA_AMENITY_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.CREATE_DATA_AMENITY_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageAmenityEnum.UPDATE_DATA_AMENITY_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.UPDATE_DATA_AMENITY_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.UPDATE_DATA_AMENITY_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )

      // delete
      .addCase(
        adminPageAmenityEnum.DELETE_DATA_AMENITY_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.DELETE_DATA_AMENITY_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageAmenityEnum.DELETE_DATA_AMENITY_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      )

      .addCase(
        adminPageAmenityEnum.CLEAR_AMENITY_STATE,
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
