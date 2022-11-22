import AdminLayout from 'app/layouts/admin-layout';
import { AdminDashboardPage } from 'app/pages/admin';

export const dashboardRoutes = [
  {
    path: '/admin/dashboard',
    page: AdminDashboardPage,
    breadcrumbs: ['Dashboard'],
    layout: AdminLayout,
  },
];
