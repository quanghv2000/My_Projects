import { createReducer } from '@reduxjs/toolkit';
import { message } from 'antd';
import { hostPostpageEnum } from 'app/pages/landlord/host-post-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  statusCreate: '',
  btnLoadingCreate: false,
  dataResponse: {},
  dataResponsePostType: {},
  msgTotal: '',
  extendPostMsg: '',
  verifyStatus: '',
  msgErrorVerify: '',
  btnLoadingVerify: false,
  btnDeleteLoading: false,
  msgDelete: '',
};

export const hostPostPageReducer = createReducer(initialState, (builder) => {
  builder
    // get list post
    .addCase(hostPostpageEnum.GET_POST_HOST_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.msgTotal = '';
      state.verifyStatus = '';
      state.msgErrorVerify = '';
      state.loading = true;
      return state;
    })
    .addCase(hostPostpageEnum.GET_POST_HOST_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(hostPostpageEnum.GET_POST_HOST_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // search list post
    .addCase(hostPostpageEnum.SEARCH_POST_HOST_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.msgTotal = '';
      state.verifyStatus = '';
      state.msgErrorVerify = '';
      state.loading = true;
      return state;
    })
    .addCase(
      hostPostpageEnum.SEARCH_POST_HOST_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload?.results;
        return state;
      }
    )
    .addCase(hostPostpageEnum.SEARCH_POST_HOST_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // create post
    .addCase(hostPostpageEnum.CREATE_POST_HOST_REQUEST, (state, action) => {
      state.btnLoadingCreate = true;
      state.msgTotal = '';
      state.statusCreate = '';
      return state;
    })
    .addCase(
      hostPostpageEnum.CREATE_POST_HOST_SUCCESS,
      (state, action: any) => {
        state.btnLoadingCreate = false;
        state.statusCreate = 'created';
        return state;
      }
    )
    .addCase(hostPostpageEnum.CREATE_POST_HOST_FAILURE, (state, action) => {
      state.btnLoadingCreate = false;
      state.msgTotal = 'Bạn không đủ tiền để thực hiện giao dịch này!';
      state.statusCreate = '';
      return state;
    })

    // get list post type
    .addCase(hostPostpageEnum.GET_POST_TYPE_HOST_REQUEST, (state, action) => {
      state.dataResponsePostType = {};
      state.loading = true;
      return state;
    })
    .addCase(
      hostPostpageEnum.GET_POST_TYPE_HOST_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponsePostType = action?.payload?.results;
        return state;
      }
    )
    .addCase(hostPostpageEnum.GET_POST_TYPE_HOST_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })

    // extend posy
    .addCase(hostPostpageEnum.EXTEND_POST_HOST_REQUEST, (state, action) => {
      state.extendPostMsg = '';
      state.msgTotal = '';
      state.btnLoadingCreate = true;
      return state;
    })
    .addCase(
      hostPostpageEnum.EXTEND_POST_HOST_SUCCESS,
      (state, action: any) => {
        state.btnLoadingCreate = false;
        state.extendPostMsg = 'updated';
        return state;
      }
    )
    .addCase(hostPostpageEnum.EXTEND_POST_HOST_FAILURE, (state, action) => {
      state.btnLoadingCreate = false;
      state.msgTotal = 'Bạn không đủ tiền để thực hiện giao dịch này!';
      return state;
    })

    // verify post
    .addCase(hostPostpageEnum.VERIFY_POST_HOST_REQUEST, (state, action) => {
      state.verifyStatus = '';
      state.msgErrorVerify = '';
      state.btnLoadingVerify = true;
      return state;
    })
    .addCase(
      hostPostpageEnum.VERIFY_POST_HOST_SUCCESS,
      (state, action: any) => {
        state.verifyStatus = 'verified';
        state.btnLoadingVerify = false;
        message.success('Đã gửi yêu cầu xác thực!');
        return state;
      }
    )
    .addCase(
      hostPostpageEnum.VERIFY_POST_HOST_FAILURE,
      (state, action: any) => {
        state.verifyStatus = '';
        state.btnLoadingVerify = false;
        if (action?.payload?.data?.messageCode === 'MONEY_NOT_ENOUGH') {
          state.msgErrorVerify =
            'Số tiền của bạn không đủ để thực hiện giao dịch này!';
        }
        return state;
      }
    )

    // verify post
    .addCase(
      hostPostpageEnum.VERIFY_POST_HOST_AGAIN_REQUEST,
      (state, action) => {
        state.verifyStatus = '';
        state.msgErrorVerify = '';
        state.btnLoadingVerify = true;
        return state;
      }
    )
    .addCase(
      hostPostpageEnum.VERIFY_POST_HOST_AGAIN_SUCCESS,
      (state, action: any) => {
        state.verifyStatus = 'verified-again';
        state.btnLoadingVerify = false;
        message.success('Đã gửi yêu cầu xác thực!');
        return state;
      }
    )
    .addCase(
      hostPostpageEnum.VERIFY_POST_HOST_AGAIN_FAILURE,
      (state, action: any) => {
        state.verifyStatus = '';
        state.btnLoadingVerify = false;
        return state;
      }
    )

    // delete post
    .addCase(hostPostpageEnum.DELETE_POST_HOST_REQUEST, (state, action) => {
      state.btnDeleteLoading = true;
      state.msgDelete = '';
      return state;
    })
    .addCase(
      hostPostpageEnum.DELETE_POST_HOST_SUCCESS,
      (state, action: any) => {
        state.btnDeleteLoading = false;
        state.msgDelete = 'deleted';
        return state;
      }
    )
    .addCase(hostPostpageEnum.DELETE_POST_HOST_FAILURE, (state, action) => {
      state.btnDeleteLoading = false;
      state.msgDelete = '';
      return state;
    })

    // clear msg
    .addCase(hostPostpageEnum.CLEAR_MSG, (state, action) => {
      state.msgTotal = '';
      return state;
    })

    // clear
    .addCase(hostPostpageEnum.CLEAR_POST_HOST_STATE, (state, action) => {
      state.statusCreate = '';
      state.msgTotal = '';
      state.dataResponse = {};
      state.extendPostMsg = '';
      state.verifyStatus = '';
      state.msgDelete = '';
      state.dataResponsePostType = {};
      state.msgErrorVerify = '';
      return state;
    });
});
