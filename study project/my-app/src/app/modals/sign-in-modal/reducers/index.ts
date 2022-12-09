import { createReducer } from '@reduxjs/toolkit';
import { SIGN_IN_STATUS } from 'utils/constants';
import { signInActionType } from '../actions';
import { SignInReducerType } from './types';

const initialState: SignInReducerType = {
  signInStatus: SIGN_IN_STATUS.UNDEFINED
};

const SignInReducer = createReducer(initialState, {
  [signInActionType.SIGN_IN_SUCCESS]: (state: SignInReducerType) => ({
    ...state,
    signInStatus: SIGN_IN_STATUS.SUCCESSFULLY
  }),
  [signInActionType.SIGN_IN_FAILURE]: (state: SignInReducerType) => ({
    ...state,
    signInStatus: SIGN_IN_STATUS.FAILED
  }),
  [signInActionType.RESET_SIGN_IN_STATUS]: (state: SignInReducerType) => ({
    ...state,
    signInStatus: SIGN_IN_STATUS.UNDEFINED
  })
});

export default SignInReducer;
