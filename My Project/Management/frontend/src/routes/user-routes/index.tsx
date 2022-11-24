import React from 'react';
import { LocalStorage } from 'utils/constants';
import { Redirect, Route } from 'react-router-dom';
import { SignInPage } from 'app/pages/auth';
import { HomePage, ProfilePage } from 'app/pages/user';

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
];
