/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/user/home-page/base/styled';

export const AdminMapPositonPage = lazyLoad(
  () => import('./index'),
  (module) => module.AdminMapPositonPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
