import { IResponseData } from './base';

export interface IUserInfoAPI {
  id: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  langKey: string;
  password: string;
  imageUrl: string;
  activationKey?: any;
  resetKey?: any;
  resetDate?: any;
  authorities: string[];
}

export type IUserInfoAPIResponse = IResponseData<IUserInfoAPI[]>;
