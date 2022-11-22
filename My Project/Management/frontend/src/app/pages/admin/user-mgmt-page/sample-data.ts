import { IUserInfo } from 'models/api-model/response';

export const usersInfo: IUserInfo[] = [
  {
    id: 1,
    username: 'quanghv2000',
    fullName: 'Hà Văn Quang',
    email: 'quanghv2000.dev@gmail.com',
    phone: '0938473746',
    status: 'isActive',
    roles: ['ROLE_ADMIN'],
  },
  {
    id: 2,
    username: 'jimgreen29',
    fullName: 'Jim Green',
    email: 'jimgreen29@gmail.com',
    phone: '0976376374',
    status: 'isLocked',
    roles: ['ROLE_USER'],
  },
  {
    id: 3,
    username: 'joeblack21',
    fullName: 'Joe Black',
    email: 'joeblack21@gmail.com',
    phone: '0912736354',
    status: 'unverified',
    roles: ['ROLE_USER'],
  },
];
