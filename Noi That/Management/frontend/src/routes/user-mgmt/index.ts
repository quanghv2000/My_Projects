import AdminLayout from 'app/layouts/admin-layout';
import { AdminUserMGMTPage } from 'app/pages/admin';
import {
  AdminAddUserPage,
  AdminEditUserPage,
} from 'app/pages/admin/user-mgmt-page/subsystems';

export const userMgmtRoutes = [
  {
    path: '/admin/quan-ly-nguoi-dung',
    content: AdminUserMGMTPage,
    breadcrumbs: ['Quản lý người dùng'],
    layout: AdminLayout,
  },
  {
    path: '/admin/quan-ly-nguoi-dung/them-nguoi-dung',
    content: AdminAddUserPage,
    breadcrumbs: ['Quản lý người dùng', 'Thêm người dùng'],
    layout: AdminLayout,
  },
  {
    path: '/admin/quan-ly-nguoi-dung/thong-tin-nguoi-dung',
    content: AdminEditUserPage,
    breadcrumbs: ['Quản lý người dùng', 'Thông tin người dùng'],
    layout: AdminLayout,
  },
];
