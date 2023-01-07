import { createReducer } from '@reduxjs/toolkit';
import { adminPageBankAccountEnum } from 'app/pages/admin/admin-bank-account-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminBankAccountPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // view
      .addCase(
        adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // delete
      .addCase(
        adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      );
  }
);
