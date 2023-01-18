import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { defaultFormDataSignUp, SAVE_DRAFT_STATUS } from 'utils/constants';
import { signUpActionType } from './actions';
import {
  PayloadType,
  SaveDraftFromPayloadType,
  SignUpFailurePayloadType,
  SignUpReducerType,
  SignUpSuccessPayloadType
} from './types';

const initialState: SignUpReducerType = {
  formDataSavedStatus: SAVE_DRAFT_STATUS.UNSAVED,
  formDataSaved: defaultFormDataSignUp,
  signUpResponse: null
};

export const SignUpReducer = createReducer<SignUpReducerType>(initialState, (builder) => {
  builder
    .addCase(signUpActionType.SAVE_DRAFT_FORM, (state: SignUpReducerType, action: ActionType<PayloadType>) => {
      const { payload: formDataSaved } = action;

      state.formDataSavedStatus = SAVE_DRAFT_STATUS.SAVED;
      state.formDataSaved = formDataSaved as SaveDraftFromPayloadType;
    })
    .addCase(signUpActionType.UNSAVED_FORM, (state: SignUpReducerType) => {
      state.formDataSavedStatus = SAVE_DRAFT_STATUS.UNSAVED;
      state.formDataSaved = { ...defaultFormDataSignUp };
    })
    .addCase(signUpActionType.SIGN_UP_SUCCESS, (state: SignUpReducerType, action: ActionType<PayloadType>) => {
      const { payload: signUpResponse } = action;

      state.signUpResponse = signUpResponse as SignUpSuccessPayloadType;
    })
    .addCase(signUpActionType.SIGN_UP_FAILURE, (state: SignUpReducerType, action: ActionType<PayloadType>) => {
      const { payload: signUpResponse } = action;

      state.signUpResponse = signUpResponse as SignUpFailurePayloadType;
    })
    .addCase(signUpActionType.RESET_SIGN_UP_RESPONSE, (state: SignUpReducerType) => {
      state.signUpResponse = null;
    });
});
