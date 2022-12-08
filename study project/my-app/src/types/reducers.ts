export interface ReducerDataType {
  contents: string;
}

export type ReduxActionData<T> = {
  type: any;
  payload?: T;
};

export type ReduxAction<T> = (data: T) => ReduxActionData<T>;

export type ActionType<T> = {
  type: string;
  payload?: T;
};
