import { ActionType } from 'types/reducers';
import { modalsActionType } from '../actions';
import { ActionPayloadType, ModalsReducerType } from './types';

const initialState: ModalsReducerType = {
  modalsOpening: []
};

const ModalsReducer: (state: ModalsReducerType, action: ActionType<ActionPayloadType>) => ModalsReducerType = (
  state = initialState,
  action: ActionType<ActionPayloadType>
) => {
  switch (action.type) {
    case modalsActionType.OPEN_MODALS: {
      const { payload } = action;
      return { ...state, modalsOpening: [...payload] };
    }
    case modalsActionType.CLOSE_MODALS: {
      const { payload } = action;
      const modalsOpening = state.modalsOpening.filter((item) => !payload.includes(item));
      return { ...state, modalsOpening };
    }
    default:
      return state;
  }
};

export default ModalsReducer;
