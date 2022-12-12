import { GlobalReducerType } from 'app/layouts/main-layout/reducers/types';
import { SignInReducerType } from 'app/modals/sign-in-modal/reducers/types';
import { ListPageReducerType } from 'app/pages/list-page/reducers/types';

export interface IRootState {
  GlobalReducer: GlobalReducerType;
  SignInReducer: SignInReducerType;
  ListPageReducer: ListPageReducerType;
}
