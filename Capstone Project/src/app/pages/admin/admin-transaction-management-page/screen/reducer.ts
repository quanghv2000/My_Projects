import { createReducer } from '@reduxjs/toolkit';
import { adminTransactionPageEnum } from 'app/pages/admin/admin-transaction-management-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  dataPostingResponse: {},
  dataVerifyResponse: {},
  btnConfirm: false,
  btnReject: false,
  btnCreate: false,
  msgCreate: '',
  status: '',
};

const transactionRequest = (state, action) => {
  state.dataResponse = {};
  state.dataPostingResponse = {};
  state.dataVerifyResponse = {};
  state.loading = true;
  return state;
};

const transactionSuccess = (state, action: any) => {
  state.loading = false;
  let newArray: any = [];
  let newArrayPosting: any = [];
  let newArrayVerify: any = [];
  let count = 1;
  let countPosting = 1;
  let countVerify = 1;
  action?.payload?.results?.map((item: any) => {
    if (item?.typeOfTransaction === 'DEPOSIT') {
      newArray.push({ ...item, index: count++ });
    }
  });
  action?.payload?.results?.map((item: any) => {
    if (
      item?.typeOfTransaction === 'POSTING' ||
      item?.typeOfTransaction === 'POSTING_EXTEND'
    ) {
      newArrayPosting.push({ ...item, index: countPosting++ });
    }
  });
  action?.payload?.results?.map((item: any) => {
    if (item?.typeOfTransaction === 'VERIFY') {
      newArrayVerify.push({ ...item, index: countVerify++ });
    }
  });
  state.dataResponse = newArray;
  state.dataPostingResponse = newArrayPosting;
  state.dataVerifyResponse = newArrayVerify;
  return state;
};

export const adminTransactionReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_REQUEST,
        transactionRequest
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_REQUEST,
        transactionRequest
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_REQUEST,
        transactionRequest
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_SUCCESS,
        transactionSuccess
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_SUCCESS,
        transactionSuccess
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_SUCCESS,
        transactionSuccess
      )
      .addCase(
        (adminTransactionPageEnum.ADMIN_TRANSACTION_FAILURE,
        adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_FAILURE),
        (state, action) => {
          state.loading = false;
          return state;
        }
      )
      // confirm transaction

      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_REQUEST,
        (state, action) => {
          state.status = '';
          state.btnConfirm = true;
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_SUCCESS,
        (state, action: any) => {
          state.btnConfirm = false;
          state.status = 'confirmed';
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_FAILURE,
        (state, action) => {
          state.btnConfirm = false;
          return state;
        }
      )

      // reject transaction

      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_REQUEST,
        (state, action) => {
          state.status = '';
          state.btnConfirm = true;
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_SUCCESS,
        (state, action: any) => {
          state.btnConfirm = false;
          state.status = 'rejected';
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_FAILURE,
        (state, action) => {
          state.btnConfirm = false;
          return state;
        }
      )

      // create new transaction

      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_REQUEST,
        (state, action) => {
          state.msgCreate = '';
          state.status = '';
          state.btnCreate = true;
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_SUCCESS,
        (state, action: any) => {
          state.msgCreate = 'created';
          state.status = '';
          state.btnCreate = false;
          return state;
        }
      )
      .addCase(
        adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_FAILURE,
        (state, action) => {
          state.msgCreate = '';
          state.status =
            'Số tiền của người dùng không đủ để thực hiện giao dịch này!';
          state.btnCreate = false;
          return state;
        }
      )

      // clear state
      .addCase(adminTransactionPageEnum.CLEAR_STATE, (state, action: any) => {
        state.loading = false;
        state.status = '';
        state.msgCreate = '';
        state.dataResponse = {};
        return state;
      });
  }
);
