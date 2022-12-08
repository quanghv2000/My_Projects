import { ReduxAction } from 'types/reducers';

export enum DATA_PERSIST_ACTIONS {
  SET_CONTENTS = 'dataPersistActions/setContents'
}

export const setDataContents: ReduxAction<string[]> = (contents) => ({
  type: DATA_PERSIST_ACTIONS.SET_CONTENTS,
  payload: contents
});
