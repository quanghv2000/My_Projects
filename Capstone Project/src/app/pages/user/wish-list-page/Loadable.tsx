/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/loading-indicator';
import { LoadingWrapper } from 'app/pages/user/home-page/base/styled';

const WishList = lazyLoad(
  () => import('./index'),
  (module) => module.WishList,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);

export default WishList;
