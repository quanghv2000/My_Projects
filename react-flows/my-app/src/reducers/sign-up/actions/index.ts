import { createAction } from '@reduxjs/toolkit';
import { ISignUpFormData, ISignUpResponse, IUserInfoSignUpRequest } from 'models';
import { actionPayload } from 'types/reducers';

export const signUpActionType = {
  SIGN_UP_REQUEST: 'AUTH/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'AUTH/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'AUTH/SIGN_UP_FAILURE',
  SAVE_DRAFT_FORM: 'SAVE_DRAFT_FORM',
  UNSAVED_FORM: 'UNSAVED_FORM',
  RESET_SIGN_UP_RESPONSE: 'RESET_SIGN_UP_RESPONSE',
};

export const signUpRequestAction = createAction(signUpActionType.SIGN_UP_REQUEST, (payload: IUserInfoSignUpRequest) =>
  actionPayload(payload)
);
export const signUpSuccessAction = createAction(signUpActionType.SIGN_UP_SUCCESS, (payload: ISignUpResponse) =>
  actionPayload(payload)
);
export const signUpFailureAction = createAction(signUpActionType.SIGN_UP_FAILURE, (payload: ISignUpResponse) =>
  actionPayload(payload)
);

export const saveDraftFormAction = createAction(signUpActionType.SAVE_DRAFT_FORM, (payload: ISignUpFormData) =>
  actionPayload(payload)
);
export const unsaveFormAction = createAction(signUpActionType.UNSAVED_FORM);

export const resetSignUpResponseAction = createAction(signUpActionType.RESET_SIGN_UP_RESPONSE);
