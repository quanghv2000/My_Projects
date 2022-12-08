import { ActionType } from 'types/reducers';
import { signInActionType } from '../actions';
import { ActionPayloadType, SignInDialogReducerType } from './types';

const initialState: SignInDialogReducerType = {
  contents: ''
};

const SignInDialogReducer: (state: SignInDialogReducerType, action: ActionType<ActionPayloadType>) => SignInDialogReducerType = (
  state = initialState,
  action: ActionType<ActionPayloadType>
) => {
  switch (action.type) {
    case signInActionType.SIGN_IN_REQUEST: {
      console.log('SIGN_IN_REQUEST');
      return { ...state };
    }
    case signInActionType.SIGN_IN_SUCCESS: {
      console.log('SIGN_IN_SUCCESS');
      return { ...state };
    }
    case signInActionType.SIGN_IN_FAILURE: {
      console.log('SIGN_IN_FAILURE');
      return { ...state };
    }
    default:
      return state;
  }
};

export default SignInDialogReducer;
