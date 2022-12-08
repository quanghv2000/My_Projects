import { SignInDialogReducerType } from 'app/pages/auth/sign-in-dialog/reducers/types';
import { ReducerDataType } from 'types/reducers';

export interface IRootState {
  data: ReducerDataType;
  dataPersist: ReducerDataType;
  SignInDialogReducer: SignInDialogReducerType;
}
