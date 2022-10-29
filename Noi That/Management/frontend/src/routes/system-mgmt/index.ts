import AdminLayout from 'app/layouts/admin-layout';
import { AdminSystemMGMTPage } from 'app/pages/admin';

export const systemMgmtRoutes = [
  {
    path: '/admin/quan-ly-he-thong',
    content: AdminSystemMGMTPage,
    breadcrumbs: ['Quản lý hệ thống'],
    layout: AdminLayout,
  },
];
