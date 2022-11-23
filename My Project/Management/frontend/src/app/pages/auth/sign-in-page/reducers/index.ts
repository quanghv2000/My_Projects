import { createReducer } from '@reduxjs/toolkit';
import { signInActionType } from '../actions';
import { SignInPageReducerType } from './types';

export const initialState: SignInPageReducerType = {
  isLoadingPage: false,
  signInStatus: false,
  userInfo: {},
  error: {},
};

export const SignInPageReducer = createReducer(initialState, {
  [signInActionType.SIGN_IN_REQUEST]: (state: SignInPageReducerType) => {
    state.isLoadingPage = true;

    return state;
  },
  [signInActionType.SIGN_IN_SUCCESS]: (
    state: SignInPageReducerType,
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
    state: SignInPageReducerType,
    action,
  ) => {
    const { payload } = action;

    return {
      ...state,
      isLoadingPage: false,
      signInStatus: false,
      error: payload,
    };
  },
});
