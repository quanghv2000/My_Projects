import { IUserInfo } from 'models/api-model/response';

export type UserMGMTPageReducerType = {
  isLoadingPage: boolean;
  error: boolean;
  usersInfo: IUserInfo[];
};
