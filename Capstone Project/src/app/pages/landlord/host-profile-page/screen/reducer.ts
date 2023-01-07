import { createReducer } from '@reduxjs/toolkit';
import { hostProfileEnum } from 'app/pages/landlord/host-profile-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  userInfo: {},
  statusUpdateInfoUser: '',
  btnUpdateInfoUser: false,
  loadingGetUser: false,
  msg: '',
  code: '0',
  msgError: '',
};

export const hostProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(hostProfileEnum.CREATE_DEPOSIT_REQUEST, (state, action) => {
      state.msg = '';
      state.loading = true;
      return state;
    })
    .addCase(hostProfileEnum.CREATE_DEPOSIT_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.msg = 'success';
      return state;
    })
    .addCase(hostProfileEnum.CREATE_DEPOSIT_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // get transaction
    .addCase(hostProfileEnum.GET_TRANSACTION_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(hostProfileEnum.GET_TRANSACTION_SUCCESS, (state, action: any) => {
      state.loading = false;
      let newArray: any = [];
      let count = 1;
      newArray = action?.payload?.results?.map((item: any) => ({
        ...item,
        index: count++,
      }));
      state.dataResponse = newArray;
      return state;
    })
    .addCase(hostProfileEnum.GET_TRANSACTION_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // search transaction
    .addCase(hostProfileEnum.SEARCH_TRANSACTION_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(
      hostProfileEnum.SEARCH_TRANSACTION_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        let newArray: any = [];
        let count = 1;
        newArray = action?.payload?.results?.map((item: any) => ({
          ...item,
          index: count++,
        }));
        state.dataResponse = newArray;
        return state;
      }
    )
    .addCase(hostProfileEnum.SEARCH_TRANSACTION_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // get user Info
    .addCase(hostProfileEnum.GET_USER_INFO_REQUEST, (state, action) => {
      state.userInfo = {};
      return state;
    })
    .addCase(hostProfileEnum.GET_USER_INFO_SUCCESS, (state, action: any) => {
      localStorage.setItem(
        'user-info',
        // JSON.parse(action?.payload?.results)
        JSON.stringify(action?.payload?.results)
      );
      state.userInfo = action?.payload?.results;
      return state;
    })
    .addCase(hostProfileEnum.GET_USER_INFO_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // get user Info by id
    .addCase(hostProfileEnum.GET_USER_INFO_BY_ID_REQUEST, (state, action) => {
      state.loadingGetUser = true;
      state.msgError = '';
      state.code = '';
      state.userInfo = {};
      return state;
    })
    .addCase(
      hostProfileEnum.GET_USER_INFO_BY_ID_SUCCESS,
      (state, action: any) => {
        state.loadingGetUser = false;
        state.userInfo = action?.payload?.results;
        return state;
      }
    )
    .addCase(hostProfileEnum.GET_USER_INFO_BY_ID_FAILURE, (state, action) => {
      state.loadingGetUser = false;
      state.loading = false;
      return state;
    })

    // update user Info
    .addCase(hostProfileEnum.UPDATE_USER_INFO_REQUEST, (state, action) => {
      state.statusUpdateInfoUser = '';
      state.msgError = '';
      state.btnUpdateInfoUser = true;
      return state;
    })
    .addCase(hostProfileEnum.UPDATE_USER_INFO_SUCCESS, (state, action: any) => {
      state.statusUpdateInfoUser = 'updated';
      state.code = '200';
      state.msgError = 'Thay đổi thông tin thành công!';
      state.btnUpdateInfoUser = false;
      return state;
    })
    .addCase(hostProfileEnum.UPDATE_USER_INFO_FAILURE, (state, action: any) => {
      state.code = '400';
      if (action?.payload?.data?.messageCode === 'UPDATE_USER_FAIL') {
        state.msgError = 'Tên tài khoản đã tồn tại. Vui lòng nhập tên khác!';
      }
      state.btnUpdateInfoUser = false;
      return state;
    })

    // upload image user
    .addCase(hostProfileEnum.UPDATE_USER_IMAGE_REQUEST, (state, action) => {
      state.msg = '';
      state.code = '200';
      return state;
    })
    .addCase(
      hostProfileEnum.UPDATE_USER_IMAGE_SUCCESS,
      (state, action: any) => {
        state.msg = 'upload__image_success';
        state.code = '400';
        return state;
      }
    )
    .addCase(hostProfileEnum.UPDATE_USER_IMAGE_FAILURE, (state, action) => {
      state.msg = '';
      state.code = '400';
      return state;
    })

    .addCase(hostProfileEnum.CLEAR_MSG_UPDATE, (state, action) => {
      state.msgError = '';
      state.statusUpdateInfoUser = '';
      state.btnUpdateInfoUser = false;
      return state;
    })

    .addCase(hostProfileEnum.CLEAR_HOST_PROFILE_STATE, (state, action) => {
      state.loading = false;
      state.msg = '';
      state.statusUpdateInfoUser = '';
      state.btnUpdateInfoUser = false;
      return state;
    });
});
