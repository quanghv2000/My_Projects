import React from 'react';

export type RouteType = {
  path: string;
  page: React.FC<any>;
  breadcrumbs: string[] | null;
  layout: React.FC<any> | null;
};
