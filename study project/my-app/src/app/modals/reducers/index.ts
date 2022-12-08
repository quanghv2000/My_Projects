import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { modalsActionType } from '../actions';
import { ActionPayloadType, ModalsReducerType } from './types';

const initialState: ModalsReducerType = {
  modalOpening: ''
};

const ModalsReducer = createReducer(initialState, {
  [modalsActionType.OPEN_MODAL]: (state: ModalsReducerType, action: ActionType<ActionPayloadType>) => {
    console.log('action: ', action);

    const { payload } = action;
    return { ...state, modalOpening: payload };
  },
  [modalsActionType.CLOSE_MODAL]: (state: ModalsReducerType) => ({ ...state, modalOpening: '' })
});

export default ModalsReducer;

// const ModalsReducer: (state: ModalsReducerType, action: ActionType<ActionPayloadType>) => ModalsReducerType = (
//   state = initialState,
//   action: ActionType<ActionPayloadType>
// ) => {
//   switch (action.type) {
//     case modalsActionType.OPEN_MODAL: {
//       const { payload } = action;
//       return { ...state, modalOpening: payload };
//     }
//     case modalsActionType.CLOSE_MODAL: {
//       return { ...state, modalOpening: '' };
//     }
//     default:
//       return state;
//   }
// };
