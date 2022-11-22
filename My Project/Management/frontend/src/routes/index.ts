import AdminLayout from 'app/layouts/admin-layout';
import ExampleAntd from 'app/pages/admin/example-antd';
import { authRoutes } from './auth-routes';
import { adminRoutes } from './admin-routes';
import { RouteType } from './types';

/** @Routes */
export const routes: RouteType[] = [
  ...authRoutes,
  ...adminRoutes,
  {
    path: '/admin/example-antd',
    page: ExampleAntd,
    breadcrumbs: ['Example Antd'],
    layout: AdminLayout,
  },
];
