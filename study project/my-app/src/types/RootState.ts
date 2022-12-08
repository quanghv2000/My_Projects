import { ModalsReducerType } from 'app/modals/reducers/types';
import { ReducerDataType } from 'types/reducers';

export interface IRootState {
  data: ReducerDataType;
  dataPersist: ReducerDataType;
  ModalsReducer: ModalsReducerType;
}
