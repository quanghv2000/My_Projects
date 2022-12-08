import { ReducerDataType, ReduxActionData } from 'types/reducers';
import { DATA_PERSIST_ACTIONS } from 'store/actions/data-persist';

const initialState: ReducerDataType = {
  contents: ''
};

const dataPersistState: (state: ReducerDataType, action: ReduxActionData<any>) => ReducerDataType = (state = initialState, action: ReduxActionData<any>) => {
  switch (action.type) {
    case DATA_PERSIST_ACTIONS.SET_CONTENTS:
      const { contents } = action.payload;

      return {
        ...state,
        contents
      };
    default:
      return state;
  }
};

export default dataPersistState;
