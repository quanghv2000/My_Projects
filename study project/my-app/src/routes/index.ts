import { MainLayout } from 'app/layouts';
import { AboutPage, ContactPage, HomePage, NotFoundPage } from 'app/pages';
import { ProfilePage } from 'app/pages/profile-page';
import { ForbiddenPage } from 'app/pages/forbidden-page';
import { UnauthorizedPage } from 'app/pages/unauthorized-page';
import { ROLES } from 'utils/constants';
import { ListPage } from 'app/pages/list-page';
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
    authorities: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER]
  },
  {
    path: ROUTES.LIST_PAGE_ROUTE,
    page: ListPage,
    layout: MainLayout,
    isProtected: true,
    authorities: [ROLES.ROLE_ADMIN]
  },
  {
    path: ROUTES.UNAUTHORIZED_PAGE_ROUTE,
    page: UnauthorizedPage,
    layout: MainLayout,
    isProtected: false
  },
  {
    path: ROUTES.FORBIDDEN_PAGE_ROUTE,
    page: ForbiddenPage,
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
