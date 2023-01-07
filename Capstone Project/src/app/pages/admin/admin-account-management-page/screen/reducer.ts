import { createReducer } from '@reduxjs/toolkit';
import { adminPageAccountEnum } from 'app/pages/admin/admin-account-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingBtnUpdate: false,
  loadingBtnCreate: false,
  loadingBtnLock: false,
  statusDelete: '',
  statusLockAccount: '',
  statusUnLockAccount: '',
  statusVerify: '',
  error: false,
  dataResponse: {},
  btnCreateAcc: false,
  msgCreateAcc: "",
  msgErrorCreate: ''
};

export const adminAccountPageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // view
      .addCase(
        adminPageAccountEnum.GET_DATA_ACCOUNT_REQUEST,
        (state, action) => {
          state.statusDelete = '';
          state.dataResponse = {};
          state.loading = true;
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.GET_DATA_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponse = action?.payload?.results;
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.GET_DATA_ACCOUNT_FAILURE,
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // update
      .addCase(
        adminPageAccountEnum.UPDATE_DATA_ACCOUNT_REQUEST,
        (state, action) => {
          state.loadingBtnUpdate = true;
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.UPDATE_DATA_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.UPDATE_DATA_ACCOUNT_FAILURE,
        (state, action) => {
          state.loadingBtnUpdate = false;
          return state;
        }
      )
      // create
      .addCase(
        adminPageAccountEnum.CREATE_DATA_ACCOUNT_REQUEST,
        (state, action) => {
          state.loadingBtnCreate = true;
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.CREATE_DATA_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loadingBtnCreate = false;

          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.CREATE_DATA_ACCOUNT_FAILURE,
        (state, action) => {
          state.loadingBtnCreate = false;
          return state;
        }
      )
      // delete
      .addCase(
        adminPageAccountEnum.DELETE_DATA_ACCOUNT_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusDelete = '';
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.DELETE_DATA_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.statusDelete = 'delete';
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.DELETE_DATA_ACCOUNT_FAILURE,
        (state, action) => {
          state.statusDelete = 'error-delete';
          return state;
        }
      )

      // lock account
      .addCase(adminPageAccountEnum.LOCK_ACCOUNT_REQUEST, (state, action) => {
        state.loading = true;
        state.statusDelete = '';
        state.statusLockAccount = '';
        state.statusUnLockAccount = '';
        state.loadingBtnLock = true
        return state;
      })
      .addCase(
        adminPageAccountEnum.LOCK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.loadingBtnLock = false
          state.statusLockAccount = 'lock-account';
          return state;
        }
      )
      .addCase(adminPageAccountEnum.LOCK_ACCOUNT_FAILURE, (state, action) => {
        state.statusLockAccount = 'error-lock-account';
        return state;
      })

      // unlock account
      .addCase(adminPageAccountEnum.UNLOCK_ACCOUNT_REQUEST, (state, action) => {
        state.loading = true;
        state.statusUnLockAccount = '';
        return state;
      })
      .addCase(
        adminPageAccountEnum.UNLOCK_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.statusUnLockAccount = 'unlock-account';
          return state;
        }
      )
      .addCase(adminPageAccountEnum.UNLOCK_ACCOUNT_FAILURE, (state, action) => {
        state.statusUnLockAccount = 'error-unlock-account';
        return state;
      })

      // create new account
      .addCase(adminPageAccountEnum.CREATE_NEW_ACCOUNT_REQUEST, (state, action) => {
        state.btnCreateAcc = true;
        state.msgCreateAcc = '';
        state.msgErrorCreate = ''
        return state;
      })
      .addCase(
        adminPageAccountEnum.CREATE_NEW_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.btnCreateAcc = false;
          state.msgCreateAcc = 'created';
          return state;
        }
      )
      .addCase(adminPageAccountEnum.CREATE_NEW_ACCOUNT_FAILURE, (state, action: any) => {
        state.btnCreateAcc = false;
        if (action?.payload?.data?.messageCode === 'CREATE_USER_FAIL') {
          state.msgErrorCreate = 'Tên người dùng đã được sử dụng!'
        }

        if (action?.payload?.data?.messageCode === 'EMAIL_HAS_EXISTED') {
          state.msgErrorCreate = 'Email đã được đăng ký!'
        }
        state.msgCreateAcc = '';
        return state;
      })

      // verify account
      .addCase(
        adminPageAccountEnum.VERIFY_ACCOUNT_REQUEST,
        (state, action) => {
          state.loading = true;
          state.statusVerify = '';
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.VERIFY_ACCOUNT_SUCCESS,
        (state, action: any) => {
          state.statusVerify = 'verified';
          return state;
        }
      )
      .addCase(
        adminPageAccountEnum.VERIFY_ACCOUNT_FAILURE,
        (state, action) => {
          state.statusVerify = 'error-verify';
          return state;
        }
      )

      .addCase(
        adminPageAccountEnum.CLEAR_DATA_ACCOUNT,
        (state, action: any) => {
          state.msgCreateAcc = '';
          state.msgErrorCreate = ''
          return state;
        }
      )
  }
);
