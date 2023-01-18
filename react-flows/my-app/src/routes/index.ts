import { ListPage, NotFoundPage } from 'pages';
import { IRoute } from './types';
import { Routes } from './constants';

export const routes: IRoute[] = [
  {
    path: '/',
    page: ListPage
  },
  {
    path: Routes.LIST_PAGE_ROUTE,
    page: ListPage
  },
  {
    path: '*',
    page: NotFoundPage
  }
];
