import { combineReducers } from 'redux';
import GlobalReducer from 'app/layouts/main-layout/reducers';
import SignInReducer from 'app/modals/sign-in-modal/reducers';
import ListPageReducer from 'app/pages/list-page/reducers';

export const rootReducer = combineReducers({
  GlobalReducer,
  SignInReducer,
  ListPageReducer
});
