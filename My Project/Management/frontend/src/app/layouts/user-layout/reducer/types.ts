import { IErrorRespone } from 'models/base';

interface IUserInfo {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  activated?: boolean;
  imageUrl?: string;
  authorities?: string[];
}

export type UserLayoutPageReducerType = {
  userInfo: IUserInfo | null;
  error: IErrorRespone | null;
};
