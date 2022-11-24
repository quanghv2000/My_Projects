import AdminLayout from 'app/layouts/admin-layout';
import ExampleAntd from 'app/pages/admin/example-antd';
import { RouteType } from './types';
import { authRoutes } from './auth-routes';
// import { adminRoutes } from './admin-routes';
import { userRoutes } from './user-routes';

/** @Routes */
export const routes: RouteType[] = [
  // ...authRoutes,
  // ...adminRoutes,
  // ...userRoutes,
  // {
  //   path: '/admin/example-antd',
  //   page: ExampleAntd,
  //   breadcrumbs: ['Example Antd'],
  //   layout: AdminLayout,
  // },
];
