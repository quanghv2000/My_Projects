import AdminLayout from 'app/layouts/admin-layout';
import {
  AdminSystemMGMTPage,
  AdminUserMGMTPage,
  AdminDashboardPage,
} from 'app/pages/admin';
import {
  AdminAddUserPage,
  AdminEditUserPage,
} from 'app/pages/admin/user-mgmt-page/subsystems';

import ExampleAntd from 'app/pages/admin/example-antd';
/** @Admin_Routes */
export const adminRoutes = [
  {
    path: '/admin/dashboard',
    content: AdminDashboardPage,
    breadcrumbs: ['Dashboard'],
    layout: AdminLayout,
  },
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
  {
    path: '/admin/quan-ly-he-thong',
    content: AdminSystemMGMTPage,
    breadcrumbs: ['Quản lý hệ thống'],
    layout: AdminLayout,
  },
  {
    path: '/admin/example-antd',
    content: ExampleAntd,
    breadcrumbs: ['Example Antd'],
    layout: AdminLayout,
  },
];
