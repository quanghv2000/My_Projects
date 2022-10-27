/**
 * Asynchronously loads the component for TEMPLATE00Page
 */

import { lazyLoad } from 'utils/loadable';

export const ContactPageTEMPLATE00: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.ContactPageTEMPLATE00,
  {
    fallback: <></>,
  },
);
