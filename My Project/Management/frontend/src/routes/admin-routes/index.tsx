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

export const PrivateAdminRoute: React.FC<IProps> = props => {
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
              pathname: '/unauthorized',
            }}
          />
        )
      }
    />
  );
};

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: AdminDashboardPage,
    private: true,
  },
  {
    path: '/admin/quan-ly-nguoi-dung',
    component: AdminUserMGMTPage,
    private: true,
  },
  {
    path: '/admin/quan-ly-danh-muc',
    component: AdminCategoryMGMTPage,
    private: true,
  },
  {
    path: '/admin/quan-ly-he-thong',
    component: AdminSystemMGMTPage,
    private: true,
  },
  {
    path: '/admin/example-antd',
    component: ExampleAntd,
    private: true,
  },
  {
    path: '/admin/quan-ly-nguoi-dung/them-nguoi-dung',
    component: AdminAddUserPage,
    private: true,
  },
];
