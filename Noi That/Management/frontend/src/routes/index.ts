import AdminLayout from 'app/layouts/admin-layout';
import { categoryMgmtRoutes } from './category-mgmt';
import { dashboardRoutes } from './dashboard';
import { userMgmtRoutes } from './user-mgmt';

import ExampleAntd from 'app/pages/admin/example-antd';
import { systemMgmtRoutes } from './system-mgmt';

/** @Routes */
export const routes = [
  ...dashboardRoutes,
  ...userMgmtRoutes,
  ...categoryMgmtRoutes,
  ...systemMgmtRoutes,
  {
    path: '/admin/example-antd',
    content: ExampleAntd,
    breadcrumbs: ['Example Antd'],
    layout: AdminLayout,
  },
];
