/**
 * Asynchronously loads the component for SignIn
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/authentication/signin-page/base/styled';

export const SignIn = lazyLoad(
  () => import('./index'),
  (module) => module.SignIn,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
