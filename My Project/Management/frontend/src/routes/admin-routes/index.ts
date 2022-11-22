import { userMgmtRoutes } from './user-mgmt';
import { dashboardRoutes } from './dashboard';
import { systemMgmtRoutes } from './system-mgmt';
import { categoryMgmtRoutes } from './category-mgmt';

export const adminRoutes = [
  ...dashboardRoutes,
  ...userMgmtRoutes,
  ...systemMgmtRoutes,
  ...categoryMgmtRoutes,
];
