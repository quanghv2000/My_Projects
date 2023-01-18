import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { LOADING_SPINNER_STATUS } from 'utils/constants';
import { globalActionType } from './actions';
import { GlobalReducerType, OpenModalPayloadType, PayloadType } from './types';

const initialState: GlobalReducerType = {
  spinnerLoading: false,
  modalOpening: ''
};

export const GlobalReducer = createReducer<GlobalReducerType>(initialState, (builder) => {
  builder
    .addCase(globalActionType.OPEN_MODAL, (state: GlobalReducerType, action: ActionType<PayloadType>) => {
      const { payload: modalName } = action;
      
      state.modalOpening = modalName as OpenModalPayloadType;
    })
    .addCase(globalActionType.CLOSE_MODAL, (state: GlobalReducerType) => {
      state.modalOpening = '';
    })
    .addCase(globalActionType.OPEN_LOADING_SPINNER, (state: GlobalReducerType) => {
      state.spinnerLoading = LOADING_SPINNER_STATUS.OPENING;
    })
    .addCase(globalActionType.CLOSE_LOADING_SPINNER, (state: GlobalReducerType) => {
      state.spinnerLoading = LOADING_SPINNER_STATUS.CLOSED;
    });
});
