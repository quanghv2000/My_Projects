import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { IUserInfo, IProductInfo } from 'models/api-model/response';
import { listPageActionType } from '../actions';
import { ListPageReducerType } from './types';

const initialState: ListPageReducerType = {
  userInfoList: [],
  productInfoList: []
};

const ListPageReducer = createReducer(initialState, {
  [listPageActionType.GET_USER_INFO_LIST_SUCCESS]: (state: ListPageReducerType, action: ActionType<IUserInfo[]>) => {
    const { payload } = action;
    return { ...state, userInfoList: [...payload] };
  },
  [listPageActionType.GET_PRODUCT_INFO_LIST_SUCCESS]: (
    state: ListPageReducerType,
    action: ActionType<IProductInfo[]>
  ) => {
    const { payload } = action;
    return { ...state, productInfoList: [...payload] };
  }
});

export default ListPageReducer;
