import { MainLayout } from 'app/layouts';
import { AboutPage, ContactPage, HomePage, NotFoundPage } from 'app/pages';
import { IRoute } from './types';

export const routes: IRoute[] = [
  {
    path: '/',
    page: HomePage,
    layout: MainLayout
  },
  {
    path: '/home',
    page: HomePage,
    layout: MainLayout
  },
  {
    path: '/about',
    page: AboutPage,
    layout: MainLayout
  },
  {
    path: '/contact',
    page: ContactPage,
    layout: MainLayout
  },
  {
    path: '*',
    page: NotFoundPage,
    layout: MainLayout
  }
];
