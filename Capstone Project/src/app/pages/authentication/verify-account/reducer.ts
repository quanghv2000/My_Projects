import { createReducer } from '@reduxjs/toolkit';
import { authenticationVerifyAccountEnum } from 'app/pages/authentication/verify-account/types';
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  message: 'error',
  dataResponse: {},
};

export const verifyAccountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      authenticationVerifyAccountEnum.VERIFY_ACCOUNT_REQUEST,
      (state, action) => {
        state.dataResponse = {};
        state.message = 'error';
        state.loading = true;
        state.error = false;
        return state;
      }
    )
    .addCase(
      authenticationVerifyAccountEnum.VERIFY_ACCOUNT_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.error = false;
        state.message = 'success';
        state.dataResponse = action?.payload;
        return state;
      }
    )
    .addCase(
      authenticationVerifyAccountEnum.VERIFY_ACCOUNT_FAILURE,
      (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = 'error';
        state.dataResponse = {};
        return state;
      }
    );
});
