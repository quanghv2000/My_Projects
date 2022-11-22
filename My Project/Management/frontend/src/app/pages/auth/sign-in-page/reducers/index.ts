import { createReducer } from '@reduxjs/toolkit';
import { signInActionType } from '../actions';
import { SignInPageReducerType } from './types';

export const initialState: SignInPageReducerType = {
  isLoadingPage: false,
  error: false,
};

export const CategoryMGMTPageReducer = createReducer(initialState, {
  [signInActionType.SIGN_IN_REQUEST]: (state: SignInPageReducerType) => {
    state.isLoadingPage = true;

    return state;
  },
  [signInActionType.SIGN_IN_SUCCESS]: (
    state: SignInPageReducerType,
    action,
  ) => {
    const { payload } = action;

    state.isLoadingPage = false;

    return state;
  },
  [signInActionType.SIGN_IN_FAILURE]: (
    state: SignInPageReducerType,
    action,
  ) => {
    const { payload } = action;
    state.isLoadingPage = false;
    state.error = payload;

    return state;
  },
});
