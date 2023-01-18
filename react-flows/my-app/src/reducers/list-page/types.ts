import { IProductInfoResponse, IUserInfoResponse } from 'models';

export type ListPageReducerType = {
  userList: IUserInfoResponse[];
  productList: IProductInfoResponse[];
};

export type GetDataListPageSuccessPayloadType = {
  userList: IUserInfoResponse[];
  productList: IProductInfoResponse[];
};

export type PayloadType = GetDataListPageSuccessPayloadType;
