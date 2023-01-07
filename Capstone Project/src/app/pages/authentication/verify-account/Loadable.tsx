/**
 * Asynchronously loads the component for SignUp
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/authentication/signup-page/base/styled';

export const VerifyAccount = lazyLoad(
  () => import('./index'),
  (module) => module.VerifyAccount,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
