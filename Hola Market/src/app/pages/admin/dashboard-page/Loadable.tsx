/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const AdminDashboardPage: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.AdminDashboardPage,
  {
    fallback: <></>,
  },
);
