import { createReducer } from '@reduxjs/toolkit';
import { adminPagePostingCostEnum } from 'app/pages/admin/admin-posting-cost-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  statusDelete: '',
  error: false,
  dataResponse: {},
};

export const adminPostingCostPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get all room categories
      .addCase(
        adminPagePostingCostEnum.GET_DATA_POSTING_COST_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.GET_DATA_POSTING_COST_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.GET_DATA_POSTING_COST_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )

      // delete
      .addCase(
        adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      )

      .addCase(
        adminPagePostingCostEnum.CLEAR_POSTING_COST_STATE,
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
