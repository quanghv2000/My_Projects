import { ReducerDataType, ReduxActionData } from 'types/reducers';
import { DATA_ACTIONS } from 'store/actions/data';

const initialState: ReducerDataType = {
  contents: ''
};

const dataState: (state: ReducerDataType, action: ReduxActionData<any>) => ReducerDataType = (state = initialState, action: ReduxActionData<any>) => {
  switch (action.type) {
    case DATA_ACTIONS.SET_CONTENTS:
    const { contents } = action.payload;
      return {
        ...state,
        contents
      };
    default:
      return state;
  }
};

export default dataState;
