/**
 * Asynchronously loads the component for TemplatePage
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const TemplatePage: React.FC<any> = lazyLoad(
  () => import('./index'),
  module => module.TemplatePage,
  {
    fallback: <></>,
  },
);
