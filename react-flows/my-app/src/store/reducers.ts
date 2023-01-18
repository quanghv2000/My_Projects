import { combineReducers } from 'redux';
import { GlobalReducer, SignInReducer, SignUpReducer, ListPageReducer } from 'reducers';

export const rootReducer = combineReducers({
  GlobalReducer,
  SignInReducer,
  SignUpReducer,
  ListPageReducer
});
