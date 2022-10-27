/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const AdminSystemMGMTPage: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.AdminSystemMGMTPage,
  {
    fallback: <></>,
  },
);
