import { createReducer } from '@reduxjs/toolkit';
import { getAccountActionType } from '../actions';
import { UserLayoutPageReducerType } from './types';

export const initialState: UserLayoutPageReducerType = {
  userInfo: null,
  error: {},
};

export const UserLayoutPageReducer = createReducer(initialState, {
  [getAccountActionType.GET_ACCOUNT_REQUEST]: (
    state: UserLayoutPageReducerType,
  ) => {
    return state;
  },
  [getAccountActionType.GET_ACCOUNT_SUCCESS]: (
    state: UserLayoutPageReducerType,
    action,
  ) => {
    const { payload } = action;

    return {
      ...state,
      userInfo: payload,
    };
  },
  [getAccountActionType.GET_ACCOUNT_FAILURE]: (
    state: UserLayoutPageReducerType,
    action,
  ) => {
    const { payload } = action;

    return {
      ...state,
      error: payload,
    };
  },
});
