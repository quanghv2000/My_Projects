import { AppLayout } from 'app/layouts/app-layout';
import { HomePage } from 'app/pages/home-page';

/** @Routes */
export const routes = [
  {
    path: '/',
    breadcrumbs: ['Trang chủ'],
    content: HomePage,
    layout: AppLayout,
  },
  {
    path: '/trang-chu',
    breadcrumbs: ['Trang chủ'],
    content: HomePage,
    layout: AppLayout,
  },
];
