import { createReducer } from '@reduxjs/toolkit';
import { adminPageTypeOfRentalEnum } from 'app/pages/admin/admin-type-of-rental-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminTypeOfRentalPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // view
      .addCase(
        adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // delete
      .addCase(
        adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      );
  }
);
