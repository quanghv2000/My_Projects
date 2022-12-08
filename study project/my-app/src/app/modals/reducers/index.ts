import { ActionType } from 'types/reducers';
import { modalsActionType } from '../actions';
import { ActionPayloadType, ModalsReducerType } from './types';

const initialState: ModalsReducerType = {
  modalOpening: ''
};

const ModalsReducer: (state: ModalsReducerType, action: ActionType<ActionPayloadType>) => ModalsReducerType = (
  state = initialState,
  action: ActionType<ActionPayloadType>
) => {
  switch (action.type) {
    case modalsActionType.OPEN_MODAL: {
      const { payload } = action;
      return { ...state, modalOpening: payload };
    }
    case modalsActionType.CLOSE_MODAL: {
      return { ...state, modalOpening: '' };
    }
    default:
      return state;
  }
};

export default ModalsReducer;
