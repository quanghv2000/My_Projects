import { createReducer } from '@reduxjs/toolkit';
import { ActionType } from 'types/reducers';
import { IUserInfo, IProductInfo } from 'models/api-model/response';
import { listPageActionType } from '../actions';
import { ListPageReducerType } from './types';

const initialState: ListPageReducerType = {
  userInfoList: [
    {
      id: 1,
      createdBy: 'system',
      createdDate: new Date('2022-12-11T03:51:44.305Z'),
      lastModifiedBy: 'system',
      lastModifiedDate: new Date('2022-12-11T03:51:44.305Z'),
      login: 'system',
      firstName: 'System',
      lastName: 'System',
      email: 'system@localhost.it',
      phone: '0988726335',
      activated: true,
      langKey: 'en',
      imageUrl: '',
      activationKey: null,
      resetKey: null,
      resetDate: null,
      authorities: ['ROLE_ADMIN']
    },
    {
      id: 2,
      createdBy: 'system',
      createdDate: new Date('2022-12-11T03:51:44.918Z'),
      lastModifiedBy: 'system',
      lastModifiedDate: new Date('2022-12-11T03:51:44.918Z'),
      login: 'anonymoususer',
      firstName: 'Anonymous',
      lastName: 'User',
      email: 'anonymoususer@localhost.it',
      phone: '0966888666',
      activated: true,
      langKey: 'en',
      imageUrl: '',
      activationKey: null,
      resetKey: null,
      resetDate: null,
      authorities: ['ROLE_USER']
    },
    {
      id: 3,
      createdBy: 'system',
      createdDate: new Date('2022-12-11T03:51:45.526Z'),
      lastModifiedBy: 'system',
      lastModifiedDate: new Date('2022-12-11T03:51:45.526Z'),
      login: 'admin',
      firstName: 'Administrator',
      lastName: 'Administrator',
      email: 'admin@localhost.it',
      phone: '0983736252',
      activated: true,
      langKey: 'en',
      imageUrl: '',
      activationKey: null,
      resetKey: null,
      resetDate: null,
      authorities: ['ROLE_ADMIN']
    },
    {
      id: 4,
      createdBy: 'system',
      createdDate: new Date('2022-12-11T03:51:46.013Z'),
      lastModifiedBy: 'system',
      lastModifiedDate: new Date('2022-12-11T03:51:46.013Z'),
      login: 'user',
      firstName: 'User',
      lastName: 'User',
      email: 'user@localhost.it',
      phone: '0982736252',
      activated: true,
      langKey: 'en',
      imageUrl: '',
      activationKey: null,
      resetKey: null,
      resetDate: null,
      authorities: ['ROLE_USER']
    }
  ],
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
