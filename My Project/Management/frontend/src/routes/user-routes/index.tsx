import React from 'react';
import { LocalStorage } from 'utils/constants';
import { Redirect, Route } from 'react-router-dom';
import { HomePage, ProfilePage } from 'app/pages/user';
import { ForbiddenPage, UnauthorizedPage } from 'app/pages/common';

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
              pathname: '/unauthorized',
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
    path: '/unauthorized',
    component: UnauthorizedPage,
    private: false,
  },
  {
    path: '/forbidden',
    component: ForbiddenPage,
    private: false,
  },
  {
    path: '/profile',
    component: ProfilePage,
    private: true,
  },
];
