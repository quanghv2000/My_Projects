import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'types/reducers';
import { IUserLoggedInfo } from 'models/api-model/response/user-logged-info';

export const globalActionType = {
  OPEN_LOADING_SPINNER: 'APP/OPEN_LOADING_SPINNER',
  CLOSE_LOADING_SPINNER: 'APP/CLOSE_LOADING_SPINNER',
  GET_USER_INFO_LOGGED: 'APP/GET_USER_INFO_LOGGED',
  OPEN_MODAL: 'APP/MODALS/OPEN_MODAL',
  CLOSE_MODAL: 'APP_MODALS/CLOSE_MODAL'
};

export const openModalAction = createAction(globalActionType.OPEN_MODAL, (payload: string) => actionPayload(payload));
export const closeModalAction = createAction(globalActionType.CLOSE_MODAL);
export const openLoadingSpinnerAction = createAction(globalActionType.OPEN_LOADING_SPINNER);
export const closeLoadingSpinnerAction = createAction(globalActionType.CLOSE_LOADING_SPINNER);
export const getUserInfoLogged = createAction(globalActionType.GET_USER_INFO_LOGGED, (payload: IUserLoggedInfo) => actionPayload(payload));
