import { ColumnsType } from 'antd/lib/table';
import { ColumnAction } from './column-action';
import { ColumnIndex } from './column-index';
import { ColumnRoles } from './column-roles';
import { ColumnStatus } from './column-status';
import { ColumnUsername } from './column-username';
import { IUserInfo } from 'models/api-model/response';

export const userInfoColumns: ColumnsType<IUserInfo> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_, record, index) => <ColumnIndex index={index} />,
  },
  {
    title: 'Tài khoản',
    dataIndex: 'username',
    key: 'username',
    render: (_, record) => <ColumnUsername record={record} />,
  },
  {
    title: 'Họ & tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, { status }) => <ColumnStatus status={status} />,
  },
  {
    title: 'Phân quyền',
    key: 'roles',
    dataIndex: 'roles',
    render: (_, { roles }) => <ColumnRoles roles={roles} />,
  },
  {
    title: 'Tác vụ',
    dataIndex: 'action',
    key: 'action',
    width: '15%',
    render: (_, record) => <ColumnAction record={record} />,
  },
];
