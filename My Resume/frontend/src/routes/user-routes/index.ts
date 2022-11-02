import { UserLayout } from 'app/layouts';
import { NotFoundPage } from 'app/pages/common';

/** @User_Routes */
export const userRoutes = [
  {
    path: '/',
    breadcrumbs: ['Trang chủ'],
    content: NotFoundPage,
    layout: UserLayout,
  },
  {
    path: '/trang-chu',
    breadcrumbs: ['Trang chủ'],
    content: NotFoundPage,
    layout: UserLayout,
  },
];
