import { MainLayout } from 'app/layouts';
import { AboutPage, ContactPage, HomePage, NotFoundPage } from 'app/pages';
import { ProfilePage } from 'app/pages/profile-page';
import { UnauthenticatedPage } from 'app/pages/unauthenticated-page';
import { UnauthorizedPage } from 'app/pages/unauthorized-page';
import { IRoute } from './types';
import { ROUTES } from './constants';

export const routes: IRoute[] = [
  {
    path: '/',
    page: HomePage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: ROUTES.HOME_PAGE_ROUTE,
    page: HomePage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: ROUTES.ABOUT_PAGE_ROUTE,
    page: AboutPage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: ROUTES.CONTACT_PAGE_ROUTE,
    page: ContactPage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: ROUTES.PROFILE_PAGE_ROUTE,
    page: ProfilePage,
    layout: MainLayout,
    isProtected: true,
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  {
    path: '/unauthenticated',
    page: UnauthenticatedPage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: '/unauthorized',
    page: UnauthorizedPage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: '*',
    page: NotFoundPage,
    layout: MainLayout,
    isProtected: false
  }
];
