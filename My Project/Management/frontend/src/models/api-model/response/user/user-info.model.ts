import { RoleType } from '../../types';

export interface IUserInfo {
  id?: number | string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  roles: RoleType[];
}
