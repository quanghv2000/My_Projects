import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { LOADING_SPINNER_STATUS } from 'utils/constants';
import { globalActionType } from '../actions';
import { GlobalReducerType, GetUserLoggedInfoPayloadType, OpenModalPayloadType } from './types';

const initialState: GlobalReducerType = {
  userLoggedInfo: {},
  loadingSpinner: false,
  modalOpening: ''
};

const GlobalReducer = createReducer(initialState, {
  [globalActionType.OPEN_MODAL]: (state: GlobalReducerType, action: ActionType<OpenModalPayloadType>) => {
    const { payload } = action;
    return { ...state, modalOpening: payload };
  },
  [globalActionType.CLOSE_MODAL]: (state: GlobalReducerType) => ({ ...state, modalOpening: '' }),
  [globalActionType.OPEN_LOADING_SPINNER]: (state: GlobalReducerType) => ({ ...state, loadingSpinner: LOADING_SPINNER_STATUS.OPENING }),
  [globalActionType.CLOSE_LOADING_SPINNER]: (state: GlobalReducerType) => ({ ...state, loadingSpinner: LOADING_SPINNER_STATUS.CLOSED }),
  [globalActionType.GET_USER_INFO_LOGGED]: (state: GlobalReducerType, action: ActionType<GetUserLoggedInfoPayloadType>) => {
    const { payload: userLoggedInfo } = action;
    return { ...state, userLoggedInfo };
  }
});

export default GlobalReducer;
