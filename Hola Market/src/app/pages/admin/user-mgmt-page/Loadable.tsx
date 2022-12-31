/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const AdminUserMGMTPage: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.AdminUserMGMTPage,
  {
    fallback: <></>,
  },
);
