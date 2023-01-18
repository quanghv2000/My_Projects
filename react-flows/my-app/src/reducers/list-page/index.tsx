import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { listPageActionType } from './actions';
import { GetDataListPageSuccessPayloadType, ListPageReducerType, PayloadType } from './types';

const initialState: ListPageReducerType = {
  userList: [],
  productList: []
};

export const ListPageReducer = createReducer<ListPageReducerType>(initialState, (builder) => {
  builder.addCase(
    listPageActionType.GET_DATA_LIST_PAGE_SUCCESS,
    (state: ListPageReducerType, action: ActionType<PayloadType>) => {
      const { userList, productList } = action.payload as GetDataListPageSuccessPayloadType;

      state.userList = [...userList];
      state.productList = [...productList];
    }
  );
});
