import React from 'react';
import { LocalStorage } from 'utils/constants';
import { Redirect, Route } from 'react-router-dom';
import { SignInPage } from 'app/pages/auth';
import { HomePage, ProfilePage } from 'app/pages/user';
import {
  AdminCategoryMGMTPage,
  AdminDashboardPage,
  AdminSystemMGMTPage,
  AdminUserMGMTPage,
} from 'app/pages/admin';
import ExampleAntd from 'app/pages/admin/example-antd';
import { AdminAddUserPage } from 'app/pages/admin/user-mgmt-page/subsystems';

type IProps = {
  component: any;
  path: string;
};

export const PrivateUserRoute: React.FC<IProps> = props => {
  const { component: Component, path } = props;

  const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

  const signInStatus = accessToken ? true : false;

  return (
    <Route
      exact
      path={path}
      render={routeRenderProps =>
        signInStatus ? (
          <Component {...routeRenderProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
            }}
          />
        )
      }
    />
  );
};

export const userRoutes = [
  {
    path: '/',
    component: HomePage,
    private: false,
  },
  {
    path: '/home',
    component: HomePage,
    private: false,
  },
  {
    path: '/profile',
    component: ProfilePage,
    private: true,
  },
  {
    path: '/sign-in',
    component: SignInPage,
    private: false,
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboardPage,
    private: false,
  },
  {
    path: '/admin/quan-ly-nguoi-dung',
    component: AdminUserMGMTPage,
    private: false,
  },
  {
    path: '/admin/quan-ly-danh-muc',
    component: AdminCategoryMGMTPage,
    private: false,
  },
  {
    path: '/admin/quan-ly-he-thong',
    component: AdminSystemMGMTPage,
    private: false,
  },
  {
    path: '/admin/example-antd',
    component: ExampleAntd,
    private: false,
  },
  {
    path: '/admin/quan-ly-nguoi-dung/them-nguoi-dung',
    component: AdminAddUserPage,
    private: false,
  },
];
