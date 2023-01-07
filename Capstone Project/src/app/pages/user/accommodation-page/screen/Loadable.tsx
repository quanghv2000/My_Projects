/**
 * Asynchronously loads the component for SignIn
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/user/accommodation-page/base/styled';

export const AccommodationPage = lazyLoad(
  () => import('./index'),
  (module) => module.AccommodationPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
