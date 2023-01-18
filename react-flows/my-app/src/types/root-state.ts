import { GlobalReducerType } from 'reducers/global/types';
import { SignInReducerType } from 'reducers/sign-in/types';
import { SignUpReducerType } from 'reducers/sign-up/types';
import { ListPageReducerType } from 'reducers/list-page/types';

export interface IRootState {
  GlobalReducer: GlobalReducerType;
  SignInReducer: SignInReducerType;
  SignUpReducer: SignUpReducerType;
  ListPageReducer: ListPageReducerType;
}
