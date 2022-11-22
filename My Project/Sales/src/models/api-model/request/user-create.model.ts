import { RoleType } from '../types';

export interface IUserCreate {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roles: RoleType[];
}
