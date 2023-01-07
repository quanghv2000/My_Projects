import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'helper/index';
import { userInformationEnum } from './types';

export const updateUserInformationRequest = createAction<any>(
  userInformationEnum.UPDATE_USER_REQUEST
);
export const updateUserInformationSuccess = createAction(
  userInformationEnum.UPDATE_USER_SUCCESS,
  (payload: string) => actionPayload(payload)
);
export const updateUserInformationFailure = createAction(
  userInformationEnum.UPDATE_USER_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);
