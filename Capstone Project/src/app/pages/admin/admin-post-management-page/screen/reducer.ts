import { createReducer } from '@reduxjs/toolkit';
import { adminPostManagmentPageEnum } from 'app/pages/admin/admin-post-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  buttonLoading: false,
  buttonLoadingVerify: false,
  buttonLoadingCancelVerify: false,
  status: '',
};

export const adminPostManagmentReducer = createReducer(initialState, (builder) => {
  builder

    // get list post
    .addCase(adminPostManagmentPageEnum.GET_POST_ADMIN_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.GET_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.GET_POST_ADMIN_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // get list post search
    .addCase(adminPostManagmentPageEnum.SEARCH_POST_ADMIN_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.SEARCH_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.SEARCH_POST_ADMIN_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })


    // confirm post
    .addCase(adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoading = false;
      state.status = 'confirmed';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoading = false;
      return state;
    })


    // reject post
    .addCase(adminPostManagmentPageEnum.REJECT_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.REJECT_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoading = false;
      state.status = 'rejected';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.REJECT_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoading = false;
      return state;
    })


    // delete post
    .addCase(adminPostManagmentPageEnum.DELETE_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.DELETE_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoading = false;
      state.status = 'deleted';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.DELETE_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoading = false;
      return state;
    })

    // restore post
    .addCase(adminPostManagmentPageEnum.RESTORE_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoading = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.RESTORE_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoading = false;
      state.status = 'restored';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.RESTORE_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoading = false;
      return state;
    })


    // verify post 
    .addCase(adminPostManagmentPageEnum.VERIFY_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoadingVerify = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.VERIFY_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoadingVerify = false;
      state.status = 'verified';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.VERIFY_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoadingVerify = false;
      return state;
    })


    // cancel verify post 
    .addCase(adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_REQUEST, (state, action) => {
      state.status = '';
      state.buttonLoadingCancelVerify = true;
      return state;
    })
    .addCase(adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_SUCCESS, (state, action: any) => {
      state.buttonLoadingCancelVerify = false;
      state.status = 'cancel-verified';
      return state;
    })
    .addCase(adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_FAILURE, (state, action) => {
      state.buttonLoadingCancelVerify = false;
      return state;
    })


    // clear state
    .addCase(adminPostManagmentPageEnum.CLEAR_STATE, (state, action: any) => {
      state.loading = false;
      state.buttonLoading = false;
      state.status = '';
      state.dataResponse = {};
      return state;
    });
});
