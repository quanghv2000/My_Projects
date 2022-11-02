/**
 * Asynchronously loads the component for NotFoundPage
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const NotFoundPage: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.NotFoundPage,
  {
    fallback: <></>,
  },
);
