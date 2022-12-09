import { createReducer } from '@reduxjs/toolkit';
import { AUTHED_STATUS } from 'utils/constants';
import { signInActionType } from '../actions';
import { SignInReducerType } from './types';

const initialState: SignInReducerType = {
  authedStatus: AUTHED_STATUS.UNDEFINED
};

const SignInReducer = createReducer(initialState, {
  [signInActionType.SIGN_IN_SUCCESS]: (state: SignInReducerType) => ({
    ...state,
    authedStatus: AUTHED_STATUS.AUTHENTICATED
  }),
  [signInActionType.SIGN_IN_FAILURE]: (state: SignInReducerType) => ({
    ...state,
    authedStatus: AUTHED_STATUS.UNAUTHENTICATED
  }),
  [signInActionType.RESET_SIGN_IN_STATUS]: (state: SignInReducerType) => ({
    ...state,
    authedStatus: AUTHED_STATUS.UNDEFINED
  })
});

export default SignInReducer;
