/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const ResumePageTEMPLATE00: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.ResumePageTEMPLATE00,
  {
    fallback: <></>,
  },
);
