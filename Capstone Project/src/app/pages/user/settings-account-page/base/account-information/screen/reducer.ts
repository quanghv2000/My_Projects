import { createReducer } from '@reduxjs/toolkit';
import { userInformationEnum } from './types';
export interface userRole {
  id?: number | string;
  role?: string;
}

export interface UserAccountInformationProps {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  gender?: boolean;
  imageLink?: string;
  phoneNumber?: string;

  role: userRole;
}

export const initialState = {
  loading: false,
  error: false,
  message: '',
  token: '',
  dataResponse: {},
};

export const signInReducer = createReducer(initialState, (builder) => {
  builder.addCase(userInformationEnum.UPDATE_USER_REQUEST, (state, action) => {
    state.dataResponse = {};
    state.loading = true;
    return state;
  });

  builder.addCase(userInformationEnum.UPDATE_USER_SUCCESS, (state, action) => {
    state.loading = false;
    return state;
  });

  builder.addCase(userInformationEnum.UPDATE_USER_FAILURE, (state, action) => {
    state.loading = false;
    return state;
  });
});
