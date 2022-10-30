import { createReducer } from '@reduxjs/toolkit';
import { addUserReducer } from './add-user-reducer';
import { getUsersReducer } from './get-user-reducer';
import { UserMGMTPageReducerType } from './types';

export const initialState: UserMGMTPageReducerType = {
  isLoadingPage: false,
  error: false,
  usersInfo: [],
};

export const UserMGMTPageReducer = createReducer(initialState, {
  ...getUsersReducer,
  ...addUserReducer,
});
