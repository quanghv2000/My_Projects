import AdminLayout from 'app/layouts/admin-layout';
import { AdminDashboardPage } from 'app/pages/admin';

export const dashboardRoutes = [
  {
    path: '/admin/dashboard',
    content: AdminDashboardPage,
    breadcrumbs: ['Dashboard'],
    layout: AdminLayout,
  },
];
