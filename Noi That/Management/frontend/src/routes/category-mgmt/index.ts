import AdminLayout from 'app/layouts/admin-layout';
import { AdminCategoryMGMTPage } from 'app/pages/admin';
import { AdminAddCategoryPage } from 'app/pages/admin/category-mgmt-page/subsystems';

export const categoryMgmtRoutes = [
  {
    path: '/admin/quan-ly-danh-muc',
    content: AdminCategoryMGMTPage,
    breadcrumbs: ['Quản lý danh mục'],
    layout: AdminLayout,
  },
  {
    path: '/admin/quan-ly-danh-muc/them-danh-muc',
    content: AdminAddCategoryPage,
    breadcrumbs: ['Quản lý danh mục', 'Thêm danh mục'],
    layout: AdminLayout,
  },
];
