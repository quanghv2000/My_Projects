import { createReducer } from '@reduxjs/toolkit';
import { settingAccountPageEnum } from 'app/pages/user/settings-account-page/screen/types';
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  message: '',
  statusUpdate: "",
  btnUpdateRole: false,
  dataResponse: {},
};

export const settingAccountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      settingAccountPageEnum.CHANGE_PASSWORD_REQUEST,
      (state, action) => {
        state.dataResponse = {};
        state.message = '';
        state.loading = true;
        return state;
      }
    )
    .addCase(
      settingAccountPageEnum.CHANGE_PASSWORD_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload;
        state.error = false;
        if (action.payload?.code === '200') {
          state.message = 'Bạn đã thay đổi mật khẩu thành công!';
        }
        return state;
      }
    )
    .addCase(
      settingAccountPageEnum.CHANGE_PASSWORD_FAILURE,
      (state, action: any) => {
        state.error = true;
        if (
          action?.payload?.status === 400 &&
          action.payload?.data?.messageCode === 'OLD_PASWORD_INCORRECT'
        ) {
          state.message = 'Mật khẩu cũ không chính xác !';
        }
        state.loading = false;
        return state;
      }
    )


    // update role host


    .addCase(
      settingAccountPageEnum.UPDATE_ROLE_REQUEST,
      (state, action) => {
        state.statusUpdate = '';
        state.btnUpdateRole = true
        return state;
      }
    )
    .addCase(
      settingAccountPageEnum.UPDATE_ROLE_SUCCESS,
      (state, action: any) => {
        state.statusUpdate = 'updated';
        state.btnUpdateRole = false
        return state;
      }
    )
    .addCase(
      settingAccountPageEnum.UPDATE_ROLE_FAILURE,
      (state, action: any) => {
        state.statusUpdate = '';
        state.btnUpdateRole = false
        return state;
      }
    )
    .addCase(
      settingAccountPageEnum.CLEAR_SETTING_STATE,
      (state, action: any) => {
        state.loading = false;
        state.message = '';
        state.dataResponse = {};
        return state;
      }
    );
});
