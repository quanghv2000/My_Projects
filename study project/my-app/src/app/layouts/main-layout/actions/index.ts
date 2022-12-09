import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'types/reducers';
import { IUserLoggedInfo } from 'models/api-model/response/user-logged-info';

export const globalActionType = {
  OPEN_LOADING_SPINNER: 'APP/OPEN_LOADING_SPINNER',
  CLOSE_LOADING_SPINNER: 'APP/CLOSE_LOADING_SPINNER',
  OPEN_MODAL: 'APP/MODALS/OPEN_MODAL',
  CLOSE_MODAL: 'APP_MODALS/CLOSE_MODAL',
  GET_USER_LOGGED_INFO_REQUEST: 'APP/GET_USER_LOGGED_INFO_REQUEST',
  GET_USER_LOGGED_INFO_SUCCESS: 'APP/GET_USER_LOGGED_INFO_SUCCESS',
  GET_USER_LOGGED_INFO_FAILURE: 'APP/GET_USER_LOGGED_INFO_FAILURE'
};

export const openModalAction = createAction(globalActionType.OPEN_MODAL, (payload: string) => actionPayload(payload));
export const closeModalAction = createAction(globalActionType.CLOSE_MODAL);
export const openLoadingSpinnerAction = createAction(globalActionType.OPEN_LOADING_SPINNER);
export const closeLoadingSpinnerAction = createAction(globalActionType.CLOSE_LOADING_SPINNER);
export const getUserInfoLoggedRequestAction = createAction(globalActionType.GET_USER_LOGGED_INFO_REQUEST);
export const getUserInfoLoggedSuccessAction = createAction(
  globalActionType.GET_USER_LOGGED_INFO_SUCCESS,
  (payload: IUserLoggedInfo) => actionPayload(payload)
);
export const getUserInfoLoggedFailureAction = createAction(globalActionType.GET_USER_LOGGED_INFO_FAILURE);
