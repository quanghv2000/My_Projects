import { IProductInfo, IUserInfo } from 'models/api-model/response';

export type ListPageReducerType = {
  userInfoList: IUserInfo[];
  productInfoList: IProductInfo[];
};
