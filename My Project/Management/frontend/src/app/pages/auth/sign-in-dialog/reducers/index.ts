import { createReducer } from '@reduxjs/toolkit';
import { signInActionType } from '../actions';
import { SignInDialogReducerType } from './types';

export const initialState: SignInDialogReducerType = {
  isLoadingPage: false,
  signInStatus: false,
  userInfo: {},
  error: {},
};

export const SignInDialogReducer = createReducer(initialState, {
  [signInActionType.SIGN_IN_REQUEST]: (state: SignInDialogReducerType) => {
    state.isLoadingPage = true;

    return state;
  },
  [signInActionType.SIGN_IN_SUCCESS]: (
    state: SignInDialogReducerType,
    action,
  ) => {
    const { payload } = action;

    return {
      ...state,
      isLoadingPage: false,
      signInStatus: true,
      userInfo: payload,
      error: {},
    };
  },
  [signInActionType.SIGN_IN_FAILURE]: (
    state: SignInDialogReducerType,
    action,
  ) => {
    const { payload } = action;
    console.log('sign in failed');

    return {
      ...state,
      isLoadingPage: false,
      signInStatus: false,
      error: payload,
    };
  },
});
