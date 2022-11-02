/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const AboutMePageTEMPLATE00: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.AboutMePageTEMPLATE00,
  {
    fallback: <></>,
  },
);
