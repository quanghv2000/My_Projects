import AdminLayout from 'app/layouts/admin-layout';
import { AdminCategoryMGMTPage } from 'app/pages/admin';

export const categoryMgmtRoutes = [
  {
    path: '/admin/quan-ly-danh-muc',
    page: AdminCategoryMGMTPage,
    breadcrumbs: ['Quản lý danh mục'],
    layout: AdminLayout,
  },
];
