import { createReducer } from '@reduxjs/toolkit';
import { addUserReducer } from './add-user-reducer';
import { getUsersReducer } from './get-user-reducer';
import { AdminUserMGMTPageReducerType } from './types';

export const initialState: AdminUserMGMTPageReducerType = {
  isLoading: false,
  error: false,
  usersInfo: [],
};

export const AdminUserMGMTPageReducer = createReducer(initialState, {
  ...getUsersReducer,
  ...addUserReducer,
});
