import { IUserInfo } from 'models/api-model/response';

export type AdminUserMGMTPageReducerType = {
  isLoading: boolean;
  error: boolean;
  usersInfo: IUserInfo[];
};
