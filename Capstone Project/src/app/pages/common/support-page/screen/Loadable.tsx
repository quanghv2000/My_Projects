/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';

export const SupportPage = lazyLoad(
  () => import('./index'),
  (module) => module.Support,
  {
    fallback: <LoadingIndicator />,
  }
);
