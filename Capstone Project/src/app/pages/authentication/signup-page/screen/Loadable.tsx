/**
 * Asynchronously loads the component for SignUp
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/authentication/signup-page/base/styled';

export const SignUp = lazyLoad(
  () => import('./index'),
  (module) => module.SignUp,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
