import { GlobalReducerType } from 'app/layouts/main-layout/reducers/types';
import { SignInReducerType } from 'app/modals/sign-in-modal/reducers/types';

export interface IRootState {
  GlobalReducer: GlobalReducerType;
  SignInReducer: SignInReducerType;
}
