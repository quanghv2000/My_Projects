import { UserLayout } from 'app/layouts/user-layout';
import { HomePage } from 'app/pages/user/home-page';

/** @User_Routes */
export const userRoutes = [
  {
    path: '/',
    breadcrumbs: ['Trang chủ'],
    content: HomePage,
    layout: UserLayout,
  },
  {
    path: '/trang-chu',
    breadcrumbs: ['Trang chủ'],
    content: HomePage,
    layout: UserLayout,
  },
];
