import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { AUTHED_STATUS } from 'utils/constants';
import { signInActionType } from './actions';
import { PayloadType, SignInFailurePayloadType, SignInReducerType } from './types';

const initialState: SignInReducerType = {
  signInStatus: AUTHED_STATUS.NOT_LOGGED,
  signInErrMessage: ''
};

export const SignInReducer = createReducer<SignInReducerType>(initialState, (builder) => {
  builder
    .addCase(signInActionType.SIGN_IN_SUCCESS, (state: SignInReducerType) => {
      state.signInStatus = AUTHED_STATUS.LOGGED;
    })
    .addCase(signInActionType.SIGN_IN_FAILURE, (state: SignInReducerType, action: ActionType<PayloadType>) => {
      const { payload: signInErrMessage } = action;

      state.signInStatus = AUTHED_STATUS.LOGGED_FAILURE;
      state.signInErrMessage = signInErrMessage as SignInFailurePayloadType;
    })
    .addCase(signInActionType.RESET_AUTHED_STATUS, (state: SignInReducerType) => {
      state.signInStatus = AUTHED_STATUS.NOT_LOGGED;
    });
});
